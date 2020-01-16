module.exports = function(config) {
  config.set({
    mutator: 'typescript',
    packageManager: 'yarn',
    reporters: ['html', 'clear-text', 'progress'],
    transpilers: ['typescript'],
    testFramework: 'mocha',
    coverageAnalysis: 'perTest',
    tsconfigFile: 'tsconfig.json',
    mutate: ['src/**/*.ts'],
    testRunner: 'mocha',
    mochaOptions: {
      spec: ['dist/test/**/*.js'],
      // opts: '.mocharc.yml',
      ui: 'bdd',
      require: ['ts-node/register', 'source-map-support/register'],
      asyncOnly: false,
    },
    // mochaOptions: {
    //   spec: ['dist/test/**/*.js'],
    // },
  });
};
