import { Testimoniales } from "../models/Testimoniales.js";

const guardarTestimonial = async (req,res)=>{
    const errores = [];

    // Define our regular expression.
    const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
 
    //validar
    if(Object.values(req.body).some(campo => campo.trim() === '')){
        errores.push({mensaje:'Debe llenar todos los campos'})
    } else if(!validEmail.test(req.body.email)){
        errores.push({mensaje:'Coloca un email valido'})
    }

    //Destructuring a los valores del formulario
    const {nombre,apellido,mensaje} = req.body

    //verificar que no tenga mas de 200 caracteres el mensaje
    if(mensaje.length > 200){
        errores.push({mensaje:'Maximo de caracteres'})
    }
    
    //convertir el email a minusculas antes de insertarlo en la base de datos
    const email = req.body.email.toLowerCase();

    //validar que el email no se repita

    if(errores.length > 0 ){
        const testimoniales = await Testimoniales.findAll()
        res.render('testimoniales',{
            errores,
            nombre,
            email,
            mensaje,
            testimoniales
        })
    }else{
        //guardar
        try {
            await Testimoniales.create({
                nombre,
                apellido,
                email,
                mensaje
            })
            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }
    }
   
    
}

export{
    guardarTestimonial
}
