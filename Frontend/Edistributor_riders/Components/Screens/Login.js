import React from 'react';
import { Text, View, TouchableOpacity, StatusBar, TextInput, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EmailIcon from 'react-native-vector-icons/Fontisto';
import PasswordIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Axios from 'axios';

import { LogIn } from '../Redux/actions/Action';

import { useDispatch } from 'react-redux';

const Login = ({ navigation }) => {

  const [hidePass, setHidePass] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [loader, setLoader] = React.useState(false);

  const dispatch = useDispatch();

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const onLogin = () => {
    if (email && password != null) {

      userLogin();
    }
    else {
      alert("Please enter the values to continue")
    }
  }

  const userLogin = () => {

    // setLoader(true)

    Axios.post('http://10.0.2.2:5050/rider/login',
      {
        email: email,
        password: password
      })
      .then((res) => {
        console.log(res)
        // console.log(res.status)
        const token = res.data.token;
        const expiry = res.data.expiry;
        dispatch(LogIn(token, expiry));
        // setLoader(false)
      }

      ).catch((error) => {
        alert('Login failed')
        console.log(error)
      });
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


  return (

    <KeyboardAwareScrollView >
      <StatusBar backgroundColor='#4682B4' />
      <View style={{ flex: 0.65, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, zIndex: 1, marginTop: 30, padding: 15 }}>
        <View style={{ flex: 1,}}>
          <View style={{ marginBottom: -130, flex: 0.95, borderRadius: 25, padding: 30, margin: 15,shadowColor: 'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, elevation: 3, backgroundColor: '#fff' }}>
            <View style={{ felx: 0.2, margin: 10, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#4682B4', fontSize: 25, fontWeight: '700' }}>E-DISTRIBUTOR</Text>
            </View>
            <View style={{ flex: 0.9, justifyContent: 'center', alignContent: 'center', marginTop: 20 }}>
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
                  <EmailIcon
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
                    onChangeText={(text) => { setEmail(text) }}
                    onBlur={() => { emailValidator() }}
                    value={email}
                  />
                </View>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'red', fontSize: 10 }}>
                  {emailError}
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
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
                  <PasswordIcon
                    style={{ marginRight: 14, marginLeft: 5 }}
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
                    onChangeText={(text) => { setPassword(text) }}
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
              {/* {
                loader === true ?
                  (
                    <View style={{ flex: 0.1 }}>
                      <ActivityIndicator size="large" color="blue" />
                    </View>
                  ) : null

              } */}
             
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    width: '50%',
                    backgroundColor: '#4682B4',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8,
                    borderRadius: 100,
                  }}
                  onPress={() => { onLogin() }}>
                  <Text style={{
                    color: 'white',
                    fontWeight: '500',
                    fontSize: 16
                  }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
           
          </View>
        </View>
      </View>
      <View style={{ borderTopRightRadius: 70, backgroundColor: '#4682B4', padding: 200, marginTop: 60 }}>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Login;