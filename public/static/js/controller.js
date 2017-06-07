function HeaderController($scope){
    var header_bInfo = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.";    
    $scope.banner_info = header_bInfo;
}

function ScrollController($scope, $location, $anchorScroll){
    $scope.setScroller = function(){
        $location.hash('scroll_anchor');
        $anchorScroll();
    }
}

function AboutController($scope){
    $scope.title = "About"
    $scope.about_welcome_class = "about_title"
}

function HomeController($scope){
    $scope.placeHolder = pc;
    
    $scope.shorty = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula egetdolor. Aenean massa.";
    
    $scope.title_model_class = 'welcome_center';
}

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

function ClickRegister($scope){
    $scope.open_nav = function(){
        $scope.isNative = !$scope.isNative;
    }
}

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