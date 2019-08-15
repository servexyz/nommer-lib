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
import { nmExists, nmInstall, nmRemove } from 'nommer'
```

## API

### nmExists(szPath)
> Check whether node_modules exist at (or one directory below) specified path

```js
import { nmExists } from 'nommer'

(async () => {
  await nmExists() 
  // --> null
  await nmExists("/right/path/containing") 
  // --> true
  await nmExists("/right/path/containing/node_modules") 
  // --> true
  await nmExists("/wrong/path/") 
  // --> false
  await nmExists("/wrong/path/node_modules") 
  // --> false
})()

```

---

### nmInstall(szPath)
> Run `npm install` in specified directory

```js
import { nmInstall } from 'nommer'

(async () => {
  await nmInstall()
  // --> null; does nothing
  await nmInstall(process.cwd())
  // --> true; run npm install in cwd
  await nmInstall("right/path/to/child/module")
  // --> true; run npm install in child module
})
```

---

### nmRemove(szPath)
> `rm -Rf` node_modules with some protection

**Protection**
1. Is this a `node_modules` directory? If not, stop.
2. Is this the current working directory? If so, stop.

```js
import { nmRemove } from 'nommer'

(async () => {
  await nmRemove()
  // --> null; does nothing
  await nmRemove(process.cwd())
  // --> console warning: cannot remove cwd
  await nmRemove("right/path/containing/node_modules")
  // --> true; removes modules
  await nmRemove("right/path/containing")
  // --> true; removes modules
  await nmRemove("wrong/path/")
  // --> false; does nothing
  await nmRemove("wrong/path/containing/node_modules")
  // --> false; does nothing

})
```
