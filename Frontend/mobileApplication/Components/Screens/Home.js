import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Homecarousel from './Carousel';

import Axios from 'axios';
import Innovativelist from './Products/InnovativeList';
import BakelineList from './Products/BakelineList';

const Home = ({navigation}) => {
  const [productList, setProductList] = useState([]);
  const [bakelineList, setBakelineList] = useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(5);
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      allInnovative();
      allBakeline();
    }
    return () => (isMountedRef.current = false);
  }, [page]);

  ///Innovative
  const allInnovative = () => {
    Axios.get(
      `http://10.0.2.2:5050/user/innovativeproducts?page=${page}&limit=${limit}`,
    )
      .then(res => {
        if (isMountedRef.current) {
          setProductList(productList.concat(res.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };


  const allBakeline = () => {
    Axios.get(`http://10.0.2.2:5050/user/bakelineproducts?page=${page}&limit=${limit}`)
        .then((res) => {
            if (isMountedRef.current) {
                // console.log(res.data)
                setBakelineList(bakelineList.concat(res.data))
                setLoading(false)
            }
        }).catch((error) => {
            console.log(error)
        });
}

  const InnovativeProducts = () => {
    return (
      <View style={{marginTop: 20, minHeight: 160}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              color: '#5E5E5E',
            }}>
            Innovative
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Innovative');
            }}>
            <Text
              style={{
                color: '#5E5E5E',
                fontSize: 16,
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            contentContainerStyle={{
              paddingLeft: 10,
            }}
            data={productList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    marginRight: 10,
                    height: 10,
                  }}
                />
              );
            }}
            renderItem={({item, index}) => (
              <Innovativelist item={item} navigation={navigation} />
            )}
          />
        </View>
      </View>
    );
  };


  const BakelineProducts=()=>{
    return (
      <View style={{marginTop: 20, minHeight: 160}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              color: '#5E5E5E',
            }}>
            Bakeline
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BakeLine');
            }}>
            <Text
              style={{
                color: '#5E5E5E',
                fontSize: 16,
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            contentContainerStyle={{
              paddingLeft: 13,
            }}
            data={bakelineList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    marginRight: 10,
                    height: 10,
                  }}
                />
              );
            }}
            renderItem={({item, index}) => (
              <BakelineList item={item} navigation={navigation} />
            )}
          />
        </View>
      </View>
    );
  }







  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#4682B4" />
      <Homecarousel />
      <InnovativeProducts />
      <BakelineProducts />
    </View>
  );
};

export default Home;
