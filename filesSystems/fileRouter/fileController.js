const express = require('express');
const router = express.Router();

const upload = require('../multerModule');
const path = require('path');

const FileModel = require('../fileModel/fileModel');
const ExcelFile = require('../excelFileOps/excelFileOps');

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

router.post('/samplejson',(req, res)=>{

    let fileInstance = new FileModel({});
    for(let item of req.body){
        fileInstance = {
            invoiceId: item.invoiceId,
            createdDate: item.createdDate,
            dueDate: item.dueDate,
            address: item.address,
            companyName: item.companyName,
            invoiceName: item.invoiceName,
            price: item.price
        }
    }
    fileInstance.save()
    .then(result=>{
        res.status(200).json({
            message:'Saved details'
        })
    })
    .catch(err=>{
        res.status(400).json({
            error: err
        })
    });

});


// File Operations
router.post('/file', upload.single('streamfile'), (req, res)=>{
    res.status(200).send(req.file);
});

router.post('/multipleFiles', upload.array('multiFiles'), (req, res)=>{
    res.status(200).send(req.files);
});

router.post('/generatePDF', dynamicHtml.createDynamicHtml, async (req, res)=>{
    let pdf = require('html-pdf');
    const { buildPathPdf } = require('../buildPaths');
    let absolutePath = path.resolve('build.html');

    // using html-pdf npm---------------start-----
    try {
        fs.statSync(absolutePath);

        // HTML to PDF
        let html = fs.readFileSync(absolutePath, 'utf8');
        let options = {
            format:'A3',
            border:{
                'top':'2px',
                "right": "1px",
                "bottom": "2px",
                "left": "1px"
            }
        };
        await pdf.create(html, options).toFile(buildPathPdf, function(err, res){
            if(err){
                res.status(400).send(err);
            }
            console.log("\n------PDF---GENERATED-----------");
            
        });

        res.status(200).send("----PDF---GENERATED----------");

    } catch (error) {
        res.status(400).send("File Not Found! OR Error ooccured during PDF generation");
    }
    // using html-pdf npm---------------end-------


});


router.get('/downloadFile',(req, res)=>{

    let absolutePath = path.resolve('build.pdf');
    res.sendFile(absolutePath);

    // res.download(path.join('${../../uploads/}',file), (err)=>{
    //     res.send(err);
    // });
});

// Excel File Operations

router.get('/jsontoexcel', ExcelFile.JSON_TO_EXCEL);


module.exports = router;