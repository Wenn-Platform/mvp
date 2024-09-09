import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import CommonHeader from '../../components/Other/CommonHeader';
import JobDescriptionBenefits from '../../components/Other/JobDescriptionBenefits';
import RoundedButton from '../../components/Other/RoundedButton';
import ApplyJobModal from '../../components/Modals/ApplyJobModal';
const { width, height } = Dimensions.get('window');

const BulletPoint = ({ text }) => (
  <View style={styles.bulletPoint}>
    <Text style={styles.bulletIcon}>•</Text>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

export default function JobDescriptionScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <CommonHeader title="Job Detail" />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.jobTopProfileContainer}>
          <Image
            style={styles.companyProfileLogo}
            source={require('../../assets/icons/companylogo.png')}
          />

          <View style={styles.postNameContainer}>
            <Text style={styles.postnameText}>Senior UI Designer</Text>
            <Text style={styles.postLocationText}>
              Twitter • Jakarta, Indonesia{' '}
            </Text>
          </View>

          <JobDescriptionBenefits />
        </View>

        <View style={styles.jobDescriptionBox}>
          <Text style={styles.title}>Job Description</Text>
          <Text style={styles.descriptionText}>
            Your role as the UI Designer is to use interactive components on
            various platforms (web, desktop and mobile). This will include
            producing high-fidelity mock-ups, iconography, UI
            illustrations/graphics, and other graphic elements. As the UI
            Designer, you will be supporting the wider design team with the
            internal Design System, tying together the visual language. You will
            with other UI and UX Designers, Product Managers, and Engineering
            teams in a highly customer-focused agile environment to help define
            the vision of the products.
          </Text>
        </View>

        <View style={styles.jobDescriptionBox}>
          <Text style={styles.title}>Skill Required</Text>
          <BulletPoint text="A strong visual portfolio with clear understanding of UI methodologies" />
          <BulletPoint text="Ability to create hi-fidelity mock-ups in Figma" />
          <BulletPoint text="Ability to create various graphics for the web e.g. illustrations and icons" />
          <BulletPoint text={`Able to facilitate workshops and liaise with stakeholders`} />
          <BulletPoint text="Proficiency in the Adobe Creative Suite" />
          <BulletPoint text="Confident communicator with an analytical mindset" />
          <BulletPoint text="Design library/Design system experience" />
          <BulletPoint text="4+ years of commercial experience in UI/Visual Design" />
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 30 }}>
        <RoundedButton title={'Apply now'} onPress={toggleModal} />
      </View>

      {/* Modal Component */}
      <ApplyJobModal isVisible={isModalVisible} onClose={toggleModal} />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDEAF2',
  },
  companyProfileLogo: {
    width: 60,
    height: 55,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 32,
  },
  postNameContainer: {
    paddingVertical: 6,
    width: width / 1.7,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    alignSelf: 'center',
    marginTop: 12,
  },
  postnameText: {
    fontSize: RFValue(17.5),
    color: '#111827',
    fontFamily: 'Inter-Bold',
  },
  postLocationText: {
    color: '#374151',
    fontFamily: 'Inter-Regular',
    fontSize: RFValue(11),
    marginTop: 4,
    letterSpacing: 0.1,
  },
  benefitItem: {
    paddingVertical: 6,
    paddingHorizontal: 11,
    backgroundColor: '#084768',
    borderRadius: 100,
  },
  benefitText: {
    fontSize: RFValue(11),
    fontFamily: 'Inter-Regular',
    color: '#fff',
  },
  jobDescriptionBox: {
    width: width - 32,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 13,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 19,
    overflow: "hidden"
  },
  title: {
    color: '#111827',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(12.5),
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: RFValue(11),
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    lineHeight: 20,
    textAlign: 'justify',
  },

  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginLeft: 5,
  },
  bulletIcon: {
    marginRight: 5,
    fontSize: 20,
    color: '#4B5563',
  },
  bulletText: {
    fontSize: RFValue(11),
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    // textAlign:"justify",
  },
});
