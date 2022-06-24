/**
* @jest-environment jsdom
*/

import Game from '../modules/Game';
import fetchMock from 'jest-fetch-mock';




fetchMock.enableMocks();
const game = new Game('test Game');
document.body.innerHTML = `
  <header>
      <h1>Leaderboard</h1>
  </header>
  
  <main>
      <section class="scores">
          <div class="scores-header">
              <h2>Resent scores</h2>
              <a class="refresh-button" href="#">Refresh</a>    
          </div>
          <ul class="scores-list">
              <li>
                  <span>Name:</span>
                  <span>100</span>
              </li>
              <li class="gray">
                  <span>Name:</span>
                  <span>20</span>
              </li>
              <li >
                  <span>Name:</span>
                  <span>50</span>
              </li>
              <li class="gray">
                  <span>Name:</span>
                  <span>78</span>
              </li>
              <li>
                  <span>Name:</span>
                  <span>125</span>
              </li>
              <li class="gray">
                  <span>Name:</span>
                  <span>77</span>
              </li>
              <li>
                  <span>Name:</span>
                  <span>42</span>
              </li>
          </ul>
      </section>
      <section class="add-score">
          <h2>Add your score</h2>
          <form class="add-score-form">
              <input type="text" name="name" required>
              <input type="number" name="score" required>
              <button type="submit">Submit</button>
          </form>
      </section>
  </main>
`

describe('Game', ()=> {
  test('New game is created in leaderboard API', async () => {
    fetch.mockResponseOnce(JSON.stringify({result: 'Game with ID: Zl4d7IVkemOTTVg2fUdz added.'}));
    await game.creteNewGame();
    expect(game.id).toEqual(JSON.parse(localStorage.getItem('game')).id);
  });

  test('Add score to leaderboard API', async ()=> {
    fetch.mockResponseOnce(JSON.stringify({result: 'Leaderboard score created correctly.'}));
    await game.addScore();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('Fetch scores from API using refresh button', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      "result": [
          {
              "user": "John Doe",
              "score": 42
          },
          {
              "user": "Peter Parker",
              "score": 35
          },
          {
              "user": "Wonder Woman",
              "score": 50
          }
      ]
    }));
    await game.refresh();
    expect(game.scores[1].user).toEqual('Peter Parker');
    expect(game.scores[0].user).toEqual(JSON.parse(localStorage.getItem('game')).scores[0].user);
  });

});


