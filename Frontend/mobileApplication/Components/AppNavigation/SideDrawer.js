import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';

import Home from 'react-native-vector-icons/MaterialCommunityIcons';
import UserIcon from 'react-native-vector-icons/AntDesign';
import LogoutIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-paper';

import {LogOut} from '../Redux/actions/Action';

import {useDispatch} from 'react-redux';

export function SideDrawer({navigation}) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView style={{backgroundColor: '#FFF'}}>
      <View>
        <View>
          <View
            style={{
              marginTop: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Avatar.Image size={90} style={{ marginBottom: '7%' ,backgroundColor:'white' }} /> */}
            <UserIcon name={'user'} size={100} color={'#4682B4'} />
          </View>
          <View>
            <Text
              style={{
                marginTop: 20,
                textAlign: 'center',
                color: '#4682B4',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              muskanpunshi
            </Text>
          </View>

          <DrawerItem
            label="Home"
            style={{marginTop: 10}}
            labelStyle={{color: '#4682B4'}}
            onPress={()=>{navigation.navigate("Home")}}
            icon={() => (
              <Home
                name="home"
                size={25}
                color="#4682B4"
                style={{marginLeft: 10, paddingLeft: 10}}
              />
            )}
          />

          <DrawerItem
            onPress={() => {
              dispatch(LogOut());
            }}
            label="Logout"
            style={{marginTop: 10}}
            labelStyle={{color: '#4682B4'}}
            icon={() => (
              <LogoutIcon
                name="logout"
                size={25}
                color="#4682B4"
                style={{marginLeft: 10, paddingLeft: 10}}
              />
            )}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //     backgroundColor: '#2E8B57',
  // },
  // drawerContent: {
  //     flex: 1,
  // },
  // userInfoSection: {
  //     paddingLeft: 20,
  // },
  // title: {
  //     marginTop: 20,
  //     fontWeight: 'bold',
  // },
  // caption: {
  //     fontSize: 14,
  //     lineHeight: 14,
  // },
  // row: {
  //     marginTop: 20,
  //     flexDirection: 'row',
  //     alignItems: 'center',
  // },
  // section: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     marginRight: 15,
  // },
  // paragraph: {
  //     fontWeight: 'bold',
  //     marginRight: 3,
  // },
  // drawerSection: {
  //     marginTop: 15,
  // },
  // preference: {
  //     flexDirection: 'row',
  //     justifyContent: 'flex-start',
  //     paddingVertical: 12,
  //     paddingHorizontal: 20
  // },
});
