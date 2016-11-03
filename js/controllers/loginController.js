angular.module('app.controllers')
    .controller('loginController', ['$scope', '$rootScope','Flash','$location', 'OAuth','$cookies', 'User', '$mdSidenav', function($scope, $rootScope, Flash, $location, OAuth, $cookies, User, $mdSidenav){

        $rootScope.url_path = 'Logar';
        $rootScope.isAuth = false;

        $scope.user = {
            username: '',
            password: ''
        };

        $scope.logar = () => {
            
            if($scope.fedForm.$valid){
                    
                    OAuth.getAccessToken($scope.user).then(function(response){
                        User.authenticated({},{}, function(data){
                            $rootScope.isAuth = true;
                            $cookies.putObject('user', data);
                            $location.path('/');
                        });
                        
                    }, function(data){
                        let message = '<strong>Erro!</strong> Login ou senha incorretos.';
                        Flash.create('danger', message);
                    })
            }

        };

        $scope.resetar = () => {
            $scope.user.username = "";
            $scope.user.password = "";
        }

    }]);