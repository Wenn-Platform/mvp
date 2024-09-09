import React from 'react';
import { View, Image, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const AvailableRolesItem = ({ title, role }) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemLeftContainer}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.roleContainer}>
          <Text style={styles.roleText}>{role}</Text>
        </View>
      </View>
      
      <TouchableOpacity>
      <Image style={styles.arrow} source={require('../../assets/icons/arrow-left.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width-32,
    height: RFValue(98),
    backgroundColor: '#fff',
    borderRadius: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },
  itemLeftContainer: {},
  title: {
    color: '#000',
    fontFamily: 'Inter-Regular',
    fontSize: RFValue(14.5),
  },
  roleContainer: {
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(4),
    backgroundColor: '#D8E6EE',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#000',
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(12),
  },
  arrow: {
    width: 37,
    height: 37,
    resizeMode: 'contain',
  },
});

export default AvailableRolesItem;
