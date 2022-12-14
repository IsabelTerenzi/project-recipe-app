import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/footer.css';

function Footer() {
  const history = useHistory();

  const handleDrinksClick = () => {
    history.push('/drinks');
  };

  const handleMealsClick = () => {
    history.push('/foods');
  };

  return (
    <div data-testid="footer" className="footer">
      <div>
        <button
          type="button"
          onClick={ handleDrinksClick }
          className="btn-footer-drinks"
        >
          <img
            src={ drinkIcon }
            alt="drinks"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={ handleMealsClick }
          className="btn-footer-foods"
        >
          <img
            src={ mealIcon }
            alt="foods"
            data-testid="food-bottom-btn"
          />
        </button>
      </div>
    </div>
  );
}

export default Footer;
