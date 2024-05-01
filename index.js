import express from 'express';
import router from './router/index.js';
import db from './config/db.js';


const app = express();

//conectar a la base de datos 
db.authenticate()
    .then(() => console.log('base de datos conectada'))
    .catch(error => console.log(error))

//definir puerto
const port = process.env.PORT || 4000;

//habilitar pug 
app.set('view engine','pug');

//obtener el año actual
app.use((req,res,next)=>{
    const year = new Date()

    //variable
    res.locals.getYear = year.getFullYear()
    res.locals.nombreSitio = "Agencia de Viajes"

    return next()
});

//agregar bodyParset para leer los datos del formulario
app.use(express.urlencoded({extended:true}));


//definir la carpeta publica
app.use(express.static('public'));

//agregar router
app.use('/',router);



app.listen(port, ()=>{
   console.log(`el servidor esta funcionando en el puerto ${port} `)
})