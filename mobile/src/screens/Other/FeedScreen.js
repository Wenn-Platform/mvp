import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FeedHeader from '../../components/Other/FeedHeader';
import CompaniesFeed from '../../components/Other/CompaniesFeed';

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <FeedHeader />
      <ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.feedTitle}>Feed</Text>
          <Text style={styles.feedSubTitle}>Showing 256 companies</Text>
        </View>

        <CompaniesFeed />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDEAF2',
  },
  feedTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#000',
    marginHorizontal: 24,
    marginTop: 32,
  },
  feedSubTitle: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Inter-Regular',
    marginHorizontal: 24,
    marginTop: 5,
  },
});
