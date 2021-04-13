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
}

Recipe.all = [];