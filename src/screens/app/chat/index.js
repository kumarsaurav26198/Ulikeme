import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, ChatList, ScreenWrapper, StatusOverlay} from '~components';
import {ChatHeader} from '~components/Header';
import AppColors from '~utills/AppColors';
import {setBottomTabVisible} from '~redux/slices/configSlice';
import styles from './styles';
import Match3 from '~assets/images/match3.png';
import Match4 from '~assets/images/match4.png';
import Mic from '~assets/images/mic.png';
import Status1 from '~assets/images/status1.png';
import Status2 from '~assets/images/status2.png';
import Status3 from '~assets/images/status3.png';
import ArrowDown from '~assets/images/arrowDown.png';
import Tick from '~assets/images/tick.png';
import Star from '~assets/images/chatStar.png';
import {useKeyboard} from '~hooks/useKeyboard';
import {height, width} from '~utills/Dimension';

import {RNHoleView} from 'react-native-hole-view';
import Modal from 'react-native-modal';
const messagesArray = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    message:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor .',
    avatar: Match3,
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    message:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor .',
    avatar: Match4,
  },
];

export default function Chat({navigation, route}) {
  const {chatWith} = route.params;
  const [messages, setMessages] = useState(messagesArray);
  const [flashOverlay, setFlashOverlay] = useState(false);
  const [chatStatus, setChatStatus] = useState(0);
  const [overlayStatus, setOverlayStatus] = useState(null);
  const [status, setStatus] = useState([
    {name: 1, image: Status1},
    {name: 2, image: Status3},
    {name: 3, image: Status2},
  ]);
  const [step, setStep] = useState(null);
  const [message, setMessage] = useState('');
  const {keyboardShown, keyboardHeight} = useKeyboard();
  const listRef = useRef();
  const dispatch = useDispatch();
  const [isReadyToMeet, setReadyToMeet] = useState(false);

  useLayoutEffect(() => {
    dispatch(setBottomTabVisible(false));
    return () => dispatch(setBottomTabVisible(true));
  }, []);
  const onSend = () => {
    let messageObj = {
      id: `${Math.random()}`,
      senderId: '1',
      receiverId: '2',
      message: message,
      avatar: Match3,
    };
    setMessages([...messages, messageObj]);
    setTimeout(() => {
      listRef.current.scrollToEnd();
    }, 600);
    setMessage('');
  };
  const onPressReadyToMeet = () => {
    setOverlayStatus(4);
    setReadyToMeet(true);
    const obj = {
      id: 'readyToMeet',
    };
    setMessages(prev => [...prev, obj]);
  };
  const renderStatus = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item.name);
          setChatStatus(item.name);
          setOverlayStatus(item.name);
        }}
        activeOpacity={0.7}
        style={styles.statusContainer}>
        <Image
          source={item.image}
          resizeMode={'contain'}
          style={{width: width(30)}}
        />
      </TouchableOpacity>
    );
  };
  const renderFooter = () => (
    <View style={styles.bgFooter}>
      <View
        style={[
          styles.footerContainer,
          {
            paddingBottom: keyboardShown
              ? 0
              : Platform.OS == 'ios'
              ? height(2)
              : 0,
          },
        ]}>
        <TextInput
          style={styles.input}
          placeholder={'Write a message...'}
          placeholderTextColor={AppColors.grey}
          value={message}
          onChangeText={text => setMessage(text)}
          onSubmitEditing={onSend}
          blurOnSubmit={false}
        />
        <TouchableOpacity>
          <Image source={Mic} style={styles.mic} resizeMode={'contain'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStep(1)} style={styles.corner}>
          <Image source={Star} resizeMode={'contain'} style={styles.star} />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        style={{flexGrow: 0}}
        data={status}
        contentContainerStyle={{paddingHorizontal: width(4)}}
        renderItem={renderStatus}
        keyExtractor={item => `key-${item.name}`}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
  const onAcceptMeetPress = () => {
    //after sending meet proposal
    //counter offer ui triggered by adding counterOffer object to meet object in messages state
    const tmp = [...messages];
    const index = tmp.findIndex(item => item.id === 'readyToMeet');
    const newObj = {
      ...messages[index],
      proposal: {
        by: 'Gabriela',
        time: '11/05/2024',
        place: 'New Area',
      },
    };
    tmp.splice(index, 1);
    tmp.push(newObj);
    setMessages(tmp);
    setFlashOverlay(true);
  };
  return (
    <ScreenWrapper
      statusBarColor={AppColors.white}
      backgroundColor={AppColors.bgWhite}>
      <View
        style={[
          styles.mainViewContainer,
          Platform.OS == 'ios'
            ? {marginBottom: keyboardShown ? keyboardHeight : 0}
            : {},
        ]}>
        <ChatHeader
          onPress={onPressReadyToMeet}
          navigation={navigation}
          name={chatWith?.name}
        />

        <ChatList
          myID={'1'}
          ref={listRef}
          messages={messages}
          chatStatus={chatStatus}
          onAcceptMeetPress={onAcceptMeetPress}
        />
        {renderFooter()}
        {step == 1 && (
          <RNHoleView
            style={styles.hole1}
            holes={[
              {
                x: width(79.5),
                y: Platform.OS == 'android' ? height(82) : height(74),
                width: height(8),
                height: height(8),
                borderRadius: height(4),
              },
            ]}>
            <View style={styles.overlayTextContainer}>
              <Text style={styles.overlayText}>1 de 2</Text>
              <Text style={styles.overlayTextDescr}>
                Te presentamos una manera divertida de calificar tus chats.
              </Text>
              <Button
                onPress={() => setStep(2)}
                title={'Siguiente'}
                containerStyle={styles.btn}
              />
            </View>
            <Image
              source={ArrowDown}
              resizeMode={'contain'}
              style={styles.arrowDown}
            />
          </RNHoleView>
        )}
        {step == 2 && (
          <RNHoleView
            style={styles.hole1}
            holes={[
              {
                x: width(3),
                y: Platform.OS == 'android' ? height(91.5) : height(85),
                width: Platform.OS == 'android' ? width(99) : width(97),
                height: height(7.7),
                borderRadius: height(4),
              },
            ]}>
            <TouchableOpacity
              onPress={() => setStep(null)}
              activeOpacity={1}
              style={{flex: 1}}>
              <View style={styles.overlayTextContainer2}>
                <Text style={styles.overlayText}>2 de 2</Text>
                <Text style={styles.overlayTextDescr}>
                  Ten en cuenta que la primera persona que califica el chat es
                  la única que puede cambiar el estado.
                </Text>
              </View>
              <Image
                source={ArrowDown}
                resizeMode={'contain'}
                style={styles.arrowDown2}
              />
            </TouchableOpacity>
          </RNHoleView>
        )}
        {overlayStatus && (
          <StatusOverlay
            status={overlayStatus}
            close={() => setOverlayStatus(null)}
          />
        )}
        <Modal
          backdropOpacity={0.8}
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}
          isVisible={flashOverlay}
          onBackdropPress={() => setFlashOverlay(false)}>
          <View style={styles.flashMessage}>
            <Image source={Tick} resizeMode={'contain'} style={styles.tick} />
            <Text style={styles.flashText}>
              ¡Has aceptado la propuesta con éxito!
            </Text>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
}
