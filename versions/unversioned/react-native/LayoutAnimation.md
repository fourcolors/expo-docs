---
title: LayoutAnimation
category: Facebook API
---
<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## LayoutAnimation

Automatically animates views to their new positions when the
next layout happens.

A common way to use this API is to call it before calling `setState`.

Note that in order to get this to work on **Android** you need to set the following flags via `UIManager`:

    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

### configureNext

Schedules an animation to happen on the next layout.

**Parameters**

-   `config`  Specifies animation properties:-   `duration` in milliseconds
    -   `create`, config for animating in new views (see `Anim` type)
    -   `update`, config for animating views that have been updated
        (see `Anim` type)
-   `onAnimationDidEnd`  Called when the animation finished.
    Only supported on iOS.
-   `onError`  Called on error. Only supported on iOS.

### create

Helper for creating a config for `configureNext`.