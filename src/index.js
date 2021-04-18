const endPoint = "http://localhost:3000/api/v1/recipes"

document.addEventListener('DOMContentLoaded', () => {
    getRecipes()

    const createRecipeForm = document.querySelector('#create-recipe-form')
    createRecipeForm.addEventListener('submit', (e) => createFormHandler(e))
    
    const recipeContainer = document.querySelector('#recipe-container')
    recipeContainer.addEventListener('click', e => {
        const recipe = Recipe.findById(e.target.dataset.id);
        document.querySelector('#update-recipe').innerHTML = recipe.renderUpdateForm();
    });

    document.querySelector('#update-recipe').addEventListener('submit', e => updateFormHandler(e))
})

function getRecipes() {
    fetch(endPoint)
    .then(response => response.json())
    .then(recipes => {
        recipes.data.forEach(recipe => {
            let newRecipe = new Recipe(recipe, recipe.attributes)
            document.querySelector('#recipe-container').innerHTML += newRecipe.renderRecipeCard()
        })
    })
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
        let newRecipe = new Recipe(recipeData, recipeData.attributes)
        document.querySelector('#recipe-container').innerHTML += newRecipe.renderRecipeCard()
    })
}

function updateFormHandler(e) {
    e.preventDefault()
    const id = e.target.dataset.id
    const recipe = Recipe.findById(id); 
    const nameInput = e.target.querySelector('#input-name').value;
    const descriptionInput = e.target.querySelector('#input-description').value;
    const image_urlInput = e.target.querySelector('#input-url').value;
    const mealTypeId = parseInt(e.target.querySelector('#meal_type').value);
    const ingredientsInput = e.target.querySelector('#input-ingredients').value;
    const instructionsInput = e.target.querySelector('#input-instructions').value;
    patchRecipe(recipe, nameInput, descriptionInput, image_urlInput, mealTypeId, ingredientsInput, instructionsInput)
}

function patchRecipe(recipe, name, description, image_url, meal_type_id, ingredients, instructions) {
    const bodyData = {name, description, image_url, meal_type_id, ingredients, instructions}
    fetch(`http://localhost:3000/api/v1/recipes/${recipe.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(updatedRecipe => {
        const recipe = Recipe.findById(updatedRecipe.data.id);
        recipe.update(updatedRecipe.data.attributes);
        document.querySelector('#recipe-container').innerHTML = '';
        Recipe.all.forEach(recipe => document.querySelector('#recipe-container').innerHTML += recipe.renderRecipeCard());
    })
}