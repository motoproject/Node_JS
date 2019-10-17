const multer = require('multer');

exports.OBJ_MULTER = ()=>{

    const store = multer.diskStorage({
        destination:(req, file, callback)=>{
            callback(null, 'uploads'); // folder Name
        },
        filename:(req, file, callback)=>{
            callback(null, `productFilesDate_${file.originalname}`);
        },
        path:"../../uploads/"
    });
    
    return multer({ storage: store });
}

exports.SINGLE_FILE_UPLOAD = (req, res)=>{
    const file = req.file;
    console.log("\n----filename----"+file.filename);
    if(!file){
        return res.status(400).json({
            error: "file not found in request!"
        })
    }
    res.status(200).json({
        message:"file uploaded successfully!"
    })
}

exports.MULTIPLE_FILE_UPLOAD = (req, res)=>{
    const files = req.files;
    console.log("\n----files----"+files);
    if(!files){
        return res.status(400).json({
            error: "files not found in request!"
        })
    }
    res.status(200).json({
        message:"files uploaded successfully!"
    })
}