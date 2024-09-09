import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import CommonHeader from '../../components/Other/CommonHeader';
import {RFValue} from 'react-native-responsive-fontsize';
import SegmentTabBar from '../../components/Other/SegmentTabBar';
import YourDocumentsCard from '../../components/Other/YourDocumentsCard';
import RoundedIconButton from '../../components/Other/RoundedIconButton';
import MyJobsCard from '../../components/Other/MyJobsCard';
import {ScrollView} from 'react-native';
import { FontNames } from '../../constants';

const MyJobsdata = [
  {
    postName: 'UI Designer',
    postLocation: 'TopGolf - Dallas',
    dateText: '08/12/2023',
    companyLogo: require('../../assets/icons/topgulf.png'),
  },
  {
    postName: 'Senior UI Designer',
    postLocation: 'The Richards Group - Dallas',
    dateText: '8/12/2023',
    companyLogo: require('../../assets/icons/richardsGrouo.png'),
  },
  {
    postName: 'Project Manager',
    postLocation: 'Sampa International - Frisco',
    dateText: '7/11/2023',
    companyLogo: require('../../assets/icons/frisco.png'),
  },
  {
    postName: 'Open Application',
    postLocation: 'Github',
    dateText: '7/30/2023',
    companyLogo: require('../../assets/icons/frisco.png'),
  },
];

// Documents Data
const data = [
  {documentName: 'Katie P. Resume', docsText: '.docx'},
  {documentName: 'References', docsText: '.docx'},
  {documentName: 'KP Design Portfolio', docsText: '.pdf'},
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('MyJobs');

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const renderItemMyJobs = ({item}) => {
    return (
      <MyJobsCard
        postName={item.postName}
        postLocation={item.postLocation}
        dateText={item.dateText}
        companyLogo={item.companyLogo}
      />
    );
  };

  const renderItem = ({item}) => {
    return (
      <YourDocumentsCard
        documentName={item.documentName}
        docsText={item.docsText}
      />
    );
  };
  const totalCount = data.length;
  return (
    <View style={styles.container}>
      <CommonHeader title="Profile Page" />

      <View style={styles.profileInfoContainer}>
        <Image
          style={styles.profileAvatar}
          source={require('../../assets/icons/avatar.png')}
        />

        <Text style={styles.profileName}>Katie Pena</Text>
        <Text style={styles.postTitle}>Product Designer</Text>
      </View>

      <View style={{flex: 1}}>
        <SegmentTabBar activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === 'MyJobs' && (
          <View>
            <ScrollView
              contentContainerStyle={{paddingBottom: 100}}
              showsVerticalScrollIndicator={false}>
              <Text style={styles.yourdocumentsText}>
                Application History ({totalCount})
              </Text>

              <View>
                <FlatList
                  contentContainerStyle={styles.containerStyle}
                  data={MyJobsdata}
                  renderItem={renderItemMyJobs}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </ScrollView>
          </View>
        )}

        {activeTab === 'Documents' && (
          <ScrollView
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.yourdocumentsText}>Your Documents</Text>

            <View>
              <FlatList
                contentContainerStyle={styles.containerStyle}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </ScrollView>
        )}
      </View>
      {activeTab === 'Documents' && (
        <View style={styles.buttonContainer}>
          <RoundedIconButton title={'Upload Resume'} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDEAF2',
  },
  profileAvatar: {
    width: 48,
    height: 48,
    alignSelf: 'center',
  },
  profileName: {
    fontSize: RFValue(16),
    color: '#111827',
    fontFamily: FontNames.NunitoSansBold,
    textAlign: 'center',
    marginTop: 11.26,
  },
  postTitle: {
    fontSize: RFValue(10.5),
    fontFamily: 'Inter-Regular',
    color: '#374151',
    textAlign: 'center',
    marginTop: 3,
  },
  profileInfoContainer: {
    alignSelf: 'center',
    marginTop: 30,
  },
  yourdocumentsText: {
    color: '#111827',
    fontFamily: 'Inter-Black',
    fontSize: RFValue(13),
    marginTop: 23,
    marginHorizontal: 32,
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 20,
  },
  containerStyle: {marginTop: 15},
});
