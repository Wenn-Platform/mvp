import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {BlurView} from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
import Modal from 'react-native-modal';
const ApplyJobModal = ({isVisible, onClose}) => {
  
  const navigation= useNavigation();
  const onPressApplywithResume= ()=>
  {
    onClose();
    navigation.navigate('SubmitApplicationScreen')
  }
 
  return (
    <>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        backdropOpacity={0}
        animationIn="fadeIn"
        animationOut="zoomOut"
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        style={styles.modalContainer}>
        <BlurView style={styles.blurView} blurType="light" blurAmount={5} />

        {/* Modal Content */}
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.crossContainer} onPress={onClose}>
            <Image
              style={styles.crossIcon}
              source={require('../../assets/icons/cross.png')}
            />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Apple for the job</Text>
          <Text style={styles.modalSubTitle}>Choose an option</Text>

          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
            onPress={onPressApplywithResume}
            style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Apply with my Resume</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{...styles.modalButton, backgroundColor: '#9CCDE9'}}>
              <Text style={styles.modalButtonText}>Apply with Linkedin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.93,
    height: height / 4,
    backgroundColor: '#084768',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    top: height / 4.5,
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000',
    marginBottom: 20,
  },
  blurView: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: RFValue(14),
    fontFamily: 'Inter-Medium',
    color: '#fff',
    marginTop: 14,
  },
  modalSubTitle: {
    textAlign: 'center',
    fontSize: RFValue(9.5),
    fontFamily: 'Inter-Regular',
    color: '#fff',
    marginTop: 2,
  },
  crossIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  crossContainer: {
    position: 'absolute',
    right: 20,
    top: 25,
    zIndex: 999999,
  },
  modalButtonsContainer: {
    marginTop: 15,
  },
  modalButton: {
    width: width - 60,
    height: 37,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: RFValue(12.5),
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
});

export default ApplyJobModal;
