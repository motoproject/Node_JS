const express = require('express');
const router = express.Router();

const upload = require('../multerModule');
const path = require('path');

// file objs --START--

const dynamicHtml = require('../generateHTML');
const fs = require('fs');

// file objs --END--


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
router.post('/file', upload.single('streamfile'), (req, res)=>{
    res.status(200).send(req.file);
});

router.post('/multipleFiles', upload.array('multiFiles'), (req, res)=>{
    res.status(200).send(req.files);
});

router.get('/generatePDF', dynamicHtml.createDynamicHtml, (req, res)=>{
    
    let absolutePath = path.resolve('build.html');
    fs.statSync(absolutePath);
    res.send("----FILE---GENERATED----------");
});


router.get('/downloadFile',(req, res)=>{

    res.sendFile(`${__dirname}/../../../uploads/file4.png`);
    
    // let file= path.join(__dirname,'../../uploads')+'/'+req.body.fileName;
    // res.sendFile(file);

    // let file = req.params.file;
    // // res.sendFile('../../uploads/Screenshot from 2019-09-05 13-44-15.png', (err)=>{
    // //     res.send(err);
    // // })
    // console.log(file);
    // res.download(path.join('${../../uploads/}',file), (err)=>{
    //     res.send(err);
    // });
});

module.exports = router;