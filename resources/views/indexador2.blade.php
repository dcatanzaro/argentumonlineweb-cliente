<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="{{ asset('js/jquery-2.1.4.min.js') }}"></script>
	<script src="{{ asset('js/engineIndexador.js') }}"></script>
	<script src="{{ asset('js/lib/PxLoader.js') }}"></script>
	<script src="{{ asset('js/lib/PxLoaderImage.js') }}"></script>
</head>
<body style="text-align: center;">
	<div style="width: 100%; text-align: center;">
		<canvas id="canvas" width="32" height="32" style="border: 1px solid red;"></canvas>
	</div>
	
	<textarea name="grh" id="grh" cols="40" rows="20"></textarea>
	<button onclick="inits.loadGraphics();">Huehue</button>
	<input type="text" id="anim" value="12024">


	<div style="width: 100%; text-align: center;">
		<input type="text" id="grhActual" disabled style="vertical-align: top;">
		<canvas id="background" width="500" height="500" style="border: 1px solid red; background: black;"></canvas>
	</div>



	<script>
		var context = document.getElementById('canvas').getContext('2d');

		var img = new Image();
		img.src = "/graphics/CapuchaBasica.png";

		img.onload = function () {

			$("#canvas").attr("width", img.naturalWidth);
		    $("#canvas").attr("height", img.naturalHeight);

		    context.drawImage(img, 0, 0);
			recorrerImg();
		}

		var lineTransparent = true;
		var secondLineTransparent = true;

		var yaPaso = false;

		var linesY = [];
		var linesX = [];
		var animations = [];

		function isTransparent(data){
			if (data[0] === 0 && data[1] === 0 && data[2] === 0){
				return true;
			} else {
				return false;
			}
		}

		function recorrerImg(){
			var yTemp = 0;
			for (var y = 0; y < img.naturalHeight; y++) {
				for (var x = 0; x < img.naturalWidth; x++) {
					data = context.getImageData(x, y, 1, 1).data;
					data2 = context.getImageData(x, y + 1, 1, 1).data;

					if (!isTransparent(data)){
						lineTransparent = false;
					}

					if (!isTransparent(data2)){
						secondLineTransparent = false;
					}
				};

				if (lineTransparent && !secondLineTransparent && !yaPaso){
					yaPaso = true;

					for (var xx = 0; xx < img.naturalWidth; xx++) {
						context.fillStyle = "rgba(0, 0, 0, 0.4)";
						context.fillRect(xx, y, 1, 1);
					}

					yTemp = y;
				}

				if (!lineTransparent && secondLineTransparent && yaPaso){
					yaPaso = false;

					for (var xx = 0; xx < img.naturalWidth; xx++) {
						context.fillStyle = "rgba(0, 0, 0, 0.4)";
						context.fillRect(xx, y + 1, 1, 1);
					}

					linesY.push({y1: yTemp, y2: y + 1});
					yTemp = 0;
				}

				lineTransparent = true;
				secondLineTransparent = true;
			};

			lineTransparent = true;
			secondLineTransparent = true;
			yaPaso = false;

			var xTemp = 0;
			var countTemp = 0;
			for (var i = 0; i < linesY.length; i++) {
				for (var x = 0; x < img.naturalWidth; x++) {
					for (var y = linesY[i].y1; y < linesY[i].y2; y++) {
						data = context.getImageData(x, y, 1, 1).data;
						data2 = context.getImageData(x + 1, y, 1, 1).data;

						if (!isTransparent(data)){
							lineTransparent = false;
						}

						if (!isTransparent(data2)){
							secondLineTransparent = false;
						}
					};

					if (lineTransparent && !secondLineTransparent && !yaPaso){
						yaPaso = true;

						for (var yy = linesY[i].y1; yy < linesY[i].y2; yy++) {
							context.fillStyle = "rgba(0, 0, 0, 0.4)";
							context.fillRect(x, yy, 1, 1);
						}

						xTemp = x;
					}

					if (!lineTransparent && secondLineTransparent && yaPaso){
						yaPaso = false;
						countTemp++;

						for (var yy = linesY[i].y1; yy < linesY[i].y2; yy++) {
							context.fillStyle = "rgba(0, 0, 0, 0.4)";
							context.fillRect(x + 1, yy, 1, 1);
						}

						linesX.push({x1: xTemp, x2: x + 1});
						xTemp = 0;
					}

					lineTransparent = true;
					secondLineTransparent = true;
				};
				animations.push({count: countTemp});
				countTemp = 0;
			};

			var grhStart = 12000;
			var graphicNumber = 395;
			var countFrame = 0;
			var arGrh = [];

			for (var cantLados = 0; cantLados < linesY.length; cantLados++) {
				for (var i = 0; i < animations[cantLados].count; i++) {

					$("#grh").append("Grh" + grhStart + "=1-" + graphicNumber + "-" + linesX[countFrame].x1 + "-" + linesY[cantLados].y1 + "-" + (linesX[countFrame].x2 - linesX[countFrame].x1) + "-" + (linesY[cantLados].y2 - linesY[cantLados].y1) + "\n");
					arGrh.push(grhStart);

					countFrame++;
					grhStart++;
				};
			};

			countFrame = 0;
			grhTemp = "";

			for (var cantLados = 0; cantLados < linesY.length; cantLados++) {
				for (var i = 0; i < animations[cantLados].count; i++) {

					//$("#grh").append("Grh" + grhStart + "=1-" + graphicNumber + "-" + linesX[countFrame].x1 + "-" + linesY[cantLados].y1 + "-" + (linesX[countFrame].x2 - linesX[countFrame].x1) + "-" + (linesY[cantLados].y2 - linesY[cantLados].y1) + "\n");
					grhTemp += arGrh[countFrame] + "-";

					countFrame++;
				};

				$("#grh").append("Grh" + grhStart + "=" + animations[cantLados].count + "-" + grhTemp + "1000" + "\n");
				grhStart++;
				grhTemp = "";

			};
		}
	</script>
</body>
</html>