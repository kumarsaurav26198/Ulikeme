import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Text, TouchableOpacity, View} from 'react-native';
import {Button, ScreenWrapper} from '~components';
import BackArrowSvg from '~components/backArrowSvg';
import HeartLeftSvg from '~components/heartLeftSvg';
import HeartRightSvg from '~components/heartRightSvg';
import {height} from '../../../utills/Dimension';
import styles from './styles';
import ScreenNames from '../../../routes/routes';
import {useDispatch} from 'react-redux';
import {login} from '~redux/slices/authSlice';

export default function Code({navigation, route}) {
  const isFromLogin = route?.params?.isFromLogin || false;
  const [code, setCode] = useState('123456');
  const dispatch = useDispatch();
  return (
    <ScreenWrapper>
      <View style={styles.mainViewContainer}>
        <HeartLeftSvg style={styles.leftHeart} />
        <HeartRightSvg style={styles.rightHeart} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={styles.back}>
          <BackArrowSvg />
        </TouchableOpacity>
        <Text style={styles.title}>My code is</Text>
        <View style={styles.row}>
          <OTPInputView
            style={{width: '80%', height: 200}}
            pinCount={6}
            code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={code => setCode(code)}
            autoFocusOnLoad={false}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />
        </View>
        <Text style={styles.description}>Didn't you get the code? Resend</Text>
        <Button
          onPress={() =>
            isFromLogin
              ? dispatch(login({}))
              : navigation.navigate(ScreenNames.EmailScreen)
          }
          disabled={code.length < 6}
          title={'Continue'}
          containerStyle={{marginTop: height(10)}}
        />
      </View>
    </ScreenWrapper>
  );
}
