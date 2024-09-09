import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const {width, height} = Dimensions.get('window');
export default function ViewonGlasdoor() {
  return (
    <TouchableOpacity
    activeOpacity={0.5}
    style={styles.container}>
      <Image
        style={styles.glassdorLogo}
        source={require('../../assets/icons/glassdoorLogo.png')}
      />

      <View style={styles.ratingsContainer}>
        <Text style={styles.ratingText}>4.2</Text>
        <Image
          style={styles.glassdorstar}
          source={require('../../assets/icons/glassdoorStar.png')}
        />
      </View>

      <View style={styles.seprator} />

      <Text style={styles.viewOnText}>View on Glassdoor</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: 51,
    backgroundColor: '#fff',
    borderRadius: 17,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  glassdorLogo: {
    width: 23,
    height: 32.42,
  },
  glassdorstar: {
    width: 24.13,
    height: 22.95,
  },
  ratingText: {
    fontSize: RFValue(22),
    color: '#0CAA41',
    fontFamily: 'Inter-Bold',
    marginRight: 5,
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  seprator: {
    width: 3,
    height: 34,
    backgroundColor: '#0CAA41',
    borderRadius: 12,
  },
  viewOnText: {
    fontSize: RFValue(14),
    fontFamily: 'Inter-SemiBold',
    color: '#0CAA41',
  },
});
