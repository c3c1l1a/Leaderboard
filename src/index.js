import './css/style.css';
import './index.html';

import Game from './modules/Game.js';

const game = new Game('Coolest Game');
game.creteNewGame();
game.addScore();
game.refresh();
game.domReload();