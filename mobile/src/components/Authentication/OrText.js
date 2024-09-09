import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const ORText = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>or</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10,
    alignSelf:"center",
  },
  line: {
    width:('36%'),
    height: 1.16,
    backgroundColor: '#DCDCDC',
  },
  text: {
    marginHorizontal: 14,
    color: '#898989',
    fontSize: RFValue(14),
    fontFamily:'Inter-Regular'
  },
});

export default ORText;
