import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {ScreenWrapper} from '~components';
import AppColors from '~utills/AppColors';
import styles from './styles';
import Match3 from '~assets/images/match3.png';
import Match4 from '~assets/images/match4.png';
import Match5 from '~assets/images/match5.png';
import Match6 from '~assets/images/match6.png';
import Match7 from '~assets/images/match7.png';
import Heart from '~assets/images/tabHeartActive.png';
import Logo from '~assets/images/headerLogo.png';
import {height, width} from '~utills/Dimension';
import CommonStyles from '~utills/CommonStyles';
import ScreenNames from '~routes/routes';
const newMatchesArray = [
  {id: '1', isHeart: true, image: Match3},
  {id: '2', isHeart: false, image: Match4},
  {id: '3', isHeart: true, image: Match5},
  {id: '4', isHeart: false, image: Match6},
  {id: '5', isHeart: false, image: Match7},
];
const chatTypeArray = [
  {id: '1', title: 'Todos'},
  {id: '2', title: '😊'},
  {id: '3', title: '🙃'},
  {id: '4', title: '😒'},
];
const chatListArray = [
  {
    id: '1',
    name: 'Leonardo',
    isHeart: true,
    isOnline: true,
    descr:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor .',
    image: Match3,
  },
  {
    id: '2',
    name: 'Joel',
    isHeart: true,
    isOnline: false,
    descr:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor .',
    image: Match4,
  },
  {
    id: '3',
    name: 'Paolo',
    isHeart: false,
    isOnline: false,
    descr:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor .',
    image: Match5,
  },
];
export default function ChatList({navigation, route}) {
  const [newMatches, setNewMacthes] = useState(newMatchesArray);
  const [tab, setTab] = useState(0); // 0 => Messages // 1 => Group Messages
  const [chatType, setChatType] = useState(chatTypeArray);
  const [selectedChatType, setSelectedChatType] = useState(0);
  const [chatList, setChatlist] = useState(chatListArray);

  const renderNewMatchItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ScreenNames.UserProfileScreen, {user: item})
        }
        style={styles.matchItemContainer}>
        <Image source={item?.image} style={styles.newMatchImage} />
        {item?.isHeart && (
          <Image
            source={Heart}
            style={styles.heartImage}
            resizeMode={'contain'}
          />
        )}
      </TouchableOpacity>
    );
  };
  const renderChatType = ({item, index}) => {
    const isSelected = selectedChatType === index;
    return (
      <TouchableOpacity
        onPress={() => setSelectedChatType(index)}
        activeOpacity={0.7}
        style={
          isSelected ? styles.typeContainerActive : styles.typeContainerInactive
        }>
        <Text
          style={isSelected ? styles.typeTextActive : styles.typeTextInActive}>
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderChatListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ScreenNames.ChatScreen, {chatWith: item})
        }
        activeOpacity={0.7}
        style={styles.chatlistItem}>
        <View>
          <Image source={item.image} style={styles.chatListImage} />
          <View
            style={item.isOnline ? styles.statusOnline : styles.statusOffline}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={CommonStyles.rowAlignItemCenter}>
            <Text style={styles.nameText}>{item.name}</Text>
            {item.isHeart && (
              <Image
                source={Logo}
                style={styles.isHeartImg}
                resizeMode={'contain'}
              />
            )}
          </View>
          <Text style={styles.descr}>{item.descr}</Text>
          {chatList.length - 1 !== index && <View style={styles.line} />}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScreenWrapper
      statusBarColor={AppColors.bgWhite}
      backgroundColor={AppColors.bgWhite}>
      <View style={styles.mainViewContainer}>
        <View style={styles.topListContainer}>
          <Text style={styles.sectionTitle}>Nuevos matches</Text>
          <FlatList
            style={styles.newMatchList}
            horizontal
            data={newMatches}
            renderItem={renderNewMatchItem}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
          />
        </View>
        <View
          style={[
            CommonStyles.rowAlignItemCenter,
            {marginHorizontal: width(3), marginTop: height(1.5)},
          ]}>
          <TouchableOpacity
            onPress={() => setTab(0)}
            activeOpacity={0.7}
            style={styles.tabItem}>
            <Text style={styles.sectionTitle2}>Mensajes</Text>
            <View style={tab === 0 ? styles.bottomLine : styles.invisible} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTab(1)}
            activeOpacity={0.7}
            style={styles.tabItem}>
            <Text style={styles.sectionTitle2}>Mensajes Grupales</Text>
            <View style={tab === 1 ? styles.bottomLine : styles.invisible} />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          style={styles.typeList}
          contentContainerStyle={{paddingHorizontal: width(4)}}
          data={chatType}
          renderItem={renderChatType}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
        />
        <FlatList
          style={styles.chatList}
          data={chatList}
          renderItem={renderChatListItem}
          contentContainerStyle={{paddingBottom: height(12)}}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
        />
      </View>
    </ScreenWrapper>
  );
}
