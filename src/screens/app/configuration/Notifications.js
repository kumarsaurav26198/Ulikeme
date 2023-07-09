import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Br, Select} from '~components';
import RadioOffSvg from '~components/radioOff';
import RadioOnSvg from '~components/radioOn';
import ScreenNames from '~routes/routes';
import styles from './styles';

const Notification = ({userInfo, setUserInfo, navigation}) => {
  return (
    <View style={styles.accountContainer}>
      <Select
        label={'Email address'}
        defaultValue={'Select at least 3 interests to share'}
        value={userInfo?.email}
        onPress={() => navigation.navigate(ScreenNames.EmailVerificationScreen)}
      />
      <Br />
      <View style={styles.row}>
        <Text style={[styles.sectionTitle2, {flex: 1}]}>
          Push Notifications
        </Text>
        <TouchableOpacity
          onPress={() =>
            setUserInfo(prev => ({
              ...prev,
              pushNotifications: !prev?.pushNotifications,
            }))
          }
          activeOpacity={0.7}>
          {userInfo?.pushNotifications ? <RadioOnSvg /> : <RadioOffSvg />}
        </TouchableOpacity>
      </View>
      <Br />
      <View style={styles.row}>
        <Text style={[styles.sectionTitle2, {flex: 1}]}>Team Ulikme</Text>
        <TouchableOpacity
          onPress={() =>
            setUserInfo(prev => ({
              ...prev,
              receiveNewsUpdate: !prev?.receiveNewsUpdate,
            }))
          }
          activeOpacity={0.7}>
          {userInfo?.receiveNewsUpdate ? <RadioOnSvg /> : <RadioOffSvg />}
        </TouchableOpacity>
      </View>
      <Text style={[styles.descr, styles.global]}>
        Quiero recibir noticias, actualizaciones y ofertas Ulikme
      </Text>
      <Br />
    </View>
  );
};

export default Notification;
