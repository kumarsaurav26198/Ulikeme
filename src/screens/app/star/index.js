import React, {useEffect, useState} from 'react';
import {
  FlatList,
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import {
  Button,
  CalendarSvg,
  Header,
  MyDatesPager,
  SadSvg,
  ScreenWrapper,
  UserEvent,
} from '../../../components';
import HeartLeftSvg from '../../../components/heartLeftSvg';
import HeartRightSvg from '../../../components/heartRightSvg';
import AppColors from '../../../utills/AppColors';
import {UserEventType} from '../../../utills/Enums';
import styles from './styles';
import Avatar1 from '../../../assets/images/match3.png';
import Avatar2 from '../../../assets/images/match4.png';
import Avatar3 from '../../../assets/images/match5.png';
import Avatar4 from '../../../assets/images/match6.png';
import ScreenNames from '../../../routes/routes';
import AreaPickerModal from '../../../components/areaPickerModal';

const filtersArray = [
  {title: 'All', type: null},
  {title: 'I like it', type: UserEventType.LIKE},
  {title: 'My dates', type: UserEventType.DATE},
  {title: 'Matches', type: UserEventType.MATCH},
  {title: 'Ulikeme', type: UserEventType.ULIKEME},
];
const userEventsArray = [
  {
    id: '1',
    name: 'Gabriela',
    subtitle: 'Te gusta',
    type: UserEventType.LIKE,
    image: Avatar1,
  },
  {
    id: '2',
    name: 'Thomas',
    subtitle: 'Ulikeme',
    type: UserEventType.ULIKEME,
    image: Avatar2,
  },
  {
    id: '3',
    name: 'User 3',
    subtitle: 'Cita 05/07/2021',
    type: UserEventType.DATE,
    image: Avatar3,
  },
  {
    id: '4',
    name: 'User 4',
    subtitle: 'Match contigo',
    type: UserEventType.MATCH,
    image: Avatar4,
  },
];
const datesArray = [
  {
    id: '1',
    name: 'User 3',
    subtitle: 'Cita 05/07/2021',
    time: '14/12/2021',
    place: 'Nombre_Área',
    type: UserEventType.DATE,
    image: Avatar3,
  },
  {
    id: '2',
    name: 'User 3',
    subtitle: 'Cita 05/07/2021',
    time: '14/12/2021',
    place: 'Nombre_Área',
    type: UserEventType.DATE,
    image: Avatar3,
  },
  {
    id: '3',
    name: 'User 3',
    subtitle: 'Cita 05/07/2021',
    time: '14/12/2021',
    place: 'Nombre_Área',
    type: UserEventType.DATE,
    image: Avatar3,
  },
];
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const PLACE_INITIAL = 'Escoger el área';

export default function Star({navigation, route}) {
  const [isMyDates, setIsMyDates] = useState(false); // this boolean state detects if tab is on My dates and changes whole screen ui
  const [selectedFilter, setSelectedFilter] = useState({
    title: 'All',
    type: null,
  });
  const [filters, setFilters] = useState(filtersArray);
  const [userEvents, setUserEvents] = useState(userEventsArray);
  const [myDates, setMyDates] = useState(datesArray);
  const [dateFilter, setDateFilter] = useState('Hoy');
  const [pagerPage, setPagerPage] = useState(0);
  const [datFilterPicker, setDateFilterPicker] = useState(false);
  const [area, setArea] = useState(PLACE_INITIAL);
  useEffect(() => {
    if (
      selectedFilter?.title !== 'All' &&
      selectedFilter?.title !== 'My dates'
    ) {
      setIsMyDates(false);
      const tmp = userEventsArray.filter(
        item => item.type === selectedFilter.type,
      );
      setUserEvents(tmp);
    } else if (selectedFilter?.title === 'My dates') {
      setIsMyDates(true);
    } else if (selectedFilter?.title === 'All') {
      setIsMyDates(false);
      setUserEvents(userEventsArray);
    }
  }, [selectedFilter]);

  const renderfilter = ({item, index}) => {
    const isSelected = selectedFilter.title === item?.title;
    return (
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setSelectedFilter(item);
        }}
        activeOpacity={0.7}
        style={styles.tabItem}>
        <Text style={styles.sectionTitle2(isMyDates)}>{item.title}</Text>
        <View
          style={
            isSelected
              ? styles.bottomLine(isMyDates)
              : styles.invisible(isMyDates)
          }
        />
      </TouchableOpacity>
    );
  };
  const renderUserEvent = ({item, index}) => <UserEvent data={item} />;
  const renderEmpty = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>
        Ups, no tienes aun ninguna actividad, ¡empieza ya
      </Text>
      <SadSvg />
      <Button
        onPress={() => navigation.navigate(ScreenNames.ChatStack)}
        title={'Ir a citas'}
        containerStyle={styles.emptyBtn}
      />
    </View>
  );

  return (
    <ScreenWrapper
      statusBarColor={isMyDates ? AppColors.purple : AppColors.white}
      backgroundColor={isMyDates ? AppColors.purple : AppColors.white}
      headerUnScrollable={() => (
        <Header
          backgroundColor={isMyDates ? AppColors.purple : AppColors.white}
          logoType={isMyDates ? 2 : 1}
        />
      )}>
      <View style={styles.mainViewContainer}>
        {!isMyDates && <HeartLeftSvg style={styles.leftHeart} />}
        {!isMyDates && <HeartRightSvg style={styles.rightHeart} />}
        <FlatList
          horizontal
          style={{flexGrow: 0}}
          contentContainerStyle={styles.listContent}
          data={filters}
          renderItem={renderfilter}
          keyExtractor={item => item.title}
          showsHorizontalScrollIndicator={false}
        />
        {!isMyDates && (
          <TouchableOpacity activeOpacity={0.7} style={styles.deleteBtn}>
            <Text style={styles.sectionTitle2(isMyDates)}>Delete All</Text>
          </TouchableOpacity>
        )}
        {!isMyDates && (
          <FlatList
            data={userEvents}
            renderItem={renderUserEvent}
            contentContainerStyle={styles.userlistContent}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={renderEmpty}
          />
        )}
        {isMyDates && (
          <TouchableOpacity
            onPress={() => setDateFilterPicker(true)}
            activeOpacity={0.7}
            style={styles.dateFilter}>
            <Text style={styles.dateText}>{dateFilter}</Text>
            <CalendarSvg />
          </TouchableOpacity>
        )}
        {isMyDates && (
          <MyDatesPager
            dates={myDates}
            onPageChangeCallback={pageIndex => setPagerPage(pageIndex)}
            onPrimaryPress={() => navigation.navigate(ScreenNames.ChatStack)}
            openDateFilter={() => setDateFilterPicker(true)}
          />
        )}
        {isMyDates && (
          <View style={styles.dotRow}>
            {myDates.map((item, index) => (
              <View
                key={`key-${index}`}
                style={styles.dot(index === pagerPage)}
              />
            ))}
          </View>
        )}
        <AreaPickerModal
          areaArray={[
            'Hoy',
            'Este mes',
            'Los últimos 7 días',
            'Los últimos 15 días',
          ]}
          isVisible={datFilterPicker}
          close={() => setDateFilterPicker(false)}
          setPlace={setDateFilter}
          place={dateFilter}
        />
      </View>
    </ScreenWrapper>
  );
}
