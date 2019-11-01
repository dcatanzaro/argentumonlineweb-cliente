const tokenAuth = "Bearer token";

class CharacterController {
    constructor(characterService, accountService) {
        this.characterService = characterService;
        this.accountService = accountService;
    }

    async getCharacter(req, res, next) {
        const { idAccount, idCharacter, email } = req.query;
        const { authorization } = req.headers;

        if (authorization != tokenAuth) {
            return res.json({ err: true });
        }

        try {
            const account = await this.accountService.getAccount({
                _id: idAccount,
                email
            });

            let character = {};

            if (idCharacter) {
                character = await this.characterService.getCharacter({
                    _id: idCharacter,
                    idAccount
                });
            }

            res.json({ account, character });
        } catch (e) {
            res.json({ err: true, message: e.message });
        }
    }

    async saveCharacter(req, res) {
        const { idCharacter } = req.params;

        const character = await this.characterService.updateCharacter(
            idCharacter,
            req.body
        );

        res.json(character);
    }

    async getRankingGeneral(req, res, next) {
        const ranking = await this.characterService.getRankingGeneral();

        res.json(ranking);
    }

    async getCharactersByAccountId(req, res, next) {
        if (req.user) {
            const characters = await this.characterService.getCharactersByAccountId(
                req.user.accountId
            );

            res.json(characters);
        } else {
            res.json({});
        }
    }
}

module.exports = CharacterController;
