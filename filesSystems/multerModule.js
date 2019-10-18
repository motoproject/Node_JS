const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({
        destination:'uploads',
        path: '../uploads',
    }),
    fileFilter: (req, file, callBack)=>{
        if(!file.mimetype.match(/png|jpe|jpeg|gif$i/)){
            return callBack(new Error("-----file-not-supports----"),false);
        }
        callBack(null, true);
    },
});