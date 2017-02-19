# Angola Maldives

Angola Maldives is a Chrome Extension to reveal Dinosaur Comics' easter eggs.

## Installation

Feel free to send me $5 to put this extension in the Chrome Web Store.
Until then:

1. Open Chrome
1. Go to Window > Extensions
1. Click 'Load Unpacked Extension'
1. Select the `build` subdirectory of this project

## Roll Your Own

You can figure out where the source code is.
There are two [gulp](http://gulpjs.com/) build tasks:

* `js`: optimize and place the content script
* `manifest`: merge the source and package data

The default task runs both.
