import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity
      style={[styles.checkbox, isChecked && styles.checkboxActive]}
      onPress={handleCheckboxPress}>
      {isChecked && (
        <Image
          style={{width: 14, height: 10.25}}
          source={require('../../assets/icons/check.png')}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 23,
    height: 23,
    borderWidth: 3,
    borderRadius: 2,
    borderColor: '#0C4DA2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  checkboxActive: {
    backgroundColor: '#0C4DA2',
  },
});

export default Checkbox;
