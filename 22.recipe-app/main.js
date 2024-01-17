const recipeListContainer = document.querySelector(".recipe-list");
const loader = document.querySelector(".loader");
const recipeDetails = document.querySelector(".recipe-details");

function showLoader(){
    loader.classList.add('show');
    recipeListContainer.classList.add('hide');
}

function removeLoader(){
    loader.classList.remove('show');
    recipeListContainer.classList.remove('hide');
}

async function fetchListOfRecipes() {
    showLoader()
  const response = await fetch("https://dummyjson.com/recipes", {
    method: "GET",
  });

  const result = await response.json();
  if (result && result.recipes && result.recipes.length > 0) {
    removeLoader()
    displayRecipeList(result.recipes);

  }
  console.log(result);
}

function displayRecipeList(getRecipeList) {
  getRecipeList.forEach((recipeItem) => {
    const { name, id, image, cuisine, ingredients, mealType, rating } =
      recipeItem;
    const recipeItemWrapper = document.createElement("div");
    recipeItemWrapper.classList.add("recipe-item");

    // name
    const recipeName = document.createElement("p");
    recipeName.textContent = name;
    recipeName.classList.add("recipe-name");

    // image
    const recipeImg = document.createElement("img");
    recipeImg.src = image;
    recipeImg.classList.add("recipe-image");

    //cuisine
    const recipeCuisine = document.createElement("p");
    recipeCuisine.textContent = cuisine;
    recipeCuisine.classList.add("recipe-cuisine");

    //ingredients
    const recipeIngredients = document.createElement("div");
    recipeIngredients.textContent = ingredients.map((item) => item).join(",");
    recipeIngredients.classList.add("recipe-ingredients");

    // mealType
    const recipeMealType = document.createElement("p");
    recipeMealType.textContent = mealType;
    recipeMealType.classList.add("recipe-meal-type");

    //rating
    const recipeRating = document.createElement("p");
    recipeRating.textContent = rating;
    recipeRating.classList.add("recipe-rating");

    // recipe details button
    const recipeDetailsButton = document.createElement("button");
    recipeDetailsButton.classList.add("recipe-details-button");
    recipeDetailsButton.innerText = "Recipe Details";
    recipeDetailsButton.addEventListener("click", () =>
      handleRecipeDetails(id)
    );

    recipeItemWrapper.appendChild(recipeImg);
    recipeItemWrapper.appendChild(recipeName);
    recipeItemWrapper.appendChild(recipeCuisine);
    recipeItemWrapper.appendChild(recipeIngredients);
    recipeItemWrapper.appendChild(recipeMealType);
    recipeItemWrapper.appendChild(recipeRating);
    recipeItemWrapper.appendChild(recipeDetailsButton);

    recipeListContainer.appendChild(recipeItemWrapper);
  });
}

fetchListOfRecipes();

async function handleRecipeDetails(getId) {
  const response = await fetch(`https://dummyjson.com/recipes/${getId}`);
  const result = await response.json();

  if (result) {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });

    displayRecipeDetailsData(result);
  }
}

function displayRecipeDetailsData(getRecipeData) {
  recipeDetails.innerHTML = `
        <h1>You are now seeing the details of the following recipe</h1>
        <p>${getRecipeData.name}</p>
        `;
}
