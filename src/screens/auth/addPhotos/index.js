import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, GalleryModal, ScreenWrapper, SmallPlusSvg} from '~components';
import BackArrowSvg from '~components/backArrowSvg';
import HeartLeftSvg from '~components/heartLeftSvg';
import HeartRightSvg from '~components/heartRightSvg';
import {login} from '~redux/slices/authSlice';
import AppColors from '~utills/AppColors';
import CommonStyles from '~utills/CommonStyles';
import styles from './styles';
export default function AddPhotos({navigation, route}) {
  const [photos, setPhotos] = useState([
    {id: '1', uri: null},
    {id: '2', uri: null},
    {id: '3', uri: null},
    {id: '4', uri: null},
  ]);
  const [galleryModalVisible, setGalleryModalVisible] = useState(false);
  const onImageSelect = uri => {
    if (uri) {
      const tmp = [...photos];
      const index = tmp.findIndex(item => item.id === galleryModalVisible);
      tmp[index].uri = uri;
      setPhotos(tmp);
    }
    setGalleryModalVisible(false);
  };
  const dispatch = useDispatch();
  return (
    <ScreenWrapper
      statusBarColor={AppColors.bgWhite}
      backgroundColor={AppColors.bgWhite}
      headerUnScrollable={() => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}>
          <BackArrowSvg />
        </TouchableOpacity>
      )}>
      <View style={styles.mainViewContainer}>
        <HeartLeftSvg style={styles.leftHeart} />
        <HeartRightSvg style={styles.rightHeart} />
        <Text style={styles.title}>Add Photos</Text>
        <Text style={styles.subtitle}>Add a minimum of 2 photos</Text>
        <View style={styles.photos}>
          {photos.map((photo, index) => (
            <View key={`key-${index}`} style={styles.photoContainer}>
              <TouchableOpacity
                onPress={() => setGalleryModalVisible(photo?.id)}
                activeOpacity={0.7}
                style={styles.plus}>
                <SmallPlusSvg />
              </TouchableOpacity>
              <Image source={{uri: photo?.uri}} style={styles.photo} />
            </View>
          ))}
        </View>
        <Button
          onPress={() => dispatch(login({}))}
          title={'Continue'}
          containerStyle={styles.btn}
        />
      </View>
      <GalleryModal
        isVisible={!!galleryModalVisible}
        onImageSelect={onImageSelect}
        onClose={() => setGalleryModalVisible(false)}
      />
    </ScreenWrapper>
  );
}
