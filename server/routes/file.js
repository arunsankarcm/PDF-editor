const express = require('express');
const router = express.Router();
const file_controller = require('../controllers/fileUpload');
const upload = require('../storageConfig'); 

router.post('/upload-files', upload.single('file'), file_controller.uploadFile)
router.get('/get-files', file_controller.getFile)


module.exports = router;