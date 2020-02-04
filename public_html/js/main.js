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
        var bloqueTitulo='';
        var imgIndex = 1;
        var count = 0;

        data.forEach(function (element) {
            if (element.tipo == tipoD) { 
                count++ 
                bloqueTitulo += '<h2 class="numeracion"> ' + count + '</h2>';
            }
        });
        $("#prueba").html(bloqueTitulo);

        for (let index = 0; index < data.length; index++) {
            if (data[index].tipo == tipoD) {
                bloque += '<h2>imagen ' + imgIndex + ' de ' + count + '</h2>'
                bloque += '<img src="' + data[index].imgAnimal + '" alt="">'
                bloque += '<br>'
                bloque += '<button data-pregutna="0" data-solucion="' + data[index].correcto + '"data-id="' + data[index].id + '" class="botonesRespuestas ' + data[index].id + '">' + data[index].R1 + '</button>'
                bloque += '<button data-pregutna="1"data-solucion="' + data[index].correcto + '"data-id="' + data[index].id + '" class="botonesRespuestas ' + data[index].id + '">' + data[index].R2 + '</button>'
                bloque += '<button data-pregutna="2" data-solucion="' + data[index].correcto + '"data-id="' + data[index].id + '" class="botonesRespuestas ' + data[index].id + '">' + data[index].R3 + '</button>'
                imgIndex++;
            }
        }
        $("#content").html(bloque);
        $('.botonesRespuestas').on('click', function () {
            acierto = false;
            var solucion = $(this).data('solucion');
            var respuesta = $(this).data('pregutna');
            var clasResp = $(this).data('id');
            check(respuesta, solucion, clasResp);
            if (acierto != false) {
                $(this).addClass("acierto")
            } else {
                $(this).addClass("error")
            }
            $(function () {
                $("button." + clasResp).attr("disabled", true);
            });
        });


        // $(".botonesRespuestas").on('click', { solucion: $(this).data('solucion'), respuesta: $(this).data('pregutna') }, check);

    });
    // $('#facil').on('click', function () {
    //     var tipoD = 0;
    //     var bloque = "";
    //     var imgIndex = 1;

    //     for (let index = 0; index < data.length; index++) {
    //         if (data[index].tipo == tipoD) {
    //             bloque += '<h2>imagen ' + imgIndex + ' de 5</h2>'
    //             bloque += '<img src="' + data[index].imgAnimal + '" alt="">'
    //             bloque += '<br>'
    //             bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas">' + data[index].R1 + '</button>'
    //             bloque += '<button data-pregutna="' + data[index].R2 + '"class="botonesRespuestas">' + data[index].R2 + '</button>'
    //             bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas">' + data[index].R3 + '</button>'
    //             imgIndex++;
    //         }
    //     }
    //     $("#content").html(bloque);
    //     $('.botonesRespuestas').on('click', function () {check();});
    // });

    // $('#medio').on('click', function () {
    //     var tipoD = 1;
    //     var bloque = "";
    //     var imgIndex = 1;

    //     for (let index = 0; index < data.length; index++) {
    //         if (data[index].tipo == tipoD) {
    //             bloque += '<h2>imagen ' + imgIndex + ' de 3</h2>'
    //             bloque += '<img src="' + data[index].imgAnimal + '" alt="">'
    //             bloque += '<br>'
    //             bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas">' + data[index].R1 + '</button>'
    //             bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas">' + data[index].R2 + '</button>'
    //             bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas">' + data[index].R3 + '</button>'
    //             imgIndex++;
    //         }
    //     }
    //     $("#content").html(bloque);
    //     $('.botonesRespuestas').on('click', function () {check();});
    // });

    // $('#dificil').on('click', function () {
    //     var tipoD = 2;
    //     var bloque = "";
    //     var imgIndex = 1;

    //     for (let index = 0; index < data.length; index++) {
    //         if (data[index].tipo == tipoD) {
    //             bloque += '<h2>imagen ' + imgIndex + ' de 2</h2>'
    //             bloque += '<img src="' + data[index].imgAnimal + '" alt="">'
    //             bloque += '<br>'
    //             bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas" >' + data[index].R1 + '</button>'
    //             bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas">' + data[index].R2 + '</button>'
    //             bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas">' + data[index].R3 + '</button>'
    //             imgIndex++;
    //         }
    //     }
    //     $("#content").html(bloque);
    //     $('.botonesRespuestas').on('click', function () {check();});

    // });
});
function check(respuesta, solucion, clasResp) {
    console.log(respuesta + ' & ' + solucion + ' & ' + clasResp);
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
        var lista = this;
        lista = response;
        console.log(lista);
    });
});
