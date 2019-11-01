const Characters = require("../models/characters");

class CharacterService {
    constructor() {}

    getRankingGeneral() {
        const selectQuery = {
            name: 1,
            level: 1,
            idHead: 1,
            idHelmet: 1,
            idBody: 1,
            idClase: 1,
            criminal: 1,
            idLastHead: 1,
            idLastBody: 1,
            idRaza: 1,
            navegando: 1,
            ciudadanosMatados: 1,
            criminalesMatados: 1,
            dead: 1
        };

        const query = Characters.find({ privileges: 0 }, selectQuery)
            .sort({ level: -1 })
            .limit(50)
            .lean();

        return query;
    }

    getCharacter(data) {
        const query = Characters.findOne(data).lean();

        return query;
    }

    getCharactersByAccountId(accountId) {
        const selectQuery = {
            name: 1,
            idHead: 1,
            idBody: 1,
            idShield: 1,
            idWeapon: 1,
            idHelmet: 1
        };

        const query = Characters.find(
            { idAccount: accountId },
            selectQuery
        ).lean();

        return query;
    }

    addCharacter(data) {
        const newCharacter = new Characters(data);

        return newCharacter.save();
    }

    updateCharacter(id, data) {
        const character = Characters.findOneAndUpdate({ _id: id }, data).exec();

        return character;
    }

    findCharacterByEmail(email) {
        const query = Characters.findOne({ email: email }).exec();

        return query;
    }

    findCharacterById(id) {
        const query = Characters.findOne({ _id: id }).exec();

        return query;
    }
}

module.exports = CharacterService;
