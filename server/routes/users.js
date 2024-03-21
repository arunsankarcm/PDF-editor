const express = require('express');
const { isAuthenticated } = require('../middleware/authMiddleware'); 
const router = express.Router();
const user_controller = require('../controllers/userAuth');
const pdfController = require('../controllers/pdfController');


router.post('/signup', user_controller.signUp);
router.post('/login', user_controller.userLogin);
router.post('/upload-pdf', isAuthenticated, pdfController.uploadPdf);
router.get('/user-pdfs', isAuthenticated, pdfController.getUserPdfs);

module.exports = router;



module.exports = router;
