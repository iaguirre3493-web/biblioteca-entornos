const LIBROS_API_URL = "http://localhost:3000/libros";
const AUTORES_API_URL = "http://localhost:3000/autores";

const libroForm = document.getElementById("libro-form");
const libroIdInput = document.getElementById("libro-id");
const tituloInput = document.getElementById("titulo");
const generoInput = document.getElementById("genero");
const anioInput = document.getElementById("anio");
const autorSelect = document.getElementById("autor_id");
const tablaLibros = document.getElementById("tabla-libros");
const mensaje = document.getElementById("mensaje");
const formTitle = document.getElementById("form-title");
const cancelarEdicionBtn = document.getElementById("cancelar-edicion");

async function cargarAutoresSelect() {
  try {
    const response = await fetch(AUTORES_API_URL);
    const autores = await response.json();

    autorSelect.innerHTML = `<option value="">Selecciona un autor</option>`;

    autores.forEach((autor) => {
      const option = document.createElement("option");
      option.value = autor.id;
      option.textContent = autor.nombre;
      autorSelect.appendChild(option);
    });
  } catch (error) {
    mensaje.textContent = "Error al cargar los autores";
  }
}

async function cargarLibros() {
  try {
    const response = await fetch(LIBROS_API_URL);
    const libros = await response.json();

    tablaLibros.innerHTML = "";

    libros.forEach((libro) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${libro.id}</td>
        <td>${libro.titulo}</td>
        <td>${libro.genero}</td>
        <td>${libro.anio}</td>
        <td>${libro.autor_nombre}</td>
        <td>
          <button onclick="editarLibro(${libro.id}, '${libro.titulo.replace(/'/g, "\\'")}', '${libro.genero.replace(/'/g, "\\'")}', ${libro.anio}, ${libro.autor_id})">Editar</button>
          <button onclick="eliminarLibro(${libro.id})">Eliminar</button>
        </td>
      `;

      tablaLibros.appendChild(fila);
    });
  } catch (error) {
    mensaje.textContent = "Error al cargar los libros";
  }
}

libroForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = libroIdInput.value;
  const titulo = tituloInput.value.trim();
  const genero = generoInput.value.trim();
  const anio = parseInt(anioInput.value);
  const autor_id = autorSelect.value;

  if (!titulo || !genero || !anio || !autor_id) {
    mensaje.textContent = "Todos los campos son obligatorios";
    return;
  }

  const libro = {
    titulo,
    genero,
    anio,
    autor_id: parseInt(autor_id)
  };

  try {
    let response;

    if (id) {
      response = await fetch(`${LIBROS_API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(libro)
      });
      mensaje.textContent = "Libro actualizado correctamente";
    } else {
      response = await fetch(LIBROS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(libro)
      });
      mensaje.textContent = "Libro creado correctamente";
    }

    if (!response.ok) {
      throw new Error("Error en la petición");
    }

    libroForm.reset();
    libroIdInput.value = "";
    formTitle.textContent = "Añadir libro";
    cancelarEdicionBtn.style.display = "none";

    cargarLibros();
  } catch (error) {
    mensaje.textContent = "Error al guardar el libro";
  }
});

function editarLibro(id, titulo, genero, anio, autor_id) {
  libroIdInput.value = id;
  tituloInput.value = titulo;
  generoInput.value = genero;
  anioInput.value = anio;
  autorSelect.value = autor_id;
  formTitle.textContent = "Editar libro";
  cancelarEdicionBtn.style.display = "inline-block";
}

cancelarEdicionBtn.addEventListener("click", () => {
  libroForm.reset();
  libroIdInput.value = "";
  formTitle.textContent = "Añadir libro";
  cancelarEdicionBtn.style.display = "none";
  mensaje.textContent = "";
});

async function eliminarLibro(id) {
  const confirmar = confirm("¿Seguro que quieres eliminar este libro?");
  if (!confirmar) return;

  try {
    const response = await fetch(`${LIBROS_API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Error al eliminar");
    }

    mensaje.textContent = "Libro eliminado correctamente";
    cargarLibros();
  } catch (error) {
    mensaje.textContent = "Error al eliminar el libro";
  }
}

cargarAutoresSelect();
cargarLibros();