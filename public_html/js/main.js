// JQUERY
var data;
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

    $('#facil').on('click', function () {
        var tipoD = 0;
        var bloque = "";
        var imgIndex = 1;

        for (let index = 0; index < data.length; index++) {
            if (data[index].tipo == tipoD) {
                bloque += '<h2>imagen ' + imgIndex + ' de 5</h2>'
                bloque += '<img src="' + data[index].imgAnimal + '" alt="">'
                bloque += '<br>'
                bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas">' + data[index].R1 + '</button>'
                bloque += '<button data-pregutna="' + data[index].R2 + '"class="botonesRespuestas">' + data[index].R2 + '</button>'
                bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas">' + data[index].R3 + '</button>'
                imgIndex++;
            }
        }
        $("#content").html(bloque);
    });

    $('#medio').on('click', function () {
        var tipoD = 1;
        var bloque = "";
        var imgIndex = 1;

        for (let index = 0; index < data.length; index++) {
            if (data[index].tipo == tipoD) {
                bloque += '<h2>imagen ' + imgIndex + ' de 3</h2>'
                bloque += '<img src="' + data[index].imgAnimal + '" alt="">'
                bloque += '<br>'
                bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas">' + data[index].R1 + '</button>'
                bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas">' + data[index].R2 + '</button>'
                bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas">' + data[index].R3 + '</button>'
                imgIndex++;
            }
        }
        $("#content").html(bloque);
    });

    $('#dificil').on('click', function () {
        var tipoD = 2;
        var bloque = "";
        var imgIndex = 1;

        for (let index = 0; index < data.length; index++) {
            if (data[index].tipo == tipoD) {
                bloque += '<h2>imagen ' + imgIndex + ' de 2</h2>'
                bloque += '<img src="' + data[index].imgAnimal + '" alt="">'
                bloque += '<br>'
                bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas" >' + data[index].R1 + '</button>'
                bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas">' + data[index].R2 + '</button>'
                bloque += '<button data-pregutna="' + data[index].R2 + '" class="botonesRespuestas">' + data[index].R3 + '</button>'
                imgIndex++;
            }
        }
        $("#content").html(bloque);
    });
    $('.botonesRespuestas').on('click', function () {
 
        alert("ok");
        // alert($( ".btnR" ).data());
        // alert(this.val);
        // if($( ".btnR" ).data()==this.val){
        //     alert("d");
        // }
    });
});





var hola_angular = angular.module("hola_angular", []);

hola_angular.controller("controlador", function ($scope, $http) {
    var url = "json/animales.json";
    $http.get(url).success(function (response) {
        var lista = this;
        lista = response;
        console.log(lista);
    });
});


