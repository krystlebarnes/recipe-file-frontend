const endPoint = "http://localhost:3000/api/v1/recipes"

document.addEventListener('DOMContentLoaded', () => {
    getRecipes()

    const createRecipeForm = document.querySelector('#create-recipe-form')
    createRecipeForm.addEventListener('submit', (e) => createFormHandler(e))
})

function getRecipes() {
    fetch(endPoint)
    .then(response => response.json())
    .then(recipes => {
        recipes.data.forEach(recipe => {
            let newRecipe = new Recipe(recipe, recipe.attributes)
            render(recipe)
        })
    })
}

function render(recipe) {
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
}

function createFormHandler(e) {
    e.preventDefault()
    const nameInput = document.querySelector('#input-name').value
    const descriptionInput = document.querySelector('#input-description').value
    const imageInput = document.querySelector('#input-url').value
    const mealTypeId = parseInt(document.querySelector('#meal_type').value)
    const ingredientsInput = document.querySelector('#input-ingredients').value
    const instructionsInput = document.querySelector('#input-instructions').value
    postRecipe(nameInput, descriptionInput, imageInput, mealTypeId, ingredientsInput, instructionsInput)
}

function postRecipe(name, description, image_url, meal_type_id, ingredients, instructions) {
    const bodyData = {name, description, image_url, meal_type_id, ingredients, instructions}
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(recipe => {
        const recipeData = recipe.data
        render(recipeData)
    })
  }