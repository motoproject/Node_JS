let UserModel = require('../model/user');
let encryptPassword = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validations');
const BlackTokens = require('../model/blacklistTokens');

const sendEmail =  require('../../email/email');

module.exports.POST_REGISTER_USER = async (req, res)=>{

    // request params validations
    let errors  = registerValidation(req.body);
    if(errors.error){
        return res.status(400).json({
           message: errors.error.details[0].message
        });
    }

    // existing user
    const validUser = await UserModel.find({email: req.body.email})
    if(validUser[0]){
        return res.status(400).json({
             message: "You have already registered!"
         })
     }

    // encrypt password
    let salt = await encryptPassword.genSalt(10);
    let hashedPwd = await encryptPassword.hash(req.body.password, salt);

    let userModelInstance = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPwd
    });

    await userModelInstance.save()
    .then(result=>{
        res.status(200).json({ message: "You registered successfully!",
            results: result   
        });
    })
    .catch(err=>{
        res.status(403).json({ error: err.message });
    })

}

module.exports.POST_LOGIN = async (req, res)=>{

    // request params validations
    let errors  = loginValidation(req.body);
    if(errors.error){
        return res.status(400).json({
           message: errors.error.details[0].message
        });
    }

    let validUser = await UserModel.find({email: req.body.email})
    if(!validUser[0]){
       return res.status(400).json({message: "Invalid Email"});   
    }
   
    let tempPwd = validUser[0].password;
    const pwd = await encryptPassword.compare(req.body.password, tempPwd);
    if(!pwd) {
        return res.status(400).json({
            message: "Invalid password!"
        })
    }

    const token = jwt.sign({_id: validUser[0]._id}, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_EXPIRY_TIME });
    res.status(200).json({token: token,
        userRole: 'user'
    });

}

module.exports.Delete_USER = async (req, res)=>{
   await UserModel.findByIdAndRemove(req.params.id)
   .then(result=>{
       res.status(200).json({
           DeletedUser: result
       });
   })
   .catch(err=>{
    res.status(403).json({
        error: err.message
    });
   })

}

module.exports.POST_Logout = async (req, res)=>{
    
    const blacklistTokenInstace = new BlackTokens({
        tokens: req.header('Authorization').split(" ")[1],
        userID: req.params.userId
    });

    await blacklistTokenInstace.save()
    .then(result=>{
        res.status(200).json({
            message: "You successfully logged-out!"
        })
    })
    .catch(err=>{
        res.status(400).json({
          error: err.message
        })
    });
}