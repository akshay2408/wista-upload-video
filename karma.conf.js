//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/angular/angular.js',
      'upload-video/upload-video.template.html',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
      'bower_components/blueimp-file-upload/js/jquery.fileupload.js',
      'bower_components/blueimp-file-upload/js/jquery.fileupload-process.js',
      'bower_components/blueimp-file-upload/js/jquery.fileupload-validate.js',
      'bower_components/blueimp-file-upload/js/jquery.fileupload-angular.js',
      '**/*.module.js',
      '*!(.module|.spec).js',
      '!(bower_components)/**/*!(.module|.spec).js',
      '**/*.spec.js'
    ],
    preprocessors: {
      'upload-video/upload-video.template.html': ['ng-html2js']
    },
    ngHtml2JsPreprocessor: {
      cacheIdFromPath: function(filepath) {
        return filepath.replace('app/upload-video/', '');
      },
      moduleName: 'upload-video.html'
    },

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    concurrency: Infinity

  });
};
