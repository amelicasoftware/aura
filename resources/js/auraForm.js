var app = angular.module("auraApp", ['ngRoute', 'angularUtils.directives.dirPagination']);


app.controller("auraController", function ($window, $scope, $http, $location) {//agregué $window
    
    //obtiene la ip de servicio;
    const servidor = server;
    const idiomaJson = cargarJson;
    //idioma
    
    $scope.traducir = function (idioma) {
        $http({
            method: 'GET',
            url: idiomaJson+idioma+'.json'//url: '../aura/resources/js/json/'+idioma+'.json'
        }).then(function (data) {
            $scope.t = data.data;
            //console.log(data);
            // console.log('traduccion');
            // console.log($scope.t);
        }, function (error) {
            console.log("Error al cargar archivo Traducción");
        });
    }

    $scope.idioma;
   // console.log('idiomaRecuperado ' + localStorage.getItem('idioma'));
    var idiomaRecuperado = localStorage.getItem('idioma');
    if (idiomaRecuperado !== null) {
        $scope.idioma = idiomaRecuperado;
        //console.log('idiomaLocalStorage: ' + $scope.idioma);
    } else {
        $scope.idioma = "es";
       // console.log('idiomaDefault: ' + $scope.idioma);
    }
    //formulario
    //console.log("scopeIdioma-->" + $scope.idioma);
    if ($scope.idioma == 'en') {
        $scope.traducir('idiomaEn');
    } if ($scope.idioma == 'es') {
        $scope.traducir('idiomaEs');
    }

    $scope.myFunc = function (idioma) {
        $scope.idioma = idioma;
        //console.log('prueba' + idioma);
        localStorage.setItem('idioma', idioma);
        //console.log('guardoIdiomaLocalStorage--> ' + localStorage.getItem('idioma'));
        //$scope.colorIdioma(idioma);
        if (idioma == 'en') {
            $scope.traducir('idiomaEn');
        } if (idioma == 'es') {
            $scope.traducir('idiomaEs');
        }
    };
    
    //carga Paises desde la DB
    $scope.obtenerPaises = function () {
        $scope.paisesArray = [];
        $http({
            method: 'GET',
            url: servidor+'/service/csgAura/getPaises'
        }).then(function (response) {
            $scope.paises = response.data;
            for (let index = 0; index < $scope.paises.length; index++) {
               const cvePais = $scope.paises[index][0];
               const nomPais = $scope.paises[index][1];
               const tipo = $scope.paises[index][2];
               var arraynew = { cvepais: cvePais, nompais: nomPais, tpoingreso: tipo};
               $scope.paisesArray.push(arraynew);
            }
            //console.log($scope.paisesArray);            
        });
        //$scope.obtenerPaises2();
    }

    //carga Paises En
    $scope.obtenerPaisesEn = function () {
        $scope.paisesArray = [];
        $scope.paises =[
            [135, 'Afghanistan', 1], [1, 'Albania', 1], [2, 'Germany', 1], [3, 'Andorra', 1], [4, 'Angola', 1], [6, 'Antigua and Barbuda', 1], [5, 'Antarctica', 1], [7, 'Saudi Arabia', 1], [8, 'Algeria', 1], [9, 'Argentina', 1], [111, 'Armenia', 1], [10, 'Australia', 1],[11, 'Austria', 1], [136, 'Azerbaijan', 1], [12, 'Bahamas', 1], [13, 'Bangladesh', 1], [14, 'Barbados', 1], [137, 'Bahrain', 1], [16, 'Belize', 1], [138, 'Benin', 1], [17, 'Belarus', 1], [18, 'Myanmar', 1], [19, 'Bolivia', 1], [20, 'Bosnia and Herzegovina', 1],
            [131, 'Botswana', 1], [21, 'Brazil', 1], [140, 'Brunei', 1], [22, 'Bulgaria', 1], [112, 'Burkina Faso', 1], [141, 'Burundi', 1], [139, 'Bhutan', 1], [15, 'Belgium', 1], [167, 'Cape Verde', 1], [23, 'Cambodia', 1], [24, 'Cameroon', 1], [25, 'Canada', 1],[169, 'Chad', 1], [26, 'Chile', 1], [27, 'China', 1], [28, 'Cyprus', 1], [29, 'Vatican City', 1], [30, 'Colombia', 1], [31, 'Congo', 1], [32, 'Korea', 1], [121, 'South Korea', 1], [33, 'Costa Rica', 1], [99, 'Ivory Coast', 1], [34, 'Croatia', 1],
            [35, 'Cuba', 1], [170, 'Ivory Coast', 1], [36, 'Denmark', 1], [37, 'Ecuador', 1], [38, 'Egypt', 1], [39, 'El Salvador', 1], [105, 'United Arab Emirates', 1], [171, 'Eritrea', 1], [109, 'Scotland', 1], [40, 'Slovakia', 1], [41, 'Slovenia', 1], [42, 'Spain', 1], [206, 'Micronesia', 1], [43, 'United States', 1], [117, 'Estonia', 1], [180, 'Ethiopia', 1], [108, 'West Indies Federation', 1], [172, 'Fiji', 1], [44, 'Philippines', 1], [45, 'Finland', 1], [46, 'France', 1],
            [142, 'Gabon', 1], [113, 'Wales', 1], [143, 'Gambia', 1], [122, 'Georgia', 1], [47, 'Ghana', 1], [48, 'Gibraltar', 1], [49, 'Grenada', 1], [50, 'Greece', 1], [51, 'Greenland', 1], [52, 'Guatemala', 1], [53, 'Guyana', 1], [54, 'Guinea', 1], [144, 'Guinea-Bissau', 1], [55, 'Haiti', 1], [56, 'Netherlands', 1], [57, 'Honduras', 1], [58, 'Hong Kong', 1], [59, 'Hungary', 1], [60, 'India', 1], [61, 'Indonesia', 1], [62, 'Iraq', 1], [64, 'Ireland', 1], [63, 'Iran', 1],
            [182, 'Iceland', 1], [192, 'Solomon Islands', 1], [66, 'Israel', 1], [67, 'Italy', 1], [150, 'Libya', 1], [68, 'Jamaica', 1], [69, 'Japan', 1], [70, 'Jordan', 1], [199, 'Kazakhstan', 1], [127, 'Kenya', 1], [200, 'Kyrgyzstan', 1], [71, 'Kuwait', 1], [202, 'Latin Americanists', 1], [148, 'Lesotho', 1], [164, 'East Timor', 1], [147, 'Latvia', 1], [149, 'Liberia', 1], [151, 'Liechtenstein', 1], [152, 'Lithuania', 1], [153, 'Luxembourg', 1], [154, 'Madagascar', 1],
            [110, 'Malaysia', 1], [155, 'Malawi', 1], [157, 'Malta', 1], [156, 'Mali', 1], [203, 'Dominica', 1], [72, 'Morocco', 1], [159, 'Mauritius', 1], [158, 'Mauritania', 1], [160, 'Moldova', 1], [161, 'Mongolia', 1], [162, 'Montenegro', 1], [118, 'Mozambique', 1], [163, 'Myanmar', 1], [73, 'Mexico', 1], [74, 'Monaco', 1], [176, 'Namibia', 1], [75, 'Nepal', 1], [76, 'Nicaragua', 1], [178, 'Niger', 1], [77, 'Nigeria', 1], [96, 'Unknown', 1], [78, 'Norway', 1], [103, 'New Zealand', 1],
            [205, 'International Organization', 1], [114, 'Pakistan', 1], [102, 'Palestine', 1], [79, 'Panama', 1], [146, 'Papua New Guinea', 1], [80, 'Paraguay', 1], [177, 'Netherlands Antilles', 1], [101, 'Netherlands', 1], [81, 'Peru', 1], [82, 'Poland', 1], [83, 'Portugal', 1], [97, 'Puerto Rico', 1], [175, 'Qatar', 1], [84, 'United Kingdom', 1], [168, 'Central African Republic', 1], [98, 'Czech Republic', 1], [208, 'Cooperative Republic of Guyana', 1],
            [183, 'Laos', 1], [209, 'Sao Tome and Principe', 1], [85, 'Dominican Republic', 1], [107, 'Azerbaijan Republic', 1], [115, 'Benin Republic', 1], [204, 'Equatorial Guinea Republic', 1], [207, 'Kosovo Republic', 1], [128, 'Lebanon Republic', 1], [133, 'Macedonia Republic', 1], [201, 'Maldives Republic', 1], [129, 'Malta Republic', 1], [106, 'Serbia Republic', 1], [179, 'Rwanda', 1], [86, 'Romania', 1], [87, 'Russia', 1], [189, 'Samoa', 1], [188, 'Saint Kitts and Nevis', 1],
            [190, 'San Marino', 1], [116, 'Senegal', 1], [191, 'Sierra Leone', 1], [124, 'Singapore', 1], [120, 'Syria', 1], [193, 'Somalia', 1], [132, 'Sri Lanka', 1], [196, 'Eswatini', 1], [194, 'Sudan', 1], [104, 'South Africa', 1], [88, 'Sweden', 1], [89, 'Switzerland', 1], [126, 'Oman', 1], [195, 'Suriname', 1], [125, 'Thailand', 1], [100, 'Taiwan', 1], [123, 'Tanzania', 1], [145, 'Tajikistan', 1], [187, 'Timor-Leste', 1], [165, 'Togo', 1],
            [166, 'Tonga', 1], [90, 'Trinidad and Tobago', 1], [173, 'Turkmenistan', 1], [92, 'Turkey', 1], [91, 'Tunisia', 1], [119, 'Ukraine', 1], [174, 'Uganda', 1], [210, 'Comoros', 1], [93, 'Uruguay', 1], [134, 'Uzbekistan', 1], [94, 'Venezuela', 1], [184, 'Vietnam', 1], [185, 'Yemen', 1], [130, 'Yugoslavia', 1], [186, 'Zambia', 1], [95, 'Zimbabwe', 1]
        ]; 
        
        //ordenar alfabeticamente paises
        $scope.paises.sort(function(a, b) {
            var nameA = a[1].toLowerCase();
            var nameB = b[1].toLowerCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
        });
        
        for (let index = 0; index < $scope.paises.length; index++) {
            const cvePais = $scope.paises[index][0];
            const nomPais = $scope.paises[index][1];
            const tipo = $scope.paises[index][2];
            var arraynew = { cvepais: cvePais, nompais: nomPais, tpoingreso: tipo};
            $scope.paisesArray.push(arraynew);
        }
        //console.log($scope.paisesArray);
    }

    //obtener categoria db
    $scope.obtenerCategoria = function () {
        $scope.categorias = [];
        $http({
            method: 'GET',
            url: servidor+'/service/csgAura/getCatRevista'//'getCategtoria'
        }).then(function (response) {
            //$scope.categorias = response.data;
            $scope.categoriasArray = response.data;
            for (let index = 0; index < $scope.categoriasArray.length; index++) {
                var arraynew = {cveCategoria: $scope.categoriasArray[index][0],
                                nomCategoria: $scope.categoriasArray[index][1]};
                $scope.categorias.push(arraynew);
            }
            //console.log($scope.categorias);
        });
    }

    // //obtener categoria En
    $scope.obtenerCategoriaEn = function () {
        $scope.categorias = [];
        $scope.categoriasArray  = [[6,'Engineering',1],[7,'Experimental sciences',1],[4,'Health sciences',1],[2,'Humanities',1],[3,'Life sciences',1],[8,'Mathematics and physical sciences',1],[1,'Social sciences',1],[5,'Visual and performing arts',1]];
        for (let index = 0; index < $scope.categoriasArray.length; index++) {
            var arraynew = {cveCategoria: $scope.categoriasArray[index][0],
                            nomCategoria: $scope.categoriasArray[index][1]};
            $scope.categorias.push(arraynew);
        }
        // console.log($scope.categorias);
    }

    //obtener cargos Es
    $scope.obtenerCargo = function () {
        $scope.cargos = 'Administración,Apoyo académico,Apoyo editorial,Apoyo secretarial,Apoyo técnico,Asesor,Asesor técnico,Asistente de producción,Asistente editorial,Codirector,Coeditor,Coeditor Internacional,Comisión consultiva,Comité académico,Comité asesor,Comité científico,Comité Científico y Editorial,Comité de redacción,Comité editorial,Comité ejecutivo,Comité ético,Comité técnico,Consejo asesor,Consejo científico,Consejo Científico Internacional,Consejo Científico Nacional,Consejo de redacciónConsejo directivo,Consejo editorial,Consejo editorial consultivo,Consejo Editorial Internacional,Consejo Editorial Nacional,Consejo honorario,Consejo técnico,Consultor,Coordinación de comité editorial,Coordinador,Coordinador editorial,Corrección de abstracts,Corrección filológica,Corrector de estilo,Corrector de prueba,Corrector editorial,Cuerpo Editorial Científico,Cuidado de la edición impresa,Diagramación,Director,Director adjunto,Director asociado,Director científico,Director colegiado,Director editorial,Director ejecutivo,Director emérito,Director fundador,Director honorario,Diseñador,Diseñador web,Diseño y desarrollo de página web,Diseño y producción,Distribución,Docente Pre-Grado - Ex-Decano,Edición,Edición electrónica,Editor,Editor académico,Editor adjunto,Editor asociado,Editor científico,Editor de distribución,Editor de formato,Editor de la versión electrónica,Editor de redacción,Editor de sección,Editor delegado,Editor ejecutivo,Editor emérito,Editor en jefe,Editor general,Editor honorario,Editor técnico,Editor temático,Equipo editorial,Evaluador,Formación,Fotografía,Fundador,Gerente editorial,Gestión editorial,Maquetación,Mesa de redacción,Montaje,No se conoce,Presidente,Presidente de comité editorial,Presidente de consejo asesor,Presidente de consejo de redacción,Presidente del Consejo editorial,Presidente honorario,Producción editorial,Redacción,Representante legal,Responsable editorial,Secretario,Secretario de redacción,Secretario técnico,Soporte informático,Subdirector,Subeditor,Traductor,Vicepresidente,Vicesecretario,Vocal,Webmaster'.split(',');
    }

    //obtener cargos En
    $scope.obtenerCargoEn = function () {
        $scope.cargos = 'Academic committee, Academic editor, Advisory committee, Advisory council president, Advisory editorial board, Advisor, Associate director, Associate editor, Board of directors, Board member, Collegiate director, Consultant, Copy editor, Coordinator, Delegated editor, Designer, Deputy director, Deputy editor, Distribution, Distribution editor, Editorial assistant, Editorial board, Editorial board coordination, Editorial committee president, Editorial coordinator, Editorial director, Editorial management, Editorial proofreader, Editorial production, Editorial secretary, Editorial team, Editor, Editor-in-chief, Executive board, Executive director, Executive editor, Founder, Founding director, Honorary council, Honorary director, Honorary editor, Honorary president, International Editorial Board, International Scientific Council, Layout design, Legal representative, National Editorial Board, National Scientific Council, Photographer, Philological editing, President, Production assistant, Proofreader, Scientific Editorial Board, Scientific director, Scientific editor, Scientific committee, Secretary, Section editor, Technical advisor, Technical council, Technical editor, Technical secretary, Technical support, Thematic editor, Translator, Undergrad Professor - Former Dean, Vice president, Vice secretary, Web designer, Web design and development, Webmaster'.split(',');
    }

    //instituciones
    $scope.fetchUsers = function () {
        $scope.searchResult = [];
        if(!isUndefinedOrNull($scope.searchText) && !isValidData($scope.pais)){
            var searchText_len = $scope.searchText.trim().length;
            // Check search text length
            if (searchText_len > 3) {
                $http({
                    method: 'get',
                    url: servidor+'/service/csgAura/getInstitucion/'+$scope.pais+'/'+$scope.searchText
                    //data: { busqueda: $scope.searchText, cvePais: $scope.pais }
                }).then(function successCallback(response) {
                    $scope.searchResultA = response.data;
                    for (let index = 0; index < $scope.searchResultA.length; index++) {
                        const cveentint = $scope.searchResultA[index][0];
                        const nomentint = $scope.searchResultA[index][1];
                        var arraynew = { cveentint: cveentint, nomentint: nomentint};
                        $scope.searchResult.push(arraynew);
                    }
                    //console.log($scope.searchResult);
                });
            } else {
                $scope.searchResult = {};
            }
        }
    }

    // Set value to search box
    $scope.cveInstitucion;
    $scope.setValue = function (index, $event) {
        $scope.searchText = $scope.searchResult[index].nomentint;
        $scope.cveInstitucion = $scope.searchResult[index].cveentint;
        $scope.searchResult = {};
        $event.stopPropagation();
    }

    $scope.searchboxClicked = function ($event) {
        $event.stopPropagation();
    }

    $scope.containerClicked = function () {
        $scope.searchResult = {};
    }

    //indizaciones
    $scope.products = [];
    $scope.productsCve = [];
    $scope.productsCve2;
    $scope.addItem = function ($event) {
        if(!isValidData($scope.addText)){
            //console.log('indizacion->'+$scope.addText);
            $scope.products.push($scope.addText);
            $scope.productsCve.push($scope.addCve);
            $scope.productsCve2 = $scope.productsCve.toString();
            //console.log($scope.productsCve2);
            $scope.addText = '';
            $scope.searchText1 = '';
            $event.stopPropagation();
        }
    }
    $scope.removeItem = function (x) {
        //console.log('borras datos', x);
        $scope.products.splice(x, 1);
        $scope.productsCve.splice(x, 1);
        $scope.productsCve2 = $scope.productsCve;
        //console.log('3 '+$scope.productsCve2);
    }

    $scope.buscarIndizaciones = function () {
        $scope.searchResultIndizacion = [];
        var searchText_len = $scope.searchText1.trim().length;
        // Check search text length
        if (searchText_len > 3) {
            $http({
                method: 'POST',//es post
                url: servidor+'/service/csgAura/getIndizacion/'+$scope.searchText1
                //data: { searchText: $scope.searchText1, 'country_id': $scope.country }
            }).then(function successCallback(response) {
                $scope.searchResult1 = response.data;
                for (let index = 0; index < $scope.searchResult1.length; index++) {
                    var arraynew = {cveentinx: $scope.searchResult1[index][0],
                                    nomentinx: $scope.searchResult1[index][1],
                                    nompais: $scope.searchResult1[index][3]};
                    $scope.searchResultIndizacion.push(arraynew);
                }
                //console.log($scope.searchResultIndizacion);
            });
        } else {
            $scope.searchResult = {};
        }
    }

    // Set value to search box
    $scope.setValue1 = function (index, $event) {
        $scope.searchText1 = $scope.searchResultIndizacion[index].nomentinx; //searchResult1
        $scope.addText = $scope.searchResultIndizacion[index].nomentinx;     //searchResult1
        $scope.addCve = $scope.searchResultIndizacion[index].cveentinx;      //searchResult1
        //console.log($scope.searchResultIndizacion[index].cveentinx);
        $scope.searchResultIndizacion = {};                                  //searchResult1
        $event.stopPropagation();
    }

    $scope.searchboxClicked1 = function ($event) {
        $event.stopPropagation();
    }

    $scope.containerClicked1 = function () {
        $scope.searchResultIndizacion = {};      //searchResult1
    }

    //mostrar campos otro institución
    $scope.otroInstitucion = false;
    $scope.mostrarOtro = function ($event) {
        //console.log("valor check->" + $scope.otroInstitucion);
        $scope.searchText = '';
        $scope.cveInstitucion = '';
        jQuery('#institucion').prop('required', false);
    }
    //categoria  otro
    $scope.mostrarCategoriaOtro = false;
    $scope.categoriaRevistaV = function ($event) {
        if ($scope.categoriaRevista === 'Otro') {
            $scope.mostrarCategoriaOtro = true;
            $('#categoriaOtro').prop('required', true);
        } else {
            $scope.mostrarCategoriaOtro = false;
            $('#categoriaOtro').prop('required', false);
        }
        console.log('Holaa2')
        console.log('valor categoria: ' + $scope.categoriaRevista);
        console.log($scope.mostrarCategoriaOtro);
    }

    //licencia otro
    $scope.mostrarLicenciaPublicacionOtro = false;
    $scope.licenciaPublicacionV = function ($event) {
        if ($scope.licenciaPublicacion === 'Otro') {
            $scope.mostrarLicenciaPublicacionOtro = true;
        } else {
            $scope.mostrarLicenciaPublicacionOtro = false;
        }
        //console.log($scope.mostrarLicenciaPublicacionOtro);
    }
    //

    // *** permite: auto-archivo? ***
    //inician estos items status=deshabilitados
    $scope.mostrarAutoarchivo = true;
    $scope.opcionesAa1 = true;
    $scope.opcionesAa2 = true;
    $scope.mostrarAuto1 = true;
    $scope.mostrarAuto2 = true;
    $scope.mostrarAuto3 = true;
    $scope.mostrarAuto4 = true;
    $scope.selectDisabled = true;
    var elements = [];
    var cadena = '';
    $scope.obligatoria = false;
    $scope.ocultarAutoArchivo = function () {
        $scope.auto1 = "0";
        $scope.auto2 = "0";
        $scope.auto3 = "0";
        $scope.auto4 = "0";
        elements = [];
        //auto-archivo="No"; deshabilitar items
        if ($scope.autoArchivo === 'Sí' || $scope.autoArchivo === 'Sí en artículos OA de pago por publicación') {
            $scope.obligatoria = true;
        } else if($scope.autoArchivo === 'No' || $scope.autoArchivo === 'No se menciona'){
            $scope.obligatoria = false;
        }
        if(document.getElementById('autoArchivo').value== "No"){
            $scope.mostrarAutoarchivo = true;
            $scope.opcionesAa1 = true;
            $scope.opcionesAa2 = true;
            $scope.mostrarAuto1 = true;
            $scope.mostrarAuto2 = true;
            $scope.mostrarAuto3 = true;
            $scope.mostrarAuto4 = true;
            //resetear los valores auto-archivo(pre,post) 
            $('#versionDelAutoArchivo').val("");
            $scope.limpiarItems();
        }else{
            //habilitar items con estas etiquetas (auto-archivo != No)
            $scope.mostrarAutoarchivo = false;
            $scope.opcionesAa1 = false;
            $scope.opcionesAa2 = false;
            $scope.mostrarAuto1 = false;
            $scope.mostrarAuto2 = false;
            $scope.mostrarAuto3 = false;
            $scope.mostrarAuto4 = false;
            
        }
        $scope.decisionColor();
    }

    $scope.opcionesAutoArchivo1 = function(element, value){
        // console.log(element, value);
        // console.log($scope.auto1);
        if (element.auto1 === true) {
            $scope.mostrarAuto2 = true;
            elements.push('Pre-print (versión sin evaluar)')
        }
        if (element.auto1 === false) {
            $scope.mostrarAuto2 = false;
            elements[0] === 'Pre-print (versión sin evaluar)' ? elements.shift() : elements.pop();
        }
        $scope.decisionColor();      
    }

    $scope.opcionesAutoArchivo2 = function(element){
        if (element.auto2 === true) {
            $scope.mostrarAuto1 = true;
            elements.push('Pre-print (versión editorial)')
        }
        if (element.auto2 === false) {
            $scope.mostrarAuto1 = false;
            elements[0] === 'Pre-print (versión editorial)' ? elements.shift() : elements.pop();
        }
        $scope.decisionColor();
    }

    $scope.opcionesAutoArchivo3 = function(element){
        if (element.auto3 === true) {
            $scope.mostrarAuto4 = true;
            elements.push('Post-print (versión sin evaluar)')
        }
        if (element.auto3 === false) {
            $scope.mostrarAuto4 = false;
            elements[0] === 'Post-print (versión sin evaluar)' ? elements.shift() : elements.pop();
        }
        $scope.decisionColor();
    }
    $scope.opcionesAutoArchivo4 = function(element){
        if (element.auto4 === true) {
            $scope.mostrarAuto3 = true;
            elements.push('Post-print (versión editorial)')
        }
        if (element.auto4 === false) {
            $scope.mostrarAuto3 = false;
            elements[0] === 'Post-print (versión editorial)' ? elements.shift() : elements.pop();
        }
        $scope.decisionColor();
    }

    $scope.decisionColor = function(){
        const selectElement = document.getElementById('colorRomeo');       
        if (elements.length === 2) {
            selectElement.value = 'Verde';
            selectElement.style.color = "#155724";
            selectElement.style.background = "#d4edda";
            selectElement.style.borderColor = "#c3e6cb";
            elements.sort((a, b) => {
                if (a.includes("Pre") && !b.includes("Pre")) return -1; // "Pre" antes de "Post"
                if (b.includes("Pre") && !a.includes("Pre")) return 1;  // "Post" después de "Pre"
            });
            cadena = elements.join(", ");
        }else if ((elements.length === 1) && (elements[0].includes("Pos"))) {
            selectElement.value = 'Azul';
            selectElement.style.color = "#004085";
            selectElement.style.background = "#cce5ff";
            selectElement.style.borderColor = "#b8daff";
        }else if ((elements.length === 1) && (elements[0].includes("Pre"))) {
            selectElement.value = 'Amarillo';
            selectElement.style.color = "#856404";
            selectElement.style.background = "#fff3cd";
            selectElement.style.borderColor = "#ffeeba";
        }else if ((elements.length === 0 || $scope.autoArchivo === 'No' || $scope.autoArchivo === 'No se menciona') && $scope.autoArchivo != undefined) {
            selectElement.value = 'Blanco';
            selectElement.style.color = "#818182";
            selectElement.style.background = "#fefefe";
            selectElement.style.borderColor = "#fdfdfe";
        }
       
    }
    
    //limpia check y valor de autoArchivoMomento
    $scope.limpiarItems = function(){
        $scope.autoCuando1 = "0";
        $scope.autoCuando2 = "0";
        $scope.autoCuando3 = "0";
        $scope.autoCuando4 = "0";
        $scope.autoDonde1 = '0';
        $scope.autoDonde2 = '0';
        $scope.autoDonde3 = '0';
        $scope.autoAchivoDondeOtro = '0';
        $('#autoarchivoMomento').val("");
        $('#autoArchivoDondeOtro').val("");
        $('#autoarchivoDonde').val("");
        $scope.autoArchivoOtro();
        $scope.autoAchivoDondeOtro = false;
    }

    $scope.autoArchivoDondeOtro = false;
    $scope.autoArchivoOtro = function () {
        if ($scope.autoAchivoDondeOtro) {
            $scope.autoArchivoDondeOtro = false;
        } else {
            $scope.autoArchivoDondeOtro = true;
        }
        //console.log('valor check: ' + $scope.autoAchivoDondeOtro);
        //console.log($scope.autoArchivoDondeOtro);
    }


    //jquery
    $(document).ready(function () {
        //crea cadena de valores separados por coma
        $('[name="checks[]"]').click(function () {
            var arr = $('[name="checks[]"]:checked').map(function () {
                return this.value;
            }).get();
            var str = arr.join(', ');
            $('#arr').text(JSON.stringify(arr));
            $('#str').text(str);
            $('#autoarchivoMomento').val(str);//
        });
        //crear version-autoArchivo
        $('[name="checks2[]"]').click(function () {
            var arr = $('[name="checks2[]"]:checked').map(function () {
                return this.value;
            }).get();
            var str = "";
            (arr.length === 2 && cadena !='') ? str = cadena : str = arr.join(', ');
            $('#arr').text(JSON.stringify(arr));
            $('#str2').text(str);
            $('#versionDelAutoArchivo').val(str);
           // console.log($('#versionDelAutoArchivo').val());
        });
        // auto-archivoCuando
        $('[name="checksAutoarchivoDonde[]"]').click(function () {
            var arr = $('[name="checksAutoarchivoDonde[]"]:checked').map(function () {
                return this.value;
            }).get();
            var str = arr.join(', ');
            $('#arr').text(JSON.stringify(arr));
            $('#str1').text(str);
            $('#autoarchivoDonde').val(str);
        });
    });

    $issn_group = $(".checkIssn");
    //console.log($issn_group);
    $issn_group.prop('required', true);
    $('.checkIssn').blur(function () {
        // console.log($(this).attr("id"));
        // console.log($(this).val().length);
        if ($(this).val().length > 0) {
            $issn_group.prop('required', false);
        } else {
            $issn_group.prop('required', true);
        }
        validarIssn($(this).val(), $(this).attr("id"));
    });

    function validarIssn(issn, id) {
        //console.log('datos->' + issn + ' ' + id);
        if (issn.length > 0) {
            if (issn.length !== 9) {
                //console.log('valor invalido -->' + issn);
                $('#' + id).addClass('is-invalid');
            } else {
                //console.log('dato bueno');
                $('#' + id).removeClass('is-invalid');
                $('#' + id).addClass('is-valid');
                if (issn.indexOf("-") != -1) {
                    // console.log("Si tiene -");
                    // console.log('posicion--->' + issn.charAt(4));
                    if (issn.charAt(4) === "-") {
                        //console.log('posicion correcta');
                        $('#' + id).removeClass('is-invalid');
                        $('#' + id).addClass('is-valid');
                    } else {
                        //console.log('posicion invalida');
                        $('#' + id).addClass('is-invalid');
                    }
                } else {
                    //console.log('no tiene -');
                    $('#' + id).addClass('is-invalid');
                }
            }
            //console.log('datos->' + id + ' - '+issn);
            $.ajax({
                type: 'POST',//es POST
                url: servidor+'/service/csgAura/getIssn/'+id+'/'+issn, //,getIssn.php
                //data: { issn: issn, tabla: id },
                success: function (response) {
                    response = JSON.parse(response);
                    //console.log('respuesta: '+response);
                    //if (response === false) {
                    //validación, sí no exciste, regresa un campo vacio
                    if (response == "") {
                       // console.log('isss no existe');
                    } else {
                        //console.log('issn ya registrado');
                        //alert('El issn ingresado ya esta registrado');
                        swal({
                            title: "Estimado usuario:",
                            text: "ISSN ya registrado",
                            icon: "error",
                            showCancelButton: false,
                            showConfirmButton: true
                        }).then(function () {
                            $('#' + id).val('');
                            $('#' + id).addClass('is-invalid');
                            //window.location = "http://148.215.24.37/proyectoAura/aura/incluir-revista.html";
                        });
                    }
                }
            });
        }
    }

    $scope.guardarDatosPg = function(){
        //console.log(document.getElementById("formAura").value);
        if(document.getElementById("formAura").value){
            /*** Json Construction Revista(object) ***/
            //value check (view dinamic) 
            var nombreOtraInstitucion="";
            if($scope.otroInstitucion){
                $scope.nombreInstitucion="";
                $scope.claveInstitucion="";
                nombreOtraInstitucion=document.getElementById('otroNombreInstitucion').value;
            }
            if($scope.mostrarLicenciaPublicacionOtro){
                $scope.licenciaPublicacion=document.getElementById('licenciaPublicacionOtro').value;
            }

            var ubicacionDelAutoArchivo=""
            if($scope.autoAchivoDondeOtro && !isUndefinedOrNull($scope.autoAchivoDondeOtro)){
                if(document.getElementById('autoarchivoDonde').value.length>0)
                    ubicacionDelAutoArchivo=document.getElementById('autoArchivoDondeOtro').value+', ';//+', '
                else
                    ubicacionDelAutoArchivo=document.getElementById('autoArchivoDondeOtro').value;//+', '
            }
            var jsonData = {
                    "nombreRevista" : document.getElementById('nombreRevista').value,
                    "urlRevista" : document.getElementById('urlRevista').value,
                    "clavePais" : document.getElementById('pais').value,
                    //"nombreInstitucion" : $scope.searchText,//document.getElementById('institucion').value,
                    "claveIntitucion": $scope.cveInstitucion,//document.getElementById('cveInstitucion').value,
                    "tipoDeEditorial": document.getElementById('tipoEditorial').value,
                    "nombreOrgano": document.getElementById('organoDeExpresion1').value,
                    "issnTipoImpreso": document.getElementById('issnImpreso').value,
                    "issnTipoElectronico": document.getElementById('issnElectronico').value,
                    "issnTipoL": document.getElementById('issnL').value,
                    "tipoAcceso": document.getElementById('acceso').value,
                    "mesesDeEmbargo": document.getElementById('mesesEmbargo').value,
                    "claveCategoriaRevista": document.getElementById('categoriaRevista').value,
                    "derechoExplotacion": document.getElementById('derechosExplotacion').value,
                    "titularDerecho": document.getElementById('select-titular').value,
                    "ubicacionCopyrigth": document.getElementById('ubicacionMencionDerechos').value,
                    "urlMencionCopyrigth": document.getElementById('urlMencionDerechos').value,
                    "nombreLicenciaPublicacion": $scope.licenciaPublicacion,
                    "urlTiposLicencia": document.getElementById('urlTipoPublicacion').value,
                    "urlInstruccionDelAutor": document.getElementById('urlInstruccionAutor').value,
                    "opcionAutoArchivo": document.getElementById('autoArchivo').value,
                    //"versionDelAutoArchivo": document.getElementById('customRadio22').value, checar esta madre, csm el navajas
                    "versionDelAutoArchivo": document.getElementById('versionDelAutoArchivo').value, 
                    "autoArchivoDelMomento": document.getElementById('autoarchivoMomento').value, 
                    "ubicacionDelAutoArchivo": ubicacionDelAutoArchivo+document.getElementById('autoarchivoDonde').value, ///aqui
                    "colorDeRomeo": document.getElementById('colorRomeo').value,
                    "indizacionExtendida": $scope.productsCve2,//document.getElementById('listaIndizacion').value,//cambiar por $scope
                    "nombreDelContacto": document.getElementById('nombreResponsable').value,
                    "cargoDelContacto": document.getElementById('cargoResponsable').value,
                    "telefonoUsuario": document.getElementById('telefonoResponsable').value,
                    "emailUsuario": document.getElementById('emailResponsable').value,
                    "fechaDeRegistro":"",//set in service
                    "decripcionFuente":"",//se modifica después 
                    "estadoValidada":"0", 
                    "nombreOtraInstitucion": nombreOtraInstitucion,//formPagina[5].id
                    "claveAmeli":"",//se modifica después
                    "claveRedalyc":"",//se modifica después
                    "fechaUltimaActualizacion":"",//se modifica después
            };
            //console.log("Json que se guarda",jsonData);
            $scope.guardando=true;
            $http.post(
                servidor+'/service/csgAura/incluirRevista',//datosPagina
                jsonData
            ).then(function successCallback(response) {
                if(response.data=="1")
                    alert('El registro de su revista se ha realizado exitosamente');
                else
                    alert('Error al registrar');
                $('#formAura').val(false);
                $window.location.href = './index.html';
            }, function errorCallback(response) {
                console.log(response);
                alert('Error al registrar');
                $window.location.href = './index.html';
            });
        }
    }

    $('#emailResponsable').on('keyup', function () {
        var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
        if (regex.test($('#emailResponsable').val())) {
            $('#emailResponsable').addClass('is-valid');
            $('#emailResponsable').removeClass('is-invalid');
        } else {
            $('#emailResponsable').addClass('is-invalid');
        }
    });

    function isValidData(val){
        return angular.isUndefined(val) || val === null || val.length==0
    }

    function isUndefinedOrNull(val){
        return angular.isUndefined(val) || val === null 
    }

});
//http (ur,data,[headers])
//headers: {
//    'Content-Type': 'application/json; charset=utf-8'
//}
//document.querySelector("#sign-up").addEventListener("submit", createAccount, false);
//document.getElementById("myForm").action = "/action_page.php";
//https://codeday.me/es/qa/20181216/23209.html