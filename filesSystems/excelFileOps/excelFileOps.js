const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

exports.JSON_TO_EXCEL = (req, res) =>{

    // let selectedFile = ;
    let data = fs.readFileSync(path.resolve(__dirname,'..','data.json'), "utf-8");
    try {
        data = JSON.parse(data);

        // for(k in data.sampleData){
        //     console.log(k + ":" + JSON.stringify(data.sampleData[k]));                
        // }

    } catch (error) {
        res.status(400).send("Error occured while JSON parsing");
    }


    try {
        // convert to array
        let sampleWS = XLSX.utils.json_to_sheet(data.sampleData);

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