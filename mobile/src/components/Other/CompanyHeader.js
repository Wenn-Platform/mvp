import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const CompanyHeader = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing company!',
      });
    } catch (error) {
      console.log('Share Error:', error);
    }
  };

  return (
    <View style={styles.companyInfoHeader}>
      <View style={styles.infoHeaderLeftContainer}>
        <Image
          style={styles.netSyncLogo}
          source={require('../../assets/icons/netsynclogo.png')}
        />
        <Text style={styles.netSyncText}>Netsync</Text>
      </View>

      <View style={styles.infoHeaderRightContainer}>
        <TouchableOpacity onPress={handleToggleLike}>
          <Image
            style={{...styles.rightIcons,marginRight:16,}}
            source={
              isLiked
                ? require('../../assets/icons/heart-fill.png')
                : require('../../assets/icons/heart.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Image
            style={styles.rightIcons}
            source={require('../../assets/icons/share.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  companyInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  infoHeaderLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  netSyncLogo: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    marginRight: 17,
  },
  netSyncText: {
    color: '#000',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(21.5),
  },
  infoHeaderRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcons: {
    width: 24,
    height: 24,
    resizeMode: 'contain',

  },
});

export default CompanyHeader;
