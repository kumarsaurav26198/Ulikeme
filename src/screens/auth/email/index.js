import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Button, ScreenWrapper} from '~components';
import BackArrowSvg from '~components/backArrowSvg';
import HeartLeftSvg from '~components/heartLeftSvg';
import HeartRightSvg from '~components/heartRightSvg';
import ScreenNames from '../../../routes/routes';
import {height} from '../../../utills/Dimension';
import styles from './styles';
const emailReg =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Email({navigation, route}) {
  const [email, setEmail] = useState('');
  const onContinuePress = () => {
    navigation.navigate(ScreenNames.WelcomeScreen);
  };
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
        <Text style={styles.title}>My email is</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.phoneNumberInput}
            onChangeText={value => setEmail(value)}
            value={email}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
          />
        </View>
        <Text style={styles.description}>
          Don't lose access to your account, check your email
        </Text>
        <Button
          disabled={!emailReg.test(email)}
          onPress={onContinuePress}
          title={'Continue'}
          containerStyle={{marginTop: height(15)}}
        />
      </View>
    </ScreenWrapper>
  );
}
