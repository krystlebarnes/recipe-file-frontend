const endPoint = "http://localhost:3000/api/v1/recipes"

document.addEventListener('DOMContentLoaded', () => {
    getRecipes()

    //click to add new recipe
    const addForm = document.querySelector('#add-form')
    addForm.addEventListener('click', e => {
        document.querySelector('#add-form').innerHTML = "";
        document.querySelector('#create-recipe-form').innerHTML = renderCreateForm();
    })

    //submit new recipe form
    document.querySelector('#create-recipe-form').addEventListener('submit', (e) => createFormHandler(e))
    
    //click to edit recipe
    const recipeContainer = document.querySelector('#recipe-container')
    recipeContainer.addEventListener('click', e => {
        const recipe = Recipe.findById(e.target.dataset.id);
        document.querySelector('#update-recipe').innerHTML = recipe.renderUpdateForm();
    });

    //submit updated recipe
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

function renderCreateForm() {
    return `
        <form id="create-recipe-form" style="">
            <h3>ADD A RECIPE</h3>
            
            <input id='input-name' type="text" name="name" value="" placeholder="Give your recipe a name." class="input-text">
            <br><br>
            <input id='input-url' type="text" name="image" value="" placeholder="Enter the recipe's image URL here." class="input-text">
            <br><br>
            <textarea id='input-description' name="description" rows="8" cols="80" value="" placeholder="Tell us a little bit about this recipe."></textarea>
            <br><br>
            <p>What type of meal is this?</p>
            <select id="meal_type" name="meal_type">
                <option value="1">Breakfast</option>
                <option value="2">Morning Snack</option>
                <option value="3">Lunch</option>
                <option value="4">Afternoon Snack</option>
                <option value="5">Dinner</option>
                <option value="6">Midnight Snack</option>
            </select>
            <br><br>
            <textarea id='input-ingredients' name="ingredients" rows="8" cols="80" value="" placeholder="Enter each ingredient on a separate line."></textarea>
            <br><br>
            <textarea id='input-instructions' name="instructions" rows="8" cols="80" value="" placeholder="Enter each instruction on a separate line."></textarea>
            <br><br>
        
            <input id= 'create-button' type="submit" name="submit" value="Add New Recipe" class="submit">
        </form>`;
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
        document.querySelector('#recipe-container').innerHTML += newRecipe.renderRecipeCard();
        document.querySelector('#create-recipe-form').innerHTML = "";
        document.querySelector('#add-form').innerHTML = `<button id="add-button">ADD A RECIPE</button>`;
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