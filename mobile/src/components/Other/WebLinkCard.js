import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width} = Dimensions.get('window');

export default function WebLinkCard({link, title}) {
  const handlePress = async () => {
    Linking.openURL(link);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={handlePress}>
      {/* <Image
        style={styles.webIcon}
        source={require('../../assets/icons/web.png')}
      /> */}
      <Text style={styles.webLinkText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width-32,
    height: 50,
    marginBottom:16,
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,

  },
  webIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  webLinkText: {
    color: '#000000',
    fontFamily: 'Inter-Bold',
    textDecorationLine: 'underline',
    fontSize: RFValue(14),
  },
});
