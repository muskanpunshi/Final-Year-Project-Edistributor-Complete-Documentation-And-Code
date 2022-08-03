import React, {useRef} from 'react';
import {
  Text,
  View,
  Image,

} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



const Homecarousel = () => {
  const ref = useRef(null);
  var entries = [
    // {
    //   title: 'Item 1',
    //   text: 'Text 1',
    //  image: require("../Assets/ad6.jpg")
    // },
    {
      title: 'Item 2',
      text: 'Text 2',
      image: require("../Assets/ad1.png")
    },
    {
      title: 'Item 3',
      text: 'Text 3',
      image:require("../Assets/ad2.jpg")
    },
    {
      title: 'Item 4',
      text: 'Text 4',
      image:require("../Assets/ad3.jpg")
    },
    {
      title: 'Item 5',
      text: 'Text 5',
      image: require("../Assets/ad5.jpg")
    },
    {
        title: 'Item 5',
        text: 'Text 5',
        image: require("../Assets/ad4.jpg")
      },
  ];

  const renderItem = ({item, index}) => {
    return (
      <View style={{width: wp('96%')}}>
        <Image
          style={{
            width: wp('96%'),
            height: hp('25%'),
            resizeMode: 'contain',
            borderRadius: 20,
          }}
          source={item.image}
        />
        <Text>{item.title}</Text>
      </View>
    );
  };
  return (
    <View
      style={{
        marginVertical: hp('1%'),
        height: hp('25%'),
        marginHorizontal: wp('2%'),
      }}>
      <Carousel
        ref={ref}
        data={entries}
        renderItem={renderItem}
        sliderWidth={wp('96%')}
        itemWidth={wp('96%')}
        firstItem={0}
        sliderHeight={hp('25%')}
        scrollEndDragDebounceValue={0.3}
        itemHeight={hp('25%')}
        activeSlideAlignment={'start'}
        autoplay={true}
        loop={true}
        enableMomentum={true}
      />
    </View>
  );
};

export default Homecarousel;
