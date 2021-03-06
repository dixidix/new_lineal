mylsl.controller('import_controller', function ($rootScope, $cookies, $scope, $http, filterFilter, $uibModal) {
  'use strict';
  $('.import').hide();
  $('.sending').hide();


  $scope.popoverTemplateUrl = "./partials/popover_downloads.html";

  $scope.getDownloadLinks = function(docs){
    $rootScope.downloadLinks = {};
    $rootScope.downloadLinks = docs;
    console.log($rootScope.downloadLinks);
  };
  $scope.seeMoreInfo = function(impo){
    console.log(impo);
    $rootScope.seeMoreImport = impo;

    $uibModal.open({

      templateUrl: './partials/uibModal_see_more.html',

      controller: 'uibModal_see_more_client_import',

      scope: $scope

    })

    .result.then(function () {

    });
  }
  $scope.op_type = "2";
  $scope.search_text = "Buscar por...";
  $scope.search_enable = false;
  $scope.search_icon = "glyphicon glyphicon-search";
  $scope.enableSearch = function(){
    $scope.search_enable = !$scope.search_enable;
    if($scope.search_enable == true){
      $scope.search_text = "Cerrar Busqueda";
      $scope.search_icon = "glyphicon glyphicon-remove";
    }else {
      $scope.search_text = "Buscar por...";
      $scope.search_icon = "glyphicon glyphicon-search";
    }
  };
  //$scope.client_id = $cookies.get('client_id');
  $scope.client_id = localStorage.getItem('client_id');

  if ($rootScope.cp_operation != undefined) {
    $scope.op_type = $rootScope.cp_operation;
  }

  if ($rootScope.cp_client != undefined) {
    $scope.client_id = $rootScope.cp_client;
  }

  $http.get("./php/get_operations.php", {
    params: {
      client_id: $scope.client_id,
      op_type: $scope.op_type
    }
  }).then(function (response) {
    $scope.operations_imp = response.data.operations;
    $('.progress').hide();
    $('.import').fadeIn();
    $scope.currentPage = 1;
    $scope.totalItems = $scope.operations_imp.length;
  	$scope.entryLimit = 6; // items per page
  	$scope.noOfPages = 10;

  	// $watch search to update pagination
  	$scope.$watch('impo_search', function (newVal, oldVal) {
  		$scope.filtered = filterFilter($scope.operations_imp, newVal);
  		$scope.totalItems = $scope.filtered.length;
  		$scope.noOfPages = 10;
  		$scope.currentPage = 1;
  	}, true);
    $scope.operations_finished = filterFilter($scope.operations_imp, {operation_state:1});
    $scope.operations_in_progress = filterFilter($scope.operations_imp, {operation_state:0});
    $scope.operations_finished = $scope.operations_finished.length;
    $scope.operations_in_progress = $scope.operations_in_progress.length;
  });
  $scope.state = "";
  $scope.filterFinished = function(){
    $scope.state = $scope.state === 1 ? "" : 1;
  }
  $scope.filterInProgress = function(){
    $scope.state = $scope.state === 0 ? "" : 0;
  }
  $scope.today = new Date();

  $('.search_date').click(function() {
   $('.inp_date').toggleClass("show_input");
   $('.search_date').toggleClass("search_btn_show_inp");
   $('.inp_op').removeClass("show_input");
   $('.search_op').removeClass("search_btn_show_inp");
   $('.search_doc').removeClass("search_btn_show_inp");
   $('.inp_doc').removeClass("show_input");
 });
  $('.search_op').click(function() {
    $('.inp_op').toggleClass("show_input");
    $('.search_op').toggleClass("search_btn_show_inp");
    $('.search_date').removeClass("search_btn_show_inp");
    $('.inp_date').removeClass("show_input");
    $('.search_doc').removeClass("search_btn_show_inp");
    $('.inp_doc').removeClass("show_input");
  });
  $('.search_doc').click(function() {
   $('.inp_doc').toggleClass("show_input");
   $('.search_doc').toggleClass("search_btn_show_inp");
   $('.search_date').removeClass("search_btn_show_inp");
   $('.inp_date').removeClass("show_input");
   $('.inp_op').removeClass("show_input");
   $('.search_op').removeClass("search_btn_show_inp");
 });
});
mylsl.controller('uibModal_see_more_client_import', function (uploadService, $scope, $state, $http, $rootScope, $uibModalInstance,filterFilter) {
  'use strict';
  $scope.loading = false;

  $scope.actionTitle = "información adicional";

  $scope.seeMore = {
    fob_simi: $rootScope.seeMoreImport.fob_simi || "No Info.",
    fob_simi_currency: $rootScope.seeMoreImport.fob_simi_currency || "No Info.",
    fob_despacho: $rootScope.seeMoreImport.fob_despacho || "No Info.",
    fob_despacho_currency: $rootScope.seeMoreImport.fob_despacho_currency || "No Info.",
    condition: $rootScope.seeMoreImport.condition || "No Info.",
    agency_amount: $rootScope.seeMoreImport.agency_amount || "No Info.",
    forced_date: $rootScope.seeMoreImport.forced_date || "No Info."
  };
$scope.client_hide = true;
});