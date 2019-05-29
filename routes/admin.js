const express = require('express');
const router = express.Router();
const adminController = require('../app/controller/admin');

router.get('/', adminController.index);
router.post('/updateUserAccess', adminController.updateUserAccess);

module.exports = router;