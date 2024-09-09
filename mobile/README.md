## Deployment

### iOS

```
cd ios
bundle exec fastlane beta
```

#### Notes

Deployment was setup via [fastlane](https://docs.fastlane.tools/getting-started/cross-platform/react-native/) following [these instructions](https://thecodingmachine.github.io/react-native-boilerplate/docs/BetaBuild/). I set this up using the `josh@wenn.io` Apple ID and executing `bundle exec fastlane init`. This probably needs to be changed to a shared account or app-specific password in the future.
