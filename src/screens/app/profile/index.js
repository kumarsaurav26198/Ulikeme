import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {
  CupSvg,
  ProfileIconSvg,
  ProfileStarSvg,
  ScreenWrapper,
  SettingsSvg,
  SilverHeartSvg,
} from '~components';
import AppColors from '../../../utills/AppColors';
import styles from './styles';
import Avatar from '~assets/images/Gabriela.png';
import CommonStyles from '../../../utills/CommonStyles';
import LinearGradient from 'react-native-linear-gradient';
import ArrowDownSvg from '~components/arrowDownSvg';
import BackArrowSvg from '~components/backArrowSvg';
import ScreenNames from '../../../routes/routes';
export default function Profile({navigation, route}) {
  const profileOptions = [
    {
      icon: <ProfileStarSvg />,
      title: 'Benefits',
    },
    {
      icon: <ProfileIconSvg />,
      title: 'Complete your profile',
    },
  ];
  const [completePercent, setCompletePercent] = useState('20%');
  const onOptionPress = index => {
    switch (index) {
      case 0:
        navigation.navigate(ScreenNames.BenefitsScreen);
        break;
      case 1:
        navigation.navigate(ScreenNames.ProfessionalStaticScreen);
        break;
      default:
        break;
    }
  };
  return (
    <ScreenWrapper
      statusBarColor={AppColors.purple}
      backgroundColor={AppColors.purple}>
      <View style={styles.mainViewContainer}>
        <SilverHeartSvg style={styles.heartLeft} />
        <SilverHeartSvg style={styles.heartRight} />
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNames.ConfigurationScreen)}
          activeOpacity={0.7}
          style={styles.settingsSvg}>
          <SettingsSvg />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Image source={Avatar} style={styles.avatar} />
          <Text style={styles.name}>Gabriela</Text>
          <Text style={styles.age}>27 years</Text>
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#6D90FE', '#59B6FE', '#59B6FE', '#38F2FF']}
          style={styles.pointContainer}>
          <CupSvg style={CommonStyles.marginRight_3} />
          <Text style={styles.pointText}>You have 300 points</Text>
        </LinearGradient>
        <View style={CommonStyles.marginTop_5}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={`key-${index}`}
              onPress={() => onOptionPress(index)}
              activeOpacity={0.7}
              style={styles.optionRow}>
              {option.icon}
              <Text style={styles.optionTitle}>{option.title}</Text>
              {index == 1 && (
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FF56FF',
                    '#D776FF',
                    '#6D90FE',
                    '#59B6FE',
                    '#38F2FF',
                  ]}
                  style={styles.completeContainer}>
                  <Text style={styles.percent}>{completePercent}</Text>
                </LinearGradient>
              )}
              <BackArrowSvg fill={AppColors.white} style={styles.rotation} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}
