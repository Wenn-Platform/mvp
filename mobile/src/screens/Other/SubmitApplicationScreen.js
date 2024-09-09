import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CommonHeader from '../../components/Other/CommonHeader';
import SelectDocumentBox from '../../components/Other/SelectDocumentBox';
import RoundedButton from '../../components/Other/RoundedButton';
import {RFValue} from 'react-native-responsive-fontsize';
import ApplicationSubmittedModal from '../../components/Modals/ApplicationSubmittedModal';

export default function SubmitApplicationScreen() {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };
  return (
    <View style={styles.container}>
      <CommonHeader title="Application" />
      <SelectDocumentBox />
      <RoundedButton title={'Submit Application'} onPress={toggleModal} />

      <View style={styles.checkBoxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checkboxActive]}
          onPress={handleCheckboxPress}>
          {isChecked && (
            <Image
              style={{width: 14, height: 10.25, resizeMode: 'contain'}}
              source={require('../../assets/icons/check.png')}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.checkBoxText}>
          Check this box if you want to set these{'\n'}as your default
          application documents
        </Text>
      </View>
      {/* Modal Component */}
      <ApplicationSubmittedModal
        isVisible={isModalVisible}
        onClose={toggleModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDEAF2',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 3,
    borderRadius: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: '#000',
  },

  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  checkBoxText: {
    color: '#000',
    fontFamily: 'Inter-Regular',
    fontSize: RFValue(12.5),
  },
});
