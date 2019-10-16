const fs = require('fs');

exports.READ_WRITE_FILE = (value) =>{

    if(value == "read"){
        let output ='';
        let rs = fs.createReadStream('./text.txt');
        rs.setEncoding('UTF8');
        rs.on('data', (data)=>{
            console.log("\n-------data---------"+data);
            output = output + data;
            return output;
        });

        readerStream.on('error', function(err) {
           console.log(err.stack);
           return err;
        });
        readerStream.on('end',function() {
            console.log(output);
         });
         

        // fs.readFile('', (data, err)=>{
        //     console.log("\n=--------"+data);
        //     if(err){
        //         return err;
        //     }else{
        //         return data;
        //     }
        // });
    }

    if(value == "write"){
        // fs.writeFile('')
    }

}

exports.UPLOAD_FILES = ()=>{

}

exports.DOWNLOAD_FILES = ()=>{

}