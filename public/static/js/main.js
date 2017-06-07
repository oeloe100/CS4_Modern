var app = angular.module("Modern_Template", ["ngRoute"]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl : 'static/html/home.pug'  
    })
    .when('/about', {
        templateUrl : 'static/html/about.pug', 
        controller : 'about_controller'
        
    })
}]);

app.run(['$window', '$rootScope', function($window, $rootScope) {
    SetResponsiveWindow($window, $rootScope);   
}]);

app.controller('header_controller', function($scope){
    HeaderController($scope);
    ClickRegister($scope);
});

app.controller('scroll_controller', function($scope, $location, $anchorScroll){
    ScrollController($scope, $location, $anchorScroll);
});

app.controller('about_controller', function($scope){
    AboutController($scope);
});

app.controller('home_controller', function($scope, $document){  
    HomeController($scope);
    $scope.$on('directive.SB', function(item, index){
        $scope.active = index;
    });
});

app.controller('expand_2bottom', function($scope, $element){
    Expand($scope, $element);
});

app.controller('portfolio_hover', function($scope, $element){
    PH($scope, $element);
});

//----------------------------------------PLACEHOLDER------------------------------------------------\\

var pc = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula egetdolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,sem. Nulla consequat massa quis enim.';

var pc_short = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula egetdolor. Aenean massa.';

//----------------------------------------SHOWCASE DIR-----------------------------------------------\\
app.directive("showcase", function($compile){  
    var element_desc = pc;  
    var section_template = '<table class="scroll-x"> <tr></tr> </table>';
    
    return{
        restrict : 'AEC',
        template : section_template,
        scope : {
            active : '=?bind',
        },
        link : function($scope, $element){               
            var inScope = $element.find('tr');
            
            for (var i = 1; i < 5; i++){
                var sub_title = ['', 'Innovation', 'Clean Code', 'Great Service', 'Using the latest techniques'];
                var element_template = '<th class="no_offset w3-animate-right">\
                                <div class="url_container">\
                                    <div id="url_'+i+'" class="element_icon icon_alignment"></div> <span class="element_description">'+sub_title[i]+'</span></div>\
                                \
                                <span class="element_text">\
                                    '+ element_desc +'\
                                </span>\
                            </th>';
                
                var appender = $compile(element_template)($scope);
                angular.element(inScope).append(appender.clone());
            }
        }
    }
});

//----------------------------------------BANNER DIR-------------------------------------------------\\
app.directive("bannerDir", function($compile){
    var banner_template = ' <div class="banner_outer bg_opacity">\
                                <div class="banner_middle">\
                                    <span class="banner_text"> {{shorty}} </span>\
                                </div>\
                            </div> ';
    
    return{
        restrict: 'AEC',
        template: banner_template,
        scope : {
            active : '=?bind'
        },
        link : function($scope, $element){
            $scope.shorty = pc_short;
        }
    } 
});

//---------------------------------------FEEDBACK DIR------------------------------------------------\\
app.directive("feedback", function($compile){
    var comment = pc;
    
    var title_template = '<h2 class="{{home_welcome_class}} text-center" ng-model="title"> <span style="color:white;" class="p1"> What </span><span style="color:#a5efb6;" class="p2"> matters! </span></h2>';
    
    var gc = '<div class="box_align"></div>';
    
    var temp = '<div class="fb-wrapper">\
                    <section>\
                        <div class="fb-comment-wrapper">\
                            <span> <q><em> '+comment+' </em></q> </span>\
                        </div>\
                        <div class="fb-bottom">\
                            <cite>-Somebody famous</cite>\
                        </div>\
                    </section>\
                </div>';
    
    return {
        restrict : 'AEC',
        template : title_template + gc,
        scope    : {
            active   : '=?bind'
        },
        link : function($scope, $element){  
            $scope.ssection = temp.toString();
            var div = $element.find('div')[0];
            var appender = $compile($scope.ssection)($scope);
            for (var i = 0; i < 3; i++){
                angular.element(div).append(appender.clone());
            }
        }        
    }
});

//----------------------------------TEMPLATE STYLE BUTTON--------------------------------------------\\
app.directive("csbutton", function($compile){ 
    var template = '<button class="cs4-button" > {{cs4_button}} </button>';
    
    return{
        restrict : 'AEC',
        template : template,
        scope : {
            active : '=?bind'
        },
        link : function($scope, $element){
            $scope.cs4_button = "Get in touch";
            $scope.xl = false;
            if ($element.hasClass('xl-indicator'))
                $element.find('button').addClass('cs4-XL uppercase');
        }
    }
});