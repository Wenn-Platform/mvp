import React from 'react';
import {View, StatusBar, Modal} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Navigation from './src/navigation/Navigation';
import { LogBox } from 'react-native';
import AnimatedSlapshScreenModal from './src/components/Modals/AnimatedSplashScreenModal';

export default function App() {
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? RFValue(50) : StatusBar.currentHeight;
    LogBox.ignoreAllLogs();

  return (
    <View style={{flex: 1}}>
      <AnimatedSlapshScreenModal appIsInitialized={true} />
      <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: '#DDEAF2'}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
      </View>

      <Navigation />
    </View>
  );
}
