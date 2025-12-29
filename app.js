// app.js
// Gourmet Go – Sprint 2
// Búsqueda de recetas con TheMealDB API

// Referencias al DOM

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#q");
const recipesContainer = document.querySelector("#recipesContainer");

class Receta {
  constructor({ strMeal, strMealThumb }) {
    this.nombre = strMeal;
    this.imagen = strMealThumb;
  }
}


// Evento submit del formulario

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita recarga de página (HU-04)

  const ingredient = searchInput.value.trim();

  if (!ingredient) return;

  await fetchRecipes(ingredient);
});


// Llamada a la API

const fetchRecipes = async (ingredient) => {
  // Limpiar resultados anteriores (HU-05)
  recipesContainer.innerHTML = "";

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );

    const data = await response.json();

    // Manejo de búsquedas sin resultados (HU-06)
    if (!data.meals) {
      showNoResults();
      return;
    }

    renderRecipes(data.meals);

  } catch (error) {
    console.error("Error al obtener recetas:", error);
  }
};


// Renderizado dinámico de recetas

const renderRecipes = (recipes) => {
  recipes.forEach((recipe) => {
    const receta = new Receta(recipe);

    const { nombre, imagen } = receta; // destructuring

    const cardHTML = `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100">
          <img src="${imagen}" class="card-img-top" alt="${nombre}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text text-muted small mb-3">
              Receta encontrada según el ingrediente buscado.
            </p>
            <a href="#" class="mt-auto btn btn-primary">Ver receta</a>
          </div>
        </div>
      </div>
    `;

    recipesContainer.innerHTML += cardHTML;
  });
};


// Mensaje sin resultados

const showNoResults = () => {
  recipesContainer.innerHTML = `
    <div class="col-12">
      <div class="alert alert-warning text-center">
        Lo sentimos, no se encontraron recetas. Intenta con otro ingrediente.
      </div>
    </div>
  `;
};