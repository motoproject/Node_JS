const fs = require('fs');
// JSON data
const data = require('./data.json');
// Build paths
const { buildPathHtml } = require('./buildPaths');


module.exports.createDynamicHtml = async (req, res, next) =>{

    const body = req.body;

    /**
     * Take an object which has the following model
     * @param {Object} item 
     * @model
     * {
     *   "invoiceId": `Number`,
     *   "createdDate": `String`,
     *   "dueDate": `String`,
     *   "address": `String`,
     *   "companyName": `String`,
     *   "invoiceName": `String`,
     *   "price": `Number`,
     * }
     * 
     * @returns {String}
     */
    const createRow = (item) => `
      <tr>
        <td>${item.invoiceId}</td>
        <td>${item.invoiceName}</td>
        <td>${item.price}</td>
        <td>${item.createdDate}</td>
        <td>${item.dueDate}</td>
        <td>${item.address}</td>
        <td>${item.companyName}</td>
      </tr>
    `;
    
    /**
     * @description Generates an `html` table with all the table rows
     * @param {String} rows
     * @returns {String}
     */
    const createTable = (rows) => `
      <table>
        <tr>
            <th>Invoice Id</td>
            <th>Invoice Name</td>
            <th>Price</td>
            <th>Invoice Created</td>
            <th>Due Date</td>
            <th>Vendor Address</td>
            <th>Vendor Name</td>
        </tr>
        ${rows}
      </table>
    `;
    
    /**
     * @description Generate an `html` page with a populated table
     * @param {String} table
     * @returns {String}
     */
    const createHtml = (table) => `
      <html>
        <head>
          <style>
            table{
              font-family: "Times New Roman", Times, serif;
              font-size: 10px;
              width: 100%;
            }
            tr {
              text-align: left;
              border: 1px solid black;
            }
            th, td {
              padding: 5px;
            }
            tr:nth-child(odd) {
              background: #ddd
            }
            tr:nth-child(even) {
              background: #FFF
            }
            .no-content {
              background-color: red;
            }
            p{
              font-size: 10px;
            }
          </style>
        </head>
        <body>
          ${table}
          <hr/>
          <div>
            <p> Total amount: ${body.Totalamount}/-</p>
            <p> Discount amount: ${body.Discountamount}/-</p>
            <hr/>
            <p> Payable amount: ${body.Payableamount}/-</p>
          </div>
        </body>
      </html>
    `;
    
    /**
     * @description this method takes in a path as a string & returns true/false
     * as to if the specified file path exists in the system or not.
     * @param {String} filePath 
     * @returns {Boolean}
     */
    const doesFileExist = (filePath) => {
        try {
            fs.statSync(filePath); // get information of the specified file path.
            return true;
        } catch (error) {
            return false;
        }
    };
    
    try {
        /* generate rows */
        const rows = data.map(createRow).join('');
        /* generate table */
        const table = createTable(rows);
        /* generate html */
        const html = createHtml(table);
        /* write the generated html to file */
        await  fs.writeFileSync(buildPathHtml, html);
        console.log('Succesfully created an HTML table');
    } catch (error) {
        console.log('Error generating table', error);
    }
    next();
}

