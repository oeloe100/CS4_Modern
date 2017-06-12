function HeaderController($scope){
    var header_bInfo = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.";    
    $scope.banner_info = header_bInfo;
}

//------------------------------------SCROLL DOWN (IN PROGRESS)--------------------------------------\\

function ScrollController($scope, $location, $anchorScroll){
    $scope.setScroller = function(){
        $location.hash('scroll_anchor');
        $anchorScroll();
    }
}

//-----------------------------------------ABOUT CONTROLLER------------------------------------------\\

function AboutController($scope){
    $scope.about_welcome_class = "about_title";
    $scope.title = "About";
}

//-----------------------------------------HOME CONTROLLER-------------------------------------------\\

function HomeController($scope){
    $scope.placeHolder = pc;
    $scope.title_model_class = 'welcome_center';
    $scope.shorty = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula egetdolor. Aenean massa.";
}

//---------------------------------SWITCH MOBILE/TABLET > DESKTOP------------------------------------\\

function SetResponsiveWindow($window, $rootScope){
    //set window innerwidth at page load
    $rootScope.windowWidth = window.innerWidth / 2;
    MakeResponsive($rootScope);
    
    //when screen resizes -- set new innerwidth
    window.addEventListener('resize', function() {
        $rootScope.$apply(function() {
            $rootScope.windowWidth = window.innerWidth / 2;          
            MakeResponsive($rootScope);
        });
    });
}

function MakeResponsive($rootScope){
    if (window.innerWidth <= 720){
        $rootScope.isResponsive = true;
    }else{
        $rootScope.isResponsive = false;
    }
}

//----------------------------------EXPAND NAV WHILE RESPONSIVE--------------------------------------\\

function ClickRegister($scope){
    $scope.open_nav = function(){
        $scope.isNative = !$scope.isNative;
    }
}

//-----------------------------EXPAND ANIMATION CONTROLLER PROPERTIES--------------------------------\\

function Expand($scope, $element){
    var el_controller = $element;
    
    $scope.Expand = function(value){
        var el_2expand = el_controller.find('div')[value];
        angular.element(el_2expand)
            .addClass('layer_b_expanded');
    };
    
    $scope.Close = function(value){
        var el_2expand = el_controller.find('div')[value];
        angular.element(el_2expand)
            .removeClass('layer_b_expanded');
    };
}

//------------------------------------SET PORTFOLIO PROPERTIES---------------------------------------\\

function PH($scope, $element){
    var el = $element;
    var el_banner = angular.element(el).find('div')[2];
    
    $scope.exp = function(v){
        x = v +1;
        angular.element(el_banner).
        removeClass('pi_inner_banner_'+v+'');
        angular.element(el_banner).
        addClass('pi_inner_banner_'+x+'');
    };
    
    $scope.cls = function(v){
        x = v +1;
        angular.element(el_banner).
        removeClass('pi_inner_banner_'+x+'');
        angular.element(el_banner).
        addClass('pi_inner_banner_'+v+'');
    };
}

//--------------------------------------SET BANNER PROPERTIES----------------------------------------\\

function SetBannerHTML($scope, $compile, $element, _HTML){
    _HTML.then(function(data){ 
        $scope.data = data;
        
        var el = $element[0];
        var appender = $compile($scope.data)($scope);
        el.append(appender[0]);
    });
}

//-------------------------------------SET SHOWCASE PROPERTIES---------------------------------------\\

function SetShowcaseLength(){
    return 5;
}

function ShowcaseURL(){
    return 'showcase.pug';
}

function IsXL(){
    return true;
}

function Subtitle_collection(){
    return ['', 'Innovation', 'Clean Code', 'Great Service', 'Using the latest techniques'];
}

//-------------------------------------SET FEEDBACK PROPERTIES---------------------------------------\\

function SetFeedbackLength(){
    return 4;
}

function FeedbackURL(){
    return 'feedback.pug';
}

//-----------------------------------------FOR LATER USE---------------------------------------------\\

/*function ColourCollection(){
    return ['color:#d86c56;', 'color:#3d4154;', 'color:white;'];
}*/