import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import Axios from 'axios';
import { useSelector } from 'react-redux';


const Payment =({navigation,route})=>{

    const { token } = useSelector(state => state.auth);

    const [cardNumber,setCardNumber] = useState();
    const [name,setName] = useState("");
    const [date,setDate] = useState("");
    const [ cvv,setCvv] = useState();
    const [productDetails, setProductDetails] = React.useState([""]);
    const [shippingDetails,setShippingDetails] = useState([""]);


    useEffect(() => {
        const {otherParams } = route.params;
        console.log("received from shippinh",otherParams);
        
        setShippingDetails(otherParams);
       fetchProducts();
    }, []);
    console.log("checking set value",shippingDetails);

    const fetchProducts = () => {
        Axios.get('http://10.0.2.2:5050/user/viewcart',
            {
                headers: {
                    'token': token
                }
            })
            .then((res) => {
                setProductDetails(res.data);

            }).catch((error) => {
                console.log(error.response.data)
            });
    }
    console.log(productDetails)

    const handleConfirmation =()=>{
        alert('reached')
    }

    return(
        <View style={{flex:1}}>
        <View
          style={{
            backgroundColor: '#fafafa',
            borderColor: '#ccc',
            margin: 8,
            borderRadius: 10,
            height: 50,
            elevation: 3,
            paddingHorizontal: 20,
          }}>
          <TextInput
            style={{
              fontSize: 16,
              width: '70%',
            }}
            placeholder="Card number"
            value={cardNumber}
            onChangeText={text => {
              setCardNumber(text);
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: '#fafafa',
            borderColor: '#ccc',
            margin: 8,
            borderRadius: 10,
            height: 50,
            elevation: 3,
            paddingHorizontal: 20,
          }}>
          <TextInput
            style={{
              fontSize: 16,
              width: '70%',
            }}
            placeholder="Name on Card"
            value={name}
            onChangeText={text => {
              setName(text);
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: '#fafafa',
            borderColor: '#ccc',
            margin: 8,
            borderRadius: 10,
            height: 50,
            elevation: 3,
            paddingHorizontal: 20,
          }}>
          <TextInput
            style={{
              fontSize: 16,
              width: '70%',
            }}
            placeholder="Expiration (MM/YY)"
            value={date}
            onChangeText={text => {
              setDate(text);
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: '#fafafa',
            borderColor: '#ccc',
            margin: 8,
            borderRadius: 10,
            height: 50,
            elevation: 3,
            paddingHorizontal: 20,
          }}>
          <TextInput
            style={{
              fontSize: 16,
              width: '70%',
            }}
            placeholder="CVV number"
            value={cvv}
            onChangeText={text => {
              setCvv(text);
            }}
          />
        </View>

    <Text>Shipping Details:</Text>
 <Text>{shippingDetails[0]}</Text>
 <Text>{shippingDetails[1]}</Text>
 <Text>{shippingDetails[2]}</Text>
 <Text>{shippingDetails[3]}</Text>
    {/* {shippingDetails.map((item) => {
                    return (
                        <>
                            <View key={item._id} style={{ margin: 3, flexDirection: 'row' }} >
                                <Text >{item.floor}</Text>
                                <Text>{item.street}</Text>
                                <Text>{item.city}</Text>
                                <Text>{item.note}</Text>     
                            </View>
                        </>
                    )
                })}    */}
                <Text>Order Details:</Text>
    {productDetails.map((item) => {
                    return (
                        <>
                            <View key={item._id} style={{ margin: 3, flexDirection: 'row' }} >
                                <Text>{item.productname}</Text>
                                <Text>{item.price}</Text>
                                 
                            </View>
                        </>
                    )
                })}   
        <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 40,
          left: 10,
          right: 10,
          elevation: 5,
          padding: 15,
          borderRadius: 8,
          backgroundColor: '#4682B4',
        }}
        onPress={handleConfirmation}>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '500',
          }}>
          Confirm Order
        </Text>
      </TouchableOpacity>
        </View>
    )
}

export default Payment ;