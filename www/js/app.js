// Ionic wpIonic App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'wpIonic' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'wpIonic.controllers' is found in controllers.js, wpIoinc.services is in services.js
angular.module('wpIonic', ['ionic','ionic.service.core', 'wpIonic.controllers', 'ionic.service.analytics', 'wpIonic.services', 'wpIonic.filters', 'ngCordova', 'angular-cache'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, CacheFactoryProvider) {

  angular.extend(CacheFactoryProvider.defaults, { 
    'storageMode': 'localStorage',
    'capacity': 100
  })

  // Native scrolling
  if( ionic.Platform.isAndroid() ) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }

  $stateProvider

  // sets up our default state, all views are loaded through here
  
   .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

   .state('app.intro', {
    url: "/intro?clear",
    views: {
      'menuContent': {
        templateUrl: "templates/intro.html",
        controller: 'IntroCtrl'
      }
    }
  })

  // this is the first sub view, notice menuContent under 'views', which is loaded through menu.html
  .state('app.posts', {
    url: "/posts",
    views: {
      'menuContent': {
        templateUrl: "templates/posts.html",
        controller: 'PostsCtrl'
      }
    }
  })

  .state('app.post', {
    url: "/posts/:postId",
    views: {
      'menuContent': {
        templateUrl: "templates/post.html",
        controller: 'PostCtrl'
      }
    }
  })

  .state('app.custom', {
    url: "/custom",
    views: {
      'menuContent': {
        templateUrl: "templates/custom.html"
      }
    }
  })


  .state('app.tip', {
    url: "/tip",
    views: {
      'menuContent': {
        templateUrl: "templates/tip.html",
        controller: 'TipCtrl'
      }
    }
  })

   .state('app.bookmarks', {
    url: "/bookmarks",
    views: {
      'menuContent': {
        templateUrl: "templates/bookmarks.html",
        controller: 'BookmarksCtrl'
      }
    }
  })

   .state('app.login', {
      url: '/login',
      views: {
          'menuContent': {
              templateUrl: 'templates/login.html',
              controller: 'LoginCtrl'
          }
      }
  })

  .state('app.forgot', {
      url: '/forgot',
      views: {
          'menuContent': {
              templateUrl: 'templates/forgotPassword.html',
              controller: 'ForgotPasswordController'
          }
      }
  })

  .state('app.register', {
      url: '/register',
      views: {
          'menuContent': {
              templateUrl: 'templates/register.html',
              controller: 'RegisterController'
          }
      }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/intro');
})

.run(function ($state, $rootScope, $ionicPlatform, $ionicAnalytics) {

        // Added analytics from ionic
        $ionicAnalytics.register();


        if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
        }
          Parse.initialize("n6faJNEJOLeW4FNV43VDtQLatqHatww4afA3LNJw", "IBjQSy0LIkSAj55v9PjOqAoN6WBTxErMXFZ7PNzC");
          var currentUser = Parse.User.current();
          $rootScope.user = null;
          $rootScope.isLoggedIn = false;

            if (currentUser) {
                $rootScope.user = currentUser;
                $rootScope.isLoggedIn = true;
                $state.go('app.tip');
        }
    });
