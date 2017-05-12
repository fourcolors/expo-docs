const fs = require('fs-extra');
const path = require('path');
const {write} = require('node-yaml')
const yamlFront = require('yaml-front-matter')
const _ = require('lodash')
const documentation = require('documentation')
const docList = require('../submodules/react-native/website/server/docsList')

const copyOverDocFilesFromReactNative = (rnDocFilesPath) => {
  // Copy over docs to a unversioned by default, this should change to a variable later?
  fs.copySync(rnDocFilesPath, path.resolve("versions/unversioned/react-native"), {overwrite: true})
}

// Using an external lib to do this but can do it in house as well
// Putting into a function makes it easier to test
const parseFileContent = (fileContent) => {
  return yamlFront.loadFront(fileContent)
}

// Read all files in a dir.
// @returns {filename: string, content: utf-8}
const readFiles = (dirname, onError) => {
  try {
    const filenames = fs.readdirSync(dirname)

    return filenames.map((filename) => {
      return {filename: filename, content: fs.readFileSync(path.resolve(dirname, filename), 'utf-8')}
    })
    
  } catch(e) {
    onError(e);
  }
}

const generateYamlDataFileForNavigationFromFrontmatter = (yamlFilesPath) => {
  const files = readFiles(yamlFilesPath, (error) => console.error(error))

  const yaml = files.reduce((yamlArray, file) => {
    const parsedContent = parseFileContent(file.content) 

    // some files have no frontmatter, and ain't nobody got time for that
    if (parsedContent.category) {
      // ensure this category exists, if it doesn't, create a new category. Note: RNDocs doesn't have an index file 
      const categoryIndex = _.findIndex(yamlArray, (category) => {return category.title == parsedContent.category})

      if (categoryIndex !== -1) {
        yamlArray[categoryIndex].links[parsedContent.title] = `${yamlFilesPath}/${file.filename.split('.')[0]}.html`
      } else {
        // Create a new category if one does exist ie: categoryIndex returns -1
        yamlArray.push({title: parsedContent.category, index: '', links: {[parsedContent.title]: `${yamlFilesPath}/${file.filename.split('.')[0]}.html` }})
      }
    }
    return yamlArray
  }, [])

  // Write out yaml to gasby
  write(path.resolve('gatsby/src/data', 'rd_latest.yaml'), yaml,`utf-8`)
  console.log('Done writing yaml data file for doc navigation')
}

// This isn't the smartest way to do this because it will just push front matter, it has no concept of updating existing front matter
const addMarkdownFrontmatter = (md, frontOptions) => {
  frontOptions.unshift('---')
  frontOptions.push('---', md)
  return frontOptions.filter(function(line) { return line; }).join('\n');
}

const generateMarkdownFromJsdoc = (pathToFile, title, category) => {
  return documentation.build(pathToFile, {}).then((doc) => {
    return documentation.formats.md(doc, {});
  }).then((md) => {
    return addMarkdownFrontmatter(md, [`title: ${title}`, `category: ${category}`])
  })
} 

// docList is using ../ to back out so needs to be cleaned up
const cleanupDocListPath = (path) => {
  const tok = path.split('/')
  tok.shift()
  return tok.join('/')
}

const getFileNameFromPath = (filePath) => {
  return filePath.split('/').pop().split('.').shift()
}

// expectd an array of components from react native docs
const generateReactNativeMarkdown = (fileList, category) => {
  return fileList.map((reactFilePath) => {
    const filePath = cleanupDocListPath(reactFilePath)
    const filename = getFileNameFromPath(filePath)

    return generateMarkdownFromJsdoc(path.resolve('submodules/react-native/', filePath), filename, category)
      .then(md => {
        fs.writeFileSync(path.resolve(`versions/unversioned/react-native/${filename}.md`), md, 'utf-8')
        console.log(`done writing ${path.resolve(`versions/unversioned/react-native/${filename}.md`)}`)
      })
  })
}

// copyOverDocFilesFromReactNative(path.resolve("submodules/react-native/docs"))
console.log('Generating Facebook API/Component Markdown')
Promise.all(
  generateReactNativeMarkdown(docList.components, 'Facebook Component')
).then(resolve => { 
  return Promise.all(generateReactNativeMarkdown(docList.apis, 'Facebook API'))
}).then(resolve => {
  generateYamlDataFileForNavigationFromFrontmatter('versions/unversioned/react-native')
})
