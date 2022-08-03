const express = require('express');
const router = express.Router();


const loginController = require('../Controllers/Login.controller');
const LoginValidation =require ('../middleware/LoginValidation');

router.post('/',loginController.userLogin);
router.post('/admin',loginController.addAdmin);
router.post('/adminlogin',loginController.adminLogin);

// router.get('/me',function (req, res, next)  {
//     var token = req.headers['x-access-token'];
//     if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

//     jwt.verify(token, config.secret, function (err, decoded) {
//         if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

//         User.findById(decoded.id, { password: 0 ,confirmpassword:0},function (err, user) {
//             if (err) return res.status(500).send("There was a problem finding the user.");
//             if (!user) return res.status(404).send("No user found.");
            
//             res.status(200).send(user);
//     })
// return ;
// })
// })
module.exports = router ;