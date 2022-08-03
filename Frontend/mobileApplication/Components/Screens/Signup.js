import React from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar, TextInput, ScrollView } from 'react-native';
import Axios from 'axios';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import UserIcon from 'react-native-vector-icons/EvilIcons';
import MobileIcon from 'react-native-vector-icons/Fontisto';
import ConfirmPasswordIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PasswordIcon from 'react-native-vector-icons/Ionicons';

const SignUp = ({ navigation }) => {

    const [userName, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const [userNameError, setUserNameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const preg= /^(?=.*\d).{4,8}$/;
    
    const [hidePass, setHidePass] = React.useState("");
    const [confirmHidePass, setConfirmHidePass] = React.useState("");


   

    const reset = () => {
        setUserNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("")
    }

    const userNameValidator = () => {
        if (userName === '') {
            setUserNameError("User Name cannot be empty")
        }
        else {
            setUserNameError("")
        }
    }

    const emailValidator = () => {
        if (email === '') {
            setEmailError("Email cannot be empty")
        }
        else if (reg.test(email) != true) {
            setEmailError("Enter valid syntax")
        }
        else {
            setEmailError("")
        }
    }

    const passwordValidator = () => {
        if (password === '') {
            setPasswordError("Password cannot be empty")
        }
        else if(preg.test(password)!= true){
            setPasswordError("Password must be between 4 and 8 digits long and include at least one numeric digit.")
        }

        else {
            setPasswordError("")
        }
    }

    const confirmPasswordValidator = () => {
        if (confirmPassword === '') {
            setConfirmPasswordError("Password cannot be empty")
        }
        else if(preg.test(confirmPassword)!= true){
            setPasswordError("Password must be between 4 and 8 digits long and include at least one numeric digit.")
        }
        else {
            setConfirmPasswordError("")
        }
    }

    
    const userRegistration = () => {
        if(userName&&email&&password&&confirmPassword!=null){
        Axios.post('http://10.0.2.2:5050/user/createuser',
            {
                username: userName,
                email: email,
                password: password,
                confirmpassword: confirmPassword
            },
        )
            .then((res) => {
                console.log(res)
                alert("User Created Successfully")
            }).catch((error) => {
                alert("User Already Exist")
                console.log(error)
            });
    }
    else{
        alert('Please fill the form')
    }
}

    return (
        <KeyboardAwareScrollView >
            <StatusBar backgroundColor='#4682B4' />
            <View style={{ flex: 0.6, padding:10, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, zIndex: 1, marginTop:30 }}>
                <View style={{ flex: 1, }}>
                    <View style={{ marginBottom: -100,  flex: 0.95, borderRadius: 25, padding: 10, margin: 15, shadowColor: 'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, elevation: 3, backgroundColor: 'white' }}>
                        <View style={{ felx: 0.2, margin: 10, marginTop: 10, marginLeft:30, justifyContent: 'center', backgroundColor: 'yello' }}>
                            <Text style={{ color: '#4682B4', fontSize: 25, fontWeight: '700' }}>Signup</Text>
                        </View>
                        <View style={{ flex: 0.7, justifyContent: 'center', alignContent: 'center', marginTop: 20, }}>
                        <View style={{ alignItems: 'center' }}>
                                <View style={{
                                    marginBottom:20,
                                    flexDirection: 'row',
                                    backgroundColor: '#fffafa',
                                    paddingHorizontal: 13,
                                    borderColor: '#ccc',
                                    borderBottomWidth: 1,
                                    borderRadius: 30,
                                    width: '95%',
                                    height: 50,
                                    alignItems: 'center'
                                }}>
                                    <UserIcon
                                        style={{ marginRight: 10}}
                                        name='user'
                                        size={40}
                                        color='#4682B4'
                                    />
                                    <TextInput
                                        style={{
                                            fontSize: 16,
                                            width: '70%',
                                        }}
                                        placeholder="User Name"
                                        onBlur={() => {userNameValidator()}}
                                        onChangeText={(text) => {setUserName(text), userNameValidator()}}
                                        value={userName}
                                    />
                                </View>
                            </View>
                            <View style={{marginLeft:10}}>
                                <Text style={{color:'red', fontSize:10}}>
                                    {userNameError}
                                </Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#fffafa',
                                    paddingHorizontal: 13,
                                    borderColor: '#ccc',
                                    borderBottomWidth: 1,
                                    borderRadius: 30,
                                    width: '95%',
                                    height: 50,
                                    alignItems: 'center'
                                }}>
                                    <MobileIcon
                                        style={{ marginRight: 15, marginLeft: 8 }}
                                        name='email'
                                        size={25}
                                        color='#4682B4'
                                    />
                                    <TextInput
                                        style={{
                                            fontSize: 16,
                                            width: '70%',
                                        }}
                                        placeholder="Email"
                                        onBlur={()=>{emailValidator()}}
                                        onChangeText={(text)=>{setEmail(text),emailValidator()}}
                                        value={email}
                                    />
                                </View>
                            </View>
                                <View style={{marginLeft:10}}>
                                <Text style={{color:'red', fontSize:10}}>
                                    {emailError}
                                </Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{
                                    marginTop: 20,
                                    flexDirection: 'row',
                                    backgroundColor: '#fffafa',
                                    paddingHorizontal: 13,
                                    borderColor: '#ccc',
                                    borderBottomWidth: 1,
                                    borderRadius: 30,
                                    width: '95%',
                                    height: 50,
                                    alignItems: 'center'
                                }}>
                                    <PasswordIcon
                                        style={{ marginRight: 14, marginLeft:5 }}
                                        name='key-outline'
                                        size={28}
                                        color='#4682B4'
                                    />
                                    <TextInput
                                        secureTextEntry={hidePass ? false : true}
                                        style={{
                                            fontSize: 16,
                                            width: '70%',
                                        }}
                                        placeholder="Password"
                                        onBlur={() => {passwordValidator()}}
                                        onChangeText={(text)=>{setPassword(text),passwordValidator()}}
                                        value={password}
                                    />
                                    <Icon
                                        style={{ marginLeft: 10 }}
                                        name={hidePass ? 'eye' : 'eye-slash'}
                                        size={15}
                                        color="grey"
                                        onPress={() => setHidePass(!hidePass)}
                                    />
                                </View>
                            </View>
                            <View style={{marginLeft:10}}>
                                <Text style={{color:'red', fontSize:10}}>
                                    {passwordError}
                                </Text>
                            </View>
                            <View style={{ alignItems: 'center'}}>
                                <View style={{
                                    marginTop: 25,
                                    flexDirection: 'row',
                                    backgroundColor: '#fffafa',
                                    paddingHorizontal: 13,
                                    borderColor: '#ccc',
                                    borderBottomWidth: 1,
                                    borderRadius: 30,
                                    width: '95%',
                                    height: 50,
                                    alignItems: 'center'
                                }}>
                                    <ConfirmPasswordIcon
                                        style={{ marginRight: 14, marginLeft:6  }}
                                        name='shield-key-outline'
                                        size={28}
                                        color='#126D9E'
                                    />
                                    <TextInput
                                        secureTextEntry={confirmHidePass ? false : true}
                                        style={{
                                            fontSize: 16,
                                            width: '70%',
                                        }}
                                        placeholder="Confirm Password"
                                        onBlur={()=>{confirmPasswordValidator()}}
                                        onChangeText={(text)=>{setConfirmPassword(text),confirmPasswordValidator()}}
                                        value={confirmPassword}
                                    />
                                    <Icon
                                    style={{ marginLeft: 10 }}
                                        name={confirmHidePass ? 'eye':'eye-slash'}
                                        size={15}
                                        color="grey"
                                        onPress={() => setConfirmHidePass(!confirmHidePass)}
                                    />
                                </View>
                            </View>
                            <View style={{marginLeft:10}}>
                                <Text style={{color:'red', fontSize:10}}>
                                    {confirmPasswordError}
                                </Text>
                            </View>
                            <View style={{ marginTop: 40, alignItems: 'center' }}>
                                <TouchableOpacity
                                onPress={()=> {userRegistration()}}
                                    style={{
                                        width: '50%',
                                        backgroundColor: '#4682B4',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 8,
                                        borderRadius: 100,
                                    }}>
                                    <Text style={{
                                        color: 'white',
                                        fontWeight: '500',
                                        fontSize: 16
                                    }}>
                                        Register Now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center', alignContent: 'center', padding:20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }} >
                                <Text>
                                Already have an account? {' '}
                                </Text>
                                <TouchableOpacity onPress={() => { reset(), navigation.navigate('Login') }}>
                                    <Text style={{ color: '#4682B4' }}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{  padding:200 , borderTopRightRadius: 70, backgroundColor: '#4682B4' }}>
            </View>
        </KeyboardAwareScrollView>
    );
}

export default SignUp;