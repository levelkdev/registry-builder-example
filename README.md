# registry-builder-example

An example of how to use the registry-builder library with ZeppelinOS

https://github.com/levelkdev/registry-builder

```
$ zos push --deploy-dependencies --network development
$ npm run deploy
```
Make sure an instance of ganache-cli is running `npm run ganache-cli`

### Setup

Install ZeppelinOS: `npm install -g zos`

Then run `npm install`

`chmod +x ./scripts/**` to grant execute permissions on the scripts directory

### Compile

Recompile contracts and build artifacts.

```
$ npm run compile
```

### Deploy

Deploy contracts to network defined in truffle.js

```
$ zos push --network development|kovan
```

### Test

Run `npm run compile` before first test run, and after any changes to the `.sol` files

```
$ npm test
```