import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
const {width} = Dimensions.get('window');

export default function MyJobsCard(props) {
  return (
    <View style={styles.container}>
      <View style={styles.cardLeftContainer}>
        <Text style={styles.postName}>{props.postName}</Text>
        <Text style={styles.postLocation}>{props.postLocation}</Text>

        <View style={styles.postdateContainer}>
          <Text style={styles.dateText}>{props.dateText}</Text>
        </View>
      </View>

      <Image style={styles.companyLogo} source={props.companyLogo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 60,
    height: 117,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignSelf: 'center',
    paddingTop: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  postName: {
    fontSize: RFValue(14),
    fontFamily: 'Inter-Bold',
    color: '#084768',
  },
  postLocation: {
    fontSize: RFValue(14),
    fontFamily: 'Inter-Regular',
    // color: '#084768',
    color: '#000',
  },
  postdateContainer: {
    width: 84,
    height: 23,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 15,
  },
  dateText: {fontSize: RFValue(11), fontFamily: 'Inter-Medium', color: '#000'},
  companyLogo: {
    width: RFValue(50),
    height: RFValue(50),
    resizeMode: 'contain',
  },
});
