    var app = angular.module("auraApp", ['ngRoute', 'angularUtils.directives.dirPagination']);
    app.controller("auraController", function ($scope, $http, $location) {

    const servidor = server;

    //obtener idioma desde URL
    $scope.idiomaURL = getParametroURL('lang');
    // ********** idioma **********************
    if ($scope.idiomaURL !== '') {
        localStorage.setItem('idioma', $scope.idiomaURL);
        console.log('idiomaURL en localStorage -->' + localStorage.getItem('idioma'));
    }

    $scope.idioma;
    console.log('idiomaRecuperado ' + localStorage.getItem('idioma'));
    var idiomaRecuperado = localStorage.getItem('idioma');
    if (idiomaRecuperado !== null) {
        $scope.idioma = idiomaRecuperado;
        console.log('idiomaLocalStorage: ' + $scope.idioma);
        //formulario
    } else {
        $scope.idioma = "es";
        console.log('idiomaDefault: ' + $scope.idioma);
    }
    //formulario
    console.log("scopeIdioma-->" + $scope.idioma);
    if ($scope.idioma == 'en') {
        $('#formularioES').css('display', 'none');
        console.log("entro al if Formulario");
    } if ($scope.idioma == 'es') {
        $('#formularioEN').css('display', 'none');
        console.log("entro al if Formulario");
    }

    // ********** consulta de datos ****************
    $scope.datos="";
    $scope.obtenerDatos = function (busqueda){
        $http.get(server+'/service/csgAura/contarDatos/'+busqueda)
        .then(function(response) {
            $scope.datos = response.data;
            console.log($scope.datos);
        }, function(response) {
            console.log('Error');
        });
    };

    $scope.busqueda = {
        "colorRomeo":"colorRomeo",
        "acceso":"acceso",
        "derechosExplotacion":"derechosExplotacion",
        "autoArchivo":"autoArchivo",
        "versionAutoarchivo":"versionAutoarchivo"
    }

    $scope.obtenerDatos($scope.busqueda.colorRomeo);
    console.log($scope.datos);

    $scope.myFunc = function (idioma) {
        console.log(total);
        $scope.total = total;
        $scope.idioma = idioma;
        console.log('prueba' + idioma);
        localStorage.setItem('idioma', idioma);
        console.log('guardoIdiomaLocalStorage--> ' + localStorage.getItem('idioma'));
        //$scope.colorIdioma(idioma);
        if (idioma == 'en') {
            $('#formularioES').css('display', 'none');
            $('#formularioEN').css('display', 'block');
        } if (idioma == 'es') {
            $('#formularioEN').css('display', 'none');
            $('#formularioES').css('display', 'block');

        }

        cargaGraficas();
        idiomaG = idioma;
        console.log('idiomaGra---'+idiomaG);
    };

    });

    function getParametroURL(parametro) {
    var parametros = window.parent.location.search.substring(1).split('&');
    for (var i = 0; i < parametros.length; i++) {
        if (parametros[i].indexOf(parametro + '=') != -1) {
            return decodeURI(parametros[i].split('=')[1]);
        }
    }
    return "";
    }

    var total= 0;
    var idiomaG = localStorage.getItem('idioma');

    var prueba = $.ajax({
        url     : server+'/service/csgAura/contarDatos/colorRomeo',
        type    : "get",
        dataType: "json",
        success : (function (data) {
            var suma = 0;
            for (var i = 0; i< data.length;i++) {
                suma = suma + data[i][1];
            }
            data.sort();
            var encabezado = ['Color', 'Total'];
            data.unshift(encabezado);
            colorRomeo = data;
            //console.log(colorRomeo);
            total = suma;
            $('.numero-registros').text(total);
          })
    });

    google.charts.load("current", {packages:["corechart", "table"]});
    google.charts.setOnLoadCallback(graficaColor);

    function graficaColor() {
        console.log('datoscolor->', colorRomeo);
    var cssClassNames = {
    'headerRow': 'backgroundCell',
    'oddTableRow': 'beige-background'};

    const Colors = [];
    var dataTable = new google.visualization.DataTable();
    if(idiomaG === 'en'){
        dataTable.addColumn('string', "Colours");
        dataTable.addColumn('number', "Total");
    }else {
        dataTable.addColumn('string', colorRomeo[0][0]);
        dataTable.addColumn('number', colorRomeo[0][1]);
    }

    let contador = 0;

    colorRomeo.forEach((element, index ) => {
        if(index > 0){
            
            if(element[0] === 'Azul'){
                dataTable.addRow([idiomaG === 'es' ? element[0] : 'Blue', element[1]]);
                    Colors.push('#29ABE2');
                } else
                if(element[0] === 'Blanco'){
                dataTable.addRow([idiomaG === 'es' ? element[0] : 'White', element[1]]);
                    Colors.push('#ffffff');
                } else
                // if(element[0] === 'Desconocido'){
                // dataTable.addRow([idiomaG === 'es' ? element[0] : 'Unknown', element[1]]);
                //     Colors.push('#141414');
                // } else
                if(element[0] === 'Verde'){
                dataTable.addRow([idiomaG === 'es' ? element[0] : 'Green', element[1]]);
                    Colors.push('#39B54A');
                }else 
                if(element[0] === 'Amarillo'){
                dataTable.addRow([idiomaG === 'es' ? element[0] : 'Yellow', element[1]]);
                    Colors.push('#FFFF00');
                }
        }
        contador++
    });
    var view = new google.visualization.DataView(dataTable);

    var optionsTable = {'height': '100%', 'width': '100%', 'cssClassNames': cssClassNames};

    var table = new google.visualization.Table(document.getElementById('tabla_color'));
    table.draw(view, optionsTable);

    var options = {
          //title: total + ' registros - Agrupados por color ROMEO',
          pieHole: .4,
          colors: Colors,
          pieSliceTextStyle: {color: 'black'},
          sliceVisibilityThreshold: .0001
        };

    var chart = new google.visualization.PieChart(document.getElementById('grafica_color'));
    chart.draw(view, options);  
    }

    $.ajax({
        url     : server+'/service/csgAura/contarDatos/acceso',
        type    : "get",
        dataType: "json",
        success : (function (data) {
            var dato1 = ['Acceso', 'Total'];
            //data.shift();
            datoDesconodico = data[0][1];
            //console.log(datoDesconodico);
            data.splice(0, 1,['Desconocido', datoDesconodico] );
            data.unshift(dato1);
            //console.log('acceso');
            //console.log(data);
            acceso = data;
          })
    });

    google.charts.setOnLoadCallback(graficaAcceso);

    function graficaAcceso() {
        console.log('accessooo', acceso);
    var cssClassNames = {
    'headerRow': 'backgroundCell',
    'oddTableRow': 'beige-background'};

    const Colors2 = [];
    var dataTable2 = new google.visualization.DataTable();
    if(idiomaG === 'en'){
        dataTable2.addColumn('string', "Access");
        dataTable2.addColumn('number', "Total");
    }else {
        dataTable2.addColumn('string', acceso[0][0]);
        dataTable2.addColumn('number', acceso[0][1]);
    }

    let contador = 0;

    acceso.forEach((element, index ) => {
        if(index > 0){
            
            if(element[0] === 'Desconocido'){
                dataTable2.addRow([idiomaG === 'es' ? element[0] : 'Unknown', element[1]]);
                    Colors2.push('#9F9F9F');
                } else
                if(element[0] === 'Gratuito'){
                dataTable2.addRow([idiomaG === 'es' ? element[0] : 'Free', element[1]]);
                    Colors2.push('#8CBC00');
                } else
                if(element[0] === 'Hibrido'){
                dataTable2.addRow([idiomaG === 'es' ? element[0] : 'Hybrid', element[1]]);
                    Colors2.push('#F7931E');
                // } else
                // if(element[0] === 'Verde'){
                // dataTable.addRow([idiomaG === 'es' ? element[0] : 'Restricted to subscribers', element[1]]);
                //     Colors2.push('#666666');
                // }else 
                // if(element[0] === 'Amarillo'){
                // dataTable.addRow([idiomaG === 'es' ? element[0] : 'Free after an embargo period', element[1]]);
                //     Colors2.push('#166822');
                }
        }
        contador++
    });

    var view = new google.visualization.DataView(dataTable2);

    var optionsTable = {'height': '100%', 'width': '100%', 'cssClassNames': cssClassNames};

    var table = new google.visualization.Table(document.getElementById('tabla_acceso'));
    table.draw(view, optionsTable);

    var options = {
           //title: total + ' registros - Agrupado por Acceso',
          pieHole: 0.5,
          colors:Colors2,
          pieSliceTextStyle: {color: 'black'},
          sliceVisibilityThreshold: .0001
        };

    var chart = new google.visualization.PieChart(document.getElementById('grafica_acceso'));
    chart.draw(view, options);  
    }

    $.ajax({
    url     : server+'/service/csgAura/contarDatos/derechosExplotacion',
    type    : "get",
    dataType: "json",
    success : (function (data) {
            var dato1 = ['Mención específica de derechos', 'Total'];
            data.unshift(dato1);
            //console.log('derechos');
            //console.log(data);
            derechosExplotacion = data;
          })
    });

    google.charts.setOnLoadCallback(graficaDerechos);

    function graficaDerechos() {
    var cssClassNames = {
    'headerRow': 'backgroundCell',
    'oddTableRow': 'beige-background'};

    const Colors3 = [];
    var dataTable3 = new google.visualization.DataTable();
    if(idiomaG === 'en'){
        dataTable3.addColumn('string', "Specific mention of right");
        dataTable3.addColumn('number', "Total");
    }else {
        dataTable3.addColumn('string', derechosExplotacion[0][0]);
        dataTable3.addColumn('number', derechosExplotacion[0][1]);
    }

    let contador = 0;

    derechosExplotacion.forEach((element, index ) => {
        if(index > 0){
            
            if(element[0] === 'Sí'){
                dataTable3.addRow([idiomaG === 'es' ? element[0] : 'Yes', element[1]]);
                    Colors3.push('#A3C933');
                } else
                if(element[0] === 'No'){
                dataTable3.addRow([idiomaG === 'es' ? element[0] : 'No', element[1]]);
                    Colors3.push('#495D0E');
                } 
                
        }
        contador++
    });
    var view = new google.visualization.DataView(dataTable3);

    var optionsTable = {'height': '100%', 'width': '100%', 'cssClassNames': cssClassNames};


    var table = new google.visualization.Table(document.getElementById('tabla_derechos'));
    table.draw(view, optionsTable);

    var options = {
          //title: total + ' regitros - Mención específica de derechos',
          pieHole: 0.5,
          colors: Colors3,
          pieSliceTextStyle: {color: 'black'},
          sliceVisibilityThreshold: .0001
        };

    var chart = new google.visualization.PieChart(document.getElementById('grafica_derechos'));
    chart.draw(view, options);  
    }

    $.ajax({
    url     : server+'/service/csgAura/contarDatos/autoArchivo',
    type    : "get",
    dataType: "json",
    success : (function (data) {
        //console.log("datos...2");
        //console.log(data);
        var dato1 = ['¿Permite el auto-archivo?', 'Total'];
        data.unshift(dato1);
        //console.log('acceso');
        //console.log(data);
        autoArchivo = data;+
        console.log("Auto Archivos", autoArchivo);
      })
    });

    google.charts.setOnLoadCallback(graficaAutoArchivo);

    function graficaAutoArchivo() {
    var cssClassNames = {
    'headerRow': 'backgroundCell',
    'oddTableRow': 'beige-background'};

    const Colors4 = [];
    var dataTable4 = new google.visualization.DataTable();
    if(idiomaG === 'en'){
        dataTable4.addColumn('string', "Specific mention of right");
        dataTable4.addColumn('number', "Total");
    }else {
        dataTable4.addColumn('string', autoArchivo[0][0]);
        dataTable4.addColumn('number', autoArchivo[0][1]);
    }

    let contador = 0;

    autoArchivo.forEach((element, index ) => {
        if(index > 0){
            
            if(element[0] === 'Sí en artículos OA de pago por publicación'){
                dataTable4.addRow([idiomaG === 'es' ? element[0] : 'Yes in pay-to-publish OA articles', element[1]]);
                    Colors4.push('#483D8B');
                } else
                if(element[0] === 'Sí'){
                dataTable4.addRow([idiomaG === 'es' ? element[0] : 'Yes', element[1]]);
                    Colors4.push('#4A55D2');
                } else
                if(element[0] === 'No se menciona'){
                dataTable4.addRow([idiomaG === 'es' ? element[0] : 'Not specified', element[1]]);
                    Colors4.push('#9370DB');
                }//else
                // if(element[0] === 'No'){
                // dataTable4.addRow([idiomaG === 'es' ? element[0] : 'No', element[1]]);
                //     Colors4.push('#B7BBED');
                // }
                
        }
        contador++
    });
    var view = new google.visualization.DataView(dataTable4);

    var optionsTable = {'height': '100%', 'width': '100%', 'cssClassNames': cssClassNames};

    var table = new google.visualization.Table(document.getElementById('tabla_autoarchivo'));
    table.draw(view, optionsTable);

    var options = {
          //title: total + ' registros - ¿Permite el auto-archivo?',
          pieHole: 0.5,
          colors:Colors4,
          pieSliceTextStyle: {color: 'black'},
          sliceVisibilityThreshold: .0001
        };

    var chart = new google.visualization.PieChart(document.getElementById('grafica_autoarchivo'));
    chart.draw(view, options);  
    }

    $.ajax({
        url     : server+'/service/csgAura/contarDatos/versionAutoarchivo',
        type    : "get",
        dataType: "json",
        success : (function (data) {
            console.log("dataVersionAUtoArchivo");
            console.log(data);
                    var dato1 = ['Agrupados segun versión de auto-archivo', 'Total'];
                    data.sort();
                    //console.log(data[1][1]);
                    dato = data[1][1];
                    var datoNinguno = data[0][1];
                    data.splice(0, 1,['Ninguno', datoNinguno] );
                    data[0][1] += dato;
                    //console.log(data[0]);
                    data.unshift(dato1);
                    data.splice(2, 1);
                    //console.log('versionAutoarchivo');
                    //console.log(data);
                    versionAutoarchivo = data;
                  })
        });

    google.charts.setOnLoadCallback(graficaVersion);

    function graficaVersion() {
    var cssClassNames = {
    'headerRow': 'backgroundCell',
    'oddTableRow': 'beige-background'};

    const Colors5 = [];
    var dataTable5 = new google.visualization.DataTable();
    if(idiomaG === 'en'){
        dataTable5.addColumn('string', "Classified by self-archive version");
        dataTable5.addColumn('number', "Total");
    }else {
        dataTable5.addColumn('string', versionAutoarchivo[0][0]);
        dataTable5.addColumn('number', versionAutoarchivo[0][1]);
    }

    let contador = 0;

    versionAutoarchivo.forEach((element, index ) => {
        if(index > 0){
            
            if(element[0] === 'Ninguno'){
                dataTable5.addRow([idiomaG === 'es' ? element[0] : 'Not specified', element[1]]);
                    Colors5.push('#99993D');
                } else
                if(element[0] === 'Post-print (versión editorial)'){
                dataTable5.addRow([idiomaG === 'es' ? element[0] : 'Post-print', element[1]]);
                    Colors5.push('#CB1111');
                } else
                if(element[0] === 'Pre-print (versión sin evaluar), Post-print (versión editorial)'){
                dataTable5.addRow([idiomaG === 'es' ? element[0] : 'Pre-print', element[1]]);
                    Colors5.push('#E57373');
                }
                
        }
        contador++
    });
    var view = new google.visualization.DataView(dataTable5);

    var optionsTable = {'height': '100%', 'width': '100%', 'cssClassNames': cssClassNames};

    var table = new google.visualization.Table(document.getElementById('tabla_version'));
    table.draw(view, optionsTable);

    var options = {
          //title: total + ' registros - Agrupados segun versión de auto-archivo',
          pieHole: 0.5,
          colors: Colors5,
          pieSliceTextStyle: {color: 'black'},
          sliceVisibilityThreshold: .0001
        };

    var chart = new google.visualization.PieChart(document.getElementById('grafica_version'));
    chart.draw(view, options);  
    }

    function cargaGraficas(){
    console.log('actulizarGraficas');
    google.charts.setOnLoadCallback(graficaColor);
    google.charts.setOnLoadCallback(graficaAcceso);
    google.charts.setOnLoadCallback(graficaDerechos);
    google.charts.setOnLoadCallback(graficaAutoArchivo);
    google.charts.setOnLoadCallback(graficaVersion);
    }