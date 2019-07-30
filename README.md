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
> Check whether node_modules exist at path

```js
import { nmExists } from 'nommer'
import path from 'path'

// Assume that node_modules exist here: 
// /path/containing/node_modules

let path1 = path.join("path", "containing"); // --> /path/containing
let path2 = path.join(path1, "node_modules"); // --> /path/containing/node_modules
let path3 = "/path/"  // --> /path/
let path4 = path.join("path", "node_modules"); // --> /path/node_modules

(async () => {
  // /path/containing
  await nmExists(path1) // --> true

  // /path/containing/node_modules
  await nmExists(path2) // --> true

  // /path/
  await nmExists(path3) // --> false

  // /path/node_modules
  await nmExists(path4) // --> false
})()

```




#### nmInstall




#### nmRemove




#### getNodeModulesPath
