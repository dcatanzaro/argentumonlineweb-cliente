class User {
    constructor() {
        this.moving = false;

        this.addtoUserPos = {
            x: 0,
            y: 0
        };

        this.pos = {
            x: 0,
            y: 0
        };

        this.id = 0;

        this.items = {};
        this.spells = {};

        this.clan = "";
        this.color = "#3333ff";
        this.exp = 0;
        this.expNextLevel = 0;
        this.gold = 0;
        this.heading = 0;
        this.hp = 0;
        this.id = 0;
        this.idBody = 0;
        this.idClase = 0;
        this.idHead = 0;
        this.idHelmet = 0;
        this.idShield = 0;
        this.idWeapon = 0;
        this.inmovilizado = 0;
        this.level = 0;
        this.mana = 0;
        this.maxHp = 0;
        this.maxMana = 0;
        this.moving = false;
        this.nameCharacter = "";
        this.navegando = 0;
        this.privileges = 0;
        this.zonaSegura = 0;
        this.attrFuerza = 0;
        this.attrAgilidad = 0;
    }
}

export default User;
