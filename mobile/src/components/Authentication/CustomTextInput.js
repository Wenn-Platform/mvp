import React, { useState } from 'react';
import { View, TextInput, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const CustomTextInput = ({
  secureTextEntry,
  isSignUpScreen,
  placeholder,
  isPasswordVisible,
  onTogglePasswordVisibility,
  value,
  onChangeText,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('Weak');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = text => {
    onChangeText(text);
    setPasswordStrength(calculatePasswordStrength(text));
  };

  const calculatePasswordStrength = text => {
    if (text.length >= 8 && /\d/.test(text) && /[a-zA-Z]/.test(text)) {
      return 'Strong';
    } else if (text.length >= 8 || /\d/.test(text) || /[a-zA-Z]/.test(text)) {
      return 'Average';
    } else {
      return 'Weak';
    }
  };

  const togglePasswordVisibility = () => {
    onTogglePasswordVisibility(!isPasswordVisible);
  };

  const renderProgressBar = () => {
    let progressBarColor;
    let progressBarWidth;

    if (passwordStrength === 'Strong') {
      progressBarColor = '#70B6C1';
      progressBarWidth = '80%';
    } else if (passwordStrength === 'Average') {
      progressBarColor = '#F2A72F';
      progressBarWidth = '50%';
    } else {
      progressBarColor = '#F24F4F';
      progressBarWidth = '20%';
    }

    const progressBarStyle = [
      styles.progressBar,
      { backgroundColor: progressBarColor, width: progressBarWidth },
    ];

    return isFocused || value ? (
      <View style={styles.progressBarContainer}>
        <View style={progressBarStyle} />
      </View>
    ) : null;
  };

  const renderPasswordWarning = () => {
    let warningText;
    let passwordStrengthColor;

    if (passwordStrength === 'Strong') {
      warningText = 'Your password is great. Nice work!';
      passwordStrengthColor = styles.strongPasswordStrengthText;
    } else if (passwordStrength === 'Average') {
      warningText = 'Your password is average.';
      passwordStrengthColor = styles.averagePasswordStrengthText;
    } else {
      warningText = 'Your password is weak.';
      passwordStrengthColor = styles.weakPasswordStrengthText;
    }

    return (
      <View style={styles.passwordWarningContainer}>
        <Text style={styles.warningText}>{warningText}</Text>
        <Text style={[styles.passwordStrengthText, passwordStrengthColor]}>
          {passwordStrength}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.textInputContainer,
          isFocused && styles.focusedTextInputContainer,
        ]}
      >
        <TextInput
          style={styles.input}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#898989"
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={togglePasswordVisibility}
          >
            <Image
              source={
                isPasswordVisible
                  ? require('../../assets/icons/eye.png')
                  : require('../../assets/icons/eye-c.png')
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {isSignUpScreen && secureTextEntry && (isFocused || value) && (
        <View>
          {renderProgressBar()}
          {renderPasswordWarning()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 27,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    alignSelf: 'center',
  },
  focusedTextInputContainer: {
    borderColor: '#084768',
  },
  input: {
    flex: 1,
    paddingLeft: 18,
    fontSize: RFValue(14),
    color: '#202020',
    fontFamily: 'Inter-Regular',
  },
  eyeIconContainer: {
    paddingRight: 15,
  },
  eyeIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  progressBarContainer: {
    marginTop: 16,
    height: RFValue(4.69),
    width: '85%',
    backgroundColor: '#DCDCDC',
    borderRadius: 3,
    alignSelf: 'center',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  passwordWarningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    marginTop: 4,
  },
  warningText: {
    fontSize: RFValue(12),
    color: '#898989',
  },
  passwordStrengthText: {
    fontSize: RFValue(12),
    fontFamily:'Inter-Medium'
  },
  strongPasswordStrengthText: {
    color: '#70B6C1',
  },
  averagePasswordStrengthText: {
    color: 'orange',
  },
  weakPasswordStrengthText: {
    color: 'tomato',
  },
});

export default CustomTextInput;
