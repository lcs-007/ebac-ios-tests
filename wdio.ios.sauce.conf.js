require('dotenv').config();

exports.config = {
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,

  hostname: 'ondemand.us-west-1.saucelabs.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',

  specs: ['./test/specs/**/*.ios.spec.js'],
  maxInstances: 1,

  //
  // TIMEOUTS 
  //
  waitforTimeout: 60000,
  connectionRetryTimeout: 300000, // 5 minutos
  connectionRetryCount: 3,

  capabilities: [
    {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',

      // Simulator
      'appium:deviceName': 'iPhone Simulator',
      'appium:platformVersion': 'current_major',

      // App do Sauce Storage (ZIP do simulator)
      'appium:app': 'storage:filename=LojaEBAC-sim.zip',

      // Ajuda o Sauce a retornar árvore sem travar
      'appium:useJSONSource': true,
      'appium:waitForQuiescence': false,

      // Limita a profundidade do snapshot (reduz chance de timeout no getPageSource)
      'appium:snapshotMaxDepth': 50,

      'sauce:options': {
        build: 'ebac-ios-tests',
        name: 'EBAC iOS Simulator Test',
        deviceOrientation: 'PORTRAIT',
      },
    },
  ],

  logLevel: 'info',
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { timeout: 300000 }, 
};