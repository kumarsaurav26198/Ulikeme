import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Br, Button, ScreenWrapper, Select} from '~components';
import {SimpleHeader} from '~components/Header';
import HeartLeftSvg from '~components/heartLeftSvg';
import HeartRightSvg from '~components/heartRightSvg';
import {setBottomTabVisible} from '~redux/slices/configSlice';
import AppColors from '../../../utills/AppColors';
import {height, width} from '../../../utills/Dimension';
import styles from './styles';
import Thumb from '~assets/images/sliderThumb.png';
import Heart from '~assets/images/smallHeart.png';
import Slider from '@react-native-community/slider';
import RadioOnSvg from '~components/radioOn';
import RadioOffSvg from '~components/radioOff';
import {logout} from '~redux/slices/authSlice';
import Account from './Account';
import General from './General';
import Notification from './Notifications';
const settingsTypes = [
  {title: 'Account'},
  {title: 'General'},
  {title: 'Notifications'},
];
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function Configuration({navigation, route}) {
  const [settingsList, setSettingsList] = useState(settingsTypes);
  const [selectedSettings, setSelectedSettings] = useState({
    title: 'Account',
  });
  const [userInfo, setUserInfo] = useState({
    cellNo: '+51 997 607 697',
    connectedAccounts: ['Gmail', 'Apple'],
    email: 'karolcondori@icloud.com',
    username: '@karolcondori',
    isVerified: 'Verified account',
    showWithinRangeDistance: true,
    distance: 15,
    showMe: 'Hombres',
    isGlobal: false,
    showMeOnUlikeme: false,
    blockCount: 243,
    agePref: {
      start: 18,
      end: 25,
    },
    showWithinRangeAge: false,
    isReadingConfirmations: true,
    recentActivityStatus: false,
    pushNotifications: false,
    receiveNewsUpdate: true,
  });
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(setBottomTabVisible(false));
    return () => dispatch(setBottomTabVisible(true));
  }, []);
  const renderSettingType = ({item, index}) => {
    const isSelected = selectedSettings.title === item?.title;
    return (
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          setSelectedSettings(item);
        }}
        activeOpacity={0.7}
        style={styles.tabItem}>
        <Text style={styles.sectionTitle2}>{item.title}</Text>
        <View style={isSelected ? styles.bottomLine : styles.invisible} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScreenWrapper
        scrollEnabled
        statusBarColor={AppColors.bgWhite}
        backgroundColor={AppColors.bgWhite}
        headerUnScrollable={() => (
          <>
            <SimpleHeader
              navigation={navigation}
              title={'Configuration'}
              rightIcon={<Text style={styles.OK}>OK</Text>}
            />
            <FlatList
              horizontal
              style={styles.tabs}
              contentContainerStyle={styles.listContent}
              data={settingsList}
              renderItem={renderSettingType}
              keyExtractor={item => item.title}
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}>
        <View style={styles.mainViewContainer}>
          {selectedSettings?.title === 'Account' && (
            <>
              <HeartLeftSvg style={styles.left} />
              <HeartRightSvg style={styles.right} />
            </>
          )}
          {selectedSettings?.title === 'Account' ? (
            <Account userInfo={userInfo} navigation={navigation} />
          ) : selectedSettings?.title === 'General' ? (
            <General
              userInfo={userInfo}
              navigation={navigation}
              setUserInfo={setUserInfo}
            />
          ) : (
            <Notification
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              navigation={navigation}
            />
          )}
        </View>
      </ScreenWrapper>
      {selectedSettings?.title === 'Notifications' && (
        <>
          <HeartLeftSvg style={styles.leftNot} />
          <HeartRightSvg style={styles.rightNot} />
        </>
      )}
    </>
  );
}
