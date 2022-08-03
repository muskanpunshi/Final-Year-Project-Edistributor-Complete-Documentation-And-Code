import React, { Component, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MyOrders = ({ navigation }) => {

	const { token } = useSelector(state => state.auth);
	const [myOrder, stMyOrder] = React.useState([]);
    const [productDetails,setProductDetails] = React.useState([]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getDetails();
		});

		return unsubscribe;

	}, [navigation])

	const getDetails = () => {
		Axios.get(`http://10.0.2.2:5050/rider/myorders`,
			{
				headers: {
					'token': token
				}
			})
			.then((res) => {
				stMyOrder(res.data)
                for(let i=0;i<myOrder.length;i++){
                    setProductDetails(myOrder[i].cartId)
                }
				console.log("productDetails",productDetails)
				console.log('myDetails',myOrder);
			}).catch((error) => {
				console.log(error)
			});
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1}}>
				{
					myOrder.length > 0 ?
						(
							<TouchableOpacity style={{ flex: 1, flexDirection: 'column' }} onPress={() => { navigation.navigate('OrderDetails', { otherParam: myOrder }) }}>
								{
									productDetails.map((item) => (
										<View key={item._id} style={styles.product}>
											<View style={{  width: wp('35%'), }}>
												<Image source={{  uri: 'http://10.0.2.2:5050/' + item.image  }} resizeMode='contain' style={{ flex: 1 }} />
											</View>
											<View style={{ width: wp('35%'), padding: 10, marginLeft: 10 }}>
												<View style={{ flex: 0.3, justifyContent: 'center' }}>
													<Text style={{ fontSize: 19, color: 'black', fontWeight: 'bold', }}>{item.productname}</Text>
												</View>
                                                <View style={{ flex: 0.2 }}>
													<Text style={{ fontSize: 13, color: 'black' }}>Rs.{item.price}</Text>
												</View>
                        
                                              
												<View style={{ flex: 0.2, justifyContent: 'center' }}>
													<Text style={{ fontSize: 11, color: 'black' }}>{item.status} To You</Text>
												</View>
												
											</View>
										
										</View>
									))
								}
                                {
                                    myOrder.map((item)=>(
                                        <View  key={item._id}style={{backgroundColor:"white",marginHorizontal:15,borderBottomWidth:1,borderBottomColor:"#4682B4"}}>
                                        <View  style={{flexDirection:"row",justifyContent:'space-between'}}>
                                            <Text style={{fontSize:16,fontWeight:'600',color:'black'}}>Floor</Text>
                                            <Text style={{fontSize:16,fontWeight:'600',color:'black'}}>{item.floor}</Text>
                                        </View>
                                        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                                            <Text style={{fontSize:16,fontWeight:'600',color:'black'}}>Street</Text>
                                            <Text style={{fontSize:16,fontWeight:'600',color:'black'}}>{item.street}</Text>
                                        </View>
                                        <View  style={{flexDirection:"row",justifyContent:'space-between'}}>
                                            <Text style={{fontSize:16,fontWeight:'600',color:'black'}}>City</Text>
                                            <Text style={{fontSize:16,fontWeight:'600',color:'black'}}>{item.city}</Text>
                                        </View>
                                        <View  style={{flexDirection:"row",justifyContent:'space-between'}}>
                                            <Text style={{fontSize:16,fontWeight:'600',color:'black'}}>Total</Text>
                                            <Text style={{fontSize:16,fontWeight:'600',color:'black'}}>{item.totalprice}</Text>
                                        </View>

                                        </View>
                                    ))
                                }
							</TouchableOpacity>
						) : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >
							<Text style={{ fontSize: 15, color: '#186c9b', fontWeight: 'bold' }}> No Result Found</Text>
						</View>
				}
			</View>
		</View>
	)

}

const styles = StyleSheet.create({
	product: {
		display: "flex",
		flexDirection: "row",
		height: 150,
		backgroundColor: "#fff",
		padding: 10,
        borderTopWidth:1,
        borderTopColor:"#4682B4"
	},
})

export default MyOrders;