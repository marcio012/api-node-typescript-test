module.exports = function(config) {
  config.set({
    mutator: 'typescript',
    packageManager: 'yarn',
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'mocha',
    transpilers: [],
    testFramework: 'mocha',
    coverageAnalysis: 'perTest',
    tsconfigFile: 'tsconfig.json',
    mutate: ['src/**/*.ts'],
  });
};
