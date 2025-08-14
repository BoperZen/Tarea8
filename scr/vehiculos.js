var vehiculos = {
    "Compacto": {
        imagenes: ["Compacto1.png", "Compacto2.png", "Compacto3.png"],
        descripciones: [
            "KIA PICANTO, Año 2016",
            "FORD FIESTA ST, Año 2015",
            "PEUGEOT 208, Año 2015"
        ]
    },
    "Mediano": {
        imagenes: ["Mediano1.png", "Mediano2.png", "Mediano3.png"],
        descripciones: [
            "HONDA CIVIC CAR, Año 2017",
            "MERCEDES SLS, Año 2015",
            "HYUNDAI Elantra, Año 2016"
        ]
    },
    "Todo Terreno": {
        imagenes: ["TodoTerreno1.png", "TodoTerreno2.png", "TodoTerreno3.png"],
        descripciones: [
            "TOYOTA CRUISER, Año 2016",
            "TOYOTA Prado, Año 2018",
            "NISSAN Patrol, Año 2017"
        ]
    },
    "Familiar": {
        imagenes: ["Familiar1.png", "Familiar2.png", "Familiar3.png"],
        descripciones: [
            "TOYOTA SIENNA, Año 2018",
            "DODGE GRAND CARAVAN, Año 2015",
            "HYUNDAI ELANTRA, Año 2017"
        ]
    }
};

function mostrarTodo() {
    var tipoSeleccionado = document.getElementById("tipoVehiculo");
    var tipo = tipoSeleccionado.options[tipoSeleccionado.selectedIndex].text;
    
    if (vehiculos[tipo]) {
        document.getElementById("imgVista").src = "images/" + vehiculos[tipo].imagenes[0];
        document.getElementById("img1").src = "images/" + vehiculos[tipo].imagenes[0];
        document.getElementById("img2").src = "images/" + vehiculos[tipo].imagenes[1];
        document.getElementById("img3").src = "images/" + vehiculos[tipo].imagenes[2];
        
        var descripcionTexto = "Lista de vehículos tipo " + tipo + ":\n\n";
        for (var i = 0; i < vehiculos[tipo].descripciones.length; i++) {
            descripcionTexto += "• " + vehiculos[tipo].descripciones[i] + "\n";
        }
        
        document.getElementById("infTCar").innerHTML = descripcionTexto.replace(/\n/g, '<br>');
    }
}

function mostrarImagen(numero) {
    var tipoSeleccionado = document.getElementById("tipoVehiculo");
    var tipo = tipoSeleccionado.options[tipoSeleccionado.selectedIndex].text;
    
    if (vehiculos[tipo] && numero >= 1 && numero <= 3) {
        document.getElementById("imgVista").src = "images/" + vehiculos[tipo].imagenes[numero - 1];
    }
}