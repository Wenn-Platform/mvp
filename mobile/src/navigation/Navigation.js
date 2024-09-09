import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "../screens/Authentication.js/SigninScreen";
import SignUpScreen from "../screens/Authentication.js/SignUpScreen";
import ForgotPasswordScreen from "../screens/Authentication.js/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/Authentication.js/NewPasswordScreen";
import CompanyScreen from "../screens/Other/CompanyScreen";
import WelcomeScreen from "../screens/Authentication.js/WelcomeScreen";
import FeedScreen from "../screens/Other/FeedScreen";
import JobDescriptionScreen from "../screens/Other/JobDescriptionScreen";
import SubmitApplicationScreen from "../screens/Other/SubmitApplicationScreen";
import ProfileScreen from "../screens/Other/ProfileScreen";

const Stack = createNativeStackNavigator();
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SigninScreen" component={SigninScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
       
       {/* Main Screens */}
       <Stack.Screen name="FeedScreen" component={FeedScreen} />
       <Stack.Screen name="CompanyScreen" component={CompanyScreen} />
       <Stack.Screen name="JobDescriptionScreen" component={JobDescriptionScreen} />
       <Stack.Screen name="SubmitApplicationScreen" component={SubmitApplicationScreen} />
       <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
