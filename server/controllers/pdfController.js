const PdfFile = require('../models/userPdf');
const User = require('../models/user');    
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.user._id;    
        const dest = `pdfs/${userId}`;
        fs.mkdirSync(dest, { recursive: true });    
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('file');

exports.uploadPdf = [
    upload,
    async (req, res) => {


        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        try {
               
            if (!req.user || !req.user._id) {
                return res.status(403).send('Authentication failed.');
            }

               
            const newPdfFile = new PdfFile({
                user: req.user._id,    
                filePath: req.file.path.replace('pdfs/', '')    
            });

            await newPdfFile.save();
   
            res.status(201).json({ message: 'PDF successfully uploaded', pdfFile: newPdfFile });
        } catch (error) {
            res.status(500).json({ message: 'Error saving PDF file', error: error });
        }
    }
];

exports.getUserPdfs = async (req, res) => {
    try {
        const pdfFiles = await PdfFile.find({ user: req.user._id })
            .populate('user', 'username');    

           
        const pdfFilesWithUsernames = pdfFiles.map(pdf => ({
            ...pdf.toObject(),    
            username: pdf.user.username    
        }));

        res.json(pdfFilesWithUsernames);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching PDF files', error: error });
    }
};
