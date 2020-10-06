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
tinker with interesting JavaScript/TypeScript features,
and probably some other things I'm forgetting.

While many things have changed, others remain the same.
Yu Dereader will always love you, the reader, and as such,
this extension **does not and will never**:

* read, much less upload user data
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

1. open Chrome
1. go to Window > Extensions
1. click 'Load Unpacked Extension'
1. select the `./build/prod` subdirectory of this project

## Roll Your Own

### Source Code

The source is located in... `./src`.

### Dependencies

These are the minimum initialization steps:

```sh
# initialize superproject with yarn
yarn

# get anqwtz submodule
git submodule init
git submodule update
```

### Build

The extensions are built with [gulp](http://gulpjs.com/).
Specific tasks are listed in the default task,
i.e. invoking `gulp` with no arguments.

By default, gulp builds are the dev version with source maps
and placed in `./build/dev`.

For leaner production builds,
use the `build` script with yarn/npm, e.g. `yarn build`
or take the long way with

```sh
# must start with 'prod' - any value, any case
export NODE_ENV=PROdUCTiON
gulp build
unset NODE_ENV
```

### Testing

*All* builds of this extension require the
[anqwtz submodule](https://github.com/schmamps/anqwtz).
In addition to containing data needed for creating the extension,
it includes a web server instance emulating Dinosaur Comics,
which the dev build of this project is configured to use.

To run the server, refer to its README,
which should already be checked out in this repo.
Once configured, it is also available as an npm/yarn task:

```sh
yarn serve
```

## Parting Thoughts

[Eventually, the universe will reach a state where it can no longer
sustain your demands on it](https://qwantz.com/index.php?comic=2033&butiwouldratherbereading=thelastdinosaurcomicever).
