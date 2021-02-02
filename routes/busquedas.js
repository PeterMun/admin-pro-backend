/* 
        Ruta: 'api/todo/:busqueda'
*/

const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const { busquedaTotal, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get('/:param', validarJWT, busquedaTotal);

router.get('/coleccion/:tabla/:param', validarJWT, getDocumentosColeccion);





module.exports = router;