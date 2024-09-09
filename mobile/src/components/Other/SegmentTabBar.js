import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const {width,height}= Dimensions.get('window')

const SegmentTabBar = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tabItem,
          activeTab === 'MyJobs' ? styles.activeTab : styles.inactiveTab,
        ]}
        onPress={() => onTabChange('MyJobs')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'MyJobs' ? styles.activeTabText : styles.inactiveTabText,
          ]}
        >
          My Jobs
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabItem,
          activeTab === 'Documents' ? styles.activeTab : styles.inactiveTab,
        ]}
        onPress={() => onTabChange('Documents')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'Documents' ? styles.activeTabText : styles.inactiveTabText,
          ]}
        >
          Documents
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:16,
  },
  tabItem: {
    width:width/2.3,
    alignItems: 'center',
    paddingVertical:6,
    justifyContent:"center",
    borderRadius: 93,
  },
  tabText: {
     fontSize: RFValue(13),
    // fontWeight: 'bold',
  },
  activeTab: {
    backgroundColor: '#084768',
  },
  inactiveTab: {
    backgroundColor: '#fff',
  },
  activeTabText: {
    color: '#fff',
    fontFamily:'Inter-Black'
  },
  inactiveTabText: {
    color: '#6B7280',
    fontFamily:'Inter-Black'
  },
});

export default SegmentTabBar;
