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

export default function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = useState('');

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handleButtonPress = () => {
    navigation.navigate('NewPasswordScreen');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
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
            <Text style={styles.signIntext}>Forgot password?</Text>

            <Text style={styles.description}>
              No worriest! Just enter your email and{'\n'}we’ll send you a reset
              password link.
            </Text>

            <View style={styles.inPutsContainer}>
              <CustomTextInput
                secureTextEntry={false}
                isSignUpScreen={false}
                placeholder="Email address"
                value={email}
                onChangeText={handleEmailChange}
              />

              <View style={styles.buttonContainer}>
                <Button
                  onPress={handleButtonPress}
                  title="Send Recovery Email"
                />
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('SigninScreen')}
                activeOpacity={0.4}>
                <Text style={styles.dontHaveAccountText}>
                  Just remember?{' '}
                  <Text
                    style={{
                      ...styles.dontHaveAccountText,
                      ...styles.signUpActive,
                    }}>
                    Sign In
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
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
    marginTop: 30,
    textAlign: 'center',
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
    marginTop: 2,
    marginBottom: 10,
  },

  description: {
    fontSize: RFValue(14),
    fontFamily: 'Inter-Regular',
    marginHorizontal: 28,
    lineHeight: 25,
    marginTop: 7,
  },
});
