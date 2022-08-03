import React, {useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

const CartScreen = ({navigation}) => {
  const {token} = useSelector(state => state.auth);
  const [incQty, setIncQty] = React.useState(0);

  const [productDetails, setProductDetails] = React.useState(['']);
  const [newProd, setNewProd] = React.useState();
  const [quantity, setQuantity] = React.useState([]);
  const [newQty,setNewQty] = React.useState();
  const [total,setTotal] = React.useState();

  useEffect(() => {
    fetchProducts();
  }, []);

  const increaseQty = i => {
    console.log(i);
    setQuantity(()=>{
      const qty= productDetails.map((item,j)=>{
      
        if(item._id === i._id){
          let q=item.quantity + 1 ;
          return q;
        }
        else {
          return item.quantity;
        }
      })
      return {
        qty,
      }

    }
    )
    console.log(quantity);
  };



  const decreaseQty = quantity => {
    setIncQty(incQty - 1);
    setQuantity(incQty);
    console.log(' After quantity...', quantity);
  };

  const fetchProducts = () => {
    let sum=0;
    Axios.get('http://10.0.2.2:5050/user/viewcart', {
      headers: {
        token: token,
      },
    })
      .then(res => {
      console.log('check response', res?.data);
        setProductDetails(res.data);
        
        let data=res.data
       // console.log("dddd...",data.price);
        for(let i = 0;i<data.length;i++){
         
          sum += data[i].price;

        }
        setTotal(sum);
    
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <StatusBar backgroundColor="#4682B4" />
        {productDetails.map((item, index) => {
          return (
            <>
              <View
                key={item._id}
              
                style={{
                  margin: 3,
                  flexDirection: 'row',
                  justifyContent: "flex-start",
                }}>
                <View
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 12,
                    margin: 10,
                    backgroundColor: '#ccc',
                  }}>
                  <Image
                    source={{
                      width: '100%',
                      height:'100%',
                      uri: 'http://10.0.2.2:5050/' + item.image,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <View style={{width: 240, marginTop: 5,marginLeft:20}}>
                  <Text
                    style={{color: 'black', fontSize: 20, fontWeight: '500'}}>
                    {item.productname}
                  </Text>
                  <Text
                    style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
                    Rs.{item.price}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    {/* <TouchableOpacity
                      onPress={() => {
                        increaseQty(item);
                      }}>
                      <Icon name="plussquareo" size={20} />
                    </TouchableOpacity> */}
                    <Text
                      style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
                      {' '}
                      {item.quantity}
                    </Text>
                    {/* <TouchableOpacity onPress={increaseQty}>
                      <Icon name="minussquareo" size={20} />
                    </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            </>
          );
        })}
      </ScrollView>
      <View style={{paddingLeft: 8, marginBottom: 20}}>
        
        <View style={{flexDirection:'row-reverse',marginHorizontal:20,marginTop:10}}>
          <Text style={{fontSize:20,fontWeight:"bold"}}>Total Price: {total}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShippingDetails', {
              productDetails: productDetails,
              total: total
            });
          }}
          style={{
            backgroundColor: '#4682B4',
            justifyContent: 'center',
            height: 50,
            borderRadius: 8,
            margin: 20,
          }}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '500',
            }}>
            Proceed to shipping
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default CartScreen;
