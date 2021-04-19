# Recipe File
> Recipe File is a simple app that allows you to add or edit any recipe and view them all on one page.

## Installation

The backend repo can be found at https://github.com/krystlebarnes/recipe-file-backend.

After cloning both the frontend and backend repositories, run the following commands on the backend repo:

```
bundle install
rake db:migrate
rake db:seed
rails s
```
Navigate to http://localhost:3000/api/v1/recipes to make sure seed data has populated.

In another terminal window, run the following command on the frontend repo to load the app in your browser window:

```
open index.html
```

## How to Use

Click the "ADD A RECIPE" button at the top to add a new recipe to your recipe list.

To edit a recipe, click the "edit" button under the recipe you would like to edit. An edit form will appear at the top of the page.

## Features for Future Versions
* View a full recipe
* Delete a recipe
* Upload recipe image
* Recipes can have many meal types
* Recipes can be filtered by meal type
* User authorization
* User can like and save a recipe to their own recipe file
* User can save a recipe to their meal plan

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/krystlebarnes/recipe-file-frontend. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).



