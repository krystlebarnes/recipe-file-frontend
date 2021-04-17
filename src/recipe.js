class Recipe {
    constructor(recipe, recipeAttributes) {
        this.id = recipe.id
        this.name = recipeAttributes.name
        this.image_url = recipeAttributes.image_url
        this.description = recipeAttributes.description
        this.ingredients = recipeAttributes.ingredients
        this.instructions = recipeAttributes.instructions
        this.meal_type = recipeAttributes.meal_type
        Recipe.all.push(this)
        console.log(this);
    }

    renderRecipeCard() {
        return `
            <div data-id=${this.id}>
                <img src=${this.image_url} height="200" width="250">
                <h3>${this.name}</h3>
                <p><i>Course: ${this.meal_type.name}</i></p>
                <p>${this.description}</p>
                <button data-id=${this.id}>edit</button>
            </div>
            <br><br>`;
    }

    static findById(id) {
        return this.all.find(recipe => recipe.id === id);
    }

    renderUpdateForm() {
        return `
            <form data-id=${this.id} >
                <h3>Edit Your Recipe</h3>
                <input id='input-name' type="text" name="name" value="${this.name}" class="input-text">
                <br><br>
                <input id='input-url' type="text" name="image" value="${this.image_url}" class="input-text">
                <br><br>
                <textarea id='input-description' name="description" rows="8" cols="80" value="">${this.description}</textarea>
                <br><br>
                <p>What type of meal is this?</p>
                <select id="meal_type" name="meal_type" value="${this.meal_type.name}">
                    <option value="1">Breakfast</option>
                    <option value="2">Morning Snack</option>
                    <option value="3">Lunch</option>
                    <option value="4">Afternoon Snack</option>
                    <option value="5">Dinner</option>
                    <option value="6">Midnight Snack</option>
                </select>
                <br><br>
                <textarea id='input-ingredients' name="ingredients" rows="8" cols="80" value="">${this.ingredients}</textarea>
                <br><br>
                <textarea id='input-instructions' name="instructions" rows="8" cols="80" value="">${this.instructions}</textarea>
                <br><br>
            
                <input id='edit-button' type="submit" name="submit" value="Update Recipe" class="submit">
            </form>`;
    }


}

Recipe.all = [];