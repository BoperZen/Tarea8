function MensajeTipoSeguro() {
    var seguro = document.getElementById("seguro");
    var tipoSeguro = seguro.options[seguro.selectedIndex].text;
    
    var mensaje = "";
    switch(seguro.value) {
        case "10.45":
            mensaje = "Protección Básica Obligatoria (PBO)\nCubre la Protección Básica Obligatoria y daños a vehículos terceros involucrados en un accidente de tránsito.\nCosto de alquiler diario: $ 10.45 por día.";
            break;
        case "15.50":
            mensaje = "Protección Extendida de Daños(PED)\nCubre la Protección Básica Obligatoria (PBO) más daños a propiedades de terceros, incendio e inundaciones.\nCosto de alquiler diario: $ 15.50 por día.";
            break;
        case "18.25":
            mensaje = "Protección Gasto Médicos(PGM)\nCubre la Protección Extendida de Daños(PED) más gastos médicos para los ocupantes del vehículo.\nCosto de alquiler diario: $ 18.25 por día.";
            break;
    }
    alert(mensaje);
}

$(document).ready(function() {
    // Establecer fecha actual en fecha de retiro
    var hoy = new Date();
    var fechaHoy = hoy.getFullYear() + '-' + 
                   String(hoy.getMonth() + 1).padStart(2, '0') + '-' + 
                   String(hoy.getDate()).padStart(2, '0');
    $('input[name="fechaRetiro"]').val(fechaHoy);
    
    $('.botones').click(function() {
        if ($(this).val() === 'Calcular') {
            calcular();
        } else if ($(this).val() === 'Guardar') {
            guardarQuote();
        }
    });
    
    $('input[name="fechaRetiro"], input[name="fechadevolucion"]').change(function() {
        calcularDias();
        calcular();
    });
    
    $('#tipoVehiculo, #seguro').change(function() {
        calcular();
    });
});

function calcularDias() {
    var fechaRetiro = new Date($('input[name="fechaRetiro"]').val());
    var fechaDevolucion = new Date($('input[name="fechadevolucion"]').val());
    
    if (fechaRetiro && fechaDevolucion && fechaDevolucion > fechaRetiro) {
        var diferencia = fechaDevolucion.getTime() - fechaRetiro.getTime();
        var dias = Math.ceil(diferencia / (1000 * 3600 * 24));
        $('input[name="dias"]').val(dias);
        return dias;
    } else if (fechaDevolucion <= fechaRetiro) {
        alert("Los días no son correctos, si el total de días no está entre 3 y 365 días.");
        $('input[name="dias"]').val('');
        return 0;
    }
    return 0;
}

function calcular() {
    var dias = calcularDias();
    
    if (dias < 3 || dias > 365) {
        alert("Los días no son correctos, si el total de días no está entre 3 y 365 días.");
        return;
    }
    
    var tipoVehiculo = parseFloat($('#tipoVehiculo').val());
    var seguro = parseFloat($('#seguro').val());
    
    var TD = tipoVehiculo + seguro;
    var TDV = TD;
    
    if (dias >= 3 && dias < 120) {
        TDV = TD * 0.85;
    } else if (dias >= 120 && dias <= 365) {
        TDV = TD * 0.75;
    }
    
    var nacionalidad = $('#nacionalidad').val();
    var paisInfo = $('#nacionalidad option:selected');
    var region = paisInfo.data('region');
    
    var TDS = TDV;
    
    if (region === 'Americas') {
        TDS = TDV * 0.90;
    } else if (region === 'Europe') {
        TDS = TDV * 0.90;
    } else if (region === 'Africa') {
        TDS = TDV * 0.95;
    }
    
    var TP = TDS * dias;
    var CD = TP / dias;
    var Desc = ((TDV - TDS) / TDV);
    
    var totalPagar = (TD * CD) + ((TD * CD) * Desc);
    
    $('input[name="td"]').val('$' + TDS.toFixed(2));
    $('input[name="totalPagar"]').val('$' + totalPagar.toFixed(2));
}

function guardarQuote() {
    var fechaRetiro = $('input[name="fechaRetiro"]').val();
    var fechaDevolucion = $('input[name="fechadevolucion"]').val();
    var nacionalidad = $('#nacionalidad').val();
    var tipoVehiculo = $('#tipoVehiculo option:selected').text();
    var seguro = $('#seguro option:selected').text();
    var dias = $('input[name="dias"]').val();
    var tarifaDiaria = $('input[name="td"]').val();
    var totalPagar = $('input[name="totalPagar"]').val();
    
    var quote = {
        fechaRetiro: fechaRetiro,
        fechaDevolucion: fechaDevolucion,
        nacionalidad: nacionalidad,
        tipoVehiculo: tipoVehiculo,
        seguro: seguro,
        dias: dias,
        tarifaDiaria: tarifaDiaria,
        totalPagar: totalPagar,
        fecha: new Date().toISOString()
    };
    
    localStorage.setItem('ultimaQuote', JSON.stringify(quote));
    alert('Cotización guardada exitosamente');
}

function mostrarUltimaQuote() {
    var ultimaQuote = localStorage.getItem('ultimaQuote');
    if (ultimaQuote) {
        var quote = JSON.parse(ultimaQuote);
        
        $('input[name="fechaRetiro"]').val(quote.fechaRetiro);
        $('input[name="fechadevolucion"]').val(quote.fechaDevolucion);
        $('#nacionalidad').val(quote.nacionalidad);
        $('#tipoVehiculo option').each(function() {
            if ($(this).text() === quote.tipoVehiculo) {
                $(this).prop('selected', true);
            }
        });
        $('#seguro option').each(function() {
            if ($(this).text() === quote.seguro) {
                $(this).prop('selected', true);
            }
        });
        $('input[name="dias"]').val(quote.dias);
        $('input[name="td"]').val(quote.tarifaDiaria);
        $('input[name="totalPagar"]').val(quote.totalPagar);
    }
}