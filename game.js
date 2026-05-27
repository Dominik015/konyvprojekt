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