const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({
        destination:'uploads',
        path: '../uploads',
        filename: function (req, file, cb){
            cb(null, file.originalname);
        }               
    }),
    fileFilter: (req, file, callBack)=>{
        if(!file.mimetype.match(/png|jpe|odt|jpeg|gif|json$i/)){
            return callBack(new Error("-----file-not-supports----"),false);
        }
        callBack(null, true);
    },
    limits:({
        fieldSize:5
    })    
});