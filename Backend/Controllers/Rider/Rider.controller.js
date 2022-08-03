const Rider = require('../../Models/Rider.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Order = require('../../Models/Order.model');
const mongoose = require("mongoose");
const User = require('../../Models/User.model');

const config = require('../../Config');
exports.addRider = async (req, res)=>{
    const riderExist = await Rider.findOne({ cnic: req.body.cnic });
    if (riderExist) {
        return res.status(422).send("User with this CNIC number already exists")
    }
    let rider = new Rider({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        address:req.body.address,
        city:req.body.city,
        cnic:req.body.cnic,
        mobilenumber:req.body.mobilenumber,
        password:req.body.password,
       
       

    });

    rider.save((err,)=>{
        if(err)
        return (err);
        res.status(201).send('Rider created successfully');
    });
}

exports.riderLogin = (req, res, next) => {
     Rider.findOne({ email: req.body.email }, (err, rider) => {
          if (err) return next(err);
          if (!rider) return res.status(404).send('rider was not found');
  
          var passwordValidity = bcrypt.compareSync(req.body.password, rider.password);
          if (!passwordValidity) return res.status(401).send({ auth: false, token: null })
          var token = jwt.sign({ id: rider._id }, config.secret, {
              expiresIn: 3600 // expires in 1 hour
          });
          res.status(200).send({ auth: true, token: token });
      });
  
  };

  exports.total_count_riders = async (req, res) => {
    try {
      Rider.aggregate([
        {
          $group: {
            _id: null,
            sum: {
              $sum: 1,
            },
          },
        },
      ]).then((result) => res.status(200).send(result));
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something Went Wrong");
    }
  };

  exports.get_all_riders = async (req, res) => {
    try {
      const allRiders = await Rider.find();
      res.status(200).send(allRiders);
    } catch (err) {
      return res.status(400).send("NO USERS FOUND");
    }
  };



  exports.delete_rider = async (req, res) => {
    try {
      await Rider.findByIdAndRemove(req.params.id);
      return res.status(200).send("Rider has been successfully Deleted");
    } catch (err) {
      return res.status(400).send("Sorry this Record Does Not Exist");
    }
  };


  exports.all_orders =((req,res,next)=>{
    Order.find({riderId:req.decoded.id,status:"InProcess"},(err,response)=>{
      if(err) return next(err)
      res.send(response);
    })
  })

  exports.markAsDelivered=((req,res,next)=>{
    Order.findByIdAndUpdate(
      ( 
         req.params.id
      ),{
        $set:{
          status:"Delivered"
        }
      },
      (err,details)=>{
        if(err) return next(err)
        res.send(details);
      }
    )
  })

  exports.deliveredOrder=(req,res,next)=>{

    Order.find({riderId:req.decoded.id,status:"Delivered"},(err,res)=>{
      if(err) return next(err)
      res.send(res);
    })
  }

  exports.confirmedOrderDetails=((req,res,next)=>{
      Order.findById(req.params.id).populate("userId").populate("cartId").exec((err,orderDetails)=>{
        if(err) return next(err);
        res.send(orderDetails)
      })
  })


  exports.myOrders=((req,res,next)=>{
   Order.find(
      {
        riderId: mongoose.Types.ObjectId(req.decoded.id),
      },   
    ).populate('cartId').exec((err, data) => {
      if (err) return next(err);

      res.send(data);
    });
  }
  )

  exports.userDetails=((req,res,next)=>{
      User.findById(req.params.id).exec((err,details)=>{
        if(err) return next(err);
        res.send(details);
      })
  })


