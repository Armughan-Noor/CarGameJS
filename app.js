var score = 0;
var scoreElement;
var point;
document.addEventListener("DOMContentLoaded", () => {
  var car = document.querySelector(".car");

  function start() {
    var selectCoin;
    var selectCoinName;
    var currentLeft = parseInt(car.style.left) || 300;

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        currentLeft += 10; // Adjust the value as you like
      } else if (event.key === "ArrowLeft") {
        currentLeft -= 10; // Adjust the value as you like
      }
      if (currentLeft <= -10 || currentLeft > 600) {
        alert("Car crashed " + currentLeft + "px");
        point =0;
        scoreElement.innerHTML = point
        currentLeft = 300; // Set the position to 300px after a crash
      }
      car.style.left = currentLeft + "px";
    });

    function moveCoin(coinName) {
      var coinVariable = document.querySelector(coinName);
      // console.log(coinVariable);
      var coinStyles = getComputedStyle(coinVariable);
      var coinBottom = parseInt(coinStyles.getPropertyValue("bottom"));
      coinBottom -= 10;
      var coinKaLeft = parseInt(coinStyles.getPropertyValue("left"));
      var coinKaRight = parseInt(coinStyles.getPropertyValue("width"));
      coinKaRight = coinKaRight + coinKaLeft;
      var difference = currentLeft - coinKaLeft;
      var currentRight = 80;

      currentRight = currentRight + currentLeft;
      if (difference < 0) {
        difference *= -1;
      }
      if (
        coinKaLeft >= currentLeft &&
        coinKaRight <= currentRight &&
        coinBottom <= 100
      ) {
        scoreElement = document.getElementById("score");
        point = Number(scoreElement.innerText);
        scoreElement.innerHTML = point + 20;
        coinVariable.remove();
      }

      if (coinBottom >= 10) {
        coinVariable.style.bottom = coinBottom + "px";
      } else {
        coinVariable.remove();
      }
    }

    function genCoin(className) {
      return `<div class="${className}">$</div>`;
    }

    function randomCoin() {
      var coinClassName = ["coin", "coin0", "coin1"];
      var coinClassNameIndex = Math.floor(Math.random() * 3);
      return coinClassName[coinClassNameIndex];
    }

    function renderCoin() {
      // Remove previous coins
      var previousCoins = document.querySelectorAll(".coin-rendered");
      previousCoins.forEach((coin) => {
        coin.remove();
      });

      selectCoin = randomCoin();
      const container = document.querySelector(".main-coin");
      container.innerHTML += genCoin(selectCoin);
      selectCoinName = "." + selectCoin;

      // Add class to newly rendered coin
      var newCoin = document.querySelector(selectCoinName);
      newCoin.classList.add("coin-rendered");
    }

    setInterval(renderCoin, 3000);
    setInterval(function () {
      moveCoin(selectCoinName);
    }, 50);
  }

  start();
});
