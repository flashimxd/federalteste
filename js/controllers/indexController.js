angular.module('app.controllers')
    .controller('indexController', ['$scope', '$rootScope','$cookies','$mdSidenav', '$mdBottomSheet', 'OAuthToken', '$location', 'OAuth',function($scope, $rootScope,$cookies, $mdSidenav, $mdBottomSheet, OAuthToken, $location, OAuth){

        $rootScope.url_path = 'Dashboard';
        
        $scope.userData = {
            name: '',
            email: ''
        };

        let user = $cookies.getObject('user');
        $scope.userData  = user;

        $scope.menu = [
        {
            link: '/',
            title: 'Dashboard',
            icon: 'dashboard'
        },
        {
            link: 'news',
            title: 'Notícias',
            icon: 'speaker_notes'
        },
        {
            link: '',
            title: 'Universidade',
            icon: 'account_balance'
        }
        ];
        
        $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };

        //logout
        $scope.logOut = function($event) {
             OAuthToken.removeToken();
             $rootScope.isAuth = false;
             $location.path('/login');
        };
        
    }]);