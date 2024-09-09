import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import WelcomeButton from '../../components/Authentication/WelcomeButton';
import { FontNames } from '../../constants';

const {width, height} = Dimensions.get('window');
export default function WelcomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.topLogo}
        source={require('../../assets/icons/welocmewennlogo.png')}
      />

      <Text style={styles.title}>
        Let’s make finding a{'\n'}great job feel less like{'\n'}work
      </Text>

      <View style={styles.buttonsContainer}>
        <WelcomeButton
        onPress={()=>navigation.navigate('SigninScreen')}
        title="Sign In" />
        <WelcomeButton
         onPress={()=>navigation.navigate('SignUpScreen')}
        title="Create Account" />
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.socialContainer}>
          <TouchableOpacity>
            <Image
              style={styles.socialIcon}
              source={require('../../assets/icons/appleWelcome.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.socialIcon}
              source={require('../../assets/icons/googleWelcome.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              style={styles.socialIcon}
              source={require('../../assets/icons/linkedin.png')}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.footerText}>sign in with another account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDEAF2',
  },
  topLogo: {
    width: width,
    height: RFValue(145),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: height / 13,
  },
  title: {
    fontSize: RFValue(26),
    fontFamily: FontNames.NunitoSansBold,
    textAlign: 'center',
    color: '#084768',
    lineHeight: RFValue(35),
  },
  buttonsContainer: {
    marginTop: height / 9,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 27,
    left: 0,
    right: 0,
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
    marginHorizontal: RFValue(10),
  },
  footerText: {
    fontSize: RFValue(14),
    fontFamily: FontNames.NunitoSansRegular,
    color: '#000',
    textAlign: 'center',
    marginTop: 15,
  },
});
