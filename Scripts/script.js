let tarasPendientes = {};

// Activar/desactivar Tara Manual
function toggleTaraManual() {
    let taraManualInput = document.getElementById("tara-manual");
    taraManualInput.disabled = !taraManualInput.disabled;
}

// Registrar TARA
function registrarTara() {
    let vehiculo = document.getElementById("vehiculo").value;
    let peso = document.getElementById("peso").textContent;
    
    if (vehiculo && peso) {
        tarasPendientes[vehiculo] = { tara: parseFloat(peso), bruto: null };
        alert("TARA registrada correctamente para " + vehiculo);
    } else {
        alert("Ingrese un vehículo y un peso válido.");
    }
}

// Capturar Pesaje
function capturarPesaje() {
    let peso = document.getElementById("peso").textContent;
    let vehiculo = document.getElementById("vehiculo").value;
    if (!peso || !vehiculo) {
        alert("Por favor, asegúrese de haber capturado el peso y vehículo correctamente.");
        return;
    }
    let acoplado = document.getElementById("acoplado").value;
    let transporte = document.getElementById("transporte").value;
    let cuitTransporte = document.getElementById("cuit_transporte").value;
    let remitente = document.getElementById("remitente").value;
    let cuitRemitente = document.getElementById("cuit_remitente").value;
    let destino = document.getElementById("destino").value;
    let cuitDestino = document.getElementById("cuit_destino").value;
    let producto = document.getElementById("producto").value;
    let chofer = document.getElementById("chofer").value;
    
    let remitoGenerado = generarRemito();
    document.getElementById("remito").value = remitoGenerado;

    console.log("Pesaje capturado:", { peso, vehiculo, acoplado, transporte, cuitTransporte, remitente, cuitRemitente, destino, cuitDestino, producto, chofer, remitoGenerado });

    if (tarasPendientes[vehiculo] && !tarasPendientes[vehiculo].bruto) {
        tarasPendientes[vehiculo].bruto = parseFloat(peso);
        let neto = tarasPendientes[vehiculo].bruto - tarasPendientes[vehiculo].tara;
        console.log("Pesaje Neto:", neto);
        alert("Pesaje capturado correctamente, NETO: " + neto + " kg");
    } else {
        alert("El vehículo no tiene TARA registrada o ya se registró el BRUTO.");
    }
}

// Imprimir Pesaje
function imprimirPesaje() {
    let vehiculo = document.getElementById("vehiculo").value;
    let peso = document.getElementById("peso").textContent;
    let fecha = new Date().toLocaleString();

    let ticketHtml = `
        <div style="text-align: center; font-size: 16px;">
            <h2>AM BALANZAS S.A</h2>
            <p><strong>Fecha y Hora:</strong> ${fecha}</p>
            <p><strong>PESADO:</strong> ${peso} kg</p>
            <p><strong>Vehículo:</strong> ${vehiculo}</p>
            <hr />
            <p><small>By BITTECHNICAL</small></p>
        </div>
    `;

    let printWindow = window.open('', '', 'width=600,height=800');
    printWindow.document.write(ticketHtml);
    printWindow.document.close();
    printWindow.print();
}

// Abrir Configuración con Login
function solicitarLogin(callback) {
    let usuario = prompt("Ingrese usuario:");
    let contrasena = prompt("Ingrese contraseña:");

    if (usuario === "admin" && contrasena === "admin01234") {
        callback();
    } else {
        alert("Acceso denegado. Usuario o contraseña incorrectos.");
    }
}

function abrirConfiguracion() {
    solicitarLogin(() => {
        alert("Abriendo configuración...");
    });
}

// Actualizar el peso con formato dinámico
function actualizarPeso() {
    let peso = document.getElementById("peso");
    let pesoValor = 1234.56; // Este valor debería venir de una balanza o API
    let pesoFormateado = aplicarComa(pesoValor.toFixed(2));
    peso.textContent = pesoFormateado;
}

// Configuración de coma en el peso
function aplicarComa(peso) {
    let comaPos = 4;
    let pesoArray = peso.split('');
    pesoArray.splice(pesoArray.length - comaPos, 0, ',');
    return pesoArray.join('');
}

// Generar Remito automáticamente
function generarRemito() {
    let ultimoRemito = localStorage.getItem("ultimoRemito");

    if (!ultimoRemito) {
        ultimoRemito = "A000000";
    }

    let letra = ultimoRemito.charAt(0);
    let numero = parseInt(ultimoRemito.slice(1));
    numero++;

    let nuevoRemito = letra + numero.toString().padStart(6, '0');
    localStorage.setItem("ultimoRemito", nuevoRemito);

    return nuevoRemito;
}

// Inicializar el peso al cargar la página
actualizarPeso();