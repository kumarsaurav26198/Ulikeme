import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {Button, CrossSvg} from '~components';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import ShareIcon from '~assets/images/shareIcon.png';
import CancelIcon from '~assets/images/CancelIcon.png';

const UserProfileModal = ({isVisible, onClose = () => {}}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      onBackdropPress={onClose}
      avoidKeyboard={true}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={onClose}
          activeOpacity={0.7}
          style={styles.cross}>
          <CrossSvg />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.row}>
          <Image source={ShareIcon} resizeMode={'contain'} style={styles.img} />
          <Text style={styles.text}>Compartir a Lorem Ipsum</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.row, {borderBottomColor: 'transparent'}]}>
          <Image
            source={CancelIcon}
            resizeMode={'contain'}
            style={styles.img2}
          />
          <Text style={styles.textGrey}>Denuncia a Lorem Ipsum</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default UserProfileModal;
