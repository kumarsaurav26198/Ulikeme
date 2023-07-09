import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
import {Loader} from '~components';
import {selectIsLogin} from '~redux/slices/authSlice';
import {
  AddPhotosScreen,
  BirthdayScreen,
  CodeScreen,
  EmailScreen,
  GenderScreen,
  LandingScreen,
  NameScreen,
  PhoneNumberScreen,
  SexualOrientationScreen,
  ShowmeScreen,
  SignInScreen,
  WelcomeScreen,
} from '~screens/auth';
import AppColors from '~utills/AppColors';
import BottomTabs from './BottomTab';
import ScreenNames from './routes';
import {AppointmentPreferenceScreen, InterestsScreen} from '~screens/app';
const Stack = createNativeStackNavigator();

export default function Routes() {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  const isLogin = useSelector(selectIsLogin);
  return (
    <NavigationContainer
      fallback={
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: AppColors.white,
          }}>
          <ActivityIndicator size={'large'} color={AppColors.red} />
        </View>
      }>
      <Loader />
      {!isLogin ? (
        <Stack.Navigator
          initialRouteName={ScreenNames.LANDING}
          screenOptions={{header: () => false}}>
          <Stack.Screen name={ScreenNames.LANDING} component={LandingScreen} />
          <Stack.Screen
            name={ScreenNames.SignInScreen}
            component={SignInScreen}
          />
          <Stack.Screen
            name={ScreenNames.PhoneNumberScreen}
            component={PhoneNumberScreen}
          />
          <Stack.Screen name={ScreenNames.CodeScreen} component={CodeScreen} />
          <Stack.Screen
            name={ScreenNames.EmailScreen}
            component={EmailScreen}
          />
          <Stack.Screen
            name={ScreenNames.WelcomeScreen}
            component={WelcomeScreen}
          />
          <Stack.Screen name={ScreenNames.NameScreen} component={NameScreen} />
          <Stack.Screen
            name={ScreenNames.BirthdayScreen}
            component={BirthdayScreen}
          />
          <Stack.Screen
            name={ScreenNames.GenderScreen}
            component={GenderScreen}
          />
          <Stack.Screen
            name={ScreenNames.SexualOrientationScreen}
            component={SexualOrientationScreen}
          />
          <Stack.Screen
            name={ScreenNames.ShowmeScreen}
            component={ShowmeScreen}
          />
          <Stack.Screen
            name={ScreenNames.AppointmentPreferenceScreen}
            component={AppointmentPreferenceScreen}
          />
          <Stack.Screen
            name={ScreenNames.InterestsScreen}
            component={InterestsScreen}
          />
          <Stack.Screen
            name={ScreenNames.AddPhotosScreen}
            component={AddPhotosScreen}
          />
        </Stack.Navigator>
      ) : (
        <BottomTabs />
      )}
    </NavigationContainer>
  );
}
