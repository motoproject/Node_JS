const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const env = require('dotenv');
const auth = require('./users/routes/user');
const allProducts = require('./products/routes/product');
const fileOps = require('./filesSystems/fileRouter/fileController');

import usrp from './posts/Routes/userPost';

const blacklistTokens=require("./users/model/blacklistTokens");

const cors = require('cors');
const winston = require('winston');
require('winston-daily-rotate-file');

// DB Connection
env.config();
mongoose.connect(process.env.DB_Connect, { useNewUrlParser: true, useUnifiedTopology: true }, ()=> {
    console.log("\n----connected-TO-MDB------");
});
// let connection = mongoose.connection;

// connection.on('connected', function(){
// });


//---START---- log-4JS
// log4js.configure({
//     appenders: { fileAppenders: { type: 'file', filename: './logs/applogs.log' } },
//     categories: {default: { appenders:['fileAppenders'], level:'info' }}
// });
// const logger =  log4js.getLogger("ProductApp");
//---END---- log-4JS


// ---WINSTON--------
const DATE = new Date();

let loggerCongigurations = {
    format:winston.format.simple(),
    level:'verbose',
    'transports': [
        new winston.transports.DailyRotateFile({ 
            name: 'app-log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '365d',
            filename:'./logs/%DATE%.log',
        })
    ]
}

const logger = winston.createLogger(loggerCongigurations);

// ---WINSTON--End------


let corsObject = {
    origin:'*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, userid, authentication',
    methods: 'OPTIONS, PUT, POST, PATCH, DELETE, GET',
    optionsSuccessStatus: 200,
}

app.use(cors(corsObject));
app.use( async (req, res, next)=>{ 

    // log every client request
    logger.info('Client-Request--'+'--url--'+req.originalUrl+"--body--"+req.body);

    let reqHeaders = req.header('Authorization');
    let reqToken;
    if(reqHeaders){
        // console.log("\n---reqHeaders------"+reqHeaders);
        reqToken = reqHeaders.split(" ")[1]; 

        let blackToken = await blacklistTokens.findOne({tokens: reqToken});
        
        if(blackToken){
            logger.info('Un-autherised details'+blackToken);
            return res.status(400).send("Un-authorised user!");
        }
    }
    next();

    // if(!req.get('Username')){
    //     res.status(401).send('--------Header parameter missing----------------');
    // };
    // console.log("---req.body------"+JSON.stringify(req.body));
      
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization, Username");

    // // pre-flight req
    // if (req.method === "OPTIONS") {
    //   res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    //   return res.status(200).json({});
    // }

});

app.use(bodyParser.json({limit: '1024mb'}))
app.use(bodyParser.urlencoded({ extended : true, limit: '1024mb' }));


// register user
app.use('/user/auth', auth);

// Product routes
app.use('/products', allProducts);

// files Operations
app.use('/fs', fileOps);
app.use('/usrpost', usrp);
app.listen(process.env.PORT, ()=>{
    console.log('\n-port---------'+JSON.stringify(process.env.PORT));
});