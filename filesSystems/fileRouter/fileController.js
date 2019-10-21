const express = require('express');
const router = express.Router();

const upload = require('../multerModule');

// const multer = require('multer');
   
//     let store = multer.diskStorage({
//         destination:(req, file, callback)=>{
//             callback(null, '../../uploads'); // folder Name
//         },
//         filename:(req, file, callback)=>{
//             callback(null, `productFilesDate_${file.originalname}`);
//         },
//     });
    
//     const uploadSingle = multer({ storage: store }).single('file');
//     const uploadMultiple = multer({ storage: store }).array('files');




// File Operations
router.post('/file', upload.single('file'), (req, res)=>{
    res.status(200).send(req.file);
});

router.post('/multipleFiles', upload.array('multiFiles'), (req, res)=>{
    res.status(200).send(req.files);
});

module.exports = router;