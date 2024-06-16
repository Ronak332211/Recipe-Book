document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');

    // Load recipes from local storage
    loadRecipes();

    recipeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const recipeIndex = document.getElementById('recipe-index').value;
        if (recipeIndex === '') {
            addRecipe();
        } else {
            updateRecipe(recipeIndex);
        }
    });

    function addRecipe() {
        const recipe = getRecipeFormData();
        saveRecipe(recipe);
        displayRecipe(recipe);
        recipeForm.reset();
    }

    function getRecipeFormData() {
        return {
            name: document.getElementById('recipe-name').value,
            author: document.getElementById('author-name').value,
            totalTime: document.getElementById('total-time').value,
            servings: document.getElementById('servings').value,
            ingredients: document.getElementById('ingredients').value.split(',').map(ingredient => ingredient.trim()),
            steps: document.getElementById('steps').value.split(',').map(step => step.trim()),
            photoLink: document.getElementById('photo-link').value,
            videoLink: document.getElementById('video-link').value
        };
    }

    function saveRecipe(recipe) {
        let recipes = localStorage.getItem('recipes');
        if (recipes) {
            recipes = JSON.parse(recipes);
        } else {
            recipes = [];
        }
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    function updateRecipe(index) {
        let recipes = JSON.parse(localStorage.getItem('recipes'));
        recipes[index] = getRecipeFormData();
        localStorage.setItem('recipes', JSON.stringify(recipes));
        renderRecipes();
        recipeForm.reset();
        document.getElementById('recipe-index').value = '';
    }

    function loadRecipes() {
        let recipes = localStorage.getItem('recipes');
        if (recipes) {
            recipes = JSON.parse(recipes);
            recipes.forEach((recipe, index) => displayRecipe(recipe, index));
        }
    }

    function renderRecipes() {
        recipeList.innerHTML = '';
        loadRecipes();
    }

    function displayRecipe(recipe, index) {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const recipeName = document.createElement('h2');
        recipeName.textContent = recipe.name;
        recipeDiv.appendChild(recipeName);

        const recipeAuthor = document.createElement('p');
        recipeAuthor.textContent = `Author: ${recipe.author}`;
        recipeDiv.appendChild(recipeAuthor);

        const recipeTime = document.createElement('p');
        recipeTime.textContent = `Total Time: ${recipe.totalTime}`;
        recipeDiv.appendChild(recipeTime);

        const recipeServings = document.createElement('p');
        recipeServings.textContent = `Servings: ${recipe.servings}`;
        recipeDiv.appendChild(recipeServings);

        const recipeIngredients = document.createElement('p');
        recipeIngredients.textContent = `Ingredients: ${recipe.ingredients.join(', ')}`;
        recipeDiv.appendChild(recipeIngredients);

        const recipeSteps = document.createElement('p');
        recipeSteps.textContent = `Steps: ${recipe.steps.join(', ')}`;
        recipeDiv.appendChild(recipeSteps);

        if (recipe.photoLink) {
            const photoLink = document.createElement('a');
            photoLink.href = recipe.photoLink;
            photoLink.textContent = 'View Photo';
            photoLink.target = '_blank';
            recipeDiv.appendChild(photoLink);
        }

        if (recipe.videoLink) {
            const videoLink = document.createElement('a');
            videoLink.href = recipe.videoLink;
            videoLink.textContent = 'Watch Video';
            videoLink.target = '_blank';
            recipeDiv.appendChild(videoLink);
        }

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit Recipe';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => editRecipe(index));
        recipeDiv.appendChild(editButton);

        recipeList.appendChild(recipeDiv);
    }

    function editRecipe(index) {
        let recipes = JSON.parse(localStorage.getItem('recipes'));
        const recipe = recipes[index];
        document.getElementById('recipe-name').value = recipe.name;
        document.getElementById('author-name').value = recipe.author;
        document.getElementById('total-time').value = recipe.totalTime;
        document.getElementById('servings').value = recipe.servings;
        document.getElementById('ingredients').value = recipe.ingredients.join(', ');
        document.getElementById('steps').value = recipe.steps.join(', ');
        document.getElementById('photo-link').value = recipe.photoLink;
        document.getElementById('video-link').value = recipe.videoLink;
        document.getElementById('recipe-index').value = index;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');

    // Load recipes from local storage
    loadRecipes();

    recipeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addRecipe();
    });

    function addRecipe() {
        const name = document.getElementById('recipe-name').value;
        const author = document.getElementById('author-name').value;
        const description = document.getElementById('recipe-description').value;
        const photoLink = document.getElementById('photo-link').value;
        const videoLink = document.getElementById('video-link').value;

        const recipe = { name, author, description, photoLink, videoLink };
        saveRecipe(recipe);
        displayRecipe(recipe);
        recipeForm.reset();
    }

    function saveRecipe(recipe) {
        let recipes = localStorage.getItem('recipes');
        if (recipes) {
            recipes = JSON.parse(recipes);
        } else {
            recipes = [];
        }
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    function loadRecipes() {
        let recipes = localStorage.getItem('recipes');
        if (recipes) {
            recipes = JSON.parse(recipes);
            recipes.forEach(recipe => displayRecipe(recipe));
        }
    }

    function displayRecipe(recipe) {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const recipeName = document.createElement('h2');
        recipeName.textContent = recipe.name;
        recipeDiv.appendChild(recipeName);

        const recipeAuthor = document.createElement('p');
        recipeAuthor.textContent = `Author: ${recipe.author}`;
        recipeDiv.appendChild(recipeAuthor);

        const recipeDescription = document.createElement('p');
        recipeDescription.textContent = recipe.description;
        recipeDiv.appendChild(recipeDescription);

        if (recipe.photoLink) {
            const photoLink = document.createElement('a');
            photoLink.href = recipe.photoLink;
            photoLink.textContent = 'View Photo';
            photoLink.target = '_blank';
            recipeDiv.appendChild(photoLink);
        }

        if (recipe.videoLink) {
            const videoLink = document.createElement('a');
            videoLink.href = recipe.videoLink;
            videoLink.textContent = 'Watch Video';
            videoLink.target = '_blank';
            recipeDiv.appendChild(videoLink);
        }

        recipeList.appendChild(recipeDiv);
    }
    
});
