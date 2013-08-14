// Karma configuration
// Generated on Mon Jul 29 2013 10:07:07 GMT+0200 (Västeuropa, sommartid)


// base path, that will be used to resolve files and exclude
basePath = '..';


// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  'lib/angular/angular.min.js',
  'lib/angular/angular-mocks.js',
  'lib/angularMobileNav/mobile-nav.js',
  'js/Models/*.js',
  'js/Factories/*.js',
  'js/Controllers/*.js',
  'js/Common/*.js',
  'js/*.js',
  'js/test/unit/*.js'
];


// list of files to exclude
exclude = [
  'js/*min.js',
  'test/unit/*min.js'
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9877;


// cli runner port
runnerPort = 9101;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_WARN;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['PhantomJS'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
