var yourPoints = 0;
var allcards;
var ycard1, ycard2, hcard1, hcard2, hcard3, hcard4, hcard5; // ycard1 and ycard2 are the player's cards, hcard1-5 are house cards
var deck;
var isStraight;
var isFlush;

window.onload = function () {
  allcards = allCards();
  assignCards();
  displayInitialCards();
  getRandomInt();
  dealCards();
  generateCards();
  calculatePoints();
  rankHand();
};

function allCards() {
  let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let face = ["D", "C", "H", "S"];
  let allcards = [];

  for (let i = 0; i < face.length; i++) {
    for (let j = 0; j < cards.length; j++) {
      allcards.push([cards[j], face[i]]);
    }
  }
  return allcards;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function dealCards() {
  deck = [];
  allcards = allCards(); // regenerates the deck for each time

  for (var i = 0; i < 7; i++) {
    var random = getRandomInt(allcards.length);
    deck.push(allcards[random]);
    allcards.splice(random, 1); // removes the random card from deck
  }
}

function assignCards() {
  dealCards();
  ycard1 = deck[0];
  ycard2 = deck[1];
  hcard1 = deck[2];
  hcard2 = deck[3];
  hcard3 = deck[4];
  hcard4 = deck[5];
  hcard5 = deck[6];
}

function displayInitialCards() {
  // initial card display
  document.getElementById(
    "yhidden"
  ).src = `./cards/${ycard1[0]}-${ycard1[1]}.png`;
  document.getElementById(
    "yhidden2"
  ).src = `./cards/${ycard2[0]}-${ycard2[1]}.png`;

  // initial card display
  document.getElementById("hhidden").src = `./cards/BACK.png`;
  document.getElementById("hhidden2").src = `./cards/BACK.png`;
  document.getElementById("hhidden3").src = `./cards/BACK.png`;
  document.getElementById("hhidden4").src = `./cards/BACK.png`;
  document.getElementById("hhidden5").src = `./cards/BACK.png`;

  // updates number of points
  document.getElementById("your-points").innerText = yourPoints;
}

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("Generate").addEventListener("click", function () {
    generateCards();
    generateCommunityCards();
  });
});

function generateCards() {
  assignCards();
  displayInitialCards();
}
function generateCommunityCards() {
  // generates community cards
  hcard1 = deck[2];
  hcard2 = deck[3];
  hcard3 = deck[4];
  hcard4 = deck[5];
  hcard5 = deck[6];

  // updates card pngs
  document.getElementById(
    "hhidden"
  ).src = `./cards/${hcard1[0]}-${hcard1[1]}.png`;
  document.getElementById(
    "hhidden2"
  ).src = `./cards/${hcard2[0]}-${hcard2[1]}.png`;
  document.getElementById(
    "hhidden3"
  ).src = `./cards/${hcard3[0]}-${hcard3[1]}.png`;
  document.getElementById(
    "hhidden4"
  ).src = `./cards/${hcard4[0]}-${hcard4[1]}.png`;
  document.getElementById(
    "hhidden5"
  ).src = `./cards/${hcard5[0]}-${hcard5[1]}.png`;


  calculatePoints();
}

function calculatePoints() {
  var playerHand = [ycard1, ycard2, hcard1, hcard2, hcard3, hcard4, hcard5];

  if (isStraight(playerHand) || isFlush(playerHand)) {
    yourPoints += 10; 
  }

  var handRanks = rankHand(playerHand);

  if (handRanks.pair) {
    yourPoints += 1; // points for pair
  }

  if (handRanks.triple) {
    yourPoints += 5; // points for triple
  }

  if (handRanks.quad) {
    yourPoints += 15; // points for quad
  }

  if (handRanks.fullHouse) {
    yourPoints += 12; // points for full house
  }

}

function rankHand(hand) {
  var values = hand.map((card) => card[0]);
  var valueCounts = {};

  for (var i = 0; i < values.length; i++) {
    valueCounts[values[i]] = (valueCounts[values[i]] || 0) + 1;
  }

  var handRanks = {
    pair: false,
    triple: false,
    quad: false,
    fullHouse: false,
  };

  for (var value in valueCounts) {
    if (valueCounts[value] === 2) {
      handRanks.pair = true;
    } else if (valueCounts[value] === 3) {
      handRanks.triple = true;
    } else if (valueCounts[value] === 4) {
      handRanks.quad = true;
    }
  }

  handRanks.fullHouse = handRanks.pair && handRanks.triple;

  return handRanks;
}
function isStraight(hand) {
  var values = hand.map((card) => card[0]).sort((a, b) => a - b);
  for (var i = 0; i < values.length - 4; i++) {
    if (
      values[i] === values[i + 1] - 1 &&
      values[i] === values[i + 2] - 2 &&
      values[i] === values[i + 3] - 3 &&
      values[i] === values[i + 4] - 4
    ) {
      return true;
    }
  }
  return false;
}

function isFlush(hand) {
  var suits = hand.map((card) => card[1]);
  var counts = {};
  for (var i = 0; i < suits.length; i++) {
    counts[suits[i]] = (counts[suits[i]] || 0) + 1;
    if (counts[suits[i]] === 5) {
      return true;
    }
  }
  return false;
}