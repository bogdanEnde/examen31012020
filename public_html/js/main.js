// JQUERY
var data;
var acierto;

$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: 'json/animales.json',
        dataType: 'json',
        success: function (result) {
            //console.log(result);
            data = result;

            var newImg = "";

            $.each(result, function (i, data) {
                newImg += '<img src="' + data.imgAnimal + '" alt="">'
            });
            $("#barraImagenes").append(newImg);
        }
    });

    $('#verResultados').on('click', habilitarVerResultados);

    $("#cargarResultados").on('click', habilitarTablaResultados);

    $('#verElegirNivel').on('click', habilitarElegirNivel);

    // Crea las preguntas
    $('#facil, #medio, #dificil').on('click', function () {
        $('#totalAciertos').hide();
        var tipoD = $(this).data('df');
        var bloque = "";
        var bloqueTitulo = '';
        var imgIndex = 1;
        var countNumeracio = 0;
        var countNumeracioPreg = 0;
        var iNumeros = 0;
        var contadorRespuestasConTitulo = 0;

        //crea la numeracion de todas las preguntas por nivel de dificutlad 
        data.forEach(function (element) {
            if (element.tipo == tipoD) {
                countNumeracio++
                countNumeracioPreg++
                bloqueTitulo += '<div class="numeracion"data-' + iNumeros + '="' + iNumeros + '"><a href="#pregunta' + iNumeros + '">' + countNumeracio + '</a></div>';
                iNumeros++;
            }else{
                countNumeracio++
                
                bloqueTitulo += '<div class="numeracion mal">' + countNumeracio + '</a></div>';
            /*data-' + iNumeros + '="' + iNumeros + '"*/
            }
        });

        $("#barraCirculos").html(bloqueTitulo);
        var p=0;
        for (let index = 0; index < data.length; index++) {
            if (data[index].tipo == tipoD) {
                
                
                bloque += '<img id="pregunta'+p+'"src="' + data[index].imgAnimal + '" alt="">'
                bloque += '<br>'
                bloque += '<h2>' + imgIndex + '|' + countNumeracioPreg + '</h2>'
                bloque += '<div class="botonesRespuestasDiv">'
                bloque += '<button data-pregutna="0" data-orden="' + contadorRespuestasConTitulo + '"data-solucion="' + data[index].correcto + '"data-id="' + data[index].id + '" class="botonesRespuestas ' + data[index].id + '">' + data[index].R1 + '</button>'
                bloque += '<button data-pregutna="1"data-orden="' + contadorRespuestasConTitulo + '"data-solucion="' + data[index].correcto + '"data-id="' + data[index].id + '" class="botonesRespuestas ' + data[index].id + '">' + data[index].R2 + '</button>'
                bloque += '<button data-pregutna="2" data-orden="' + contadorRespuestasConTitulo + '"data-solucion="' + data[index].correcto + '"data-id="' + data[index].id + '" class="botonesRespuestas ' + data[index].id + '">' + data[index].R3 + '</button>'
                bloque += '</div>'
                bloque += '<br>'
                imgIndex++;
                contadorRespuestasConTitulo++;
                p++;
            }
        }
        $("#content").html(bloque);

        $('.botonesRespuestas').on('click', {
            contadorRespuestasTotales: 0,
            countAcierto: 0,
            bloqueAciertos: "",
            countNumeracio: countNumeracio,
            countNumeracioPreg:countNumeracioPreg
        }, comprobarRespuesta)
    });
});

//comprueba si la respuesta es correcta o no
function comprobarRespuesta(param) {
    acierto = false;
    var solucion = $(this).data('solucion');
    var respuesta = $(this).data('pregutna');
    var clasResp = $(this).data('id');
    var numeroRespuesta = $(this).data('orden');

    param.data.contadorRespuestasTotales++;

    respuestaCheck(respuesta, solucion);


    if (acierto != false) {
        $(this).addClass("acierto");

        param.data.countAcierto++;

        $("#barraCirculos").find("[data-" + numeroRespuesta + "=" + numeroRespuesta + "]").addClass("acierto");

    } else {
        $(this).addClass("error");
        $("#barraCirculos").find("[data-" + numeroRespuesta + "=" + numeroRespuesta + "]").addClass("error");

    }

    $(function () {
        if (param.data.contadorRespuestasTotales >= param.data.countNumeracioPreg) {
            param.data.bloqueAciertos += 'Has acertado ' + param.data.countAcierto + ' de ' + param.data.countNumeracio;
            $("#totalAciertos").html(param.data.countNumeracioPreg);
            $('#totalAciertos').show();
        }

        $("button." + clasResp).attr("disabled", true);
    });
}


//habilitar ver resultadoos y esconde los indices de los niveles
function habilitarVerResultados() {
    $("#tablaRespuestas").hide();
    $("#zonaresultados").show();
    $("#zonatest").hide();
    $('#barraCirculos').hide();
}
//habilita elegir nivel 
function habilitarElegirNivel() {
    $("#barraCirculos").html(bloqueTitulo);

    var bloqueTitulo="";
    $("#barraCirculos").html(bloqueTitulo);



    $("#content").html(bloque);

    $("#zonatest").show();
    $("#zonaresultados").hide();
    $('#barraCirculos').show();


    var bloque="";
    bloqueTitulo="";
   var countNumeracio = 0;
   var iNumeros = 0;

   data.forEach(function () {
       // if (element.tipo == tipoD) {
           countNumeracio++
           bloqueTitulo += '<div class="numeracion"data-' + iNumeros + '="' + iNumeros + '"><a href="#pregunta' + iNumeros + '">' + countNumeracio + '</a></div>';
           iNumeros++;
       // }
   });
   $("#barraCirculos").html(bloqueTitulo);
}
//mostrar tabla
function habilitarTablaResultados(){
    $("#tablaRespuestas").show();
}

//comprueba si la solucion es correcta
function respuestaCheck(respuesta, solucion) {
    if (respuesta == solucion) {
        acierto = true;
    } else {
        acierto = false;
    }
}


//angular

var hola_angular = angular.module("hola_angular", []);

hola_angular.controller("controlador", function ($scope, $http) {
    var url = "json/animales.json";
    $http.get(url).success(function (response) {
        $scope.lista = response;
        console.log($scope.lista);
    });
});
