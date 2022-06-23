/**
* @jest-environment jsdom
*/

import Game from '../modules/Game';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const game = new Game('test Game');

describe('New test is created in the leaderboard api and cached', ()=> {
  test('New game is created in leaderboard api', async () => {
    fetch.mockResponseOnce(JSON.stringify({result: 'Game with ID: Zl4d7IVkemOTTVg2fUdz added.'}));
    await game.creteNewGame();

    expect(game.id).toEqual(JSON.parse(localStorage.getItem('game')).id);
  });
});
 
