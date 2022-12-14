import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import AppContext from '../context/AppContext';
import '../css/drinks.css';
import { fetch12Drinks, fetch5CategoriesDrinks,
  fetchByCategoryDrink } from '../fetchAPI/searchDrinks';
import RecipeDetails from '../components/RecipeDetails';
import useLocalStorage from '../hooks/useLocalStorage';

function Drinks() {
  const { recipesFilter, setRecipesFilter } = useContext(AppContext);
  const history = useHistory();
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [drinkOption, setDrinkOption] = useState('');
  const [optionToggle, setOptionToggle] = useState(false);
  const [, setInProgressStorage] = useLocalStorage('inProgressRecipes');

  const fetchCategories = async () => {
    const categories = await fetch5CategoriesDrinks();
    setDrinkCategories(categories);
  };

  const getAllRecipes = async () => {
    const allRecipesList = await fetch12Drinks();
    setRecipesFilter(allRecipesList);
  };

  useEffect(() => {
    fetchCategories();
    getAllRecipes();
  }, []);

  useEffect(() => {
    const waitFetch = async () => {
      if (drinkOption) {
        const categoryList = await fetchByCategoryDrink(drinkOption);
        setRecipesFilter(categoryList);
      }
    };
    waitFetch();
  }, [drinkOption]);

  useEffect(() => {
    const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) ?? {};
    // console.log(recipeInProgress);
    if (!recipeInProgress.meals) {
      setInProgressStorage({
        ...recipeInProgress,
        meals: {
          ...recipeInProgress.meals,
        },
        cocktails: {
          ...recipeInProgress.cocktails,
        },
      });
    }
  }, []);

  const handleCategoryClick = ({ target: { value } }) => {
    setDrinkOption(value);
    setOptionToggle(!optionToggle);
    if (optionToggle === true) {
      setDrinkOption('');
      getAllRecipes();
    }
  };

  const handleAllClick = () => {
    getAllRecipes();
  };

  useEffect(() => {
    const time = 500;
    if (recipesFilter && recipesFilter.length === 1) {
      const id = recipesFilter[0].idDrink;
      setTimeout(() => {
        history.push(`/drinks/${id}`);
      }, time);
      return;
    }
    if (!recipesFilter) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      getAllRecipes();
    }
  }, [recipesFilter, history]);

  const recipeLimit = (array) => {
    const numMax = 12;
    if (array && array.length > numMax) {
      return array.slice(0, numMax);
    }
    return array;
  };

  const handleRecipeDetail = (recipe) => {
    const { idDrink } = recipe;
    history.push(`/drinks/${idDrink}`);
  };

  return (
    <div>
      <Header title="Drinks" profile search />
      <Recipes>
        <div className="category-buttons-drinks">
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ handleAllClick }
            name="All"
            value="All"
          >
            All
          </button>
          { drinkCategories.map((category, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${category.strCategory}-category-filter` }
              value={ category.strCategory }
              onClick={ handleCategoryClick }
            >
              {category.strCategory}
            </button>
          ))}
        </div>
        { recipesFilter && recipeLimit(recipesFilter).map((recipe, index) => (
          <button
            type="button"
            key={ index }
            className="recipes-card"
            data-testid={ `${index}-recipe-card` }
            onClick={ () => handleRecipeDetail(recipe) }
          >
            <h2 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h2>
            <img
              src={ recipe.strDrinkThumb }
              alt="strDrinkThumb"
              data-testid={ `${index}-card-img` }
            />
          </button>
        ))}
      </Recipes>
      <RecipeDetails />
      <Footer />
    </div>
  );
}

export default Drinks;
