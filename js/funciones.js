$(document).ready(function() {
    //Parte para validar los campos del formulario cuando lo enviamos
    fn = $('#form_email');
    fn.on('init.field.bv', function(e, data) {
            var $parent = data.element.parents('.form-group'),
                $icon   = $parent.find('.form-control-feedback[data-bv-icon-for="' + data.field + '"]'),
                $label  = $parent.find('label');
 
            // Coloca el icono de validacion a la derecha del label
            $icon.insertAfter($label);
        })
    .bootstrapValidator({
        feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
        fields: {
                nombre: {
                        validators: {
                                notEmpty: {
                                },
                        stringLength: {
                            min: 4,
                            max: 60
                          } 
                        }
                },
                msg: {
                        validators: {
                                notEmpty: {
                                },
                        stringLength: {
                            min: 10
                          } 
                        }
                },
                email: {
                        validators: {
                                notEmpty: {
                                },
                                emailAddress:{
                                }
                        }
                }
                
        },
    }).on('success.form.bv', function(e) {//cuando se valida el formulario:
            e.preventDefault();
            var $form = $(e.target);
            var bv = $form.data('bootstrapValidator');
 
            // Uso de ajax para enviar los datos por método Post
            $.post('php/contact.php', $form.serialize(), function(data) {
               if(data.exito){
                    nota('success',data.msg);
                    fn[0].reset();
                }   
                else{
                    nota('error',data.msg);
                }
            }, 'json');
        });
 
});
 
/* *************************************
* *************** NOTYJS ***************
* ************************************ */
//funcion para enviar notificaciones al usuario cuando envia el formulario
function nota(op,msg,time){
    if(time == undefined)time = 5000;
    var n = noty({text:msg,maxVisible: 1,type:op,killer:true,timeout:time,layout: 'center'});
}
