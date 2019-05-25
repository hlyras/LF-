const express = require('express');
const router = express.Router();
const adminController = require('../app/controller/admin');

router.get('/', adminController.index);
router.post('/updateAcess', adminController.updateAcess);

module.exports = router;