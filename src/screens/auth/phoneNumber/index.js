import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, ScreenWrapper} from '~components';
import BackArrowSvg from '~components/backArrowSvg';
import HeartLeftSvg from '~components/heartLeftSvg';
import HeartRightSvg from '~components/heartRightSvg';
import {height, width} from '../../../utills/Dimension';
import CountryPicker from 'react-native-country-picker-modal';
import styles from './styles';
import ArrowDownSvg from '~components/arrowDownSvg';
import ScreenNames from '~routes/routes';
import { handleSignInWithPhone } from '~firebase/FirebaseConfig';
export default function Signin({navigation, route}) {
  const isFromLogin = route?.params?.isFromLogin || false;
  const dispatch = useDispatch();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [country, setCountry] = useState({
    callingCode: ['1684'],
    cca2: 'AS',
    currency: ['USD'],
    flag: 'flag-as',
    name: 'American Samoa',
    region: 'Oceania',
    subregion: 'Polynesia',
  });
  const [phoneNum, setPhoneNum] = useState('');
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
        <Text style={styles.title}>My number is</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setPickerVisible(true)}
            activeOpacity={0.7}
            style={styles.innerRow}>
            <CountryPicker
              visible={pickerVisible}
              withFilter
              withFlag
              withCallingCode
              countryCode={country?.cca2}
              onSelect={country => {
                console.log(country);
                setCountry(country);
                setPickerVisible(false);
              }}
            />
            <Text style={styles.codeText}>+{country?.callingCode[0]}</Text>
            <ArrowDownSvg style={{marginLeft: 2}} />
          </TouchableOpacity>
          <TextInput
            style={styles.phoneNumberInput}
            onChangeText={value => setPhoneNum(value.replace(/[^0-9]/g, ''))}
            value={phoneNum}
            keyboardType={'number-pad'}
          />
        </View>
        <Text style={styles.description}>
          We'll send you a text message with a verification code. Message and
          data rates may apply. Know what happens when your number changes.
        </Text>
        <Button
          onPress={() =>{
            // handleSignInWithPhone(phoneNum)
            navigation.navigate(ScreenNames.CodeScreen, {
              isFromLogin: isFromLogin,
            })}}
          title={'Continue'}
          containerStyle={{marginTop: height(10)}}
        />
      </View>
    </ScreenWrapper>
  );
}
