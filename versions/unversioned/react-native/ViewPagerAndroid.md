---
title: ViewPagerAndroid
category: Facebook Component
---
<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## ViewPagerAndroid

**Extends React.Component**

Container that allows to flip left and right between child views. Each
child view of the `ViewPagerAndroid` will be treated as a separate page
and will be stretched to fill the `ViewPagerAndroid`.

It is important all children are `<View>`s and not composite components.
You can set style properties like `padding` or `backgroundColor` for each
child.

Example:

    render: function() {
      return (
        <ViewPagerAndroid
          style={styles.viewPager}
          initialPage={0}>
          <View style={styles.pageStyle}>
            <Text>First page</Text>
          </View>
          <View style={styles.pageStyle}>
            <Text>Second page</Text>
          </View>
        </ViewPagerAndroid>
      );
    }

    ...

    var styles = {
      ...
      pageStyle: {
        alignItems: 'center',
        padding: 20,
      }
    }

### setPage

A helper function to scroll to a specific page in the ViewPager.
The transition between pages will be animated.

### setPageWithoutAnimation

A helper function to scroll to a specific page in the ViewPager.
The transition between pages will _not_ be animated.

## initialPage

Index of initial page that should be selected. Use `setPage` method to
update the page, and `onPageSelected` to monitor page changes

## onPageScroll

Executed when transitioning between pages (ether because of animation for
the requested page change or when user is swiping/dragging between pages)
The `event.nativeEvent` object for this callback will carry following data:

-   position - index of first page from the left that is currently visible
-   offset - value from range \[0,1) describing stage between page transitions.
    Value x means that (1 - x) fraction of the page at "position" index is
    visible, and x fraction of the next page is visible.

## onPageScrollStateChanged

Function called when the page scrolling state has changed.
The page scrolling state can be in 3 states:

-   idle, meaning there is no interaction with the page scroller happening at the time
-   dragging, meaning there is currently an interaction with the page scroller
-   settling, meaning that there was an interaction with the page scroller, and the
    page scroller is now finishing it's closing or opening animation

## onPageSelected

This callback will be called once ViewPager finish navigating to selected page
(when user swipes between pages). The `event.nativeEvent` object passed to this
callback will have following fields:

-   position - index of page that has been selected

## pageMargin

Blank space to show between pages. This is only visible while scrolling, pages are still
edge-to-edge.

## keyboardDismissMode

Determines whether the keyboard gets dismissed in response to a drag.

-   'none' (the default), drags do not dismiss the keyboard.
-   'on-drag', the keyboard is dismissed when a drag begins.

## scrollEnabled

When false, the content does not scroll.
The default value is true.