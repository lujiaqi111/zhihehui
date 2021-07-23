(function ($) { 
    var  setBG=function(_this) {
        if ($(_this).css("visibility") == "hidden" || $(_this).css("display") == "none" )
            return;
        var lineHeight = parseFloat($(_this).css("line-height"));
        if (isNaN(lineHeight)) {
            lineHeight = 25;
            $(_this).css("line-height", lineHeight + "px");
        }
        var padding = $(_this).scrollTop() % lineHeight;
        var bgimg = createBG(lineHeight, padding);
        if (bgimg != null) {
            $(_this).css("background", "url(" + bgimg + ")   repeat");
            $(_this).on("scroll", function () {
                var lineHeight = parseFloat($(_this).css("line-height"));
                var padding = $(_this).scrollTop() % lineHeight;
                var bgimg = createBG(lineHeight, padding);
                $(_this).css("background", "url(" + bgimg + ") left top repeat");
            });
        }
    } 
    this.___BGList = {};
    var createBG=function( height, padding) {
        var key = height + "-" + padding; 
        var width = 4;
        if (this.___BGList[key] != null) {
            return this.___BGList[key];
        }
        var canvas = document.createElement("canvas");
        if (canvas.getContext) {
            var context = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height;
            canvas.lineWidth = 1;
            canvas.fillStyle = "#000000";
            context.fillRect(0, height - padding - 1, 1, 1);
            var dataURL = canvas.toDataURL('image/png'); 
            this.___BGList[key] = dataURL;
            return dataURL;
        }
        return null;
    }
    $.fn.backgroundLine = function (options) {
        this.each(function () { 
            setBG(this);
        });
    };
})(jQuery);