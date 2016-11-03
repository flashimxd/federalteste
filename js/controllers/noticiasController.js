angular.module('app.controllers')
    .controller('noticiasController', ['$scope','News', '$rootScope',function($scope, News, $rootScope){

        $rootScope.url_path = 'Notícias';
        $rootScope.news = [];
        $rootScope.page = 0;

        $scope.getNewsByPage = (page) => {

            if(page > 0){

                 News.get({page: page, page_size: 3}, function(data){

                    $rootScope.news = [];
                    $rootScope.page = 0;

                    for(row of data.items){
                          let news = {title: row.title, data: row.post_date, id: row.id, autor_email: row.author.email, cargo_name: row.author.name, role: row.author.post_type};
                          
                          setTimeout(function(){
                            $scope.$apply(function(){
                                $rootScope.page = data.page;
                                $rootScope.news.push(news);
                            });
                          }, 1000);
                            
                    }

                });
            }
           
        }

        $scope.getNewsByPage(1);

        $scope.getPrevious = (atual_page) => {
            let page = atual_page - 1;
            $scope.getNewsByPage(page); 
        };

        $scope.getNext = (atual_page) => {
            let page = atual_page + 1;
            $scope.getNewsByPage(page); 
        };

    }]);