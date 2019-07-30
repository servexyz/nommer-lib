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

// Assume "/path/containing/node_modules" is path to installed node_modules

(async () => {
  await nmExists() 
  // --> returns null
  await nmExists("/path/containing") 
  // --> returns true
  await nmExists("/path/containing/node_modules") 
  // --> returns true
  await nmExists("/path/") 
  // --> returns false
  await nmExists("/path/node_modules") 
  // --> returns false
})()

```

---

### nmInstall(szPath)
> Run `npm install` in specified directory

```js
import { nmInstall } from 'nommer'

(async () => {
  await nmInstall() 
  // returns null; does nothing
  await nmInstall(process.cwd()) 
  // --> returns true; run npm install in cwd
  await nmInstall("path/to/child/module") 
  // --> returns true; run npm install in child module
})
```

---

### nmRemove(szPath)
> `rm -Rf` node_modules with some protection

**Simple Protection**
1. Is this a `node_modules` directory? If not, stop.
2. Is this the current working directory? If so, stop.

```js
import { nmRemove } from 'nommer'

(async () => {
  await nmRemove() 
  // --> returns null; does nothing
  await nmRemove(process.cwd()) 
  // --> console warning: cannot remove cwd
  await nmRemove("path/containing/node_modules") 
  // --> returns true; removes modules
  await nmRemove("path/containing") 
  // --> returns true; removes modules
  await nmRemove("path/") 
  // --> returns false; does nothing
})
```
