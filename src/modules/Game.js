export default class {
  constructor(name){
    this.name = name;
    this.id = '';
    this.scores = [];
    this.baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
  }

  async creteNewGame(){
    let localGame = JSON.parse(localStorage.getItem('game'));

    if (localGame === null){

      const request = new Request(this.baseUrl+'games/', {
        method: 'POST',
        body: JSON.stringify({name: this.name}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        } 
      });


      const response = await fetch(request);
      const game = await response.json();

      this.id = game.result.match(/\b\w{20,}\b/)[0];

      localGame = {
        name: this.name,
        id: this.id,
        scores: this.scores
      }
      localStorage.setItem('game', JSON.stringify(localGame));
    }
  }

  async postNewScore(value){
    let localGame = JSON.parse(localStorage.getItem('game'));
    let endpoint = `games/${localGame.id}/scores/`;
    const request = new Request(this.baseUrl+endpoint, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      } 
    });

    await fetch(request);
  }

  addScore(){
    const form = document.querySelector('.add-score-form');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const score = new FormData(e.target);
      const value = Object.fromEntries(score.entries());

      this.postNewScore({user: value.name, score: value.score});
      e.target.reset();
    });
  }
}