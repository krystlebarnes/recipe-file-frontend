const endPoint = "http://localhost:3000/api/v1//recipes"

document.addEventListener('DOMContentLoaded', () => {
    getRecipes()
})

function getRecipes() {
    fetch(endPoint)
    .then(response => response.json())
    .then(recipes => {
        recipes.data.forEach(recipe => {
            const recipeMarkup = `
              <div data-id=${recipe.id}>
                <img src=${recipe.attributes.image_url} height="200" width="250">
                <h3>${recipe.attributes.name}</h3>
                <p><i>Course: ${recipe.attributes.meal_type.name}</i></p>
                <p>${recipe.attributes.description}</p>
                <button data-id=${recipe.id}>edit</button>
              </div>
              <br><br>`;

            document.querySelector('#recipe-container').innerHTML += recipeMarkup
        })
    })
}