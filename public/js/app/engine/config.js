var versionConfig = 103;

//Variables
var canvasSize = {
    width: 544,
    height: 544
};

var canvas = {};

var direcciones = {
    up: 1,
    down: 2,
    right: 3,
    left: 4
};

var mapping = {
    "pdf": "application/pdf",
    "zip": "application/zip",
    "rar": "application/rar",
    "json": "application/json",
    "mid": "audio/mid",
    "mp3": "audio/mpeg",
    "bmp": "image/bmp",
    "gif": "image/gif",
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "svg": "image/svg+xml",
    "xml": "text/xml"
};

var seguroActivado = true;

var engineStart = false;

var moving = false;

var varCloseForce = false;

var HalfWindowTileHeight = Math.floor((canvasSize.height / 32) / 2);
var HalfWindowTileWidth = Math.floor((canvasSize.width / 32) / 2);

var TileBufferSize = 9;

var XMinMapSize = 1;
var XMaxMapSize = 100;
var YMinMapSize = 1;
var YMaxMapSize = 100;

var OffsetXHead = 8;
var OffsetYHead = 38;

var actTechos = true;

var mapNumber = 1;

var timeWalkMS = 230;

var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

var cargaCompleta = false;
var mapaCargado = false;

var mapa = {};

var maxMapX = 100;
var maxMapY = 100;

var dialogs = {};

var spells = {};
var items = {};

var textMaxLength = 140;
var manaLength = 124;
var hpLength = 124;
var xpLength = 223;
var pingStart = 0;

var intervalSpell = 750;
var rangeInterval = intervalSpell;
var intervalHit = 1000;
var intervalItem = 200;

var timeItemStart = 0;
var timeSpellStart = 0;
var timeHitStart = 0;
var timeRangeStart = 0;
var usersOnline = 0;

//Conections
var debug = true;

var descClient = {};

var PROD_SERVER_ENDPOINT = "ws://0.0.0.0:7666";
var LOCAL_SERVER_ENDPOINT = "ws://127.0.0.1:7666";

var hechizoSelected = 0;
var itemSelected = 0;

var lastClickIdItem = 0;
var clickUse = 0;

var nameKeyCode = {};
nameKeyCode.flechaArriba = 0;
nameKeyCode.flechaAbajo = 1;
nameKeyCode.flechaIzquierda = 2;
nameKeyCode.flechaDerecha = 3;
nameKeyCode.usar = 4;
nameKeyCode.atacar = 5;
nameKeyCode.agarrar = 6;
nameKeyCode.tirar = 7;
nameKeyCode.equipar = 8;
nameKeyCode.domar = 9;
nameKeyCode.robar = 10;
nameKeyCode.seguro = 11;

var keyCodeDefault = [];
//Flecha Arriba
keyCodeDefault[0] = 38;
//Flecha Abajo
keyCodeDefault[1] = 40;
//Flecha Izquierda
keyCodeDefault[2] = 37;
//Flecha Derecha
keyCodeDefault[3] = 39;
//Usar
keyCodeDefault[4] = 85;
//Atacar
keyCodeDefault[5] = 17;
//Agarrar
keyCodeDefault[6] = 65;
//Tirar
keyCodeDefault[7] = 84;
//Equipar
keyCodeDefault[8] = 69;
//Domar
keyCodeDefault[9] = 68;
//Robar
keyCodeDefault[10] = 82;
//Seguro
keyCodeDefault[11] = 83;

var keyCodeDefaultReset = [];
//Flecha Arriba
keyCodeDefaultReset[0] = 38;
//Flecha Abajo
keyCodeDefaultReset[1] = 40;
//Flecha Izquierda
keyCodeDefaultReset[2] = 37;
//Flecha Derecha
keyCodeDefaultReset[3] = 39;
//Usar
keyCodeDefaultReset[4] = 85;
//Atacar
keyCodeDefaultReset[5] = 17;
//Agarrar
keyCodeDefaultReset[6] = 65;
//Tirar
keyCodeDefaultReset[7] = 84;
//Equipar
keyCodeDefaultReset[8] = 69;
//Domar
keyCodeDefaultReset[9] = 68;
//Robar
keyCodeDefaultReset[10] = 82;
//Seguro
keyCodeDefaultReset[11] = 83;

var pageRanking = 1;

var keyCodeMap = {
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

var keysTemp = [];

var feedBackButtonOpen = false;

var volume = 0.5;

var opacity = 0;

var selectedMacro;
var itemSelectedMacro;
var spellSelectedMacro;
var keySelectedMacro;
var fromCharSelectedMacro;
var teclasMacros = [];
var arMacros = {};

var objType = {
    'comida': 1,
    'armas': 2,
    'armaduras': 3,
    'arboles': 4,
    'dinero': 5,
    'puerta': 6,
    'objetoContenedor': 7,
    'carteles': 8,
    'llaves': 9,
    'foros': 10,
    'pociones': 11,
    'libros': 12,
    'bebidas': 13,
    'lenia': 14,
    'fogata': 15,
    'escudos': 16,
    'cascos': 17,
    'anillos': 18,
    'teleport': 19,
    'muebles': 20,
    'joyas': 21,
    'yacimientos': 22,
    'metales': 23,
    'pergaminos': 24,
    'aura': 25,
    'instrumentosMusicales': 26,
    'yunque': 27,
    'fraguas': 28,
    'gemas': 29,
    'flores': 30,
    'barcos': 31,
    'flechas': 32,
    'botellasVacias': 33,
    'botellasLlenas': 34,
    'manchas': 35
};