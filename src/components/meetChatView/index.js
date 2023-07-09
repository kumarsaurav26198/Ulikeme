import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppColors from '~utills/AppColors';
import styles from './styles';
import Heart from '~assets/images/smallHeart.png';
import MeetImage from '~assets/images/meetImage.png';
import BackArrowSvg from '~components/backArrowSvg';
import CommonStyles from '~utills/CommonStyles';
import ChevronDownSvg from '~components/chevronDownSvg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AreaPickerModal from '~components/areaPickerModal';
import Button from '~components/button';
const TIME_INITIAL = 'Seleccionar la fecha y hora';
const PLACE_INITIAL = 'Escoger el área';
const MeetChatView = ({onAcceptMeetPress, meetData}) => {
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [areaPickerVisible, setAreaPickerVisible] = useState(false);
  const [time, setTime] = useState(TIME_INITIAL);
  const [place, setPlace] = useState(PLACE_INITIAL);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.greyText}>Has seleccionado la opción</Text>
        <Image source={Heart} resizeMode={'contain'} style={styles.img} />
        <Text style={styles.greyText}>Ready to meet</Text>
      </View>
      <View style={styles.whiteBg}>
        <Text style={styles.title}>
          ¡Están listos para reunirse, seleccione sus opciones disponibles!
        </Text>
        <View style={styles.meetRow}>
          <Image source={MeetImage} style={styles.meetImg} />
          <View style={styles.rowRight}>
            <View style={[styles.dropDown, CommonStyles.marginTop_1]}>
              <View>
                <Text style={styles.label}>Su cita será el:</Text>
                <Text style={styles.value}>{time}</Text>
              </View>
              <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
                <ChevronDownSvg style={styles.arrowDown} />
              </TouchableOpacity>
            </View>
            <View style={[styles.dropDown, CommonStyles.marginTop_3]}>
              <View>
                <Text style={styles.label}>La cita será en</Text>
                <Text style={styles.value}>{place}</Text>
              </View>
              <TouchableOpacity onPress={() => setAreaPickerVisible(true)}>
                <ChevronDownSvg style={styles.arrowDown} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {time !== TIME_INITIAL &&
          place !== PLACE_INITIAL &&
          !meetData?.proposal && (
            <Button
              onPress={() => onAcceptMeetPress()}
              title={'Enviar Propuesta'}
              containerStyle={styles.btn}
            />
          )}
      </View>
      {meetData?.proposal && (
        <>
          <Text style={[styles.greyText, CommonStyles.marginTop_2]}>
            {meetData?.proposal?.by} te ha enviado una contrapropuesta
          </Text>
          <View style={styles.whiteBg}>
            <Text style={styles.title}>¡Este es el plan!</Text>
            <View style={styles.meetRow}>
              <Image source={MeetImage} style={styles.meetImg} />
              <View style={styles.rowRight}>
                <View style={[styles.dropDown, CommonStyles.marginTop_1]}>
                  <View>
                    <Text style={styles.label}>Su cita será el:</Text>
                    <Text style={styles.value}>{meetData?.proposal?.time}</Text>
                  </View>
                  <ChevronDownSvg style={styles.arrowDown} />
                </View>
                <View style={[styles.dropDown, CommonStyles.marginTop_3]}>
                  <View>
                    <Text style={styles.label}>La cita será en</Text>
                    <Text style={styles.value}>
                      {meetData?.proposal?.place}
                    </Text>
                  </View>
                  <ChevronDownSvg style={styles.arrowDown} />
                </View>
              </View>
            </View>
            {time !== TIME_INITIAL &&
              place !== PLACE_INITIAL &&
              !meetData?.proposal && (
                <Button
                  onPress={() => onAcceptMeetPress()}
                  title={'Enviar Propuesta'}
                  containerStyle={styles.btn}
                />
              )}
          </View>
        </>
      )}
      <AreaPickerModal
        isVisible={areaPickerVisible}
        close={() => setAreaPickerVisible(false)}
        setPlace={setPlace}
        place={place}
      />
      <DateTimePickerModal
        isVisible={timePickerVisible}
        mode="datetime"
        onConfirm={date => {
          setTime(moment(date).format('DD/MM/YYYY - ha'));
          setTimePickerVisible(false);
        }}
        onCancel={() => setTimePickerVisible(false)}
      />
    </View>
  );
};

export default MeetChatView;
