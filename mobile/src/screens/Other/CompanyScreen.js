import {
  BackHandler,
  Image,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Text
} from 'react-native';
import React, {useState, useEffect} from 'react';
import VideoPlayer from '../../components/Other/VideoPlayer';
import CompanyHeader from '../../components/Other/CompanyHeader';
import CompanyInfoCard from '../../components/Other/CompanyInfoCard';
import DescriptionCard from '../../components/Other/DescriptionCard';
import Lightbox from 'react-native-lightbox-v2';
import TilesItemCard from '../../components/Other/TilesItemCard';
import WebLinkCard from '../../components/Other/WebLinkCard';
import SocialContainer from '../../components/Other/SocialContainer';
import AvailableRoles from '../../components/Other/AvailableRoles';
import ViewonGlasdoor from '../../components/Other/ViewonGlasdoor';
import { RFValue } from 'react-native-responsive-fontsize';
import RoundedButton from '../../components/Other/RoundedButton';

const {width, height} = Dimensions.get('window');
const Industries = [
  'Cloud',
  'Information Technology',
  'Security',
  'Security',
  'Network Infrastructure',
];

const benefits = [
  'Remote Work',
  'Life Insurance',
  'Dental Benefits',
  'Disability Insurance',
  'Health Insurance',
  'Vision Benefits',
];

export default function CompanyScreen({navigation}) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };

  if (showLoader) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#084768" />
      </View>
    );
  }

  const mainwebsite = 'https://www.google.com';
  const careerPage = 'https://www.bing.com';

  return (
    <View style={styles.container}>
      {/* Top-Video-Player */}
      <VideoPlayer />
      {/* Netsync Header */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        <CompanyHeader />

        {/* Info card with address/employyee/year */}
        <CompanyInfoCard />

        <DescriptionCard
          title="Hi, we’re Netsync"
          description="We specialize in collaboration & unified communications, data center and cloud, network infrastructure and others."
        />
        {/* Light-Box-Gallery */}
        <Lightbox useNativeDriver={false} navigator={navigation}>
          <Image
            style={styles.galleryImage}
            source={require('../../assets/images/companygallery.png')}
          />
        </Lightbox>

        <TilesItemCard
          row={3}
          color="#9CCDE9"
          title="Industries"
          items={Industries}
        />

        <DescriptionCard
          title="What makes us special"
          description={
            'Netsync specializes in collaboration & unified communications, data center and cloud, network infrastructure and others. NETSYNC is an NMSDC-certified minority business enterprise (MBE), federally certified woman-owned small business (WOSB), and HUB-certified value-added reseller (VAR), specializing in the implementation of comprehensive IT life cycle solutions for a wide array of organizations.'
          }
        />

        <TilesItemCard
          row={2}
          color="rgba(156, 205, 233, 0.27)"
          title="All our benefits"
          items={benefits}
        />

        <View style={styles.webLinksCardsContainer}>
          <WebLinkCard link={mainwebsite} title="View Main Website" />
          <WebLinkCard link={careerPage} title="View Career Page" />
        </View>
        <ViewonGlasdoor />
        <SocialContainer />
        <AvailableRoles />

        <View style={styles.footerContainer}>
        
        <Text
        style={styles.footerText}
        >
        Don’t see a role for you? Click “Apply Now” and{'\n'}we’ll share your resume with the company.
        </Text>

        <RoundedButton 
        onPress={()=>navigation.navigate("JobDescriptionScreen")}
        title={"Apply Now"}
        />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDEAF2',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryImage: {
    width: width - 32,
    height: height / 3,
    alignSelf: 'center',
    marginTop: 16,
  },
  webLinksCardsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  footerText:
  {
    fontSize:RFValue(12),
    color:"#000",
    textAlign:"center",
    fontFamily:'Inter-Bold',
    marginBottom:16,
  }
});
