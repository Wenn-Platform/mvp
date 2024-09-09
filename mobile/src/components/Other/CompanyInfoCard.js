import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';

const {width} = Dimensions.get('window');
export default function CompanyInfoCard() {
  return (
    <View style={styles.container}>
      <View style={styles.cardSingleItem}>
        <Image
          style={styles.icon}
          source={require('../../assets/icons/location.png')}
        />
        <Text style={styles.icontext}>Houston, TX</Text>
      </View>

      <View style={styles.cardSingleItem}>
        <Image
          style={styles.icon}
          source={require('../../assets/icons/employee.png')}
        />
        <Text style={styles.icontext}>450 Employees</Text>
      </View>

      <View style={styles.cardSingleItem}>
        <Image
          style={styles.icon}
          source={require('../../assets/icons/date.png')}
        />
        <Text style={styles.icontext}>2002</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: 50,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cardSingleItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 6,
  },
  icontext: {
    color: '#000',
    fontFamily: 'Inter-Regular',
    fontSize: RFValue(11),
  },
});
