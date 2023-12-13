// Función para agregar una nueva fila a la tabla
let distSemanal = document.getElementById("distribucion1") 

document.getElementById("agregar-fila").addEventListener("click", function () {
    let table = document.querySelector("table tbody");
    // var newRow = table.insertRow(table.rows.length);
    let newTr = document.createElement("tr");
    newTr.id = crypto.randomUUID();
    let turno = document.createElement("td");
    turno.innerHTML = `
    <select class="turno form-select">
        <option value="M">M</option>
        <option value="T">T</option>
    </select>
    `;

    let cursotd = document.createElement("td");
    let curso = document.createElement("select")
    // aqui se puede añadir el contenido
    curso.classList.add("form-select")
    curso.classList.add("curso")
    cursotd.appendChild(curso)

    let modulotd = document.createElement("td");
    let modulo = document.createElement("select");
    // aqui se puede añadir el contenido
    modulo.classList.add("modulo");
    modulo.classList.add("form-select")
    modulotd.appendChild(modulo)

    let distribuciontd = document.createElement("td");
    let distribucion = document.createElement("select");
    distribucion.classList.add("distribucion")
    distribucion.classList.add("form-select")
    distribuciontd.appendChild(distribucion)

    let aulatd = document.createElement("td");
    let aula = document.createElement("select");
    // aqui se puede añadir el contenido
    aula.classList.add("form-select")
    aula.classList.add("aula")
    aulatd.appendChild(aula);

    let horas = document.createElement("td");
    let horasInput = document.createElement("input");
    // aqui se puede añadir el contenido
    horasInput.setAttribute("type","number");
    horasInput.classList.add("form-control")
    horasInput.classList.add("horas")
    horasInput.addEventListener("input", function () {
        updateTotalHours()
        eliminarHijos(distribucion);
        let distValues = sumasPosibles(horasInput.value)
        console.log(distValues)
        distValues.forEach((e) => {
                    let newOpt = document.createElement("option") ;
                    newOpt.value = e ;
                    newOpt.innerText = e.join(' + ') ;
                    distribucion.appendChild(newOpt)
                }
            )
        }
);
    horas.appendChild(horasInput)

    let deleteTd = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "X"
    deleteButton.classList.add("btn")
    deleteButton.classList.add("btn-danger")
    deleteButton.addEventListener("click", function () {
        this.parentElement.parentElement.remove();
        updateTotalHours();
    })

    deleteTd.appendChild(deleteButton);
    newTr.appendChild(turno);
    newTr.appendChild(cursotd);
    newTr.appendChild(modulotd);
    newTr.appendChild(horas);
    newTr.appendChild(distribuciontd);
    newTr.appendChild(aulatd);
    newTr.appendChild(deleteTd);
    table.appendChild(newTr);
});

// Función para calcular el total de horas
function updateTotalHours() {
    var totalHoursCell = document.getElementById("total-horas");
    var rows = document.querySelectorAll("table tbody tr");
    var total = 0;
    for (var i = 0; i < rows.length; i++) {
        var hoursInput = rows[i].querySelector(".horas");
        if (hoursInput && hoursInput.value) {
            total += parseFloat(hoursInput.value);
        }
    }
    totalHoursCell.textContent = total;

    // Verificar si el total supera las 18 horas y aplicar el estilo rojo
    if (total > 18 ) {
        totalHoursCell.classList.remove("border", "bg-danger", "text-white");
        totalHoursCell.classList.add("border", "bg-danger", "text-white");
    } else {
        // Si no supera las 18 horas, asegúrate de quitar la clase de borde rojo
        totalHoursCell.classList.remove("border", "bg-danger", "text-white");
        totalHoursCell.classList.add("border", "bg-success", "text-white");
    }
}
// Calcular el total de horas al cargar la página
window.addEventListener("load", updateTotalHours);



// Función para abrir el modal si no se ha visto antes
window.onload = function() {
    if (!haVistoModal()) {
        mostrarModal();
    }
};

// Función para mostrar el modal
function mostrarModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

// Función para cerrar el modal y marcar como visto en localStorage
function cerrarModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
    marcarModalVisto();
}

// Funciones para gestionar el estado del modal en el almacenamiento local
function haVistoModal() {
    return localStorage.getItem('modalVisto') === 'true';
}

function marcarModalVisto() {
    localStorage.setItem('modalVisto', 'true');
}

function acceptTerms() {
    cerrarModal();
}


function eliminarHijos(elementoPadre) {
    while (elementoPadre.firstChild) {
        elementoPadre.removeChild(elementoPadre.firstChild);
    }
}

function sumasPosibles(numero) {
    let resultados = [];

    function encontrarSumas(actuales, objetivo) {
        if (objetivo === 0 && actuales.length > 0) {
            // Ordenar el array antes de agregarlo a los resultados
            resultados.push(actuales.slice().sort((a, b) => a - b));
            return;
        }

        if (objetivo < 0 || actuales.length === 5) {
            return;
        }

        for (let i = 1; i <= 3; i++) {
            encontrarSumas([...actuales, i], objetivo - i);
        }
    }

    encontrarSumas([], numero);

    // Eliminar duplicados
    resultados = resultados.filter(
        (valor, indice, array) => array.findIndex(arr => JSON.stringify(arr) === JSON.stringify(valor)) === indice
    );

    return resultados;
}

function sumasPosiblesprimero(numero) {
    let resultados = [];

    function encontrarSumas(actuales, objetivo) {
        if (objetivo === 0 && actuales.length > 0) {
            // Ordenar el array antes de agregarlo a los resultados
            resultados.push(actuales.slice().sort((a, b) => a - b));
            return;
        }

        if (objetivo < 0 || actuales.length === 5) {
            return;
        }

        for (let i = 1; i <= 3; i++) {
            encontrarSumas([...actuales, i], objetivo - i);
        }
    }

    encontrarSumas([], numero);

    // Eliminar duplicados
    resultados = resultados.filter(
        (valor, indice, array) => array.findIndex(arr => JSON.stringify(arr) === JSON.stringify(valor)) === indice
    );

    distributionfirst(resultados);
}

function distributionfirst(data) {
    eliminarHijos(distSemanal)
    data.forEach((e) => {
        let newOpt = document.createElement("option") ;
        newOpt.value = e ;
        newOpt.innerText = e.join(' + ') ;
        distSemanal.appendChild(newOpt)
        }
    )
}



document.getElementById('toggleSection').addEventListener('click', function () {
    var toggleableSection = document.querySelector('.toggleable-section');
    toggleableSection.classList.toggle('hidden');
});

document.getElementById('toggleObservaciones').addEventListener('click', function () {
    var toggleableObservaciones = document.querySelector('.toggleable-observaciones');
    toggleableObservaciones.classList.toggle('hidden');
});


// Event listener para el botón #toggleSection
document.getElementById('toggleSection').addEventListener('click', toggleSection);


// Modo Oscuro

function toggleDarkMode() {
    const html = document.documentElement; // Obtener la etiqueta <html>
    html.classList.toggle('dark-mode'); // Agregar o quitar la clase 'dark-mode' en <html>
}