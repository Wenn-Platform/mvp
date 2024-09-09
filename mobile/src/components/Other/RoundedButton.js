import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const RoundedButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '85%',
    height: 49,
    backgroundColor: '#084768',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    alignSelf:"center",
  },
  buttonText: {
    color: '#fff',
    fontSize: RFValue(14.2),
    fontFamily:'Inter-SemiBold',
  },
});

export default RoundedButton;