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
//bal útvonal
4: {
text: `
A bal oldali járat szűkebb, és a levegőben valami állati, rothadó szag terjeng.

A sötétség nem teljesen üres – mozog.

Egy pillanat alatt egy ORK tör elő a fal mellől, vad üvöltéssel, mintha már régóta várta volna, hogy valaki erre járjon.

A harc elkerülhetetlen.
`,
enemy: {
name: "Ork",
skill: 6,
health: 12
},
win: 5
},

5: {
text: `
Az Ork utolsó hörgése lassan elhal a folyosóban.

A csend most még nehezebb, mint a küzdelem előtti pillanatok.

A tested emlékeztet rá, hogy az út nem lesz könnyű – gyorsan falatozol valamit, hogy visszanyerd az erődet.

A folyosó végén egy masszív, repedezett faajtó áll, mintha évszázadok óta őrizne valamit.
`,
choices: [
{ text: "Kinyitod az ajtót", next: 6 }
]
},

6: {
text: `
A faajtó nehézkesen enged, mintha ellenállna.

Odabent egy elhagyott fegyverterem tárul fel, tele rozsdás páncélokkal és törött fegyverekkel.

A sarokban azonban valami nem illik a képbe: egy kard, amely mintha még mindig „élne”.

Gyengén pulzáló fényt bocsát ki.
`,
choices: [
{ text: "Felveszed a kardot", next: 7 },
{ text: "Továbbmész", next: 8 }
]
},

7: {
text: `
Ahogy megérinted, a kard hidegsége egy pillanatra végigfut a karodon, majd hirtelen melegség váltja fel.

Mintha valami ősi erő ébredne benne.

Nem csak egy fegyver – inkább egy döntés, ami rád lett bízva.
`,
onEnter: () => {

if(!gameState.events.foundMagicSword){

player.skill += 1;
player.inventory.push("Varázskard");
gameState.events.foundMagicSword = true;

updateStats();
updateInventory();

appendStory(`A varázskard ereje eggyé válik veled. Ügyességed +1!`);
}

},
choices: [
{ text: "Tovább", next: 8 }
]
},

8: {
text: `
A folyosó hirtelen elcsendesedik.

A sötétből lassú, nehéz léptek közelednek.

Egy HATALMAS OGRE lép elő, mintha maga a hegy szülte volna dühből és kőből.

A föld megremeg minden mozdulatára.
`,
enemy: {
name: "Ogre",
skill: 8,
health: 20
},
win: 9
},

9: {
text: `
Az Ogre végül térdre rogy, majd összecsuklik, mintha a saját súlya is túl sok lenne neki.

A csend most már természetellenesen üres.

A zsákmányai között egy bronzkulcs csillan meg.
`,
onEnter: () => {

if(!gameState.events.foundBronzeKey){
player.inventory.push("Bronzkulcs");
gameState.events.foundBronzeKey = true;
updateInventory();
}

},
choices: [
{ text: "Továbbmész", next: 10 }
]
},
10: {
text: `
A fal mögött egy rejtett nyílást találsz, amelyet korábban teljesen észrevehetetlenül rejtett el a kő.

A levegő innen hidegebb, és mintha mélyebb lenne a föld alatt a sötétség.
`,
choices: [
{ text: "Lemész", next: 11 }
]
},

11: {
text: `
Lépésről lépésre ereszkedsz le egy hatalmas, lávafényben pulzáló csarnokba.

A falak vörösen izzanak, mintha a föld maga is élne.

És a csarnok nem üres.
`,
enemy: {
name: "Csontváz Harcosok",
skill: 9,
health: 22
},
win: 12
},

12: {
text: `
A csontvázak széthullanak, mintha csak porból lettek volna összerakva.

A levegő azonban még mindig tele van velük – az emlékükkel.
`,
choices: [
{ text: "Belépsz tovább", next: 13 }
]
},

13: {
text: `
A sötétség sűrűbbé válik.

Valami nem csontból és nem húsból lép elő – hanem magából az árnyékból.

És figyel téged.
`,
enemy: {
name: "Árnydémon",
skill: 11,
health: 26
},
win: 14
},

14: {
text: `
Az Árnydémon sikoltása elhal, majd teljesen feloldódik a sötétségben.

Mintha soha nem is létezett volna.

De te tudod, hogy ez nem igaz.
`,
choices: [
{ text: "Tovább", next: 15 }
]
},

15: {
text: `
Előtted egy hatalmas aranyajtó áll.

Nem egyszerű kapu – inkább határ két világ között.

Mögötte valami vár.
`,
choices: [
{ text: "Belépsz", next: 16 }
]
},

16: {
text: `
A terem közepén Zagor lassan felemelkedik.

A levegő megváltozik körülötte – mintha a valóság is bizonytalanabbá válna.

A végső próba elkezdődik.
`,
enemy: {
name: "Zagor",
skill: 13,
health: 35
},
win: 17
},

17: {
text: `
A varázsló utolsó kiáltása visszhangzik a hegy belsejében, majd minden elcsendesedik.

A Tűzhegy többé nem ugyanaz.

És talán te sem.
`,
choices: [
{ text: "Újrakezdés", next: 1 }
]
},
//jobb útvonal
30: {
text: `
Egy elhagyatott tábor maradványaira bukkansz.

A tűzhely már rég kihűlt, de a jelenlét még mindig ott van – mintha valaki csak nemrég távozott volna.

Vagy talán soha nem is ment el teljesen.
`,
onEnter: () => {

if(!gameState.events.foundCampGold){
player.gold += 8;
gameState.events.foundCampGold = true;
updateStats();
appendStory(`A hamu között 8 aranyat találsz.`);
}

},
choices: [
{ text: "Továbbmész", next: 31 }
]
},

