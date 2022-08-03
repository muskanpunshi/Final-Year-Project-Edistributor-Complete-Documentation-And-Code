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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BakelineList = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={()=>{ navigation.navigate('ProductDetail', {paramKey: item})}
      }
      activeOpacity={0.7}>
      <View
        style={{
          display: 'flex',
          flex: 1,
          width: wp('45%'),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#efefef',
          borderBottomWidth:1,
          borderBottomColor:'#4682B4', 
          elevation:2,
          borderRadius: 10,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <Image
          style={{
            height: hp('10%'),
            width: wp('30%'),
            resizeMode: 'contain',
          }}
          source={{uri: 'http://10.0.2.2:5050/' + item.image}}
        />
        <View style={{width:wp('30%'),alignItems:'center',paddingBottom:10}}>
          <Text
            style={{
              color: '#4682B4',
              fontFamily: 'Roboto',
              fontSize: 15,
              fontWeight:'700'
            }}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.productname.trim()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default BakelineList;
