const API_URL = "http://localhost:3000/autores";

const autorForm = document.getElementById("autor-form");
const autorIdInput = document.getElementById("autor-id");
const nombreInput = document.getElementById("nombre");
const nacionalidadInput = document.getElementById("nacionalidad");
const tablaAutores = document.getElementById("tabla-autores");
const mensaje = document.getElementById("mensaje");
const formTitle = document.getElementById("form-title");
const cancelarEdicionBtn = document.getElementById("cancelar-edicion");

async function cargarAutores() {
  try {
    const response = await fetch(API_URL);
    const autores = await response.json();

    tablaAutores.innerHTML = "";

    autores.forEach((autor) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${autor.id}</td>
        <td>${autor.nombre}</td>
        <td>${autor.nacionalidad}</td>
        <td>
          <button onclick="editarAutor(${autor.id}, '${autor.nombre.replace(/'/g, "\\'")}', '${autor.nacionalidad.replace(/'/g, "\\'")}')">Editar</button>
          <button onclick="eliminarAutor(${autor.id})">Eliminar</button>
        </td>
      `;

      tablaAutores.appendChild(fila);
    });
  } catch (error) {
    mensaje.textContent = "Error al cargar los autores";
  }
}

autorForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = autorIdInput.value;
  const nombre = nombreInput.value.trim();
  const nacionalidad = nacionalidadInput.value.trim();

  if (!nombre || !nacionalidad) {
    mensaje.textContent = "Todos los campos son obligatorios";
    return;
  }

  const autor = { nombre, nacionalidad };

  try {
    let response;

    if (id) {
      response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(autor)
      });
      mensaje.textContent = "Autor actualizado correctamente";
    } else {
      response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(autor)
      });
      mensaje.textContent = "Autor creado correctamente";
    }

    if (!response.ok) {
      throw new Error("Error en la petición");
    }

    autorForm.reset();
    autorIdInput.value = "";
    formTitle.textContent = "Añadir autor";
    cancelarEdicionBtn.style.display = "none";

    cargarAutores();
  } catch (error) {
    mensaje.textContent = "Error al guardar el autor";
  }
});

function editarAutor(id, nombre, nacionalidad) {
  autorIdInput.value = id;
  nombreInput.value = nombre;
  nacionalidadInput.value = nacionalidad;
  formTitle.textContent = "Editar autor";
  cancelarEdicionBtn.style.display = "inline-block";
}

cancelarEdicionBtn.addEventListener("click", () => {
  autorForm.reset();
  autorIdInput.value = "";
  formTitle.textContent = "Añadir autor";
  cancelarEdicionBtn.style.display = "none";
  mensaje.textContent = "";
});

async function eliminarAutor(id) {
  const confirmar = confirm("¿Seguro que quieres eliminar este autor?");
  if (!confirmar) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Error al eliminar");
    }

    mensaje.textContent = "Autor eliminado correctamente";
    cargarAutores();
  } catch (error) {
    mensaje.textContent = "Error al eliminar el autor";
  }
}

cargarAutores();