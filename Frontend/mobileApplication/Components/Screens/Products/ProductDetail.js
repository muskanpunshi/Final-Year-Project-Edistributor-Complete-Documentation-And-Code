import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Image,StatusBar} from 'react-native';
import Axios from 'axios';
import {useSelector} from 'react-redux';

const ProductDetail = ({navigation, route}) => {
  const {token} = useSelector(state => state.auth);

  const [productDetails, setProductDetails] = React.useState(['']);
  const [productId, setProductId] = React.useState('');
  const [productName, setProductName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [image,setImage] = React.useState([]);
  const [quantity, setQuantity] = React.useState('1');

  useEffect(() => {
    fetchProductByID();
  }, []);

  const fetchProductByID = () => {
    const product = route.params.paramKey._id;
    setProductId(route.params.paramKey._id);

    Axios.get('http://10.0.2.2:5050/user/productdetails/' + product)
      .then(res => {
         console.log("details",res.data);
        setProductDetails(res.data);
        setProductName(res.data.productname);
        setPrice(res.data.price);
        setImage(res.data.image);
      })
      .catch(error => {
        console.log(error);
      });
  };

  console.log("check image path",image);

  const addToCart = async () => {
    const item = {
      productId: productId,
      productname: productName,
      price: price,
      quantity: quantity,
      image:image,
      
    };

    //console.log("checking item",item);

    Axios.post('http://10.0.2.2:5050/user/addtocart',item, {
      headers: {
        token: token,
      },
    })
      .then(res => {
        // console.log(res.data)
        // alert('Product added to cart')
        navigation.navigate('CartScreen');
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <View style={{flex: 1}}>
       <StatusBar backgroundColor='#4682B4' />
      <View style={{flex: 0.4,borderBottomWidth:1,borderBottomColor:"#ccc"}}>
        <Image
          source={{
            width: '94%',
            height: '90%',
            
            uri: 'http://10.0.2.2:5050/' + productDetails.image,
          }}
          resizeMode="contain"
        />
      </View>
      <View style={{flex: 0.6}}>
        <View style={{marginTop: 2, paddingLeft: 8}}>
          <Text style={{color: 'black', fontSize: 30, fontWeight: '500'}}>
            {productDetails.productname}
          </Text>
          <Text style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
            Rs.{productDetails.price}
          </Text>
        </View>
        <View
          style={{
            margin: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}></View>
        <View style={{marginTop: 2, marginHorizontal:8}}>
          <Text>{productDetails.description}</Text>
        </View>
        <View style={{marginTop: 40, paddingLeft: 8}}>
          <TouchableOpacity
            onPress={() => {
              addToCart();
            }}
            style={{
              backgroundColor: '#4682B4',
              justifyContent: 'center',
              height: 50,
              borderRadius: 8,
              margin: 30,
            }}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '500',
              }}>
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;
