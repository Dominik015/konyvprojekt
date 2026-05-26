const player = {

  skill: 0,

  maxHealth: 20,

  health: 20,

  luck: 0,

  gold: 12,

  food: 10,

  inventory: [
    "Kard",
    "Pajzs",
    "Lámpás",
    "Kötél"
  ]

};

let godMode = false;

const gameState = {

  currentSection: 1,

  currentEnemy: null,

  winSection: null,

  events: {

    foundCampGold: false,
    foundMagicSword: false,
    foundBronzeKey: false,
    healedCrystal: false,
    foundSilverRing: false,
    drankPotion: false,
    foundTorchGem: false,
    foundCrown: false,
    fedPrisoner: false,
    openedVault: false

  }

};