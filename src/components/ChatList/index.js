import React from 'react';
import {FlatList, Image, Platform, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MeetChatView} from '~components';
import {useKeyboard} from '~hooks/useKeyboard';
import AppColors from '~utills/AppColors';
import {height, width} from '~utills/Dimension';
import styles from './styles';
const statusGradients = {
  0: {
    textColor: AppColors.black,
    colors: [AppColors.blueLight, AppColors.blueLight],
  },
  1: {
    textColor: AppColors.white,
    colors: ['#B963B5', '#7B40DE', '#793FDF', '#356DEC'],
  },
  2: {
    textColor: AppColors.white,
    colors: ['#710E0E', '#8D1A1A', '#C03030', '#E03E3E'],
  },
  3: {
    textColor: AppColors.white,
    colors: ['#0DAFB5', '#1A8FB4', '#2969B3', '#3351B2'],
  },
};
// console.log(statusGradients[2].colors.reverse());
export default React.forwardRef(
  ({messages = [], myID, chatStatus, onAcceptMeetPress}, ref) => {
    const {keyboardShown, keyboardHeight} = useKeyboard();

    const renderMessage = ({item}) => {
      const isMyMessage = item.senderId == myID;
      if (item.id === 'readyToMeet')
        return (
          <MeetChatView meetData={item} onAcceptMeetPress={onAcceptMeetPress} />
        );
      return (
        <View
          style={[
            styles.flexRow,
            {alignSelf: isMyMessage ? 'flex-end' : 'flex-start'},
          ]}>
          {!isMyMessage && item?.avatar != '' && (
            <Image source={item?.avatar} style={styles.avatarImg} />
          )}
          <LinearGradient
            colors={statusGradients[chatStatus].colors}
            style={isMyMessage ? styles.myMssgContainer : styles.mssgContainer}>
            {item.image && item.image != '' && (
              <Image
                source={item?.image}
                resizeMode={'cover'}
                style={styles.mssgImage}
              />
            )}
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.mssgText,
                  {color: statusGradients[chatStatus].textColor},
                ]}>
                {item.message}
              </Text>
            </View>
          </LinearGradient>
          {isMyMessage && item.avatar != '' && (
            <Image source={item?.avatar} style={styles.avatarImg} />
          )}
        </View>
      );
    };
    return (
      <View style={styles.mainContainer}>
        <FlatList
          onLayout={() => ref.current.scrollToEnd()}
          ref={ref}
          style={[
            styles.container,
            Platform.OS == 'ios'
              ? {
                  maxHeight: keyboardShown
                    ? height(71) - keyboardHeight
                    : height(71),
                }
              : {
                  maxHeight: keyboardShown
                    ? height(78) - keyboardHeight
                    : height(78),
                },
          ]}
          contentContainerStyle={styles.contentContainer}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
        />
      </View>
    );
  },
);
