(function () {
    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('AcAutocomplete', ['ngRoute'])
        .module('acAutocomplete', AcAutocomplete);



    AcAutocomplete.$inject = ['$location', '$route'];

    function AcAutocomplete($location, $route) {
        return {
            bindings:{
                searchByFunc: '&',
                inputText: '<',
                fieldsToShow: '=',
                result: '&',
                href:'='
            },
            template: '',
            controller: AcAutocompleteController,

            controllerAs: 'AcAutocompleteCtrl'
        };
    }


    AcAutocompleteController.$inject = ["$http", "$scope"];
    function AcAutocompleteController($http, $scope) {
        var vm = this;

        //vm.resultados = [];
        //vm.acItemListPanelSelected = 0;
        //var timeout = {};
        //vm.minInput = ($scope.minInput) ? $scope.minInput : 2;
        //
        //vm.over = false;
        //
        //// Cuando saco el mouse de la ventana, se tiene que ocultar la ventana
        //$element.bind('mouseleave', function () {
        //    vm.over = false;
        //    timeout = $timeout(AcUtilsGlobals.broadcastPanel, 1000);
        //});
        //
        //// El mouse arriba tiene que evitar que oculte la ventana
        //$element.bind('mouseover', function () {
        //    $timeout.cancel(timeout);
        //    vm.over = true;
        //});
        //
        //// Copio el objeto, si no lo copio y lo envio directo se borra del array original
        //vm.selectItem = function (i) {
        //    $scope.objeto = angular.copy(vm.resultados[i]);
        //    vm.over = false;
        //    AcUtilsGlobals.broadcastPanel();
        //};
        //
        //
        //// Mï¿½todo principal cuando tiene el foco o cuando presiona la tecla
        //$element.bind('keyup focus', function (event) {
        //    $timeout.cancel(timeout);
        //
        //    if ($element.val().length > vm.minInput) {
        //
        //        // Avisa a todos los paneles para que se oculten
        //        vm.over = false;
        //        AcUtilsGlobals.broadcastPanel();
        //
        //        // Consigo el servicio a partir del par?metro pasado en la directiva
        //        var myService = $injector.get($attrs.service);
        //
        //        if ($scope.func != undefined) {
        //            $injector.get($attrs.service)[$scope.func]($scope.params, $element.val(), function (data) {
        //                if (data.length > 0) {
        //
        //                    procesarRespuesta(data);
        //                }
        //            });
        //
        //        } else {
        //            // Invoco al evento genÃ©rico
        //            myService.getByParams($attrs.params, $element.val(), $attrs.exactMatch, function (data) {
        //                if (data.length > 0) {
        //                    procesarRespuesta(data);
        //                }
        //            });
        //        }
        //
        //
        //    } else {
        //        vm.over = false;
        //        AcUtilsGlobals.broadcastPanel();
        //    }
        //});
        //
        //function procesarRespuesta(data) {
        //
        //    vm.resultados = data;
        //    // Creo un random id para darle a la lista y que no tenga error con otros div de la aplicaci?n
        //    var id = Math.floor((Math.random() * 100000) + 1);
        //
        //    // Creo el contenedor de los items que devuelvo de la b?squeda.
        //    $element.after('<div class="ac-result-panel" id="panel-' + id + '"></div>');
        //
        //    // Obtengo a la lista y la guardo en una variable
        //    var lista = angular.element(document.querySelector('#panel-' + id));
        //
        //
        //    // Agrego un evento que cuando me voy de la lista espero un segundo y la remuevo
        //    lista.bind('mouseleave', function () {
        //        vm.over = false;
        //        timeout = $timeout(AcUtilsGlobals.broadcastPanel, 1000);
        //    });
        //
        //    // Agrego un evento que cuando estoy sobre la lista, no se oculte
        //    lista.bind('mouseover focus', function () {
        //        $timeout.cancel(timeout);
        //        vm.over = true;
        //    });
        //
        //    // Parseo la lista de columnas a mostrar en la lista
        //    var a_mostrar_columnas = $attrs.visible.split(',');
        //
        //    // Reviso la lista completa para saber que mostrar
        //    for (var i = 0; i < data.length; i++) {
        //        var columns = Object.keys(data[i]);
        //        var a_mostrar_text = '';
        //
        //        for (var x = 0; x < columns.length; x++) {
        //            for (var y = 0; y < a_mostrar_columnas.length; y++) {
        //                if (a_mostrar_columnas[y] == columns[x]) {
        //                    var base = ' ' + data[i][Object.keys(data[i])[x]];
        //                    a_mostrar_text = a_mostrar_text + base;
        //                }
        //            }
        //        }
        //        lista.append($compile('<div class="ac-item-list" ng-click="acSearchCtrl.selectItem(' + i + ')" ng-class="{\'ac-item-selected-list\': acSearchCtrl.acItemListPanelSelected == ' + i + '}">' + a_mostrar_text + '</div>')($scope));
        //    }
        //
        //
        //    // Selecciono Item de la lista
        //    // Me muevo para abajo en la lista
        //    if (event.keyCode == 40) {
        //        vm.acItemListPanelSelected = (vm.acItemListPanelSelected + 1 > data.length - 1) ? vm.acItemListPanelSelected : vm.acItemListPanelSelected + 1;
        //    }
        //
        //    // Me muevo para arriba en la lista
        //    if (event.keyCode == 38) {
        //        vm.acItemListPanelSelected = (vm.acItemListPanelSelected - 1 < 0) ? vm.acItemListPanelSelected : vm.acItemListPanelSelected - 1;
        //    }
        //
        //    // selecciono
        //    if (event.keyCode == 13) {
        //        vm.selectItem(vm.acItemListPanelSelected);
        //    }
        //
        //    // Agrego formatos bï¿½sicos para la lista
        //    lista.css('position', 'absolute');
        //    lista.css('top', ($element[0].offsetTop + $element[0].offsetHeight) + 'px');
        //    lista.css('left', $element[0].offsetLeft + 'px');
        //    lista.css('width', $element[0].offsetWidth + 'px');
        //    lista.css('max-width', $element[0].offsetWidth + 'px');
        //
        //
        //    // Me aseguro que no se oculte la lista
        //    vm.over = true;
        //}
        //
        //// Oculto la lista si no est? el mouse arriba y no tiene foco
        //AcUtilsGlobals.listenPanel(function () {
        //    if (vm.over) {
        //        return;
        //    }
        //    var control = angular.element(document.querySelectorAll('.ac-result-panel'));
        //    for (var i = 0; i < control.length; i++) {
        //        control[i].remove();
        //    }
        //});
    }

})();
