const express = require('express');
const router = express.Router();

const appController = require('../controllers/app');

router.post('/saveBookDetails', appController.saveBookDetails);

router.get('/getBookDetails', appController.getBookDetails);

router.post('/getBookDetailsById', appController.getBookDetailsById);

router.patch('/saveBookDetails/:id', appController.saveBookDetails);

module.exports = router;