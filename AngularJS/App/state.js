myApp.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.when("/home","/").otherwise("/");

    $stateProvider.state("login",{
        url:"/login",
        templateUrl:"views/login.html"
    })
    // HOME STATES AND NESTED VIEWS ========================================
    .state("auth",{
        abstract:true,
        url:"",
        templateUrl:"views/authenticated.html"
    })
    .state("auth.home",{
        title:"MyApp Admin - Dashboard",
        url:"/",
        templateUrl:"views/dashboard.html",
        data:{
            ncyBreadcrumbLabel:"Home"
        },
        resolve:{
            files:["uiLoad",function(uiLoad){
                return uiLoad.load([
                    "assets/lib/flot/jquery.flot.js",
                    "assets/lib/flot/jquery.flot.categories.js",
                    "assets/lib/flot/jquery.flot.pie.js",
                    "assets/lib/flot/jquery.flot.resize.min.js",
                    "assets/lib/flot/jquery.flot.tooltip.js",
                    "assets/lib/flot/excanvas.min.js",
                    "assets/lib/DataTables/media/js/jquery.dataTables.min.js",
                    "assets/lib/DataTables/extensions/FixedHeader/js/dataTables.fixedHeader.min.js",
                    "assets/lib/DataTables/media/js/dataTables.bootstrap.js"
                ]);
            }]
        },
        controller:"dashboardCtrl"
    })
    .state("auth.orders",{
        abstract:true,
        url:"/leads",
        template:'<div ui-view autoscroll="false" class="page-animate"></div>'
    })
    .state("auth.orders.paid",{
        title:"MyApp Admin - Paid Campaigns",
        data:{
            ncyBreadcrumbLabel:"Paid Campaigns"
        },
        url:"/paid",
        templateUrl:"views/orders_paid.html",
        resolve: {
            orderLists:function($http){
                return $http({
                    method:"GET",
                    url:"data/orders_adwords.json"
                })
                .then(function(data){
                    var orderData = data.data;
                    return orderData;
                });
            },
            orderBing:function($http){
                return $http({
                    method:"GET",
                    url:"data/orders_bing.json"
                })
                .then(function(data){
                    var orderBing = data.data;
                    return orderBing;
                });
            },
            files: ["uiLoad",
                function(uiLoad) {
                    return uiLoad.load([
                        "assets/lib/DataTables/media/js/jquery.dataTables.min.js",
                        "assets/lib/DataTables/media/js/dataTables.bootstrap.js"
                    ]);
                }
            ]
        },
        controller:"orderList"
    })

    .state("auth.orders.organic",{
        title:"MyApp Admin - Organic",
        data:{
            ncyBreadcrumbLabel:"Organic"
        },
        url:"/organic",
        templateUrl:"views/orders_organic.html",
         resolve: {
            orderSeoGoogle:function($http){
                return $http({
                    method:"GET",
                    url:"data/orders_seo_google.json"
                })
                .then(function(data){
                    var orderSG = data.data;
                    return orderSG;
                });
            },
            orderSeoYhoo:function($http){
                return $http({
                    method:"GET",
                    url:"data/orders_seo_yahoo.json"
                })
                .then(function(data){
                    var orderSY = data.data;
                    return orderSY;
                });
            },
            orderSeoBing:function($http){
                return $http({
                    method:"GET",
                    url:"data/orders_seo_bing.json"
                })
                .then(function(data){
                    var orderSB = data.data;
                    return orderSB;
                });
            },
            files: ["uiLoad",
                function(uiLoad) {
                    return uiLoad.load([
                        "assets/lib/DataTables/media/js/jquery.dataTables.min.js",
                        "assets/lib/DataTables/media/js/dataTables.bootstrap.js"
                    ]);
                }
            ]
        },
        controller:"ordersSeo"
    })
     .state("auth.orders.other",{
        title:"MyApp Admin - Other",
        data:{
            ncyBreadcrumbLabel:"Other"
        },
        url:"/other",
        templateUrl:"views/orders_other.html"
    })
    .state("auth.appointments",{
        title:"MyApp Admin - Appointments",
        url:"/appointments",
        templateUrl:"views/appointments.html",
        data:{
            ncyBreadcrumbLabel:"Appointments"
        },
        resolve: {
            files: ["uiLoad",
                function(uiLoad) {
                    return uiLoad.load([
                        "assets/lib/fullcalendar/lib/jquery-ui.custom.min.js",
                        "assets/lib/fullcalendar/fullcalendar.css",
                        "assets/lib/fullcalendar/fullcalendar.min.js",
                        "assets/lib/fullcalendar/gcal.js"
                    ]);
                }
            ]
        },
        controller: "calendarBasicCtrl"
    })
    .state("auth.phone_numbers",{
        title:"MyApp Admin - Phone Numbers",
        url:"/phone-numbers",
        templateUrl:"views/phone-numbers.html",
        data:{
            ncyBreadcrumbLabel:"Phone Numbers"
        }
    })

    .state("auth.gallery",{
        title:"MyApp Admin - Gallery",
        url:"/gallery",
        templateUrl:"views/gallery.html",
        data:{
            ncyBreadcrumbLabel:"Gallery"
        }
    })
    .state("auth.users",{
        title:"MyApp Admin - Users",
        url:"/users",
        templateUrl:"views/users.html",
        data:{
            ncyBreadcrumbLabel:"Users"
        },
        resolve: {
            userLists:function($http){
                return $http({
                    method:"GET",
                    url:"data/users.json"
                })
                .then(function(data){
                    var userData = data.data;
                    return userData;
                });
            },
            files: ["uiLoad",
                function(uiLoad) {
                    return uiLoad.load([
                        "assets/lib/DataTables/media/js/jquery.dataTables.min.js",
                        "assets/lib/DataTables/extensions/FixedHeader/js/dataTables.fixedHeader.min.js",
                        "assets/lib/DataTables/media/js/dataTables.bootstrap.js"
                    ]);
                }
            ]
        },
        controller:"userList"
    });
}]);