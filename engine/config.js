//Variables
let self = {};

self.ws = {};

self.canvasSize = {
    width: 544,
    height: 544
};

self.canvas = {};

self.direcciones = {
    up: 1,
    down: 2,
    right: 3,
    left: 4
};

self.seguroActivado = true;

self.engineStart = false;

self.moving = false;

self.varCloseForce = false;

self.TileBufferSize = 9;

self.XMinMapSize = 1;
self.XMaxMapSize = 100;
self.YMinMapSize = 1;
self.YMaxMapSize = 100;

self.OffsetXHead = 8;

self.actTechos = true;

self.mapNumber = 1;

self.timeWalkMS = 230;

self.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

self.dialogs = {};

self.spells = {};
self.items = {};

self.textMaxLength = 140;
self.manaLength = 124;
self.hpLength = 124;
self.xpLength = 223;
self.pingStart = 0;

self.intervalSpell = 750;
self.rangeInterval = self.intervalSpell;
self.intervalHit = 1000;
self.intervalItem = 200;

self.timeItemStart = 0;
self.timeSpellStart = 0;
self.timeHitStart = 0;
self.timeRangeStart = 0;
self.usersOnline = 0;

//Conections
self.debug = true;

self.descClient = {};

self.PROD_SERVER_ENDPOINT = "";
self.LOCAL_SERVER_ENDPOINT = "ws://127.0.0.1:7666";

self.hechizoSelected = 0;
self.itemSelected = 0;

self.lastClickIdItem = 0;
self.clickUse = 0;

self.nameKeyCode = {
    flechaArriba: 0,
    flechaAbajo: 1,
    flechaIzquierda: 2,
    flechaDerecha: 3,
    usar: 4,
    atacar: 5,
    agarrar: 6,
    tirar: 7,
    equipar: 8,
    domar: 9,
    robar: 10,
    seguro: 11
};

self.keyCodeMap = {
    8: "Volver",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Ctrl",
    18: "Alt",
    19: "PauseBreak",
    20: "Mayus",
    27: "Esc",
    32: "Barra",
    33: "Re Page",
    34: "Av Page",
    35: "End",
    36: "Home",
    37: "Flecha Izquierda",
    38: "Flecha Arriba",
    39: "Flecha Derecha",
    40: "Flecha Abajo",
    43: "+",
    44: "PrintScreen",
    45: "Insert",
    46: "Supr",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock"
};

self.keysTemp = [];

self.feedBackButtonOpen = false;

self.volume = 0.5;

self.opacity = 0;

self.selectedMacro;
self.itemSelectedMacro;
self.spellSelectedMacro;
self.keySelectedMacro;
self.fromCharSelectedMacro;
self.teclasMacros = [];
self.arMacros = {};

self.objType = {
    comida: 1,
    armas: 2,
    armaduras: 3,
    arboles: 4,
    dinero: 5,
    puerta: 6,
    objetoContenedor: 7,
    carteles: 8,
    llaves: 9,
    foros: 10,
    pociones: 11,
    libros: 12,
    bebidas: 13,
    lenia: 14,
    fogata: 15,
    escudos: 16,
    cascos: 17,
    anillos: 18,
    teleport: 19,
    muebles: 20,
    joyas: 21,
    yacimientos: 22,
    metales: 23,
    pergaminos: 24,
    aura: 25,
    instrumentosMusicales: 26,
    yunque: 27,
    fraguas: 28,
    gemas: 29,
    flores: 30,
    barcos: 31,
    flechas: 32,
    botellasVacias: 33,
    botellasLlenas: 34,
    manchas: 35
};

export default self;
