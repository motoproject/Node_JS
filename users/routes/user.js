let express = require('express');
let router = express.Router();

let UserController = require('../controller/user');

router.post('/register', UserController.POST_REGISTER_USER);

router.post('/login', UserController.POST_LOGIN);

router.delete('/deleteUser/:id', UserController.Delete_USER);

router.post('/logout/:userId', UserController.POST_Logout);

router.get('/menu', (req, res)=>{
    res.status(200).json({
        message:"Menu details fetched successfully!",
        result:[
            {
                MENU_URL:"HOME",
                MENU_NAME:"HOME",
                MENU_KEY:"01",
                MENU_IMAGE:"home.svg"
            },
            {
                MENU_URL:"PRODUCTS",
                MENU_NAME:"PRODUCTS",
                MENU_KEY:"02",
                MENU_IMAGE:"shop.svg"
            }
            // {
            //     MENU_URL:"OFFERS",
            //     MENU_NAME:"TODAY'S DEALS",
            //     MENU_KEY:"03"
            // }
        ]
    });
});

module.exports = router;