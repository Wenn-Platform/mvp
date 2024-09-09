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
const ApplicationSubmittedModal = ({isVisible, onClose}) => {
  
  const navigation= useNavigation();
  const onPressCross= ()=>
  {
    onClose();
    navigation.navigate('JobDescriptionScreen')
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
          <TouchableOpacity style={styles.crossContainer} onPress={onPressCross}>
            <Image
              style={styles.crossIcon}
              source={require('../../assets/icons/cross.png')}
            />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Application Submitted!</Text>
         
          <View style={styles.modalButtonsContainer}>
            <View
            style={styles.modalButton}>
              <Text style={styles.modalButtonText}>
              You will get an email if the company is{'\n'}interested in setting up an interview
              </Text>
            </View>
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
    height: height / 5.8,
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
    top: 16,
    zIndex: 999999,
  },
  modalButtonsContainer: {
    marginTop: 15,
  },
  modalButton: {
    width: width - 50,
    height: 60,
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
    lineHeight:21,
    textAlign:"center",
  },
});

export default ApplicationSubmittedModal;
