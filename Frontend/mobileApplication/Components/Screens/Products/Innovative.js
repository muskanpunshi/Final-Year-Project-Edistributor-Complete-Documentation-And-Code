import React, { useEffect, useState, useRef } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator,Image, FlatList,StatusBar } from 'react-native';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/Feather'

const Innovative = ({ navigation }) => {

    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [loading, setLoading] = React.useState(false);

    const [productList, setProductList] = React.useState([]);

    const isMountedRef = useRef(null);

    useEffect(() => {
        isMountedRef.current = true;
        if(isMountedRef.current){
            allAds();
        }
        return () => isMountedRef.current = false;
    }, [page]);

    const allAds = () => {
        Axios.get(`http://10.0.2.2:5050/user/innovativeproducts?page=${page}&limit=${limit}`)
            .then((res) => {
                if (isMountedRef.current) {
                    //  console.log(res.data)
                    //  console.log("....")
                    setProductList(productList.concat(res.data))
                    setLoading(false)
                }
            }).catch((error) => {
                console.log(error)
            });
    }

    const renderFooter = () => {
        return loading ?
            <View style={{flex:0.1}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View> : null
    }

    const handleLoadMore = () => {
        setLoading(true)
        setPage(page + 1)
    }


    return (
        <View style={{ flex: 1 }}>
             <StatusBar backgroundColor='#4682B4' />
           
            <FlatList
                style={{ flex: 1 ,marginTop:10 }}
                numColumns={2}
                data={productList}
                keyExtractor={(item, index) => String(index)}
                onEndReached={handleLoadMore}
                extraData={productList}
                ListFooterComponent={renderFooter}
                renderItem={({ item, index }) =>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: '#ffff', height: 200, margin: 5 }}
                     onPress={() => { navigation.navigate('ProductDetail', { paramKey: item }) }}>
                        <View style={{ flex: 0.5, backgroundColor: '#ccc' }}>
                            <Image source={{ uri:"http://10.0.2.2:5050/"+item.image }}
                            style={{width: '100%', height: '100%'}} 
                            resizeMode="contain"
                            /> 
                           
                        </View>
                        <View style={{ flex: 0.5 ,elevation:1}}>
                            <View style={{ flex:0.4, flexDirection: 'row',justifyContent:'space-between',marginHorizontal:2,marginVertical:2 }}>
                                <View style={{ flex:0.7, justifyContent: 'center',marginRight:2 }}>
                                    <Text numberOfLines={1} style={{ color: "#494c4e", fontSize: 16, fontWeight: '600' }}> {item.productname}</Text>
                                </View>
                                {/* <View style={{ flex:0.3, marginRight:20, flexDirection: 'row-reverse', }}>
                                    <Icon name="plus-circle" size={20} color="#ccc" />
                                </View> */}
                            </View>
                            <View style={{ marginHorizontal:2 }}>
                                <Text style={{ color: "black", fontSize: 18, fontWeight: '400' }}> Rs.{item.price}</Text>
                            </View>
                            <View style={{marginHorizontal:2}}>
                                
                                <View style={{  justifyContent: 'center', }}>
                                    <Text numberOfLines={1}  style={{ color: "grey", fontSize: 13, fontWeight: '400', }}>{item.description}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
            />
        </View>
    );
}

export default Innovative;