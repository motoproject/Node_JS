const fs = require('fs');
const { billPathHtml, billPathPdf } = require('./billPath');

exports.GENERATE_BILL = (req, res, next)=>{
    const data = req.body;
    /**
     * @description Generate an `html` page with a populated table
     * @param {String} bill
     * @returns {String}
    */

    const billHTML = (bill) => `
    
    `;

}