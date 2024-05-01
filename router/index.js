import express from 'express';
import { paginaDetalleViaje, paginaInicio, paginaNosotros, paginaTestimoniales, paginaViajes } from '../controllers/paginasController.js';
import {guardarTestimonial} from'../controllers/testimonialController.js'
const router = express.Router();

//request es lo  que enviamos --- response es la respuesta de expreess
router.get('/',paginaInicio)

router.get('/nosotros',paginaNosotros)

router.get('/viajes',paginaViajes)

router.get('/testimoniales',paginaTestimoniales)
router.post('/testimoniales',guardarTestimonial)

router.get('/viajes/:slug',paginaDetalleViaje)

export default router;