import * as React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {SideDrawer} from '../AppNavigation/SideDrawer';

import Login from '../Screens/Login';
import SignUp from '../Screens/Signup';

import CartScreen from '../Screens/Cart';
import Innovative from '../Screens/Products/Innovative';
import Bakeline from '../Screens/Products/Bakeline';
import ProductDetail from '../Screens/Products/ProductDetail';
import SearchProduct from '../Screens/SearchProduct';

import DrawerIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/Feather';
import IIcon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useSelector} from 'react-redux';
import ShippingDetails from '../Screens/ShippingDetails';
import Payment from '../Screens/Payment';
import Home from '../Screens/Home';
import Myorders from '../Screens/Myorders';

// import CustomBooking from '../Screens/CustomBooking';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const splashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('Login');
  }, 3000);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#4682B4',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 18,
          color: 'white',
        }}>
        E-DISTRIBUTOR
      </Text>
    </View>
  );
};

const StackedScreens = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          borderBottomLeftRadius: 21,
          borderBottomRightRadius: 21,
          backgroundColor: '#4682B4',
          height: hp('10%'),
        },
        headerTitleStyle: {color: 'white'},
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <DrawerIcon
              name="bars"
              size={25}
              color="#fff"
              style={{marginLeft: 10, paddingLeft: 10}}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SearchProduct')}>
                <FIcon
                  name="search"
                  size={25}
                  color="white"
                  style={{marginRight: 10, paddingRight: 10}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('CartScreen')}>
                <FIcon
                  name="shopping-cart"
                  size={25}
                  color="white"
                  style={{marginRight: 10, paddingRight: 10}}
                />
              </TouchableOpacity>
            </View>
          </>
        ),
      }}>
      <Stack.Screen name="Home" component={Home} 
      options={{headerTitle: props => (
        <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
          EDistributor
        </Text>
      ),
      headerTitleAlign: 'center',
    }} />
      {/* <Stack.Screen name="Products" component={TopTabs} /> */}
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{backgroundColor: 'transparent'}}
              onPress={() => navigation.goBack()}>
              
              <Icon
                name="cross"
                size={25}
                color="#fff"
                style={{marginRight: 8}}
              />
            </TouchableOpacity>
          ),
          headerTitle: props => (
            <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
              Cart
            </Text>
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="Innovative" component={Innovative} options={{
         headerLeft: () => (
          <TouchableOpacity
            style={{backgroundColor: 'transparent', left: 10}}
            onPress={() => navigation.goBack()}>
            <IIcon
              name="arrow-back"
              size={35}
              color="white"
              style={{marginRight: 15, paddingRight: 10}}
            />
          </TouchableOpacity>
        ),
         headerTitle: props => (
          <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
          Innovative
          </Text>
        ),
        headerTitleAlign: 'center',

      }} />
      <Stack.Screen name="BakeLine" component={Bakeline} options={{
         headerLeft: () => (
          <TouchableOpacity
            style={{backgroundColor: 'transparent', left: 10}}
            onPress={() => navigation.goBack()}>
            <IIcon
              name="arrow-back"
              size={35}
              color="white"
              style={{marginRight: 15, paddingRight: 10}}
            />
          </TouchableOpacity>
        ),
         headerTitle: props => (
          <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
          Bakeline
          </Text>
        ),
        headerTitleAlign: 'center',

      }}/>
      {/* <Stack.Screen name="TopTabs" component={TopTabs} /> */}

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{backgroundColor: 'transparent'}}
              onPress={() => navigation.goBack()}>
              <Icon
                name="cross"
                size={25}
                color="#fff"
                style={{marginRight: 8}}
              />
            </TouchableOpacity>
          ),
          headerTitle: props => (
            <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
              Details
            </Text>
          ),
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name="SearchProduct"
        component={SearchProduct}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{backgroundColor: 'transparent'}}
              onPress={() => navigation.goBack()}>
              <Icon
                name="cross"
                size={35}
                color="white"
                style={{marginRight: 10, paddingRight: 10}}
              />
            </TouchableOpacity>
          ),
          headerTitle: props => (
            <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
              Search Product
            </Text>
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ShippingDetails"
        component={ShippingDetails}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <DrawerIcon
              name="bars"
              size={25}
              color="#fff"
              style={{marginLeft: 10, paddingLeft: 10}}
            />
          </TouchableOpacity>
          ),

          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Myorders"
        component={Myorders}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{backgroundColor: 'transparent', left: 10}}
              onPress={() => navigation.goBack()}>
              <IIcon
                name="arrow-back"
                size={35}
                color="white"
                style={{marginRight: 15, paddingRight: 10}}
              />
            </TouchableOpacity>
          ),

          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  const {loggedIn} = useSelector(state => state.auth);
  if (loggedIn === true) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="StackHome"
          drawerContent={props => (
            <SideDrawer {...props} logout={() => this.props.LogoutUser()} />
          )}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="StackedScreens" component={StackedScreens} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="splash_Screen" component={splashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default AppNavigation;

// const TabbedScreens = () => {
//   return (
//     <Tab.Navigator
//       activeColor="#4682B4"
//       inactiveColor="#A7A9AB"
//       barStyle={{
//         elevation: 0,
//         borderTopLeftRadius: 21,
//         borderTopRightRadius: 21,
//         backgroundColor: '#fff',
//         position: 'absolute',
//         bottom: 0,
//         padding: 10,
//         width: '100%',
//         height: 70,
//       }}>
//       <Tab.Screen
//         name="TopTabs"
//         component={TopTabs}
//         options={{
//           title: 'Products',
//           tabBarLabel: 'Products',
//           tabBarIcon: ({color}) => <Icon name="box" color={color} size={26} />,
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// function TopTabs() {
//   return (
//     <TopTab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: '#4682B4',
//         tabBarInactiveTintColor: 'black',
//         tabBarPressColor: '#7AB3E3',
//         tabBarIndicatorStyle: {
//           width: 100,
//           left: '9%',
//           backgroundColor: 'black',
//         },
//         tabBarLabelStyle: {
//           textTransform: 'uppercase',
//           fontSize: 12,
//           fontWeight: 'bold',
//         },
//         tabBarStyle: {
//           backgroundColor: 'white',
//           position: 'absolute',
//           top: 6,
//           left: 40,
//           right: 40,
//           elevation: 0,
//           borderRadius: 15,
//           height: 65,
//           justifyContent: 'center',
//         },
//       }}>
//       <TopTab.Screen
//         name="Innovative"
//         component={Innovative}
//         options={{
//           title: 'Innovative',
//           tabBarLabel: 'Innovative',
//         }}
//       />
//       <TopTab.Screen
//         name="BakeLine"
//         component={Bakeline}
//         options={{
//           title: 'BakeLine',
//           tabBarLabel: 'BakeLine',
//         }}
//       />
//     </TopTab.Navigator>
//   );
// }
