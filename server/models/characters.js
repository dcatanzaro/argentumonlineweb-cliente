var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var Characters = new Schema({
    idAccount: String,
    name: String,
    idClase: Number,
    map: Number,
    posX: Number,
    posY: Number,
    gold: Number,
    idHead: Number,
    idLastHead: Number,
    idLastBody: Number,
    idLastHelmet: Number,
    idLastWeapon: Number,
    idLastShield: Number,
    idHelmet: Number,
    idWeapon: Number,
    idShield: Number,
    idBody: Number,
    idItemWeapon: Number,
    idItemBody: Number,
    idItemShield: Number,
    idItemHelmet: Number,
    spellsAcertados: Number,
    spellsErrados: Number,
    hp: Number,
    maxHp: Number,
    mana: Number,
    maxMana: Number,
    idRaza: Number,
    idGenero: Number,
    muerto: Boolean,
    minHit: Number,
    maxHit: Number,
    attrFuerza: Number,
    attrAgilidad: Number,
    attrInteligencia: Number,
    attrConstitucion: Number,
    privileges: Number,
    countKilled: Number,
    countDie: Number,
    exp: Number,
    expNextLevel: Number,
    level: Number,
    ip: String,
    banned: Date,
    dead: Boolean,
    criminal: Boolean,
    navegando: Boolean,
    npcMatados: Number,
    ciudadanosMatados: Number,
    criminalesMatados: Number,
    fianza: Number,
    connected: Boolean,
    items: [
        {
            _id: false,
            idPos: Number,
            idItem: Number,
            cant: Number,
            equipped: Boolean
        }
    ],
    spells: [
        {
            _id: false,
            idPos: Number,
            idSpell: Number
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("characters", Characters);
