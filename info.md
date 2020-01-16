Livro base: [Serviços Web RESTful práticos com TypeScript 3](https://learning.oreilly.com/library/view/hands-on
-restful-web/9781789956276/be4e2e49-9523-4d67-97c9-534f50361895.xhtml)

package.json
```json
{
 "name": "order-api",
  "version": "1.0.0",
  "description": "This is the example from the Book Hands on RESTful Web Services with TypeScript 3",
  "main": "./dist/server.js",
  "scripts": {
    "build": "npm run clean && tsc",
    "clean": "rimraf dist && rimraf reports",
    "lint": "tslint ./src/**/*.ts ./test/**/*.spec.ts",
    "lint:fix": "tslint --fix ./src/**/*.ts ./test/**/*.spec.ts -t verbose",
    "pretest": "cross-env NODE_ENV=test npm run build && npm run lint",
    "test": "cross-env NODE_ENV=test mocha --reporter spec --compilers ts:ts-node/register test/**/*.spec.ts ",
    "test:mutation": "stryker run",
    "stryker:init": "stryker init",
    "dev": "cross-env PORT=3000 NODE_ENV=dev ts-node ./src/server.ts",
    "prod": "PORT=3000 npm run build && npm run start",
    "tsc": "tsc"
  },
  "engines": {
    "node": ">=8.0.0"
  },
  "keywords": [
    "order POC",
    "Hands on RESTful Web Services with TypeScript 3",
    "TypeScript 3",
    "Packt Books"
  ],
  "author": "Biharck Muniz Araújo",
  "license": "MIT",
  "devDependencies": {
    "@types/body-parser": "^1.17.0",
    "@types/chai": "^4.1.7",
    "@types/chai-http": "^3.0.5",
    "@types/express": "^4.16.0",
    "@types/mocha": "^5.2.5",
    "@types/node": "^10.12.12",
    "chai": "^4.2.0",
    "cross-env": "^5.2.0",
    "mocha": "^5.2.0",
    "rimraf": "^2.6.2",
    "stryker": "^0.33.1",
    "stryker-api": "^0.22.0",
    "stryker-html-reporter": "^0.16.9",
    "stryker-mocha-framework": "^0.13.2",
    "stryker-mocha-runner": "^0.15.2",
    "stryker-typescript": "^0.16.1",
    "ts-node": "^7.0.1",
    "tslint": "^5.11.0",
    "tslint-config-prettier": "^1.17.0",
    "typescript": "^3.2.1"
  },
  "dependencies": {
    "body-parser": "^1.18.3",
    "express": "^4.16.4",
    "chai-http": "^4.2.1"
  }
}
```


tsconfig.ts
```json
{
  "extends": ["tslint:recommended", "tslint-config-prettier"],
  "rules": {
    "array-type": [true, "generic"],
    "no-string-literal": false,
    "object-literal-shorthand": [true, "never"],
    "only-arrow-functions": true,
    "interface-name": false,
    "max-classes-per-file": false,
    "no-var-requires": false,
    "ban-types": false
  }
}
```

stryker.conf.js

````js
module.exports = function(config) {
  config.set({
    testRunner: 'mocha',
    mochaOptions: {
      files: ['test/**/*.spec.ts'],
      opts: './test/.mocharc.yml',
      ui: 'bdd',
      timeout: 35000,
      require: ['ts-node/register', 'source-map-support/register'],
      asyncOnly: false,
    },
    mutator: 'typescript',
    transpilers: [],
    reporters: ['html', 'progress', 'dashboard'],
    packageManager: 'npm',
    testFramework: 'mocha',
    coverageAnalysis: 'off',
    tsconfigFile: 'tsconfig.json',
    mutate: ['src/**/*.ts'],
  })
}

````
