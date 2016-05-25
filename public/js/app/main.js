require(["jquery", "screenfull", "hotkeys", "keystatus", "helper", "config", "console", "engine", "connection"], function($) {

    $(document).ready(function() {

        if (!localStorage.getItem('name') || !localStorage.getItem('password') || !localStorage.getItem('character')) {
            window.location.href = '/';
        }

        /*$(".progressBar").hide();
        $(".outer").css('display', 'table');
        $("#divCanvas").show();*/

        initCanvas();

        $("#mouseEvent").click(function(event) {
            clickCanvas(event);
        });
    });
});