const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const FileModel = require('../fileModel/fileModel');

exports.JSON_TO_EXCEL = async (req, res) =>{

    let data;

    //--------------------- Fetch Details from DB----------------
    data = await FileModel.find({}, {_id:0, __v:0})
    .catch(err => {
        res.status(400).send("---Error--Occured--while--fetching--data---");
    });

    let Obj = {
        "result": [JSON.stringify(data)]
    }
    //--------E------------- Fetch Details from DB----------------


    //--------------------- Read file----------------
    // data = fs.readFileSync(path.resolve(__dirname,'..','data.json'), "utf-8");

    try {
        data = JSON.parse(Obj.result);

        // for(k in data.sampleData){
        //     console.log(k + ":" + JSON.stringify(data.sampleData[k]));                
        // }

    } catch (error) {
        res.status(400).send("Error occured while JSON parsing");
    }


    try {
        // Create a worksheet
        let sampleWS = XLSX.utils.json_to_sheet(data);

        console.log("\n---done---json-to-sheet--");

        // make workBook of excel
        let workbook = XLSX.utils.book_new();

        console.log("\n---done---WB--");

        // add worksheet/WS to workbook/wb
        XLSX.utils.book_append_sheet(workbook, sampleWS, 'sampledata');

        console.log("\n---ws---added---wb---");
        
        // export file
        XLSX.writeFile(workbook, 'book.xlsx', {bookType:'xlsx', type:'binary'});

        res.status(200).send("Excel file generated!");

    } catch (error) {
        res.status(400).send("Error occured while excel creation");
    }

}

exports.DOWNLOAD_EXCEL = (req,res)=>{
    console.log(req.params.filename);
    
    let absolutePath = path.resolve(req.params.filename);
    res.sendFile(absolutePath);
}

exports.HTML_TO_EXCEL = (req,res)=>{
        
}