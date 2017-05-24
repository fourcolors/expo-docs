---
title: StatusBar
category: Facebook Component
---
<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## StatusBarStyle

Status bar style

Type: $Enum&lt;{undefined: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), undefined: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), undefined: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)}>

## StatusBarAnimation

Status bar animation

Type: $Enum&lt;{undefined: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), undefined: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), undefined: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)}>

## mergePropsStack

Merges the prop stack with the default values.

**Parameters**

-   `propsStack` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 
-   `defaultValues` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

## createStackEntry

Returns an object to insert in the props stack from the props
and the transition/animation info.

**Parameters**

-   `props` **any** 

Returns **any** 

## StatusBar

**Extends React.Component**

Component to control the app status bar.

### Usage with Navigator

It is possible to have multiple `StatusBar` components mounted at the same
time. The props will be merged in the order the `StatusBar` components were
mounted. One use case is to specify status bar styles per route using `Navigator`.

     <View>
       <StatusBar
         backgroundColor="blue"
         barStyle="light-content"
       />
       <Navigator
         initialRoute={{statusBarHidden: true}}
         renderScene={(route, navigator) =>
           <View>
             <StatusBar hidden={route.statusBarHidden} />
             ...
           </View>
         }
       />
     </View>

### Imperative API

For cases where using a component is not ideal, there is also an imperative
API exposed as static functions on the component. It is however not recommended
to use the static API and the component for the same prop because any value
set by the static API will get overriden by the one set by the component in
the next render.

\### Constants

`currentHeight` (Android only) The height of the status bar.

### \_updatePropsStack

Updates the native status bar with the props from the stack.

### currentHeight

The current height of the status bar on the device.

### setHidden

Show or hide the status bar

**Parameters**

-   `hidden` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Hide the status bar.
-   `animation` **[StatusBarAnimation](#statusbaranimation)** Optional animation when
       changing the status bar hidden property.

### setBarStyle

Set the status bar style

**Parameters**

-   `style` **[StatusBarStyle](#statusbarstyle)** Status bar style to set
-   `animated` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Animate the style change.

### setNetworkActivityIndicatorVisible

Control the visibility of the network activity indicator

**Parameters**

-   `visible` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Show the indicator.

### setBackgroundColor

Set the background color for the status bar

**Parameters**

-   `color` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Background color.
-   `animated` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Animate the style change.

### setTranslucent

Control the translucency of the status bar

**Parameters**

-   `translucent` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Set as translucent.

## hidden

If the status bar is hidden.

## animated

If the transition between status bar property changes should be animated.
Supported for backgroundColor, barStyle and hidden.

## backgroundColor

The background color of the status bar.

## translucent

If the status bar is translucent.
When translucent is set to true, the app will draw under the status bar.
This is useful when using a semi transparent status bar color.

## barStyle

Sets the color of the status bar text.

## networkActivityIndicatorVisible

If the network activity indicator should be visible.

## showHideTransition

The transition effect when showing and hiding the status bar using the `hidden`
prop. Defaults to 'fade'.