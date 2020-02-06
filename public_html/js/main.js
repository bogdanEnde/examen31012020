// JQUERY
var data;
var acierto;
var countAcierto = 0;
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
    $('#verResultados').on('click', function () {
        $("#zonaresultados").show();
        $("#zonatest").hide();
    });
    $('#verElegirNivel').on('click', function () {
        $("#zonatest").show();
        $("#zonaresultados").hide();
    });

    $('#facil, #medio, #dificil').on('click', function () {
        var tipoD = $(this).data('df');
        var bloque = "";
        var bloqueTitulo = '';
        var bloqueAciertos = "";
        var imgIndex = 1;
        var countNumeracio = 0;
        var iNumeros = 0;

        data.forEach(function (element) {

            if (element.tipo == tipoD) {

                countNumeracio++
                bloqueTitulo += '<div class="numeracion"data-' + iNumeros + '="' + iNumeros + '"><a>' + countNumeracio + '</a></div>';
                iNumeros++;
            }

        });
        $("#barraCirculos").html(bloqueTitulo);

        for (let index = 0; index < data.length; index++) {
            if (data[index].tipo == tipoD) {
                bloque += '<h2>imagen ' + imgIndex + ' de ' + countNumeracio + '</h2>'
                bloque += '<img src="' + data[index].imgAnimal + '" alt="">'
                bloque += '<br>'
                bloque += '<button data-pregutna="0" data-solucion="' + data[index].correcto + '"data-id="' + data[index].id + '" class="botonesRespuestas ' + data[index].id + '">' + data[index].R1 + '</button>'
                bloque += '<button data-pregutna="1"data-solucion="' + data[index].correcto + '"data-id="' + data[index].id + '" class="botonesRespuestas ' + data[index].id + '">' + data[index].R2 + '</button>'
                bloque += '<button data-pregutna="2" data-solucion="' + data[index].correcto + '"data-id="' + data[index].id + '" class="botonesRespuestas ' + data[index].id + '">' + data[index].R3 + '</button>'
                imgIndex++;
            }
        }
        $("#content").html(bloque);
        var contadorRespuestasTotales = 0;
        $('.botonesRespuestas').on('click', function () {
            acierto = false;
            var solucion = $(this).data('solucion');
            var respuesta = $(this).data('pregutna');
            var clasResp = $(this).data('id');
            
            contadorRespuestasTotales++;

            respuestaCheck(respuesta, solucion);
            if (acierto != false) {
                $(this).addClass("acierto");

                countAcierto++;
                if (contadorRespuestasTotales >= 5) {
                    bloqueAciertos += 'Has acertado ' + countAcierto + ' de ' + countNumeracio;
                    $("#totalAciertos").html(bloqueAciertos);
                }

                $("#barraCirculos").find("[data-" + clasResp + "=" + clasResp + "]").addClass("acierto");

            } else {
                $(this).addClass("error");
                $("#barraCirculos").find("[data-" + clasResp + "=" + clasResp + "]").addClass("error");

            }
            $(function () {
                $("button." + clasResp).attr("disabled", true);
            });


        });
        // $(".botonesRespuestas").on('click', { solucion: $(this).data('solucion'), respuesta: $(this).data('pregutna') }, check);
    });
});

function respuestaCheck(respuesta, solucion) {
    if (respuesta == solucion) {
        acierto = true;
    } else {
        acierto = false;
    }
}




var hola_angular = angular.module("hola_angular", []);

hola_angular.controller("controlador", function ($scope, $http) {
    var url = "json/animales.json";
    $http.get(url).success(function (response) {
        $scope.lista = response;
        console.log($scope.lista);
    });
});
