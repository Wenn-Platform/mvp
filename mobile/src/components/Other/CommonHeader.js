import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';

import {useNavigation} from '@react-navigation/native';
export default function CommonHeader(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backIcon}
          source={require('../../assets/icons/arrow-back.png')}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>

      <TouchableOpacity>
        <Image
          style={styles.backIcon}
          source={require('../../assets/icons/archive-minus.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: RFValue(25),
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: RFValue(17.5),
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
});
