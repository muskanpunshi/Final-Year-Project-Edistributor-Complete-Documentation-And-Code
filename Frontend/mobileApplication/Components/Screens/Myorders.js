import React, {useRef, useState, useEffect} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import Axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Myorders = ({navigation}) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const {token} = useSelector(state => state.auth);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = () => {
    Axios.get('http://10.0.2.2:5050/user/orderdetail', {
      headers: {
        token: token,
      },
    })
      .then(res => {
        setOrderDetails(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  console.log(orderDetails);

  return (
    <>
      <ScrollView style={{flex: 1}}>
        {orderDetails.map((item, index) => {
          return (
            <>
              <View style={{margin: 10, backgroundColor: '#ccc'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                  }}>
                  <Text>Product Name:</Text>
                  <Text> {item?.cartId?.productname}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                  }}>
                     <Text> Price:</Text>
                  <Text> {item?.cartId?.price}</Text>
                  </View>
                  <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                  }}>
                     <Text> Sub Total:</Text>
                  <Text> {item?.totalprice}</Text>
                  </View>
              </View>
            </>
          );
        })}
      </ScrollView>
    </>
  );
};

export default Myorders;
