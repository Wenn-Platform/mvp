import React from 'react';
import { Modal } from 'react-native';
import LottieView from "lottie-react-native";

const lottieLogoAnimation = require("../../assets/lottie/logo-animation.mp4.lottie.json")

// Roughly based on this approach:
// https://medium.com/hellogetsafe/how-we-added-an-animated-splash-screen-to-our-react-native-app-a7600eaa54e8
// While we have an animated splash screen, iOS does not support that
// in Storyboards for the launchScreen. Instead, we're using a launchScreen
// in native iOS that has a background matching our logo animation's
// first frame. Then once JS has control of the app, display our animation
// and hide it once 1) the animation is done and 2) all loading fetches
// to initialize the app are complete

export default function AnimatedSlapshScreenModal(props) {
  const [resizeMode, setResizeMode] = React.useState('contain')
  const [animationDone, setAnimationDone] = React.useState(false)

  React.useEffect(() => {
    // workaround bug where setting directly to cover before
    // the animation has fully loaded never takes effect
    setResizeMode('cover');
  }, [])

  const hide = animationDone && props.appIsInitialized

  return (
      <Modal animationType="none" visible={!hide}>
          <LottieView
            style={{ flex: 1 }}
            source={lottieLogoAnimation}
            loop={false}
            autoPlay
            resizeMode={resizeMode}
            onAnimationFinish={() => { setAnimationDone(true) }}
          />
      </Modal>
  );
}
