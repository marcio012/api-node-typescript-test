module.exports = function(config) {
  config.set({
    mutator: 'typescript',
    packageManager: 'yarn',
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'mocha',
    transpilers: ['typescript'],
    testFramework: 'mocha',
    coverageAnalysis: 'perTest',
    tsconfigFile: 'tsconfig.json',
    mutate: ['src/**/*.ts'],
    mochaOptions: {
      spec: ['dist/test/**/*.js'],
    },
  });
};
