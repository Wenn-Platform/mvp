import React, {useState, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const VideoPlayer = () => {
  const videoPlayer = useRef(null);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);
  const navigation = useNavigation();

  const togglePlayPause = () => {
    setPaused(!paused);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const renderControls = () => (
    <View style={styles.controlsContainer}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Image
          source={require('../../assets/icons/back.png')}
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
      <View style={styles.controlsRightContainer}>
        <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
          <Image
            source={
              muted
                ? require('../../assets/icons/mute.png')
                : require('../../assets/icons/sound.png')
            }
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fullscreenButton}
          
          >
          <Image
            source={require('../../assets/icons/Fullscreen.png')}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/images/test.mp4')}
        ref={videoPlayer}
        style={styles.videoPlayer}
        resizeMode="contain"
        paused={paused}
        muted={muted}
        controls={true}
        disableFocus
      />
      {renderControls()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  videoPlayer: {
    height: RFValue(210),
    width: screenWidth,
    backgroundColor:"#000"
  },

  videoPlayerFullscreen: {
    height: screenHeight,
    width: screenWidth,
  },
  controlsContainer: {
    position: 'absolute',
    top: RFValue(24),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
  },
  backButton: {
    marginLeft: 16,
    zIndex: 9999,
  },
  muteButton: {
    marginRight: 16,
    zIndex: 9999,
  },
  fullscreenButton: {
    marginRight: 16,
    zIndex: 9999,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  closeIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  controlsRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default VideoPlayer;
