import React from 'react';
import { View, Image, TouchableOpacity, Linking, Text, StyleSheet, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const ImageGrid = ({ selectedPlatform }) => {
  const handleItemClick = (url) => {
    Linking.openURL(url);
  };

  const platforms = [
    {
      id: '1',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/',
      imageSource1: require('../../assets/images/Image1.png'),
      imageSource2: require('../../assets/images/Image2.png'),
      imageSource3: require('../../assets/images/Image3.png'),
      imageSource4: require('../../assets/images/Image4.png'),
    },
    {
      id: '2',
      name: 'Twitter',
      url: 'https://twitter.com/',
      imageSource1: require('../../assets/images/Image4.png'),
      imageSource2: require('../../assets/images/Image3.png'),
      imageSource3: require('../../assets/images/Image2.png'),
      imageSource4: require('../../assets/images/Image1.png'),
    },
    {
      id: '3',
      name: 'Instagram',
      url: 'https://www.instagram.com/',
      imageSource1: require('../../assets/images/Image1.png'),
      imageSource2: require('../../assets/images/Image3.png'),
      imageSource3: require('../../assets/images/Image4.png'),
      imageSource4: require('../../assets/images/Image2.png'),
    },
  ];

  const platform = platforms.find((platform) => platform.id === selectedPlatform);

  const data = [platform.imageSource1, platform.imageSource2, platform.imageSource3, platform.imageSource4];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(platform.url)}>
      <Image source={item} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
      <TouchableOpacity
        style={styles.webLinkContainer}
        onPress={() => handleItemClick(platform.url)}
      >
        <Image style={styles.webIcon} source={require('../../assets/icons/web.png')} />
        <Text style={styles.viewAllText}>View All on {platform.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginTop: RFValue(16), 
    paddingLeft:RFValue(14),

  },
  image: {
    width: RFValue(150),
    height: RFValue(150),
     marginBottom: RFValue(8),
     marginRight:6
  },
  viewAllText: {
    textDecorationLine: 'underline',
    fontSize: RFValue(13),
    color: '#000',
    fontFamily: 'Inter-Regular',
  },
  webLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFValue(10),
  },
  webIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
});

export default ImageGrid;
