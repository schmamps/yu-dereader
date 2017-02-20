# Angola Maldives

Angola Maldives is a Chrome Extension to reveal Dinosaur Comics' easter eggs.

## Installation

### Chrome
Google wants money to put this extension in the Chrome Web Store.
Feel free to send me some.
Until then:

1. Open Chrome
1. Go to Window > Extensions
1. Click 'Load Unpacked Extension'
1. Ignore the name,
and select the `build.safariextension` subdirectory of this project

### Safari
Apple wants even more money to put this extension in the Marketplace.
Feel free to send me some.
Until then:

1. [Enable the Develop menu item](https://support.apple.com/kb/PH21491)
(if you haven't already)
1. Go to Develop > Show Extension Builder
1. In the lower left corner of Extension Builder, click the `+`
1. Choose `Add Extension`
1. Select the `build.safariextension` subdirectory of this project
1. In the upper right corner of Extension Builder, click `Install`

Because this extension is unsigned,
you must reinstall it every time you restart Safari.

## Roll Your Own

You can figure out where the source code is.
There are a few [gulp](http://gulpjs.com/) build tasks:

* `js`: optimize and place the content script
* `manifest`: merge the source and package data
* `plist`: update the Safari extension plist
* `package`: run all of the previously-listed tasks

The default task watches `src/contentscript.js` for changes,
then runs `js`.
