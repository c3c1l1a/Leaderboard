export default class {
  constructor(name){
    this.name = name;
    this.id = '';
  }

  async creteNewGame(){
    let localGame = JSON.parse(localStorage.getItem('game'));

    if (localGame === null){
      const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

      const request = new Request(baseUrl+'games/', {
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
        id: this.id
      }
      localStorage.setItem('game', JSON.stringify(localGame));
    }
  }

  start(){
  }
}