import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const RoundedIconButton = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      <Image
        style={styles.resumeIcon}
        source={require('../../assets/icons/resumeicon.png')}
      />
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
    alignSelf: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontSize: RFValue(14.2),
    fontFamily: 'Inter-SemiBold',
  },
  resumeIcon: {
    width: 22.52,
    height: 22.52,
    resizeMode: 'contain',
    marginLeft: 10,
  },
});

export default RoundedIconButton;
