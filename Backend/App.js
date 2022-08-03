const express = require('express');
const mongoose = require('mongoose');
const User = require('./Routes/User.route');
const Login = require('./Routes/Login.route');
const Rider = require('./Routes/Rider.route');
const Product = require('./Routes/Product.route');
const app = express();
const cors = require('cors')


// new BrowserWindow({webPreferences: {webSecurity: false}});

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use('/public', express.static('public'));


mongoose.connect('mongodb+srv://muskanpunshi:muskan123@cluster0.m0flo.mongodb.net/EDistributor?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to Database"))
    .catch(err => {
        console.error("Couldnot connect to Database", err);
        process.exit();
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user',User);
app.use('/login',Login);
app.use('/rider',Rider);
app.use('/product',Product);


const port = process.env.PORT || 5050;
app.listen(port, () => {
    console.log(`App is running on ${port} ...`);
});