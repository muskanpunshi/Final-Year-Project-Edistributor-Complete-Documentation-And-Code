import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
  StatusBar,
  Modal
} from 'react-native';
import {useSelector} from 'react-redux';
import Axios from 'axios';
import MyModal from './Modal';

const ShippingDetails = ({navigation, route}) => {

  const {token} = useSelector(state => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [floor, setFloor] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [note, setNote] = useState('');
  const [cartDetails, setCartDetails] = useState([]);
  const [cartId,setCartId] = useState([]);
  const [shippingDetails,setShippingDetails]=useState([]);
  const [orderDetails,setOrderDetails]=useState([]);
  const [totalPrice,setTotalPrice]=useState();
  const [onClick,setOnClick]=useState(false);
  const [click,setClick]= useState(false);
  const [orderId,setOrderId]= useState();

  useEffect(() => {
    const {productDetails,total} = route.params;
    console.log(productDetails);
    setCartDetails(productDetails);
    setTotalPrice(total);
  
  }, []);

  const handleClose =()=>{
    setModalVisible(false)
  }
  
  const getOrderDetails=(id)=>{
    let array=[];
    for(let i=0;i<cartDetails.length;i++){
      array[i]= cartDetails[i]._id;
    }
    
    setCartId(array);
   
    console.log("id chk",cartId);
    const data={
      id: cartId
    }
    Axios.post(`http://10.0.2.2:5050/user/setid/${id}`,data)
      .then(res =>{  
        console.log("details",res.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleDetails = () => {
    
    ///API QUANTITY DECREASE
    if (floor && street && city && note != '') {   
      for(let i = 0; i < cartDetails.length - 1;){
        console.log("quantity",cartDetails[i].quantity)
        console.log("productid",cartDetails[i].productId)
        var id = cartDetails[i].productId;
        var quantity = cartDetails[i].quantity;
        let data = {
          quantity : quantity
        }
         

        Axios.post(`http://10.0.2.2:5050/user/updateQuantity/${id}`, data )
            .then((res) => {
                console.log(res);

            }).catch((error) => {
                console.log(error.response.data)
            });
            i++;
      }

     let orderdetails = {
      //cartid:cId,
      floor:floor,
      street:street,
      city:city,
      note:note,
      totalprice:totalPrice

     }
     console.log("OrderDetails",orderdetails)
     Axios.post(`http://10.0.2.2:5050/user/order`,orderdetails,{
       headers: {
         token: token,
       },
      }).then(res =>{
         console.log("check response",res.data);
         setOrderDetails(res.data);
         setOnClick(true);
         setModalVisible(true);
         setOrderId(res.data._id);
         getOrderDetails(res.data._id);
         
       })
       .catch(error => {
         console.log(error.response.data);
       })      
  }
  else{
    alert("fill details")
  }
}


  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#4682B4" />
      <View style={{}}>
        <View style={{paddingHorizontal: 10, marginVertical: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold',textAlign:'center',color:"#4682B4"}}>
            Delivery Details
          </Text>
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
            placeholder="Floor/House No #"
            value={floor}
            onChangeText={text => {
              setFloor(text);
            }}
            required={true}
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
            placeholder="Street"
            value={street}
            onChangeText={text => {
              setStreet(text);
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
            placeholder="City"
            value={city}
            onChangeText={text => {
              setCity(text);
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
            placeholder="Note to Rider"
            value={note}
            onChangeText={text => {
              setNote(text);
            }}
          />
        </View>
      </View>
      
       <View>
       
      <ScrollView style={{height:"27%",borderTopWidth:1,borderBottomWidth:1,margin:20,borderColor:"#4682B4"}}>
      <View style={{borderBottomWidth:1,borderBottomColor:"#4682B4",paddingVertical:10}}>
          <Text style={{color:"#4682B4",fontSize:15,fontWeight:"700"}}>Order Summary</Text>
      </View>
      <View>
        {cartDetails.map((item,index)=>{
          return(
            <>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={{fontSize:15}}>{item.productname}</Text>
          <Text>{item.price} x {item.quantity}</Text>
          </View>
            </>
          )
        })}
      
      </View>

      
      </ScrollView>
      <Text style={{fontSize:18,fontWeight:"bold",color:"#4682B4",marginHorizontal:20}}>Total:{totalPrice}</Text>
      </View>
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
        onPress={handleDetails}>
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

      
      {onClick ?<MyModal isVisible={modalVisible} setModalVisiblity={handleClose} /> :null }
   </View>
  );
}


export default ShippingDetails;
