import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import FeedItem from './FeedItem';

export default function CompaniesFeed() {
  const [selectedButton, setSelectedButton] = useState(null);
  const scrollViewRef = useRef(null);

  const handleButtonPress = button => {
    setSelectedButton(button);

    // Scroll to the selected button
    if ((scrollViewRef.current && button === '3') || button === '4') {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  const avialableRolesData = [
    {id: '1', name: 'Hiring For'},
  ];

  //   Data for feed list
  const dataFeed = [
    {
      id: '1',
      benefits: [
        'Remote',
        'Senior level',
        'Full time',
        '25 PTO',
        'Maternity Leave',
        'Mid Level',
        'Hybrid',
      ],
      companyIcon: require('../../assets/images/feedavatr1.png'),
      companyTitle: 'HR Business Partner',
      companyName: 'Netsync',
      companyDescription:
        'At the Netsync, we are more than just a workplace. We’re here to learn from one another to help each other grow. Joining our team means your skills will get stronger and you’ll have a chance to have an impact on the industry.',
      reviewText: '4.1 (1k) on Glassdoor',
      address: 'Dallas, TX',
      video: require('../../assets/images/test.mp4'),
      pause: true,
    },
    {
      id: '2',
      benefits: ['Remote', 'Mid level', 'Full time'],

      companyIcon: require('../../assets/images/feedavatr3.png'),
      companyTitle: 'HR Consultant',
      companyName: 'Mailchimp',
      companyDescription:
        'At the Best Marketing Inc, we are more than just a workplace. We’re here to learn from one another to help each other grow. Joining our team means your skills will get stronger and you’ll have a chance to have an impact on the industry.',
      reviewText: '4.1 (1k) on Glassdoor',
      address: 'Austin, TX',
      video: require('../../assets/images/test.mp4'),
      pause: true,
    },
    {
      id: '3',
      benefits: [
        'Remote',
        'Senior level',
        'Full time',
        '25 PTO',
        'Maternity Leave',
        'Mid Level',
        'Hybrid',
      ],
      companyIcon: require('../../assets/images/feedavatr2.png'),
      companyTitle: 'Analyst',
      companyName: 'Apple',
      companyDescription:
        'At Apple, we are more than just a workplace. We’re here to learn from one another to help each other grow. Joining our team means your skills will get stronger and you’ll have a chance to have an impact on the industry.',
      reviewText: '4.1 (1k) on Glassdoor',
      address: 'Palo Alto, CA',
      video: require('../../assets/images/test.mp4'),
      pause: true,
    },
  ];
  
//   Render Item for Feedlist
  const renderItemFeed = ({item}) => <FeedItem item={item} />;
  
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          selectedButton === item.id && styles.selectedButton,
        ]}
        onPress={() => handleButtonPress(item.id)}>
        <Text
          style={[
            styles.buttonText,
            selectedButton === item.id && styles.selectedButtonText,
          ]}>
          {item.name}
        </Text>
        <Image
          style={{
            ...styles.arrowdown,
            tintColor:
              selectedButton === item.id
                ? 'rgba(156, 205, 233, 0.25)'
                : '#084768',
          }}
          source={require('../../assets/icons/arrow-down.png')}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.socialContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={styles.buttonsContainer}>
          <FlatList
            data={avialableRolesData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      <View>
        <FlatList
          data={dataFeed}
          renderItem={renderItemFeed}
          keyExtractor={item => item.id}
       />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  socialText: {
    color: '#000',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(21.5),
    marginHorizontal: 16,
    marginTop: 45,
  },
  socialContainer: {
    // flex: 1,
  },
  button: {
    paddingHorizontal: 20,
    // paddingVertical: 8,
    borderWidth: 1,
    minHeight: RFValue(33),
    borderColor: '#CCCCCC',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFValue(8),
    flexDirection: 'row',
  },
  buttonText: {
    color: '#084768',
    fontSize: RFValue(13),
    fontFamily: 'Inter-Bold',
  },
  selectedButton: {
    backgroundColor: '#084768',
    borderWidth: 0,
  },
  selectedButtonText: {
    color: '#fff',
    fontSize: RFValue(13),
    fontFamily: 'Inter-Bold',
  },
  scrollViewContentContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    // backgroundColor:"red",
    // paddingBottom:20
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  arrowdown: {
    width: 8,
    height: 4,
    marginLeft: 8,
  },
});
