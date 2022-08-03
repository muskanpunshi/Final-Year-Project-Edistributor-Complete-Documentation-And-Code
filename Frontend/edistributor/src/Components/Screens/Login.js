import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Admin from '../Assets/Images/adminImage.jpg';
import { RiUserLine, RiStore3Fill } from "react-icons/ri";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { CgLock } from "react-icons/cg";

import Axios from 'axios';
import { LogIn } from '../Redux/Actions/Action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const styles = {
    mainDiv: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#90C3D4',
        height: 720,
        justifyContent: 'center'
    },
    subDiv: {
        display: 'flex',
        flex: 0.8,
        backgroundColor: 'white',
        marginTop: 70,
        marginBottom: 70,
        borderRadius: 20,

    },
    p1: {
        margin: "30px",
        display: 'flex',
        flex: 0.45,
        backgroundImage: `url(${Admin})`,


    },
    p2: {
        margin: "80px",
        marginTop: "50px",
        display: 'flex',
        flex: 0.55,
        flexDirection: 'column',
        borderLeft: '1px solid #ccc'



    }
}
export default function Login() {

    const { loggedIn } = useSelector(state => state.auth);
    useEffect(() => {
        if (loggedIn === true) {
            return (
                navigate('/dashboard')
            )
        }

    }, [loggedIn]);


    let navigate = useNavigate();

    const dispatch = useDispatch();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');

    // const[userDetails,setUserDetails] = React.useState('');

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


    const EmailValidator = () => {

        if (email === '') {
            setEmailError('Email cannot be empty')
        }
        else if (reg.test(email) != true) {
            setEmailError('Invalid syntax')
        }
        else {
            setEmailError('')
        }
    }

    const PasswordValidator = () => {

        if (password === '') {
            setPasswordError('Password cannot be empty')
        }
        else {
            setPasswordError('')
        }

    }


    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        EmailValidator()
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        PasswordValidator()
    }


    // const AdminValidation =()=>{
    //     Axios.get('http://localhost:5050/user/userdetails',{
    //         headers : {
    //             'token' : token
    //         }
    //     }).then((res)=>{
    //         console.log(res.data)
    //         setUserDetails(res.data.usertype)
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
    // }

    const HandleClick = () => {

        if (email && password !== null) {
            Axios.post('http://localhost:5050/login/adminlogin',
                {
                    email: email,
                    password: password,
                },
            )
                .then((res) => {
                    console.log(res)

                    const token = res.data.token;
                    const expiry = res.data.expiry;
                    dispatch(LogIn(token, expiry));
                    // AdminValidation();
                }).catch((error) => {
                    alert('Error:Login Failed')
                    console.log(error)

                });
        }
        else {
            alert('Error:Please enter details')
        }


    }



    return (
        <div style={styles.mainDiv}>
            <div style={styles.subDiv}>
                <div style={styles.p1}>
                </div>
                <div style={styles.p2}>
                    <Typography component="div">
                        <Box sx={{ display: "flex", color: "#0D6790", textAlign: 'left', ml: 7 }}>
                            <RiStore3Fill size={40} />
                            <Typography sx={{ textTransform: 'uppercase', fontWeight: 600, fontSize: 26, ml: 1 }}>Store Login</Typography>

                        </Box>
                    </Typography>
                    <Box >

                        <TextField onChange={handleEmailChange}
                            onBlur={EmailValidator}
                            value={email} id="outlined-search" label="Email" type="text" sx={{ mt: 5, width: "500px", ml: 2 }} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <RiUserLine />
                                    </InputAdornment>
                                ),
                            }} />
                        <Typography sx={{ color: 'red', m: 0.5, p: 0.5 }}>{emailError}</Typography>

                        <TextField onChange={handlePasswordChange}
                            onBlur={PasswordValidator}
                            value={password} id="outlined-search" label="Password" type="password" sx={{ mt: 3, width: "500px", ml: 2 }} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CgLock />
                                    </InputAdornment>
                                ),
                            }} />
                        <Typography sx={{ color: 'red', m: 0.5, p: 0.5 }}>{passwordError}</Typography>

                    </Box>
                    <Box >
                        <Button size="small" sx={{
                            mt: 5, ml: 7, px: 20, pt: 1, backgroundColor: "#0D6790", borderRadius: 10,
                            color: "#fff",
                            fontSize: 20, "&:hover": { backgroundColor: "#ccc" }
                        }} onClick={HandleClick} >
                            Login
                        </Button>
                    </Box>
                    <div>
                        <div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}