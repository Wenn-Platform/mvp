import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

const SocialButton = ({ onPress, iconSource, text }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Image source={iconSource} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: width * 0.39,
    height: 56,
    backgroundColor: '#FFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
    resizeMode:"contain"
    
  },
  text: {
    fontSize: RFValue(14),
    fontFamily:'Inter-SemiBold',
    color: '#202020',
  },
});

export default SocialButton;
