$(document).ready(function() {
    cargarPaises();
});

function cargarPaises() {
    $.ajax({
        url: 'https://restcountries.com/v3.1/all',
        type: 'GET',
        success: function(data) {
            var select = $('#nacionalidad');
            select.empty();
            
            data.sort(function(a, b) {
                var nameA = a.name.common.toLowerCase();
                var nameB = b.name.common.toLowerCase();
                return nameA.localeCompare(nameB);
            });
            
            $.each(data, function(index, country) {
                var option = $('<option></option>');
                option.attr('value', country.cca3);
                option.text(country.name.common);
                option.attr('data-region', country.region);
                select.append(option);
            });
            
            select.val('CRI');
        },
        error: function() {
            console.error('Error al cargar los países');
        }
    });
}