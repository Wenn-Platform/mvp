import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import SelectableSocial from './SelectableSocial';

export default function SocialContainer() {
  return (
    <View style={styles.socialContainer}>
      <Text style={styles.socialText}>Social</Text>

      <SelectableSocial />
    </View>
  );
}

const styles = StyleSheet.create({
  socialText: {
    color: '#000',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(21.5),
    marginHorizontal: 16,
    marginTop: 16,
  },
});
