import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import { FontNames } from '../../constants';

const {width} = Dimensions.get('window');

export default function WelcomeButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.5}
      style={styles.container}>
      <Text style={styles.btnText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 120,
    height: 50,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9CCDE9',
    alignSelf: 'center',
    marginBottom: 46,
  },
  btnText: {
    fontSize: RFValue(20),
    color: '#084768',
    fontFamily: FontNames.NunitoSansBold,
  },
});
