const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
router.get('/',homeController.home);

router.use('/posts', require('./posts'));


console.log(`Router loaded`);
module.exports = router;