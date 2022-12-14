export async function fetchByIngredientDrink(ingrediente) {
  console.log(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const { drinks } = await response.json();
  return drinks;
}

export async function fetchByNameDrink(name) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const { drinks } = await response.json();
  return drinks;
}

export async function fetchByLetterDrink(letter) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const { drinks } = await response.json();
  return drinks;
}

export async function fetch12Drinks() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await response.json();
  return drinks;
}

export async function fetch5CategoriesDrinks() {
  const numMax = 5;
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const { drinks } = await response.json();
  return drinks.slice(0, numMax);
}

export async function fetchByCategoryDrink(category) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const { drinks } = await response.json();
  return drinks;
}

export async function fetchRecipeDetailDrink(id) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await response.json();
  return drinks;
}
