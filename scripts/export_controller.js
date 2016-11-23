mylsl.controller('export_controller', function ($rootScope, $cookies, $scope, $http, filterFilter) {
  'use strict';
  $('.export').hide();
  $('.sending').hide();
  $scope.links = [
  {
    label: 'Link 1',
    title: 'Link 1 title',
    content: 'Link 1 content',
    img: 'img1.jpg'
  },
  {
    label: 'Link 2',
    title: 'Link 2 title',
    content: 'Link 2 content',
    img: 'img2.jpg'
  },
  {
    label: 'Link 3',
    title: 'Link 3 title',
    content: 'Link 3 content',
    img: 'img3.jpg'
  }   
  ]; 
  $scope.popoverTemplateUrl = "./partials/popover_downloads.html";

  $scope.getDownloadLinks = function(docs){
    $rootScope.downloadLinks = {};
    $rootScope.downloadLinks = docs;
    console.log($rootScope.downloadLinks);
  };
  $scope.op_type = "1";
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
  if($rootScope.cp_operation != undefined){
    $scope.op_type =  $rootScope.cp_operation;
  }
  if($rootScope.cp_client != undefined){
    $scope.client_id =  $rootScope.cp_client;
  }
  $http.get("./php/get_operations.php", {
    params: {
      client_id: $scope.client_id,
      op_type: $scope.op_type
    }
  }).then(function (response) {
    $scope.operations_exp = response.data.operations;
    $('.progress').hide();
    $('.export').fadeIn();
    $scope.currentPage = 1;
    $scope.totalItems = $scope.operations_exp.length;
  	$scope.entryLimit = 10; // items per page
  	$scope.noOfPages = 10;
  	// $watch search to update pagination
  	$scope.$watch('expo_search', function (newVal, oldVal) {
  		$scope.filtered = filterFilter($scope.operations_exp, newVal);
  		$scope.totalItems = $scope.filtered.length;
  		$scope.noOfPages = 10;
  		$scope.currentPage = 1;
  	}, true);
    $scope.operations_finished = filterFilter($scope.operations_exp, {operation_state:1});
    $scope.operations_in_progress = filterFilter($scope.operations_exp, {operation_state:0});
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

