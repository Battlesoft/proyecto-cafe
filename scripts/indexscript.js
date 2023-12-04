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
    deleteButton.innerText = "x"
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
    // // Crear un select para el campo de turno
    // var turnoCell = newRow.insertCell(0);
    // var turnoSelect = document.createElement("select");
    // turnoSelect.className = "form-control";
    // var option1 = document.createElement("option");
    // option1.value = "M";
    // option1.text = "M";
    // var option2 = document.createElement("option");
    // option2.value = "T";
    // option2.text = "T";
    // turnoSelect.appendChild(option1);
    // turnoSelect.appendChild(option2);
    // turnoCell.appendChild(turnoSelect);

    // // Agregar el resto de las celdas de entrada de texto, incluyendo el campo de horas
    // for (var i = 1; i < 7; i++) {
    //     var cell = newRow.insertCell(i);
    //     var input = document.createElement("input");
    //     input.type = "text";
    //     input.className = "form-control";
    //     // Si es la columna de horas, agregar la clase "horas" y un evento para actualizar el total
    //     if (i === 4) {
    //         input.className += " horas";
    //         input.addEventListener("input", updateTotalHours);
    //     }
    //     cell.appendChild(input);
    // }

    // var deleteCell = newRow.insertCell(7);
    // var deleteButton = document.createElement("button");
    // deleteButton.innerText = "X";
    // deleteButton.className = "btn btn-danger";
    // deleteButton.addEventListener("click", function () {
    //     table.deleteRow(newRow.rowIndex);
    //     // Actualizar el total cuando se elimina una fila
    //     updateTotalHours();
    // });
    // deleteCell.appendChild(deleteButton);
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


// Mostrar el modal al cargar la página
window.onload = function () {
    if(localStorage.getItem('modal')){

    }else {
        var modal = document.getElementById('myModal');
        modal.style.display = 'block';
    }
}



// Cerrar el modal
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
    localStorage.setItem('modal',true);
}

function eliminarHijos(elementoPadre) {
    while (elementoPadre.firstChild) {
        elementoPadre.removeChild(elementoPadre.firstChild);
    }
}

// function calcularHoras(numero, elemento) {

//     function encontrarSumas(numero) {
//         const resultados = [];
//         function encontrarSumasRecursivo(actual, sumaParcial) {
//             if (sumaParcial === numero && actual.length <= 4) {
//                 resultados.push(actual.slice()); // Agregar la combinación actual a los resultados
//                 return;
//             }
//             if (sumaParcial >= numero || actual.length >= 4) {
//                 return;
//             }
//             for (let i = 1; i <= 3; i++) {
//                     if (actual.length === 0 || i <= actual[actual.length - 1]) {
//                         actual.push(i);
//                         encontrarSumasRecursivo(actual, sumaParcial + i);
//                         actual.pop();
//                     }
//                 }
//             }
    
//         encontrarSumasRecursivo([], 0);
//         return resultados;
//     }

//     const combinaciones = encontrarSumas(numero);
//     combinaciones.map((e) => {
//         let newOpt = document.createElement("option")
//         newOpt.value = e
//         e.map((e) => {
//             newOpt.textContent += e + "+" ;
//         })
//         elemento.appendChild(newOpt);
//     })
// }

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

// Acción al aceptar los términos
function acceptTerms() {
    closeModal(); // Cierra el modal
    // Agrega aquí cualquier acción adicional que desees realizar después de aceptar los términos.
}

// function validarFormato(inputValue) {
//     // Verificar si el valor coincide con el formato X/X/X
//     const regex = /^\d\/\d\/\d$/; // Asegúrate de que haya barras (/) entre los números
//     if (!regex.test(inputValue)) {
//       console.log('El formato no es válido. Debe ser X/X/X');
//       return;
//     }
  
//     // Separar los números
//     const numeros = inputValue.split('/').map(Number);
  
//     // Verificar si algún número excede 3
//     const numeroExcedeLimite = numeros.some(numero => numero > 3);
  
    // if (numeroExcedeLimite) {
    //     console.log('Al menos uno de los números excede 3');
    // } else {
    //     console.log('Todos los números están dentro del límite (<= 3)');
    // }

    // Click desplegable tabla

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