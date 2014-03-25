/**
         * variables
         */
                var items= [];
                var items_strings = [];
                var suma_grados_para_string = [];
                var intervalo = 0;
                var TITULO_ENCIMA_DE_RUEDA = "Rueda de la vida";
                /*
                    Autor Jaime Irazabal

                 */
                /**
                 * agregar los nombres de los items a un arreglo para validar si estan repetidos
                 * @param  {[type]} nuevoItem [description]
                 * @return {[type]}           [description]
                 */
                function agregarItem(nuevoItem){
                    if (!buscarItem(items_strings,nuevoItem)) {
                        items_strings.push(nuevoItem);
                        return true;
                    }else{
                        console.log("Item repetido. No se Agregó")
                        alert("Item repetido. No se Agregó")
                        return false;
                    }
                }
                /**
                 * arreglo para saber el orden de los grados y los strings que se deben colocar
                 * @param  {[type]} array [description]
                 * @return {[type]}       [description]
                 */
                function configurarEtiquetas(array){
                    suma_grados_para_string = [];
                    suma = 0;
                    suma_grados_para_string.push(suma);
                    for (var i = 1; i < array.length; i++) {
                        suma = suma + intervalo;
                        suma_grados_para_string.push(suma);
                    };
                    return suma_grados_para_string;
                }
                /**
                 * busca el string segun el grado que se halla guardado
                 * @param  {[type]} grado [description]
                 * @return {[type]}       [description]
                 */
                function buscarStringDeGrado(grado){
                    indice = suma_grados_para_string.indexOf(grado);
                    return items_strings[indice];
                }
                /**
                 * buscar el item en el arreglo de items
                 * @param  {[type]} items [description]
                 * @param  {[type]} item  [description]
                 * @return {[boolean]}       [retorna true si lo encontró y false si no..]
                 */
                function buscarItem(items,item){
                    if($.inArray(item,items)>=0){
                        return true;
                    }
                    return false;
                }
                /**
                 * function para saber las particiones de la rueda
                 * @return {[type]} [description]
                 */
                function sacarGrados(numero){
                    //360 / 2 = 90º
                    //regla de 3 si 2      - 90
                    //              numero - X?
                    return 360/numero;
                }
                function borrarItem(array,item){
                    var index = array.indexOf(item);
                    
                    if (index > -1) {
                        if(array.splice(index, 1)){
                            return index;
                        }
                    }
                    return false;
                }
                function borrarGrado(index){
                    if (index > -1) {
                        if(suma_grados_para_string.splice(index, 1)){
                            return index;
                        }
                    }
                    return false;
                }
                /**
                 * retorna el arreglo para calcular los colores
                 * @param  {[type]} items  [description]
                 * @param  {[type]} indice [description]
                 * @return {[type]}        [description]
                 * [0,0,0,0,0,0,0,0]
                 */
                function calcularColores(items,indice){
                    var downtop = items[indice];
                    var uptop = items[indice+1];
                    aux = []
                    for (var i = 0; i < items.length; i++) {
                        if (i == indice || i == indice+1) {
                            aux.push(items[i]);
                        }else{
                            aux.push(0);
                        }
                    } 
                    if (indice == items.length) {
                        //alert("indice:"+indice +  " - tamaño "+ items.length)
                        aux = [];
                        for (var i = 0; i <items.length; i++) {
                            if (i == 0) {
                                aux.push(items[i])
                            }else if(i + 1 == items.length){
                                aux.push(items[i])
                            }else{
                                aux.push(0)
                            }
                        };
                    }
                    return aux;
                }
                function calcularSerie(){
                    serie = []
                    for (var i = 0; i < items.length +1; i++) {
                        serie.push({
                            type: 'area',
                            name: items_strings[i],
                            data: calcularColores(items,i)
                        })
                    }
                    return serie;
                }
                function mejorarPadding(){
                    $("body").find("rect").css({
                        padding:"100px"
                    })
                }
                function generarRueda(){
                    suma_grados_para_string = configurarEtiquetas(items_strings);
                    $('#contenedor').highcharts({
                        width:1000,
                        chart: {
                            polar: true
                        },
                        
                        title: {
                            text: TITULO_ENCIMA_DE_RUEDA
                        },
                        
                        pane: {
                            startAngle: 0,
                            endAngle: 360
                        },
                    
                        xAxis: {
                            tickInterval: intervalo,
                            min: 0,
                            max: 360,
                            labels: {
                                formatter: function () {
                                    return buscarStringDeGrado(this.value);
                                }
                            }
                        },
                            
                        yAxis: {
                            min: 0
                        },
                        
                        plotOptions: {
                            series: {
                                pointStart: 0,
                                pointInterval: intervalo
                            },
                            column: {
                                pointPadding: 0,
                                groupPadding: 0
                            }
                        },
                    
                        series: calcularSerie()
                    });
                    borrarLogoHighChart()
                    mejorarPadding();
                    visualizarLabels()
                }
                function borrarLogoHighChart(){
                 
                    text = "Highcharts.com";
                    elemento = $("body").find("tspan");
                    elemento.each(function(){
                        if ($(this).text()==text) {
                            $(this).remove()
                        };
                    })
                }
                function visualizarLabels(){
                   $("#contenedor").css({
                    width:"auto"
                   })
                }
                /*
                
                ..............................
                 */
                $(document).ready(function () {
                $("body").on("click","#add_item_btn",function(){
                    $("body").off("click","#add_item_btn",function(){});
                    var nuevo_item = $(".new_item_text").val() ? $(".new_item_text").val() : "";
                    if (nuevo_item) {
                        if(agregarItem(nuevo_item)){
                            code ='<div class="input-group" style="width:150px">'+
                              '<input type="number" class="form-control valores numeric" title="'+$(".new_item_text").val()+'" style="width:150px" placeholder="'+$(".new_item_text").val()+'">'+
                              '<span class="input-group-addon btn  btn-danger glyphicon glyphicon-minus borrar_item"></span>'+
                           ' </div>';
                           $("#items_mios").append(code);
                           $(".numeric").numeric();
                          // $("#new_item_text");
                           $("#new_item_text").attr("placeholder","Nuevo Item").val("")
                        }
                    };
                })
                $("body").on("click",".borrar_item",function(){
                    $("body").off("click",".borrar_item",function(){})
                    nombre = $(this).parent().find("input").attr("placeholder");
                    $(this).parent().remove()
                    indice = borrarItem(items_strings,nombre)
                    borrarGrado(indice)
                    generarRueda();
                    nombre = "";
                    
                })
                $('#crear').click(function(){
                    generarRueda();
                })
                
                $("body").on("change",'.valores',function(e) {
                    $("body").off("change",'.valores',function(e) {})
                    //inicializo el arreglo cada vez que cambie 
                    items = [];
                    $(".valores").each(function(){
                        items.push($(this).val() ? parseInt($(this).val()) : 0)
                    })
                    intervalo = sacarGrados(items.length)
                    generarRueda();
            
                });
                
                });