        // Función para agregar una nueva fila a la tabla
        document.getElementById("agregar-fila").addEventListener("click", function () {
            var table = document.querySelector("table tbody");
            var newRow = table.insertRow(table.rows.length);

            // Crear un select para el campo de turno
            var turnoCell = newRow.insertCell(0);
            var turnoSelect = document.createElement("select");
            turnoSelect.className = "form-control";
            var option1 = document.createElement("option");
            option1.value = "M";
            option1.text = "M";
            var option2 = document.createElement("option");
            option2.value = "T";
            option2.text = "T";
            turnoSelect.appendChild(option1);
            turnoSelect.appendChild(option2);
            turnoCell.appendChild(turnoSelect);

            // Agregar el resto de las celdas de entrada de texto, incluyendo el campo de horas
            for (var i = 1; i < 7; i++) {
                var cell = newRow.insertCell(i);
                var input = document.createElement("input");
                input.type = "text";
                input.className = "form-control";
                // Si es la columna de horas, agregar la clase "horas" y un evento para actualizar el total
                if (i === 4) {
                    input.className += " horas";
                    input.addEventListener("input", updateTotalHours);
                }
                cell.appendChild(input);
            }

            var deleteCell = newRow.insertCell(7);
            var deleteButton = document.createElement("button");
            deleteButton.innerText = "X";
            deleteButton.className = "btn btn-danger";
            deleteButton.addEventListener("click", function () {
                table.deleteRow(newRow.rowIndex);
                // Actualizar el total cuando se elimina una fila
                updateTotalHours();
            });
            deleteCell.appendChild(deleteButton);
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
        }

        // Calcular el total de horas al cargar la página
        window.addEventListener("load", updateTotalHours);