const User = require('../Models/User.model');
const Rider = require('../Models/Rider.model');
const config = require('../Config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin.model');

exports.userLogin = ((req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(404).send('User not found');

        var passwordValidity = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordValidity) return res.status(401).send({ auth: false, token: null })
        var token = jwt.sign({ id: user._id }, config.secret, {
            // expires in 1 hour
        });
        res.status(200).send({ auth: true, token: token });
    });

});


exports.adminLogin = ((req, res, next) => {
    Admin.findOne({ email: req.body.email }, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(404).send('admin not found');

        var passwordValidity = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordValidity) return res.status(401).send({ auth: false, token: null })
        var token = jwt.sign({ id: user._id }, config.secret, {
            // expires in 1 hour
        });
        res.status(200).send({ auth: true, token: token });
    });

});


exports.addAdmin = async (req, res) => {
    const userExist = await Admin.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(422).send("Admin with this email already exists");
    }
    let user = new Admin({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
    });
  
    user.save((err) => {
      if (err) return err;
      res.status(201).send("Admin created successfully");
    });
  };

