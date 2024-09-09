import React, {useState, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
const {width: screenWidth} = Dimensions.get('window');

const FeedVideoPlayer = props => {
  const videoPlayer = useRef(null);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [completed, setCompleted] = useState(false); 
  const navigation = useNavigation();

  const toggleMute = () => {
    setMuted(!muted);
  };

  const togglePlayPause = () => {
    if (completed) {
      videoPlayer.current.seek(0);
      setPaused(true);
      setCurrentTime(0); 
      setCompleted(false); 
    } else {

      setPaused(!paused);
    }
  };

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onEnd = () => {
    setPaused(true); 
    setCompleted(true);
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };



  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          source={props.video}
          ref={videoPlayer}
          style={styles.videoPlayer}
          resizeMode="contain"
          muted={muted}
          paused={paused}
          onProgress={onProgress}
          onEnd={onEnd}
          onLoad={data => setDuration(data.duration)}
        />
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
            <Image
              source={
                muted
                  ? require('../../assets/icons/mutefeed.png')
                  : require('../../assets/icons/sound.png')
              }
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={togglePlayPause}>
            <Image
              source={
                paused
                  ? require('../../assets/icons/play.png')
                  : require('../../assets/icons/pause.png')
              }
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>{formatTime(currentTime)}</Text>
          {/* <Text style={styles.durationText}>{formatTime(duration)}</Text> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 24,
    alignSelf: 'center',
  },
  videoContainer: {
    height: RFValue(185),
    position: 'relative',
    backgroundColor: '#000',
  },
  videoPlayer: {
    flex: 1,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    top: 16,
    right: 2,
  },
  muteButton: {
    width: 32,
    height: 32,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  playPauseButton: {
    width: 32,
    height: 32,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginHorizontal: 16,
  },
  buttonIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  durationContainer: {
    position: 'absolute', 
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    backgroundColor: '#333333',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationText: {
    color: '#fff',
    fontSize: RFValue(11),
    fontFamily: 'Inter-Regular',
    // marginLeft: 8,
  },
  progressBar: {
    height: 20,
    marginHorizontal: 16,
  },
});

export default FeedVideoPlayer;
