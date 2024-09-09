import {Platform} from 'react-native';

// Fix iOS fonts which must use the PostscriptName for each font
// this can be viewed in Font Book on macOS
const FontNames = {
  NunitoSansRegular:
    Platform.OS === 'ios' ? 'NunitoSans10pt-Regular' : 'NunitoSansRegular',
  NunitoSansBold:
    Platform.OS === 'ios' ? 'NunitoSans10pt-Bold' : 'NunitoSansBold',
};

export {FontNames};
