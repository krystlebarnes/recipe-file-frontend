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
    }

    function renderRecipeCard() {
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
}

Recipe.all = [];