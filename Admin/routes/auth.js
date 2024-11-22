const express=require('express');
const router=express.Router();
const authcontroller=require('../controllers/authcontrollers');

//route for login
router.post('/login',authcontroller.postLogin);
router.post('/register',authcontroller.postRegister);


module.exports=router;