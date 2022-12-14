import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
// import meals from '../../cypress/mocks/meals';

describe('Testando os Foods', () => {
  // beforeEach(() => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(meals),
  //   });
  // });
  it('Testa a função de Foods', async () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'bel.terenzi@gmail.com');
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    // test
    // expect(global.fetch).toHaveBeenCalled();
    const preRecipe = await screen.findByText('Corba');
    expect(preRecipe).toBeInTheDocument();
    const buttonRecipe = screen.getByTestId('0-recipe-card');
    expect(buttonRecipe).toBeInTheDocument();
    userEvent.click(buttonRecipe);
    expect(history.location.pathname).toBe('/foods/52977');
    const recipeSide = await screen.findByText('Side');
    expect(recipeSide).toBeInTheDocument();
  });
});
