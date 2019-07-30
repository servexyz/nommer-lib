# Nommer - `Lib`

> Install, remove and check existence of node_modules

![travis CI](https://travis-ci.org/servexyz/nommer-lib.svg?branch=master)

## Getting Started

#### Install

```sh
npm install -S nommer
```

#### Import 

```js
import { nmExists, nmInstall, nmRemove, getNodeModulesPath } from 'nommer'
```


## API

#### nmExists(szPath)
> Check whether node_modules exist at (or one directory below) specified path

```js
import { nmExists } from 'nommer'

// Assume "/path/containing/node_modules" is path to installed node_modules

(async () => {
  await nmExists("/path/containing") // --> true
  await nmExists("/path/containing/node_modules") // --> true
  await nmExists("/path/") // --> false
  await nmExists("/path/node_modules") // --> false
})()

```

#### nmInstall
> Run `npm install`

```js

```

#### nmRemove
> `rm -Rf` node_modules with some protection

```js

```
