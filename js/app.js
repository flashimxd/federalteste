"use strict"

var app = angular.module( 'fedApp', [ 'app.controllers', 'app.services', 'ngAnimate', 'angular-loading-bar','ngAria','ngMessages','ngRoute', 'ngMaterial', 'angular-oauth2', 'ngFlash', 'ngMdIcons'] );

angular.module('app.controllers',[ ]);
angular.module('app.services',['ngResource']);

app.provider('appConfig', function(){
    var config = {
        baseUrl: 'http://150.164.80.212:9999'
    };

    return {
        config:config,
        $get: function(){
            return config;
        }
    }
});

app.config(['$routeProvider', '$httpProvider','OAuthProvider','OAuthTokenProvider', 'appConfigProvider',function($routeProvider,$httpProvider,OAuthProvider,OAuthTokenProvider, appConfigProvider){

    $routeProvider
        .when('/login',{
            'templateUrl': 'js/views/login.html',
            'controller' : 'loginController'
        })

        .when('/',{
            'templateUrl': 'js/views/index.html',
            'controller' : 'indexController'
        })

        .when('/news',{
            'templateUrl': 'js/views/noticias.html',
            'controller' : 'noticiasController'
        });
    
    OAuthProvider.configure({
      baseUrl: appConfigProvider.config.baseUrl,
      clientId: 'cms',
      grantPath: 'authenticate'
    });

    OAuthTokenProvider.configure({
        name: 'token',
        options: {
            secure: false
        }
    });

}]);

app.config(function($mdThemingProvider) {
  var customBlueMap = 		$mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });

  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
    
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});

app.run(['$rootScope', '$window', 'OAuth', '$location',function($rootScope, $window, OAuth, $location) {
        
    $rootScope.isAuth = false;

    $rootScope.$on('$locationChangeStart', function(evt, next, current){
           
        var nextPath = $location.path();
        
        if(nextPath != '/login'){
            if(!OAuth.isAuthenticated()){
                $location.path('/login');

            }
        }
        
    });

    if(OAuth.isAuthenticated()){
        $rootScope.isAuth = true;
    }

    $rootScope.$on('oauth:error', function(event, rejection) {
        // Ignore `invalid_grant` error - should be catched on `LoginController`.
        if ('invalid_grant' === rejection.data.error) {
            return;
        }

        // Refresh token when a `invalid_token` error occurs.
        if ('invalid_token' === rejection.data.error) {
            return OAuth.getRefreshToken();
        }

        // Redirect to `/login` with the `error_reason`.
        return $window.location.href = '/#login?error_reason=' + rejection.data.error;
    });
}]);