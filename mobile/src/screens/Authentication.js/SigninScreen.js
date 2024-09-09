import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomTextInput from '../../components/Authentication/CustomTextInput';
import Button from '../../components/Authentication/Button';
import ORText from '../../components/Authentication/OrText';
import SocialButton from '../../components/Authentication/SocialButton';

export default function SigninScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handlePasswordChange = text => {
    setPassword(text);
  };
  const handleEmailChange = text => {
    setEmail(text);
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleButtonPress = () => {
    navigation.navigate('FeedScreen')
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.logoTop}
          source={require('../../assets/icons/wennLogo.png')}
        />

        <View style={styles.signInMainContainer}>
          <Text style={styles.signIntext}>Sign in</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            activeOpacity={0.4}>
            <Text style={styles.dontHaveAccountText}>
              Don't have an account?{' '}
              <Text
                style={{...styles.dontHaveAccountText, ...styles.signUpActive}}>
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.inPutsContainer}>
            <CustomTextInput
              secureTextEntry={false}
              isSignUpScreen={false}
              placeholder="Email address"
              value={email}
              onChangeText={handleEmailChange}
            />
            <CustomTextInput
              secureTextEntry={true}
              isSignUpScreen={false}
              placeholder="Password"
              isPasswordVisible={isPasswordVisible}
              onTogglePasswordVisibility={handleTogglePasswordVisibility}
              value={password}
              onChangeText={handlePasswordChange}
            />

            <TouchableOpacity
            onPress={()=>navigation.navigate('ForgotPasswordScreen')}
            >
              <Text style={styles.forgotPasswordtext}>Forgot password?</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <Button onPress={handleButtonPress} title="Sign In" />
            </View>

            <ORText />
            <View style={styles.socialButtonsContainer}>
              <SocialButton
                onPress={() => console.log('Google-Presses')}
                iconSource={require('../../assets/icons/google.png')}
                text="Google"
              />
              <SocialButton
                onPress={() => console.log('Apple-Presses')}
                iconSource={require('../../assets/icons/apple.png')}
                text="Apple"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerTextcontainer}>
        <Text style={styles.footertext}>
          Protected by reCAPTCHA and subject to the{'\n'}Rhombus
          <Text style={styles.privacyPolicyText}> Privacy Policy </Text>and{' '}
          <Text style={styles.termsOfServiceText}>Terms of Service</Text>.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDEAF2',
  },
  flexContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  scrollContainer: {
    flex: 1,
  },
  logoTop: {
    width: RFValue(125),
    height: RFValue(36),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: RFValue(17.5),
  },
  signInMainContainer: {
    marginTop: RFValue(43),
  },
  signIntext: {
    fontSize: RFValue(24),
    color: '#202020',
    fontFamily: 'Inter-SemiBold',
    marginHorizontal: 28,
  },
  dontHaveAccountText: {
    fontSize: RFValue(14),
    color: '#202020',
    fontFamily: 'Inter-Regular',
    marginHorizontal: 28,
    marginTop: 15,
  },
  signUpActive: {
    fontFamily: 'Inter-SemiBold',
    color: '#084768',
  },
  inPutsContainer: {
    marginTop: 28,
  },
  forgotPasswordtext: {
    fontSize: RFValue(14.5),
    fontFamily: 'Inter-Regular',
    color: '#084768',
    marginHorizontal: 28,
  },
  buttonContainer: {
    marginTop: 35,
    marginBottom: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 18,
  },
  footerTextcontainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 28,
  },
  footertext: {
    fontSize: RFValue(12.5),
    color: '#898989',
    fontFamily: 'Inter-Regular',
    textAlign: 'justify',
  },
  privacyPolicyText: {
    color: '#084768',
  },
  termsOfServiceText: {
    color: '#084768',
  },
});
