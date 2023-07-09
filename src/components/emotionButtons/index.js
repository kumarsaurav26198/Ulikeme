import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import AppColors from '~utills/AppColors';
import Like from '~assets/images/like.png';
import Share from '~assets/images/yellowShare.png';
import Heart from '~assets/images/heart.png';
import Dislike from '~assets/images/dislike.png';
import styles from './styles';
import {State, TapGestureHandler} from 'react-native-gesture-handler';
import DoubleClick from 'react-native-double-tap';
const emotions = [
  {id: 1, icon: Share, color: '#FCCB00'},
  {id: 2, icon: Dislike, color: '#EC5F35'},
  {id: 3, icon: Heart, color: AppColors.purple},
  {id: 4, icon: Like, color: '#41B50D'},
];

const EmotionButtons = ({
  style = {},
  onPress = () => {},
  disabled = false,
  showMatchOverlay = () => {},
}) => {
  const [selected, setSelected] = useState([]);

  return (
    <View style={[styles.container, style]}>
      {emotions.map((emotion, index) => {
        return (
          <DoubleClick
            singleTap={() => {
              if (selected.includes(emotion.id)) {
                const filtered = selected.filter(item => item !== emotion.id);
                setSelected(filtered);
              } else {
                setSelected(prev => [...prev, emotion.id]);
              }
              onPress(emotion.id);
            }}
            doubleTap={() => showMatchOverlay(emotion)}
            delay={350}>
            <TouchableOpacity
              key={`${index}${emotion.id}`}
              disabled={true}
              // onPress={}
              activeOpacity={0.7}
              style={styles.iconBorder(
                emotion.color,
                selected.includes(emotion.id),
              )}>
              <Image
                source={emotion.icon}
                style={styles.icon(
                  selected.includes(emotion.id),
                  emotion.color,
                )}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </DoubleClick>
        );
      })}
    </View>
  );
};

export default EmotionButtons;
