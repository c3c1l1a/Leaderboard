export default class {
  constructor(name) {
    this.name = name;
    this.id = '';
    this.scores = [];
    this.baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
  }

  async creteNewGame() {
    let localGame = JSON.parse(localStorage.getItem('game'));

    if (localGame === null) {
      const response = await fetch(`${this.baseUrl}games/`, {
        method: 'POST',
        body: JSON.stringify({ name: this.name }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const game = await response.json();
      this.id = game.result.match(/\b\w{20,}\b/);

      localGame = {
        name: this.name,
        id: this.id[0],
        scores: this.scores,
      };
      localStorage.setItem('game', JSON.stringify(localGame));
    }
  }

  async postNewScore(value) {
    const localGame = JSON.parse(localStorage.getItem('game'));
    const endpoint = `games/${localGame.id}/scores/`;
    await fetch(this.baseUrl + endpoint, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  async getAllScores() {
    const localGame = JSON.parse(localStorage.getItem('game'));
    const endpoint = `games/${localGame.id}/scores/`;
    const response = await fetch(this.baseUrl + endpoint);
    const scores = await response.json();

    localGame.scores = scores.result;
    this.scores = scores.result;
    localStorage.setItem('game', JSON.stringify(localGame));
  }

  addScore() {
    const form = document.querySelector('.add-score-form');
    const refreshButton = document.querySelector('.refresh-button');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const score = new FormData(e.target);
      const value = Object.fromEntries(score.entries());

      this.postNewScore({ user: value.name, score: value.score });
      refreshButton.style.display = 'flex';
      // refreshButton.style.display = 'flex'
      e.target.reset();
    });
  }

  domReload() {
    const scoresList = document.querySelector('.scores-list');
    const refreshButton = document.querySelector('.refresh-button');

    const localGame = JSON.parse(localStorage.getItem('game'));
    scoresList.innerHTML = '';

    if (localGame !== null) {
      this.scores = localStorage.scores;
      if (localGame.scores.length > 0) refreshButton.style.display = 'flex';
      localGame.scores.forEach((item, index) => {
        let gray = '';
        if (index % 2 === 1) {
          gray = 'gray';
        }

        scoresList.innerHTML += `
          <li class="${gray}">
              <span>${item.user}</span>
              <span>${item.score}</span>
          </li>
        `;
      });
    }
  }

  refresh() {
    const refreshButton = document.querySelector('.refresh-button');
    refreshButton.addEventListener('click', async (e) => {
      e.preventDefault();

      await this.getAllScores();
      this.domReload();
    });
  }
}