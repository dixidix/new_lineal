mylsl.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {  'use strict';  $locationProvider.html5Mode({    enabled: true,    requireBase: false  });  $urlRouterProvider.otherwise('www.linealsoluciones.com');  $stateProvider  .state('inicio', {      // url: '/',      templateUrl: 'mylsl/index.html'    })  .state('mylsl', {    url: '/',    templateUrl: './partials/mylsl.html'  })  .state('mylsl.download', {    controller: 'downloadCtrl'  })  .state('mylsl.import', {      // url: '/importaciones',      views: {        'content': {          templateUrl: './partials/impo.html'        }      }    })  .state('mylsl.cpanel.cp_import', {      // url: '/importaciones',      views: {        'cp_content': {          templateUrl: './partials/cp_impo.html'        }      }    })  .state('mylsl.import_temp', {      // url: '/importaciones',      views: {        'content': {          templateUrl: './partials/temp_impo.html'        }      }    })  .state('mylsl.cpanel.cp_import_temp', {      // url: '/importaciones',      views: {        'cp_content': {          templateUrl: './partials/cp_temp_impo.html'        }      }    })  .state('mylsl.bills', {      // url: '/exportaciones',      views: {        'content': {          templateUrl: './partials/bills.html'        }      }    })  .state('mylsl.cpanel.cp_bills', {      // url: '/importaciones',      views: {        'cp_content': {          templateUrl: './partials/cp_bills.html'        }      }    })  .state('mylsl.export', {      // url: '/exportaciones',      views: {        'content': {          templateUrl: './partials/expo.html'        }      }    })  .state('mylsl.cpanel.cp_export', {      // url: '/exportaciones',      views: {        'cp_content': {          templateUrl: './partials/cp_expo.html'        }      }    })  .state('mylsl.cpanel', {      // url: '/panel-de-control',      views: {        'content': {          templateUrl: './partials/cpanel.html'        }      }    })  .state('mylsl.new_export', {      // url: '/agregar-exportacion',      views: {        'content': {          templateUrl: './partials/new_export.html'        }      }    })  .state('mylsl.cpanel_users', {      // url: '/Administrar-usuarios',      views: {        'content': {          templateUrl: './partials/cpanel_users.html'        }      }    })  .state('mylsl.cpanel_clients', {      // url: '/Administrar-clientes',      views: {        'content': {          templateUrl: './partials/cpanel_clients.html'        }      }    })  .state('mylsl.cpanel_emails', {  // url: '/Administrar-emails',  views: {    'content': {      templateUrl: './partials/cpanel_emails.html'    }  }})  .state('mylsl.cpanel_lineal', {  // url: '/Administrar-emails',  views: {    'content': {      templateUrl: './partials/cpanel_lineal.html',      controller: 'lineal_controller'    }  }})  .state('mylsl.fares', {  // url: '/Administrar-emails',  views: {    'content': {      templateUrl: './partials/fares.html',      controller: 'fares_controller'    }  }})  .state('mylsl.videos', {  // url: '/Administrar-emails',  views: {    'content': {      templateUrl: './partials/videos.html',      controller: 'videos_controller'    }  }})  .state('mylsl.cpanel.cp_videos', {  // url: '/Administrar-emails',  views: {    'cp_content': {      templateUrl: './partials/cp_videos.html',    }  }})  .state('mylsl.cpanel.cp_fares', {  // url: '/Administrar-emails',  views: {    'cp_content': {      templateUrl: './partials/cp_fares.html'    }  }})  .state('mylsl.new_document', {      // url: '/agregar-documento',      views: {        'content': {          templateUrl: './partials/new_document.html'        }      }    })  // $urlRouterProvider.otherwise('/');});