31: {
text: `
Egy mély szakadékhoz érsz, amelyen egy ősi, ingatag híd vezet át.

A mélységből hideg levegő áramlik fel, mintha lélegezne.
`,
choices: [
{ text: "Átmész", next: 32 }
]
},

32: {
text: `
A híd minden lépésnél nyikorog és remeg.

A fa alattad öreg, de még tart.

Valahol a mélyben víz csobog – vagy valami más.
`,
choices: [
{ text: "Tovább", next: 33 }
]
},

33: {
text: `
A fahíd elkezd repedni, mintha a súlyod alatt adná meg magát.

Gyorsan át kell érned a túloldalra, mielőtt teljesen összeomlik.

Fuss!
`,
choices: [
{ text: "Átfutás", next: 34 },
]
},

34: {
text: `
Sikeresen átérsz a hídon, de az utolsó lépésnél a fa ropogva adja meg magát, és egy nagy darab leszakad mögötted.

Nincsen visszaút. Csak előre.
`,
choices: [
{ text: "Tovább", next: 35 }
]
},

35: {
text: `
Egy fekete páncélba zárt lovag áll előtted.

A páncélja matt, mintha elnyelné a fényt.

Nem támad azonnal. Csak figyel.

Aztán felemeli a fegyverét.
`,
enemy: {
name: "Fekete Lovag",
skill: 10,
health: 24
},
win: 36
},


36: {
text: `
A fekete lovag összeomlik, páncélja üresen cseng a köveken.

A csend hirtelen túl tiszta.

A holttest mögött egy halványan pulzáló zöld kristály jelenik meg.
`,
choices: [
{ text: "Megérinted a kristályt", next: 37 },
{ text: "Továbbmész", next: 40 }
]
},

37: {
text: `
A kristály meleg fényt áraszt, és az erő visszatér a testedbe.
`,
onEnter: () => {

if(!gameState.events.healedCrystal){

player.health += 5;
if(player.health > player.maxHealth){
player.health = player.maxHealth;
}

gameState.events.healedCrystal = true;
updateStats();

appendStory("+5 életerő");
}
},
choices: [
{ text: "Tovább", next: 40 }
]
},

40: {
text: `
Egy elfeledett könyvtárba érkezel, ahol a könyvek pora évszázadok óta érintetlen.

A tudás itt nem halott – csak vár.
`,
choices: [
{ text: "Tovább", next: 41 }
]
},

41: {
text: `
Egy sötét cella mögött egy fogoly láncai csörrennek.

A szemei reményt mutatnak.

„Segíts rajtam… és elmondom Zagor gyengeségét.”

„Éhezem...”
`,
choices: [
{ text: "Elengeded", next: 42 },
{ text: "Eteted (-1 élelem, infó)", next: 43 },
{ text: "Otthagyod", next: 44 }
]
},

42: {
text: `
Kiszabadítod, de nem kapsz semmit cserébe.

A fogoly eltűnik a sötétben.
`,
choices: [
{ text: "Tovább", next: 44 }
]
},

43: {
text: `
A fogoly mohón eszik, majd rád néz.

„Zagor nem bírja a tiszta fényt… a kristályok gyengítik őt.”

Aztán eltűnik.
`,
onEnter: () => {

if(!gameState.events.prisonerHelped){

player.food -= 1;
if(player.food < 0) player.food = 0;

gameState.events.prisonerHelped = true;
updateStats();
}
},
choices: [
{ text: "Tovább", next: 44 }
]
},
44: {
text: `
Egy rejtett lépcső vezet még mélyebbre.

A levegő hidegebb, mintha a világ vége közeledne.
`,
choices: [
{ text: "Lemész", next: 45 }
]
},

45: {
text: `
A föld megremeg, és egy hatalmas Minotaurusz tör elő a sötétségből.

A dühe megelőzi a támadását.
`,
enemy: {
name: "Minotaurusz",
skill: 12,
health: 32
},
win: 46
},

46: {
text: `
A Minotaurusz lassan összeomlik, és a földre zuhan.

A barlang ismét csendes.
`,
choices: [
{ text: "Belépsz", next: 47 }
]
},
47: {
text: `
Egy fekete, lebegő gömb forog előtted.

A tér mintha meghajlana körülötte.

A döntésed itt válik véglegessé.
`,
choices: [
{ text: "Elpusztítod", next: 48 },
{ text: "Megérinted", next: 49 }
]
},

48: {
text: `
A gömb széthasad, és a sötétség összeomlik.

A Tűzhegy története lezárul.
`,
choices: [
{ text: "Újrakezdés", next: 1 }
]
},

49: {
text: `
Ahogy megérinted a gömböt, a világ megremeg.

A tested lassan kővé válik.

Nem érzel fájdalmat. Csak csendet.

A Tűzhegy örökre elnyel.
`,
choices: [
{ text: "Vége", next: 1 }
]
}

};

function appendStory(text){

document.getElementById("storyText").innerHTML += `
<br><br>${text}
`;

}

function consumeFood(){

player.food--;

if(player.food < 0){
player.food = 0;
}

updateStats();

if(player.food <= 0){

alert("Elfogyott az élelmed.");

location.reload();

}

}

function rollDice(count = 2){

let total = 0;

for(let i=0;i<count;i++){

total += Math.floor(Math.random()*6)+1;

}

return total;

}

function createCharacter(){

player.skill = rollDice(1)+6;
player.luck = rollDice(1)+6;
player.health = player.maxHealth;

updateStats();
updateInventory();

}