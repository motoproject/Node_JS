const express = require('express');
const router = express.Router();

const upload = require('../multerModule');
const path = require('path');

// const FileModel = require('../fileModel/fileModel');
import {FileModel}  from '../fileModel/fileModel';
import embeddedjson from '../fileModel/embeddedMonel';
import Mongoose from 'mongoose';

// file objs --START--
const ExcelFile = require('../excelFileOps/excelFileOps');

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

const ES6Test = ()=>{
    // --------------- ES6 -------------------
    const person = {
        name:'pqwoe',
        age:'23',
        email:'asdafdfgdfgeter'
    }

    const address = { 
        street:'dasdadasdasd',
        city:'asjh',
        state:'kn,mnkjdf'
    }

    const details = {
        ...person,
        ...address
    }
    console.log(details);
    return details;
}

router.get('/getEB/:title', async (req, res)=>{
    await embeddedjson.find().populate('pages').exec((data)=>{
        console.log(data);
        res.send(data)
    })
    // .then((result)=>{
    //     res.json(result)
    // }).catch(err=>{
    //     res.send(err);
    // })
});

router.post('/embeddedjson', (req, res)=>{
    embeddedjson.insertMany(req.body.bookdetails).then(result=>{
        res.status(200).json(
            {message:'saved successfully'}
        )
    }).catch(err=>{
        res.status(400).send(err);
    })
});


router.get('/samplejson/:id', async (req, res)=>{
    console.log(req.params.id);
    
    const id = req.params.id;

    await FileModel.findOne({_id:id})
    // .populate('address')
    .then(results=>{
        console.log(results);
        res.status(200).json(results);
    }).catch(err=>{
        console.log(err);
        res.status(400).send(err);
    })



    // .exec((err, result)=>{
    //     console.log(err);
    //     console.log(result);
    //     res.status(200).send(result);
    // })
});

router.post('/samplejson', async (req, res)=>{

    // ------------------------------- INSERT MANY
    FileModel.insertMany(req.body.sampleData)

    // --------------------------- mongoose queries -LEAN---POPULATE----------------------------
    // FileModel.findOne({invoiceId:req.params.id})
    // .populate('address')
    // .exec()
    
    // --------------------------- mongoose queries -LEAN-------------------------------
    // await FileModel.find({}).select({_id:0, invoiceName:1, price:1}).lean()

    // --------------------------- E M-Q -------------------------------------------

    // --------------------------- comparison expressions 
    // await FileModel.aggregate([
    //     {$project:{_id:0, invoiceName:1, price:1, 
    //         latest_records: {$gt: ['$price', 250]}
    //     }}
    // ])

    // --------------------------- Count and array creation in output document
    // await FileModel.aggregate([
    //     {$group: {_id:null, No_Of_Companies:{$sum:1}, company_names:{'$addToSet':'$companyName'}}},
    // ])

    //--------------------------- sort ascending / decending 
    // await FileModel.aggregate([
    //     {$group: {_id:'$price'}},
    //     {$sort: {_id:-1}}
    // ])

    //--------------------------- max/min price company name 
    // await FileModel.aggregate([
    //     {$group: {_id:null, min_price: {$min: '$price'}}}
    // ])

    //----------------------------------- sum aggregation 
    // await FileModel.aggregate([
    //     {$project: {_id:0, price:1 }},
    //     {$group: { _id:null, bill_total: { $sum:'$price' }}}
    // ])

    // await FileModel.insertMany(req.body.sampleData)
    .then(results=>{
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

router.get('/downladExcel/:filename', ExcelFile.DOWNLOAD_EXCEL);


module.exports = router;