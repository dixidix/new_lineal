mylsl.controller('lineal_controller', function ($rootScope,filterFilter,$uibModal, $cookies, $scope, $http) {
  'use strict';
  $scope.today = new Date();
  $('#cpanel_lineal').hide();
  $('.sending').hide();  
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
  $http.get("./php/get_operations_lineal.php").then(function (response) {
    $scope.operation_lineal = response.data.op_lineal;
    $('.progress').hide();
    $('#cpanel_lineal').fadeIn();
    $scope.currentPage = 1;
    $scope.totalItems = $scope.operation_lineal.length;
    $scope.entryLimit = 8; // items per page
    $scope.noOfPages = 10;
    // $watch search to update pagination
    $scope.$watch('lineal_search', function (newVal, oldVal) {
      $scope.filtered = filterFilter($scope.operation_lineal, newVal);
      $scope.totalItems = $scope.filtered.length;
      $scope.noOfPages = 10;
      $scope.currentPage = 1;
    }, true);
    $scope.operations_finished = filterFilter($scope.operation_lineal, {operation_state:1});
    $scope.operations_in_progress = filterFilter($scope.operation_lineal, {operation_state:0});
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
  $scope.add_operation_lineal = function(){
    $uibModal.open({
      templateUrl: './partials/uibModal_add_operation_lineal.html',
      controller: 'uibModal_add_operation_lineal',
      scope: $scope
    })
    .result.then(function () {
    });
  };
  $scope.seeMoreInfo = function(lineal){
    $rootScope.seeMoreLsl = lineal;

    $uibModal.open({

      templateUrl: './partials/uibModal_see_more-lineal.html',

      controller: 'uibModal_see_more_lineal',

      scope: $scope

    })

    .result.then(function () {

    });
  }
  $scope.modifyLineal = function (modifyLineal) {
    $rootScope.linealEdit = modifyLineal;
    $uibModal.open({
      templateUrl: './partials/uibModal_add_operation_lineal.html',
      controller: 'uibModal_edit_operation_lineal',
      scope: $scope
    })
    .result.then(function () {
    });
  };
  $scope.deleteLineal = function (deleteLineal) {
    $rootScope.linealDelete = deleteLineal;
    $uibModal.open({
      templateUrl: './partials/uibModal_delete_lineal.html',
      controller: 'uibModal_delete_operation_lineal',
      scope: $scope
    })
    .result.then(function () {
    });
  };
});
mylsl.controller('uibModal_add_operation_lineal', function (uploadService2, $state, $rootScope,$uibModal,$uibModalInstance, $cookies, $scope, $http,filterFilter) {
  'use strict';
  $scope.actionTitle = "Agregar una operación de lineal";
  $scope.action = "Guardar";
  $scope.isEditing = false;
  $scope.loadResponsable = true;
  $scope.loadClient = true;
  $http.get('./php/get_users.php').then(function (response) {
   $scope.users = filterFilter(response.data.users, {clientId:'1'}, true);
   $scope.loadResponsable = false;
 });
  $http.get('./php/get_clients.php').then(function (response) {
    $scope.clients = response.data.clients;
    $scope.loadClient = false;
  });
  $scope.operation_lineal = {
    owner: "",
    ref_client:"",
    operation_number:"",
    merchandise:"",
    custom_document_djai:"",
    fob_simi_currency: "",
    fob_simi:"",
    expired_simi_day: "",
    expired_simi_month: "",
    expired_simi_year: "",
    shipment_origin_day: "",
    shipment_origin_month: "",
    shipment_origin_year: "",
    estimated_arrival_day: "",
    estimated_arrival_month: "",
    estimated_arrival_year: "",
    arrival_date_day: "",
    arrival_date_month: "",
    arrival_date_year: "",
    agency_amount:"",
    custom_document:"",
    fob_despacho_currency: "",
    fob_despacho:"",
    transport_lineal: "",
    condition: "",
    forced_day: "",
    forced_month: "",
    forced_year: "",
    release_date_day: "",
    release_date_month: "",
    release_date_year: ""
  };
  var ref_client = undefined;
  $scope.check_ref_client = function(){
    if($scope.operation_lineal.ref_client != ref_client &&  $scope.operation_lineal.ref_client != ""){
      $http.get("./php/check_ref_client.php", {
        params: {
          ref_client : $scope.operation_lineal.ref_client
        }
      }).then(function (response) {
        if(response.data == true){
          $scope.validate_ref_client = "el código de operación ya existe en el sistema";
          $('#imp_ref_client').focus();
          $('#submit_lineal').prop('disabled', true);
        }else {
          $scope.validate_ref_client = "";
          $('#submit_lineal').prop('disabled', false);
        }
      });
    }else {
      $scope.validate_ref_client = "";
      $('#submit_lineal').prop('disabled', false);
    }
  }
  $scope.create_lineal = function (){ 
    // $scope.loading = true;
    // $('.modal').css("overflow-y", "hidden");   
    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');
    $('.cpanelLineal').hide();
    $('.sending').fadeIn();
    $uibModalInstance.dismiss('cancel');
    $scope.operation_lineal.shipment_origin = $scope.operation_lineal.shipment_origin_year + "-" + $scope.operation_lineal.shipment_origin_month + "-" + $scope.operation_lineal.shipment_origin_day;
    $scope.operation_lineal.estimated_arrival = $scope.operation_lineal.estimated_arrival_year + "-" + $scope.operation_lineal.estimated_arrival_month + "-" + $scope.operation_lineal.estimated_arrival_day;
    $scope.operation_lineal.arrival_date = $scope.operation_lineal.arrival_date_year + "-" + $scope.operation_lineal.arrival_date_month + "-" + $scope.operation_lineal.arrival_date_day;
    $scope.operation_lineal.release_date = $scope.operation_lineal.release_date_year + "-" + $scope.operation_lineal.release_date_month + "-" + $scope.operation_lineal.release_date_day;
    $scope.operation_lineal.expired_simi = $scope.operation_lineal.expired_simi_year + "-" + $scope.operation_lineal.expired_simi_month + "-" + $scope.operation_lineal.expired_simi_day;
    $scope.operation_lineal.forced_date = $scope.operation_lineal.forced_year + "-" + $scope.operation_lineal.forced_month + "-" + $scope.operation_lineal.forced_day;

    $scope.operation_lineal.client_id = $('#select_client').val();
    $scope.operation_lineal.owner = $('#select_owner').val();
    $scope.operation_lineal.condition = $('#select_condition').val();
    $scope.operation_lineal.fob_simi_currency = $('#select_fob_simi').val() || "";
    $scope.operation_lineal.fob_despacho_currency = $('#select_fob_despacho').val() || "";

    $scope.operation_lineal.timeStamp = (new Date).getTime();
    var OpLineal = $scope.operation_lineal;
    uploadService2.newLineal(OpLineal).then(function (res) {
      $('.sending').hide();
      $('.import').fadeIn();
      $state.go($state.current, {}, {
        reload: true
      });
    }).finally(function(){
      $scope.loading = false;
    });
  };
});

mylsl.controller('uibModal_edit_operation_lineal', function (uploadService2, $state, $rootScope,$uibModal,$uibModalInstance, $cookies, $scope, $http, filterFilter) {
  'use strict';
  $scope.actionTitle = "Editar una Operación de Lineal";
  $scope.action = "Editar";
  $scope.isEditing = true;
  $scope.loadResponsable = true;
  $scope.loadClient = true;
  
  $http.get('./php/get_users.php').then(function (response) {
    $scope.users = filterFilter(response.data.users, {clientId:'1'});
    $scope.loadResponsable = false;
  });

  $http.get('./php/get_clients.php').then(function (response) {
    $scope.clients = response.data.clients;
    $scope.loadClient = false;
  });

  $scope.select_owner = $rootScope.linealEdit.ownerId;
  $scope.condition = $rootScope.linealEdit.condition;
  $scope.fob_simi_currency = $rootScope.linealEdit.fob_simi_currency;
  $scope.fob_despacho_currency = $rootScope.linealEdit.fob_despacho_currency;
  $scope.op_state = $rootScope.linealEdit.operation_state;


  if($rootScope.linealEdit.expired_simi != undefined && $rootScope.linealEdit.expired_simi != null){
    var expired_simi = $rootScope.linealEdit.expired_simi.split("-");
  } else {
    expired_simi[0] = "";
    expired_simi[1] = "";
    expired_simi[2] = "";
  }

  if($rootScope.linealEdit.shipment_origin != undefined && $rootScope.linealEdit.shipment_origin != null){
    var shipment_origin = $rootScope.linealEdit.shipment_origin.split("-");
  } else {
    shipment_origin[0] = "";
    shipment_origin[1] = "";
    shipment_origin[2] = "";
  }

  if($rootScope.linealEdit.estimated_arrival != undefined && $rootScope.linealEdit.estimated_arrival != null){
    var estimated_arrival = $rootScope.linealEdit.estimated_arrival.split("-");
  } else {
    estimated_arrival[0] = "";
    estimated_arrival[1] = "";
    estimated_arrival[2] = "";
  }


  if($rootScope.linealEdit.arrival_date != undefined && $rootScope.linealEdit.arrival_date != null){
    var arrival_date = $rootScope.linealEdit.arrival_date.split("-");
  } else {
    arrival_date[0] = "";
    arrival_date[1] = "";
    arrival_date[2] = "";
  }
  if($rootScope.linealEdit.forced_date != undefined && $rootScope.linealEdit.forced_date != null){
    var forced_date = $rootScope.linealEdit.forced_date.split("-");
  } else {
    forced_date[0] = "";
    forced_date[1] = "";
    forced_date[2] = "";
  }
  if($rootScope.linealEdit.release_date != undefined && $rootScope.linealEdit.release_date != null){
    var release_date = $rootScope.linealEdit.release_date.split("-");
  } else {
    release_date[0] = "";
    release_date[1] = "";
    release_date[2] = "";
  }

  $scope.operation_lineal = {
    ref_lsl: $rootScope.linealEdit.ref_lsl,
    ref_client: $rootScope.linealEdit.ref_client,
    operation_number: $rootScope.linealEdit.operation_number,
    merchandise: $rootScope.linealEdit.merchandise,
    custom_document_djai: $rootScope.linealEdit.custom_document_djai,
    fob_simi: $rootScope.linealEdit.fob_simi,
    expired_simi_day: parseInt(expired_simi[0]),
    expired_simi_month: parseInt(expired_simi[1]),
    expired_simi_year: parseInt(expired_simi[2]),
    shipment_origin_day: parseInt(shipment_origin[0]),
    shipment_origin_month: parseInt(shipment_origin[1]),
    shipment_origin_year: parseInt(shipment_origin[2]),
    estimated_arrival_day: parseInt(estimated_arrival[0]),
    estimated_arrival_month: parseInt(estimated_arrival[1]),
    estimated_arrival_year: parseInt(estimated_arrival[2]),
    arrival_date_day: parseInt(arrival_date[0]),
    arrival_date_month: parseInt(arrival_date[1]),
    arrival_date_year: parseInt(arrival_date[2]),
    agency_amount: $rootScope.linealEdit.agency_amount,
    custom_document: $rootScope.linealEdit.custom_document,
    fob_despacho: $rootScope.linealEdit.fob_despacho,
    transport_lineal: $rootScope.linealEdit.transport,
    forced_day: parseInt(forced_date[0]),
    forced_month: parseInt(forced_date[1]),
    forced_year: parseInt(forced_date[2]),
    release_date_day: parseInt(release_date[0]),
    release_date_month:parseInt(release_date[1]),
    release_date_year: parseInt(release_date[2])
  };


  $scope.create_lineal = function (){ 
    $('.cpanelLineal').hide();
    $('.sending').fadeIn();
    $uibModalInstance.dismiss('cancel');
    $scope.operation_lineal.shipment_origin = $scope.operation_lineal.shipment_origin_year + "-" + $scope.operation_lineal.shipment_origin_month + "-" + $scope.operation_lineal.shipment_origin_day;
    $scope.operation_lineal.estimated_arrival = $scope.operation_lineal.estimated_arrival_year + "-" + $scope.operation_lineal.estimated_arrival_month + "-" + $scope.operation_lineal.estimated_arrival_day;
    $scope.operation_lineal.arrival_date = $scope.operation_lineal.arrival_date_year + "-" + $scope.operation_lineal.arrival_date_month + "-" + $scope.operation_lineal.arrival_date_day;
    $scope.operation_lineal.release_date = $scope.operation_lineal.release_date_year + "-" + $scope.operation_lineal.release_date_month + "-" + $scope.operation_lineal.release_date_day;
    $scope.operation_lineal.expired_simi = $scope.operation_lineal.expired_simi_year + "-" + $scope.operation_lineal.expired_simi_month + "-" + $scope.operation_lineal.expired_simi_day;
    $scope.operation_lineal.forced_date = $scope.operation_lineal.forced_year + "-" + $scope.operation_lineal.forced_month + "-" + $scope.operation_lineal.forced_day;

    $scope.operation_lineal.client_id = $('#select_client').val();
    $scope.operation_lineal.owner = $('#select_owner').val();
    $scope.operation_lineal.condition = $('#select_condition').val();
    $scope.operation_lineal.fob_simi_currency = $('#select_fob_simi').val() || "";
    $scope.operation_lineal.fob_despacho_currency = $('#select_fob_despacho').val() || "";
    $scope.operation_lineal.op_state = $('#select_op_state').val();

    $scope.operation_lineal.timeStamp = (new Date).getTime();
    var OpLineal = $scope.operation_lineal;
    uploadService2.editLineal(OpLineal).then(function (res) {
      $('.sending').hide();
      $('.import').fadeIn();
      $state.go($state.current, {}, {
        reload: true
      });
    }).finally(function(){
      $scope.loading = false;
    });
  };
});
mylsl.controller('uibModal_delete_operation_lineal',  function ($state, $rootScope,$uibModal,$uibModalInstance, $cookies, $scope, $http) {
  'use strict';
  $scope.operation_lineal = {
    ref_lsl: $rootScope.linealDelete.ref_lsl
  };
  $scope.delete_operation = function () {
    $http({
      method: 'POST',
      url: './php/delete_operation_lineal.php',
      data: {
        ref_lsl: $scope.operation_lineal.ref_lsl
        }, //forms user object
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function (data) {
        if (data.errors) {
          // Showing errors.
          $scope.roleError = data.errors.roleError;
          $scope.passwordError = data.errors.passwordError;
          $scope.loginError = data.errors.loginError;
        } else {
          $state.go('mylsl.cpanel_lineal', {}, {reload: true});
        }
      });
    };
  });
mylsl.controller('uibModal_see_more_lineal', function (uploadService, $scope, $state, $http, $rootScope,$uibModal, $uibModalInstance,filterFilter) {
  'use strict';
  $scope.loading = false;

  $scope.actionTitle = "información adicional";

  $scope.seeMoreLineal = {
    transport: $rootScope.seeMoreLsl.transport || "No Info.",
    condition: $rootScope.seeMoreLsl.condition || "No Info.",
    forced_date: $rootScope.seeMoreLsl.forced_date || "No Info.",
    release_date: $rootScope.seeMoreLsl.release_date || "No Info."
  };
  $scope.client_hide = true;
});

mylsl.directive('uploaderModel', ["$parse", function ($parse) {
  'use strict';
  return {
    restrict: 'A',
    link: function (scope, iElement, iAttrs) {
      iElement.on("change", function (e) {
        $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
      });
    }
  };
}]);
mylsl.service('uploadService2', ["$http", "$q", function ($http, $q) {
  'use strict';

  this.newLineal = function (OpLineal) {
    var deferred = $q.defer();
    var formData = new FormData();

    formData.append("owner", OpLineal.owner);
    formData.append("ref_client", OpLineal.ref_client);
    formData.append("operation_number", OpLineal.operation_number);
    formData.append("merchandise", OpLineal.merchandise);
    formData.append("custom_document_djai", OpLineal.custom_document_djai);
    formData.append("fob_simi_currency", OpLineal.fob_simi_currency);
    formData.append("fob_simi", OpLineal.fob_simi);
    formData.append("expired_simi", OpLineal.expired_simi);
    formData.append("shipment_origin", OpLineal.shipment_origin);
    formData.append("estimated_arrival", OpLineal.estimated_arrival);
    formData.append("arrival_date", OpLineal.arrival_date);
    formData.append("agency_amount", OpLineal.agency_amount);
    formData.append("custom_document", OpLineal.custom_document);
    formData.append("fob_despacho_currency", OpLineal.fob_despacho_currency);
    formData.append("fob_despacho", OpLineal.fob_despacho);
    formData.append("transport_lineal", OpLineal.transport_lineal);
    formData.append("condition", OpLineal.condition);
    formData.append("forced_date", OpLineal.forced_date);
    formData.append("release_date", OpLineal.release_date);

    return $http.post("./php/new_operation_lineal.php", formData, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).success(function (res) {
      deferred.resolve(res);
    }).error(function (msg, code) {
      deferred.reject(msg);
    });
    return deferred.promise;
  };

  this.editLineal = function (OpLineal) {
    var deferred = $q.defer();
    var formData = new FormData();

    formData.append("owner", OpLineal.owner);
    formData.append("ref_client", OpLineal.ref_client);
    formData.append("ref_lsl", OpLineal.ref_lsl);
    formData.append("operation_number", OpLineal.operation_number);
    formData.append("merchandise", OpLineal.merchandise);
    formData.append("custom_document_djai", OpLineal.custom_document_djai);
    formData.append("fob_simi_currency", OpLineal.fob_simi_currency);
    formData.append("fob_simi", OpLineal.fob_simi);
    formData.append("expired_simi", OpLineal.expired_simi);
    formData.append("shipment_origin", OpLineal.shipment_origin);
    formData.append("estimated_arrival", OpLineal.estimated_arrival);
    formData.append("arrival_date", OpLineal.arrival_date);
    formData.append("agency_amount", OpLineal.agency_amount);
    formData.append("custom_document", OpLineal.custom_document);
    formData.append("fob_despacho_currency", OpLineal.fob_despacho_currency);
    formData.append("fob_despacho", OpLineal.fob_despacho);
    formData.append("transport_lineal", OpLineal.transport_lineal);
    formData.append("condition", OpLineal.condition);
    formData.append("forced_date", OpLineal.forced_date);
    formData.append("release_date", OpLineal.release_date);
    formData.append("op_type", OpLineal.op_type);
    formData.append("op_state", OpLineal.op_state);

    return $http.post('./php/edit_operation_lineal.php', formData, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).success(function (res) {
      deferred.resolve(res);
    }).error(function (msg, code) {
      deferred.reject(msg);
    });
    return deferred.promise;
  };
}]);