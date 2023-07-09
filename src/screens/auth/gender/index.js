import React, {useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Button, ScreenWrapper} from '~components';
import BackArrowSvg from '~components/backArrowSvg';
import HeartLeftSvg from '~components/heartLeftSvg';
import HeartRightSvg from '~components/heartRightSvg';
import ScreenNames from '~routes/routes';
import {height} from '../../../utills/Dimension';
import styles from './styles';
import EmptyCircle from '~assets/images/unselectedCircle.png';
import SelectedCircle from '~assets/images/selectedCircle.png';
import AppColors from '../../../utills/AppColors';
export default function Gender({navigation, route}) {
  const isShowMeScreen = route?.params?.isShowMeScreen;
  const [genders, setGenders] = useState(
    isShowMeScreen ? ['Men', 'Women', 'All'] : ['Men', 'Women', 'Others'],
  );
  const [selectedGender, setSelectedGender] = useState('Men');
  const [showGender, setShowGender] = useState(false);

  const renderGender = ({item}) => {
    const isSelected = item === selectedGender;
    return (
      <TouchableOpacity
        onPress={() => setSelectedGender(item)}
        activeOpacity={0.7}
        style={styles.genderContainer(isSelected)}>
        <Text style={styles.gendertext}>{item}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScreenWrapper statusBarColor={AppColors.bgWhite}>
      <View style={styles.mainViewContainer}>
        <HeartLeftSvg style={styles.leftHeart} />
        <HeartRightSvg style={styles.rightHeart} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={styles.back}>
          <BackArrowSvg />
        </TouchableOpacity>
        <Text style={styles.title}>{isShowMeScreen ? 'Show me' : `I'm`}</Text>
        <FlatList
          style={styles.genderList}
          data={genders}
          renderItem={renderGender}
          keyExtractor={item => item}
        />
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowGender(prev => !prev)}>
            <Image
              source={showGender ? SelectedCircle : EmptyCircle}
              style={styles.img}
            />
          </TouchableOpacity>
          <Text style={styles.descr}>Show my gender on my profile</Text>
        </View>
        <Button
          onPress={() => {
            if (isShowMeScreen) {
              navigation.goBack();
            } else {
              navigation.navigate(ScreenNames.SexualOrientationScreen);
            }
          }}
          title={isShowMeScreen ? 'Save' : 'Continue'}
          containerStyle={{marginTop: height(10)}}
        />
      </View>
    </ScreenWrapper>
  );
}
