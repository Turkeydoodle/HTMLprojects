$(document).ready(
    function () {
        var catbod = $("#tail")
        var cat = $("#caterpillar")
        var length = 1
        function move() {
            $("#animator").html("performing...");
            for (var i = 1; i < 20; i++) {
                catbod.animate({ width: 50 * length + 50 + "px" }, "fast")
                catbod.animate({ width: 50 * length + "px", "margin-left": 50 * i + "px" }, "fast")
            }
        }
        function reset() {
            $("#reset").html("performing reset...");
            length = 1
            catbod.animate({ width: "50px", "margin-left": "0px" }, "fast")
        }
        function fade() {
            $("#fader").html("Fading...");
            cat.fadeToggle(2000);
        }
        function hide() {
            $("#hide").html("Hiding...");
            cat.hide();
        }
        function show() {
            $("#show").html("Showing...");
            cat.show();
        }
        function addSegment() {
            $("#grow").html("Adding...");
            length = length + 1
            catbod.animate({ width: 50 * length + "px" }, "fast")
        }
        $("#animator").click(
            function () {
                move();
            }
        )
        $("#reset").click(
            function () {
                reset();
            }
        )
        $("#fader").click(
            function () {
                fade()
            }
        )
        $("#hide").click(
            function () {
                hide()
            }
        )
        $("#show").click(
            function () {
                show()
            }
        )
        $("#grow").click(
            function () {
                addSegment()
            }
        )
    }
);