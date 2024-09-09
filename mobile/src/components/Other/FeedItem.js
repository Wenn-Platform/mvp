import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import BenefitsTiles from './BenefitsTiles';
import FeedVideoPlayer from './FeedVideoPlayer';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const FeedItem = ({item}) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigation = useNavigation();
  
  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View activeOpacity={0.8} style={styles.feedItemContainer}>
      <FeedVideoPlayer video={item.video} pause={item.pause} />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CompanyScreen')}>
        <View style={styles.underVideoHeaderContainer}>
          <View style={styles.headerLeftContainer}>
            <View style={styles.headerIconContainer}>
              <Image style={styles.companyIcon} source={item.companyIcon} />
            </View>

            <View>
              <Text style={styles.companyTitle}>{item.companyTitle}</Text>
              <Text style={styles.companyName}>{item.companyName}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleToggleLike}>
            <Image
              style={{...styles.rightIcons, marginRight: 16}}
              source={
                isLiked
                  ? require('../../assets/icons/heart-fill.png')
                  : require('../../assets/icons/heart.png')
              }
            />
          </TouchableOpacity>
        </View>
        <BenefitsTiles benefits={item.benefits} />
        <View style={styles.descriptionContainer}>
          <Text numberOfLines={6} style={styles.companyDescription}>
            {item.companyDescription}
          </Text>
        </View>

        <View style={styles.itemFooterContaniner}>
          <View style={styles.footerLeftContainer}>
            <Image
              style={styles.footerIcon}
              source={require('../../assets/icons/start.png')}
            />

            <Text style={styles.reviewText}>{item.reviewText}</Text>
          </View>

          <View style={styles.footerLeftContainer}>
            <Image
              style={styles.footerIcon}
              source={require('../../assets/icons/location.png')}
            />

            <Text style={styles.reviewText}>{item.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  feedItemContainer: {
    width: width - 24,
    paddingTop: 0,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: 24,
  },

  underVideoHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    marginTop: 16,
  },
  companyIcon: {
    width: 48,
    height: 48,
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 17,
  },
  companyName: {
    fontSize: RFValue(13),
    color: '#000',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  companyTitle: {
    fontSize: RFValue(15),
    color: '#084768',
    fontFamily: 'Inter-Bold',
  },
  rightIcons: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyDescription: {
    fontSize: RFValue(12),
    color: '#000',
    fontFamily: 'Inter-Regular',
    textAlign: 'left',
    lineHeight: 21,
  },
  descriptionContainer: {
    width: '88%',
    marginLeft: 16,
    marginTop: 10,
  },
  footerIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  reviewText: {
    color: '#000000',
    fontSize: RFValue(11),
    fontFamily: 'Inter-Regular',
    marginLeft: 5,
  },
  footerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemFooterContaniner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
  },
});
