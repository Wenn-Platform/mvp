import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomTextInput from '../../components/Authentication/CustomTextInput';
import Button from '../../components/Authentication/Button';
import ORText from '../../components/Authentication/OrText';
import SocialButton from '../../components/Authentication/SocialButton';
import Checkbox from '../../components/Authentication/CheckBox';

export default function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handlePasswordChange = text => {
    setPassword(text);
  };
  const handleEmailChange = text => {
    setEmail(text);
  };
  const handleFNameChange = text => {
    setFname(text);
  };
  const handleLNameChange = text => {
    setLname(text);
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleButtonPress = () => {
    navigation.navigate('CompanyScreen')
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : RFValue(0)}>
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
            onPress={()=>navigation.navigate('SigninScreen')}
            activeOpacity={0.4}>
              <Text style={styles.dontHaveAccountText}>
                Already have an account?{' '}
                <Text
                  style={{
                    ...styles.dontHaveAccountText,
                    ...styles.signUpActive,
                  }}>
                  Sign In
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
                secureTextEntry={false}
                isSignUpScreen={false}
                placeholder="First name"
                value={fname}
                onChangeText={handleFNameChange}
              />
              <CustomTextInput
                secureTextEntry={false}
                isSignUpScreen={false}
                placeholder="Last name"
                value={lname}
                onChangeText={handleLNameChange}
              />
              <CustomTextInput
                secureTextEntry={true}
                isSignUpScreen={true}
                placeholder="Password"
                isPasswordVisible={isPasswordVisible}
                onTogglePasswordVisibility={handleTogglePasswordVisibility}
                value={password}
                onChangeText={handlePasswordChange}
              />

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

              <View style={styles.rememberMeContainer}>
                <Checkbox />
                <Text style={styles.rememberMeText}>
                  By clicking Create account, I agree that I{'\n'}
                  have read and accepted the Terms of Use{'\n'}
                  and Privacy Policy.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.footerTextcontainer}>
            <Text style={styles.footertext}>
              Protected by reCAPTCHA and subject to the{'\n'}Rhombus
              <Text style={styles.privacyPolicyText}>
                {' '}
                Privacy Policy{' '}
              </Text>and{' '}
              <Text style={styles.termsOfServiceText}>Terms of Service</Text>.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingBottom: 20,
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
    // marginTop:35,
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
    marginTop: 50,
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
  rememberMeContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: 27,
  },
  rememberMeText: {
    color: '#898989',
    fontSize: RFValue(12.5),
    fontFamily: 'Inter-Regular',
    marginLeft: RFValue(10),
  },
});
