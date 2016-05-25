//var fs = require('fs');
var bufferRcv = new dcodeIO.ByteBuffer();

var MapData = {};
var YMinMapSize = 1;
var YMaxMapSize = 100;

var XMinMapSize = 1;
var XMaxMapSize = 100;

var mapNumber = 1;

$.get('Maps/Mapa1.map', function(data) {
    bufferRcv = new dcodeIO.ByteBuffer.wrap(data);

    //Versión del Mapa
    bufferRcv.readUInt16();

    //Cabeceras
    console.log(bufferRcv.readUTF8String(255));
    bufferRcv.readUint32();
    bufferRcv.readUint32();

    //Cosas al pedo
    bufferRcv.readUInt16();
    bufferRcv.readUInt16();
    bufferRcv.readUInt16();
    bufferRcv.readUInt16();

    MapData[mapNumber] = {};

    for (var y = YMinMapSize; y <= YMaxMapSize; y++) {
        MapData[mapNumber][y] = {};

        for (var x = XMinMapSize; x <= XMaxMapSize; x++) {
            MapData[mapNumber][y][x] = {};

            ByFlags = bufferRcv.readUInt8();

            if (ByFlags & 1) {
                MapData[mapNumber][y][x].blocked = 1;
            }

            MapData[mapNumber][y][x].graphics = {};
            MapData[mapNumber][y][x].graphics[1] = bufferRcv.readUInt16();

            if (ByFlags & 2) {
                MapData[mapNumber][y][x].graphics[2] = bufferRcv.readUInt16();
            }

            if (ByFlags & 4) {
                MapData[mapNumber][y][x].graphics[3] = bufferRcv.readUInt16();
            }

            if (ByFlags & 8) {
                MapData[mapNumber][y][x].graphics[4] = bufferRcv.readUInt16();
            }

            if (ByFlags & 16) {
                MapData[mapNumber][y][x].trigger = bufferRcv.readUInt16();
            }

            /*ByFlags = bufferRcv.readUInt8();

			if (ByFlags & 1){
				MapData[mapNumber][y][x].tileExit = {};
				MapData[mapNumber][y][x].tileExit.map = bufferRcv.readUInt16();
				MapData[mapNumber][y][x].tileExit.x = bufferRcv.readUInt16();
				MapData[mapNumber][y][x].tileExit.y = bufferRcv.readUInt16();
			}

			if (ByFlags & 2){
				MapData[mapNumber][y][x].npcIndex = bufferRcv.readUInt16();
			}

			if (ByFlags & 4){
				MapData[mapNumber][y][x].objInfo = {};
				MapData[mapNumber][y][x].objInfo.objIndex = bufferRcv.readUInt16();
				MapData[mapNumber][y][x].objInfo.amount = bufferRcv.readUInt16();
			}*/
        }
    }
});