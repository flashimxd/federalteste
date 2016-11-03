angular.module('app.services')
    .service('News', ['$resource', 'appConfig', function($resource, appConfig){
        return $resource(appConfig.baseUrl+'/news?page=:page&page_size=:page_size',
            {
                page:'@page',
                page_size:'@page_size'
            },
            {
            get: {
                method: 'GET',
            }

        });
    }]);