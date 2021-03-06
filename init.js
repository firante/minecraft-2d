const Player = (function () {
  let instance;
  
  function createInstance(context, xPlayer, yPlayer) {
    const img = new Image;
    img.onload = function() {
      context.drawImage(img, xPlayer, yPlayer);
    };
    img.src = 'images/Spider-icon.png';
    return img;
  }
  
  return {
    getInstance: function (context, xPlayer, yPlayer) {
      if (!instance) {
        instance = createInstance(context, xPlayer, yPlayer);
      }
      return instance;
    }
  };
})();

function drowStone(context, xStone, yStone) {
  context.strokeStyle = '#4a6084';
  context.beginPath();
  context.rect(xStone, yStone, 10, 10);
  context.stroke();
}

function drowBaseGrid(context) {
  for(let i = 30; i < 600; i+=30) {
    context.strokeStyle = '#000000';
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, 600);
    context.moveTo(0, i);
    context.lineTo(600, i);
    context.stroke();
  }
}

function drowPlayer(context, xPlayer, yPlayer) {
  context.drawImage(Player.getInstance(context, xPlayer, yPlayer), xPlayer, yPlayer);

  // context.beginPath();
  // context.rect(xPlayer, yPlayer, 10, 10);
  // context.strokeStyle = '#00ff55';
  // context.stroke();
  
}

(function() {
  let inter = null;
  let xPlayer = 303;
  let yPlayer = 303;
  let xStone1 = 430;
  let yStone1 = 130;
  let xStone2 = 640;
  let yStone2 = 220;
  const gameArea = document.getElementById('game-area');
  gameArea.width = 600;
  gameArea.height = 600;
  const context = gameArea.getContext('2d');
  
  drowBaseGrid(context);
  drowPlayer(context, xPlayer, yPlayer);
  drowStone(context, xStone1, yStone1);
  drowStone(context, xStone2, yStone2);

  document.addEventListener('keyup', (event) => {
    if(inter) return;
    if(event.keyCode === 39) {
      const x = xPlayer;
      const y = yPlayer;
      const xs1 = xStone1;
      const ys1 = yStone1;
      const xs2 = xStone2;
      const ys2 = yStone2;
      inter = setInterval(() => {
	if(xStone1 === xs1 - 29) {
	  clearInterval(inter);
	  inter = null;
	}
	context.clearRect(0, 0, 600, 600);
	xStone1 -= 1;
	xStone2 -= 1;

	drowBaseGrid(context);
	drowPlayer(context, xPlayer, yPlayer);
	drowStone(context, xStone1, yStone1);
	drowStone(context, xStone2, yStone2);
      }, 30);
    } else if(event.keyCode === 40) {
      if(yPlayer >= 580) return;
      const x = xPlayer;
      const y = yPlayer;
      inter = setInterval(() => {
	if(yPlayer === y + 29) {
	  clearInterval(inter);
	  inter = null;
	}
	context.clearRect(0, 0, 600, 600);
	yPlayer += 1;
	
	drowBaseGrid(context);
	drowPlayer(context, xPlayer, yPlayer);
      }, 30);
    } else if(event.keyCode === 37) {
      const x = xPlayer;
      const y = yPlayer;
      const xs1 = xStone1;
      const ys1 = yStone1;
      const xs2 = xStone2;
      const ys2 = yStone2;
      inter = setInterval(() => {
	if(xStone2 === xs2 + 29) {
	  clearInterval(inter);
	  inter = null;
	}
	context.clearRect(0, 0, 600, 600);
	xStone2 += 1;
	xStone1 += 1;
	
	drowBaseGrid(context);
	drowPlayer(context, xPlayer, yPlayer);
	drowStone(context, xStone1, yStone1);
	drowStone(context, xStone2, yStone2);
      }, 30);
    } else if(event.keyCode === 38) {
      if(yPlayer <= 10) return;
      const xs1 = xStone1;
      const ys1 = yStone1;
      const xs2 = xStone2;
      const ys2 = yStone2;
      inter = setInterval(() => {
	if(yPlayer === y - 29) {
	  clearInterval(inter);
	  inter = null;
	}
	context.clearRect(0, 0, 600, 600);
	yPlayer -= 1;
	
	drowBaseGrid(context);
	drowPlayer(context, xPlayer, yPlayer);
      }, 30);
    }
  }, true);
  
})();
