import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinkRecipe() {
  return (
    <div>
      <h1>Drink Recipe</h1>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="whiteHeartIcon" />
      </button>
    </div>
  );
}

export default DrinkRecipe;
