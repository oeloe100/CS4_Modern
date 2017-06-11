
//----BASE URL TO TEMPLATE----\\
var template_base = '/static/html/dir-html/';

//----------------------------------------PLACEHOLDER------------------------------------------------\\

var pc = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula egetdolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,sem. Nulla consequat massa quis enim.';

var pc_short = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula egetdolor. Aenean massa.';

//----------------------------------CACHE MODULE TO VARIABLE-----------------------------------------\\

var app = angular.module("Modern_Template", ["ngRoute"]);

//-------------------------------DONT GENERATE REJECTED PROMISES-------------------------------------\\

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

//-----------------------------------LOAD TEMPLATE ON ROUTE------------------------------------------\\

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

//-------------------------------RESPONSIVE BASED ON SCREEN SIZE-------------------------------------\\

app.run(['$window', '$rootScope', function($window, $rootScope) {
    SetResponsiveWindow($window, $rootScope);   
}]);

//------------------------------------HEADER/NAV CONTROLLER------------------------------------------\\

app.controller('header_controller', function($scope){
    HeaderController($scope);
    ClickRegister($scope);
});

//--------------------------------------SCROLL CONTROLLER--------------------------------------------\\

app.controller('scroll_controller', function($scope, $location, $anchorScroll){
    ScrollController($scope, $location, $anchorScroll);
});

//---------------------------------------ABOUT CONTROLLER--------------------------------------------\\

app.controller('about_controller', function($scope){
    AboutController($scope);
});

//---------------------------------------HOME CONTROLLER---------------------------------------------\\

app.controller('home_controller', function($scope, $document){  
    HomeController($scope);
    $scope.$on('directive.SB', function(item, index){
        $scope.active = index;
    });
});

//----------------------------------EXPAND ANIMATION CONTROLLER--------------------------------------\\

app.controller('expand_2bottom', function($scope, $element){
    Expand($scope, $element);
});

//------------------------------------PORTFOLIO PROPERTIES-------------------------------------------\\

app.controller('portfolio_hover', function($scope, $element){
    PH($scope, $element);
});

//--------------------------------------SECTION TITLE DIR--------------------------------------------\\

/*app.directive("sectionTitle", function($compile){  
    return{
        restrict : 'AE',
        templateUrl : template_base + 'section-title.pug',
        link : function($scope, $element){ 
            $scope.validColours = ColourCollection();
        }
    } 
});*/

//----------------------------------TEMPLATE STYLE BUTTON--------------------------------------------\\

app.directive("csbutton", function($compile){    
    return{
        restrict : 'AEC',
        templateUrl : template_base + 'csbutton.pug',
        scope : {
            active : '=?bind'
        },
        link : function($scope, $element){
            $scope.cs4_button = "Get in touch";
            $scope.xl = IsXL();
            if ($element.hasClass('xl-indicator') && $scope.xl === true)
                $element.find('button').addClass('cs4-XL uppercase');
        }
    }
});

//----------------------------------------SHOWCASE DIR-----------------------------------------------\\

app.directive("showcase", function($compile){    
    var section_template = '<table class="scroll-x"> <tr ng-include="about"></tr> </table>';
    
    return{
        restrict : 'E',
        template : section_template,
        scope : {
            active : '=?bind',
        },
        link : function($scope, $element){                                 
            $scope.element_desc = pc; 
            $scope.about = template_base + ShowcaseURL();
            $scope.sub_title = Subtitle_collection();
            
            $scope.array = [];
            SetArrayLength($scope.array);
        }
    }
});

function SetArrayLength(arr_){
    for (var i = 1; i < SetShowcaseLength(); i++){
        arr_.push(i);
    }
}

//----------------------------------------BANNER DIR-------------------------------------------------\\

app.factory('_HTML', function($http, $q){
    return promise = $http.get('/dir-banner').then(function(resp){ return resp.data });
});

app.controller('banner_controller', function($scope, $compile, $element, _HTML){
    SetBannerHTML($scope, $compile, $element, _HTML);
});

//--------------------------------------TOOLBOX SHOWCASE---------------------------------------------\\



//---------------------------------------FEEDBACK DIR------------------------------------------------\\

app.directive("feedback", function($compile){
    var outer = '<div ng-include="feedback" class="box_align"></div>';
    
    return {
        restrict : 'AECM',
        template : outer,
        link : function($scope, $element){
            $scope.comment = pc;
            $scope.feedback = template_base + FeedbackURL();
            
            $scope.array = [];
            Set_ArrayLength($scope.array);
        }
    }
});

function Set_ArrayLength(arr_){
    for (var i = 1; i < SetFeedbackLength(); i++){
        arr_.push(i);
    }
}