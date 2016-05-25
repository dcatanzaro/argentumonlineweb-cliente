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
		<canvas id="background" width="300" height="400" style="border: 1px solid red; background-color: white;"></canvas>
	</div>
	
	ID Grh
	<select name="grh" id="grh"></select>
	
	<input type="text" id="grhSelected" disabled>

	<br>
	Grh Atras
	<select name="grhAtras" id="grhAtras"></select>

	Grh Adelante
	<select name="grhAdelante" id="grhAdelante"></select>

	Grh Derecha
	<select name="grhDerecha" id="grhDerecha"></select>

	Grh Izquierda
	<select name="grhIzquierda" id="grhIzquierda"></select>
	
	<br><br>
	
	<div style="text-align: left; width: 300px; margin: 0 auto;">
		Grh <input type="text" id="grhGrh"> <br>
		Frames <input type="text" id="grhFrames"> <br>
		Name Image <input type="text" id="grhName"> <br>
		X <input type="text" id="grhX"> <br>
		Y <input type="text" id="grhY"> <br>
		Width <input type="text" id="grhWidth"> <br>
		Height <input type="text" id="grhHeight"> <br>
		OffsetX <input type="text" id="grhOffsetX"> <br>
		OffsetY <input type="text" id="grhOffsetY"> <br>
		<button id="save">Guardar y modificar</button>
	</div>

	<br><br>
	
	Grh Inicio <input type="text" id="grhInicio"> <br> 
	Grh Nombre <input type="text" id="nombreGrh"> <br><br>
	<textarea name="" id="grh1" cols="30" rows="10"></textarea>
	<textarea name="" id="grh2" cols="30" rows="10"></textarea>
	<br>
	<button onclick="generarGrh();">Generar Grh</button>

	<script>

		function generarGrh(){
			var json = $("#grh1").val();

			var jsonGenerado;

			jsonGenerado = listJSON(json, $("#grhInicio").val(), $("#nombreGrh").val());

			$("#grh2").val(jsonGenerado);
		}
		
		$(document).ready(function() {

			$("input[type='text']").keyup(function(event) {
				if (event.keyCode == 38){
					$(this).val(parseInt($(this).val()) + 1);
					save();
				} else if (event.keyCode == 40){
					$(this).val(parseInt($(this).val()) - 1);
					save();
				}
			});

			inits.loadHeads(function(success) {
	            inits.loadArmas(function(success) {
	                inits.loadBodies(function(success) {
	                    inits.loadFxs(function(success) {
	                        inits.loadGraphics();

	                        $.each(inits.armas, function(bodyId, val) {
	                        	$("#grh").append('<option value="' + bodyId + '">' + bodyId + '</option>');
	                        });
	                    });
	                });
	            });
	        });

	        function save(){
	        	var grh = $("#grhGrh").val();
	        	inits.graphics[grh].numFrames = $("#grhFrames").val();
	        	inits.graphics[grh].numFile = $("#grhName").val();
	        	inits.graphics[grh].sX = $("#grhX").val();
	        	inits.graphics[grh].sY = $("#grhY").val();
	        	inits.graphics[grh].width = $("#grhWidth").val();
	        	inits.graphics[grh].height = $("#grhHeight").val();
	        	inits.graphics[grh].offset.x = parseInt($("#grhOffsetX").val());
	        	inits.graphics[grh].offset.y = parseInt($("#grhOffsetY").val());
	        }

	        $("#save").click(function(event) {
	        	save();
	        });

			$("#grh").change(function(event) {
				changeArma(this);
			});

			$("#grhAdelante").change(function(event) {
				$("#grhGrh").val($(this).val());
				$("#grhFrames").val(inits.graphics[$(this).val()].numFrames);
				$("#grhName").val(inits.graphics[$(this).val()].numFile);
				$("#grhX").val(inits.graphics[$(this).val()].sX);
				$("#grhY").val(inits.graphics[$(this).val()].sY);
				$("#grhWidth").val(inits.graphics[$(this).val()].width);
				$("#grhHeight").val(inits.graphics[$(this).val()].height);
				$("#grhOffsetX").val(inits.graphics[$(this).val()].offset.x);
				$("#grhOffsetY").val(inits.graphics[$(this).val()].offset.y);
			});

			$("#grhAtras").change(function(event) {
				$("#grhGrh").val($(this).val());
				$("#grhFrames").val(inits.graphics[$(this).val()].numFrames);
				$("#grhName").val(inits.graphics[$(this).val()].numFile);
				$("#grhX").val(inits.graphics[$(this).val()].sX);
				$("#grhY").val(inits.graphics[$(this).val()].sY);
				$("#grhWidth").val(inits.graphics[$(this).val()].width);
				$("#grhHeight").val(inits.graphics[$(this).val()].height);
				$("#grhOffsetX").val(inits.graphics[$(this).val()].offset.x);
				$("#grhOffsetY").val(inits.graphics[$(this).val()].offset.y);
			});

			$("#grhIzquierda").change(function(event) {
				$("#grhGrh").val($(this).val());
				$("#grhFrames").val(inits.graphics[$(this).val()].numFrames);
				$("#grhName").val(inits.graphics[$(this).val()].numFile);
				$("#grhX").val(inits.graphics[$(this).val()].sX);
				$("#grhY").val(inits.graphics[$(this).val()].sY);
				$("#grhWidth").val(inits.graphics[$(this).val()].width);
				$("#grhHeight").val(inits.graphics[$(this).val()].height);
				$("#grhOffsetX").val(inits.graphics[$(this).val()].offset.x);
				$("#grhOffsetY").val(inits.graphics[$(this).val()].offset.y);
			});

			$("#grhDerecha").change(function(event) {
				$("#grhGrh").val($(this).val());
				$("#grhFrames").val(inits.graphics[$(this).val()].numFrames);
				$("#grhName").val(inits.graphics[$(this).val()].numFile);
				$("#grhX").val(inits.graphics[$(this).val()].sX);
				$("#grhY").val(inits.graphics[$(this).val()].sY);
				$("#grhWidth").val(inits.graphics[$(this).val()].width);
				$("#grhHeight").val(inits.graphics[$(this).val()].height);
				$("#grhOffsetX").val(inits.graphics[$(this).val()].offset.x);
				$("#grhOffsetY").val(inits.graphics[$(this).val()].offset.y);
			});

			function changeRopa(tis){
				var idBody = $(tis).val();

				$("#grhAdelante").empty();
				$("#grhAtras").empty();
				$("#grhIzquierda").empty();
				$("#grhDerecha").empty();

				$.each(inits.graphics[inits.bodies[idBody][1]].frames, function(index, grh) {
					$("#grhAtras").append('<option value="' + grh + '">' + grh + '</option>');
				});
				$.each(inits.graphics[inits.bodies[idBody][2]].frames, function(index, grh) {
					$("#grhAdelante").append('<option value="' + grh + '">' + grh + '</option>');
				});
				$.each(inits.graphics[inits.bodies[idBody][3]].frames, function(index, grh) {
					$("#grhDerecha").append('<option value="' + grh + '">' + grh + '</option>');
				});
				$.each(inits.graphics[inits.bodies[idBody][4]].frames, function(index, grh) {
					$("#grhIzquierda").append('<option value="' + grh + '">' + grh + '</option>');
				});
			}

			function changeArma(tis){
				var idBody = $(tis).val();

				$("#grhAdelante").empty();
				$("#grhAtras").empty();
				$("#grhIzquierda").empty();
				$("#grhDerecha").empty();

				$.each(inits.graphics[inits.armas[idBody][1]].frames, function(index, grh) {
					$("#grhAtras").append('<option value="' + grh + '">' + grh + '</option>');
				});
				$.each(inits.graphics[inits.armas[idBody][2]].frames, function(index, grh) {
					$("#grhAdelante").append('<option value="' + grh + '">' + grh + '</option>');
				});
				$.each(inits.graphics[inits.armas[idBody][3]].frames, function(index, grh) {
					$("#grhDerecha").append('<option value="' + grh + '">' + grh + '</option>');
				});
				$.each(inits.graphics[inits.armas[idBody][4]].frames, function(index, grh) {
					$("#grhIzquierda").append('<option value="' + grh + '">' + grh + '</option>');
				});
			}

		});

	</script>
</body>
</html>