let self = {};

self.clases = {
    mago: 1,
    clerigo: 2,
    guerrero: 3,
    asesino: 4,
    ladron: 5,
    bardo: 6,
    druida: 7,
    paladin: 8,
    cazador: 9,
    trabajador: 10,
    pirata: 11
};

self.nameClases = [];
self.nameClases[self.clases.mago] = "Mago";
self.nameClases[self.clases.clerigo] = "Clérigo";
self.nameClases[self.clases.guerrero] = "Guerrero";
self.nameClases[self.clases.asesino] = "Asesino";
self.nameClases[self.clases.ladron] = "Ladrón";
self.nameClases[self.clases.bardo] = "Bardo";
self.nameClases[self.clases.druida] = "Druida";
self.nameClases[self.clases.paladin] = "Paladín";
self.nameClases[self.clases.cazador] = "Cazador";
self.nameClases[self.clases.trabajador] = "Trabajador";
self.nameClases[self.clases.pirata] = "Pirata";

self.generos = {
    hombre: 1,
    mujer: 2
};

self.nameGeneros = [];
self.nameGeneros[self.generos.hombre] = "Hombre";
self.nameGeneros[self.generos.mujer] = "Mujer";

self.razas = {
    humano: 1,
    elfo: 2,
    elfoDrow: 3,
    enano: 4,
    gnomo: 5
};

self.nameRazas = [];
self.nameRazas[self.razas.humano] = "Humano";
self.nameRazas[self.razas.elfo] = "Elfo";
self.nameRazas[self.razas.elfoDrow] = "Elfo Drow";
self.nameRazas[self.razas.enano] = "Enano";
self.nameRazas[self.razas.gnomo] = "Gnomo";

module.exports = self;
