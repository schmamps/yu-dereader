# Yu Dereader

[Yu Dereader](http://www.qwantz.com/index.php?comic=3413),
formerly known as [Angola Maldives](http://qwantz.com/index.php?comic=2319),
is a Chrome extension with a handful of purposes:

1. reveal Dinosaur Comics' easter eggs
1. providing a sample Chrome content script
1. experimentation with various concepts
1. to have 100% original work in my GitHub profile

From its humble beginnings as a simple user script,
this extension evolved into an intentionally overbuilt system
to work with gulp, npm/yarn,
tinker with ES6+ features,
and probably some other things I'm forgetting.

While many things have changed, others remain the same.
Yu Dereader will always love you, the reader, and as such,
this extension **does not and will never**:

* upload user data
* download unnecessary or external data
* insert irrelevant content like ads or even kitten GIFs

## Usage

Most eggs are displayed automatically.
Double click the comic or use the dropdown
to toggle between standard view,
`&butiwouldratherbereading=thelastdinosaurcomicever`,
and other variations.

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

Current versions of Safari don't seem to be supported.

## Roll Your Own

You can figure out where the source code is.
The extensions are built with [gulp](http://gulpjs.com/),
and specific tasks are listed in the default task,
i.e. invoking `gulp` with no arguments.

## Testing

In the project directory, execute `./test/run.sh`
