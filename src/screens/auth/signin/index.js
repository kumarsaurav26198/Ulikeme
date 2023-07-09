import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {Button, ScreenWrapper} from '../../../components';
import AppLogo from '../../../assets/images/appLogo.png';
import PhoneSvg from '../../../components/phoneSvg';
import GmailSvg from '../../../components/gmailSvg';
import FacebookSvg from '../../../components/facebookSvg';
import IconButton from '../../../components/iconButton';
import BackArrowSvg from '../../../components/backArrowSvg';
import ScreenNames from '../../../routes/routes';
export default function Signin({navigation, route}) {
  const dispatch = useDispatch();
  return (
    <ScreenWrapper>
      <View style={styles.mainViewContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={styles.back}>
          <BackArrowSvg />
        </TouchableOpacity>
        <Image source={AppLogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>
          When you select Create Account or Sign In, you agree to our Terms.
          Find out how we process your data in our Privacy Policy and Cookies
          Policy.
        </Text>
        <View style={styles.bottomButtons}>
          <IconButton
            onPress={() =>
              navigation.navigate(ScreenNames.PhoneNumberScreen, {
                isFromLogin: true,
              })
            }
            containerStyle={styles.marginBottom}
            type="secondary"
            icon={<PhoneSvg />}
            title={'Sign in with phone number'}
          />
          <IconButton
            containerStyle={styles.marginBottom}
            type="secondary"
            icon={<GmailSvg />}
            title={'Sign in with Gmail'}
          />
          <IconButton
            containerStyle={styles.marginBottom}
            type="secondary"
            icon={<FacebookSvg />}
            title={'Sign in with Facebook'}
          />
        </View>
        <Text style={styles.btmText}>Do you have problems loggin in?</Text>
      </View>
    </ScreenWrapper>
  );
}
