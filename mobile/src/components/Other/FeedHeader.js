import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

export default function FeedHeader() {
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={()=>navigation.navigate("ProfileScreen")}
      >
        <Image
          style={styles.avatar}
          source={require('../../assets/icons/avatar.png')}
        />
      </TouchableOpacity>

      <View style={styles.headerRightContainer}>
        <TouchableOpacity>
          <Image
            style={{...styles.iconRight, marginRight: 24}}
            source={require('../../assets/icons/Search.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.iconRight}
            source={require('../../assets/icons/notificatin.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 25,
  },

  avatar: {
    width: 48,
    height: 48,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRight: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
