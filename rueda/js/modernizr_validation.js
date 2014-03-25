$(document).ready(function(){
        if (!Modernizr.inputtypes.number) {
                alert(" Esta Aplicación usa Navegadores con Soporte de Html5,\n para asegurar que funcione fuera de GoogleChrome, \n cuando cambie los valores de los items asegurese de presionar \n un click fuera del input, para que tenga efectos")
        };
        if(!Modernizr.input.placeholder){ //placeholder
                makePlaceholders();
        }//if
        if(!Modernizr.input.autofocus){ //auto focus
                $("input[autofocus]").focus();
        }//if
        if(!Modernizr.inputtypes.number){ //number spinner
                var $numerics = $("input[type=number]");
                $numerics.each(function (){
                        var thisNum = $(this);
                        thisNum.spinner({
                                min: thisNum.attr("min"),
                                max: thisNum.attr("max"),
                                step: thisNum.attr("step")
                        });
                });
        }//if
        if(!Modernizr.inputtypes.date){ //date input
                var $dates = $("input[type=date]");
                $dates.each(function (){
                        var thisDate = $(this);
                        thisDate.datepicker({
                                minDate: thisDate.attr("min"),
                                maxDate: thisDate.attr("max"),
                                dateFormat: "yy-mm-dd"
                        });
                });
        }//if
});//document.ready

function makePlaceholders(){
        $inputs = $("input[type=text],input[type=email],input[type=tel],input[type=url]");
        $inputs.each(
                function(){
                        var $this = jQuery(this);
                        this.placeholderVal = $this.attr("placeholder");
                        $this.val(this.placeholderVal);
                }
        )//each
        .bind("focus", function(){
                var $this = jQuery(this);
                var val = $.trim($this.val());
                if(val == this.placeholderVal || val == ""){
                        $this.val("");
                }//if
        })//bind
        .bind("blur", function(){
                var $this = jQuery(this);
                var val = $.trim($this.val());
                if(val == this.placeholderVal || val == ""){
                        $this.val(this.placeholderVal);
                }//if
        });//bind
}//function
