// var __env = {};

// Import variables if present (from env.js)
if(window){
  // Object.assign(__env, window.__env);
  angular.extend(__env, window.__env);

}
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var ngModule = angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngRoute', 'ngCookies']);

  // Register environment in AngularJS as constant
  ngModule.constant('__env', __env);
  ngModule.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;

    /* Global Loading Screen interceptor*/
    $httpProvider.interceptors.push(function($rootScope) {
      return {
        request: function(config) {
          $rootScope.$broadcast('loading:show')
          return config
        },
        response: function(response) {
          $rootScope.$broadcast('loading:hide')
          return response
        }
      }
    });
  })

  ngModule.run(function($ionicPlatform, $rootScope, $ionicLoading, $window, __env) {

    $rootScope.user = {};

    $window.fbAsyncInit = function() {
      // Executed when the SDK is loaded

      FB.init({

        /*
         The app id of the web app;
         To register a new app visit Facebook App Dashboard
         ( https://developers.facebook.com/apps/ )
         */

        appId: __env.facebookAppId,

        /*
         Adding a Channel File improves the performance
         of the javascript SDK, by addressing issues
         with cross-domain communication in certain browsers.
         */

        // channelUrl: 'app/channel.html',

        /*
         Set if you want to check the authentication status
         at the start up of the app
         */

        status: true,

        /*
         Enable cookies to allow the server to access
         the session
         */

        cookie: true,

        /* Parse XFBML */

        xfbml: true
      });

      // sAuth.watchAuthenticationStatusChange();

    };

    (function(d){
      // load the Facebook javascript SDK

      var js,
        id = 'facebook-jssdk',
        ref = d.getElementsByTagName('script')[0];

      if (d.getElementById(id)) {
        return;
      }

      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";

      ref.parentNode.insertBefore(js, ref);

    }(document));

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
    $rootScope.$on('loading:show', function() {
      $ionicLoading.show({template: '<ion-spinner icon="ripple"</ion-spinner>'})
    });

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide()
    })
  })


