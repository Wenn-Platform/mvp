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

export default function NewPasswordScreen({navigation}) {
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isRePasswordVisible, setRePasswordVisible] = useState(false);

  const handlePasswordChange = text => {
    setPassword(text);
  };
  const handleRePasswordChange = text => {
    setRePassword(text);
  };
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleToggleRePasswordVisibility = () => {
    setRePasswordVisible(!isRePasswordVisible);
  };
  const handleButtonPress = () => {
    navigation.navigate('CompanyScreen');
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
            <Text style={styles.signIntext}>New Password</Text>

            <Text style={styles.description}>
              Please create a new password that you{'\n'}don’t use on any other
              site.
            </Text>

            <View style={styles.inPutsContainer}>
              <CustomTextInput
                secureTextEntry={true}
                isSignUpScreen={false}
                placeholder="Enter Password"
                isPasswordVisible={isPasswordVisible}
                onTogglePasswordVisibility={handleTogglePasswordVisibility}
                value={password}
                onChangeText={handlePasswordChange}
              />
              <CustomTextInput
                secureTextEntry={true}
                isSignUpScreen={true}
                placeholder="Re-Enter Password"
                isPasswordVisible={isRePasswordVisible}
                onTogglePasswordVisibility={handleToggleRePasswordVisibility}
                value={repassword}
                onChangeText={handleRePasswordChange}
              />

              <View style={styles.buttonContainer}>
                <Button onPress={handleButtonPress} title="Enter" />
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
