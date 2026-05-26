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

let currentEnemy = null;
let winSection = null;

const sections = {

1: {
text: `
A nap utolsó sugarai vérvörösre festik az eget a Tűzhegy felett, mintha maga az ég is figyelmeztetne: aki ide belép, az nem ugyanazként tér vissza.

A hegy oldalában egy sötét, természetellenesen szabályos barlangnyílás tátong. Nem a természet munkája – inkább mintha valaki vagy valami szándékosan vájta volna ki.

A falvakban suttogva mesélnek Zagorról, a Tűzhegy varázslójáról, aki olyan hatalmat birtokolt, amely képes volt királyokat térdre kényszeríteni és városokat eltüntetni.

Sokan indultak el, hogy megszerezzék a kincsét. Egyikük sem tért vissza.

Most te állsz a bejárat előtt.

A kardod súlya emlékeztet rá, hogy ez nem mese.

Mit teszel?
`,
choices: [
{ text: "Belépsz a barlangba", next: 2 },
{ text: "Átvizsgálod a felszerelésed", next: 3 }
]
},

2: {
text: `
Ahogy belépsz, a külvilág zajai hirtelen megszűnnek, mintha a hegy maga nyelné el őket.

A barlang falai nedvesek, és minden lépésed visszhangként tér vissza, mintha valaki mögötted is járna.

A levegő egyre nehezebb, fémes íz ül a nyelvedre.

Nem sokkal beljebb az út kettéválik – két sötét irány, amelyek mintha külön akaratot hordoznának.

Mindkettő hív.
`,
choices: [
{ text: "Bal oldali járat", next: 4 },
{ text: "Jobb oldali járat", next: 30 }
]
},

3: {
text: `
Letérdelsz egy pillanatra, és átnézed a felszerelésed.

A kardod éle még mindig biztos, a lámpásod fénye gyengén pislákol, de kitart.

A csend körülötted nem megnyugtató – inkább olyan, mintha a barlang figyelne téged.

Amikor végül felállsz, a döntésed már megszületett.
`,
choices: [
{ text: "Belépsz a barlangba", next: 2 }
]
},
