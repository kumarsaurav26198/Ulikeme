import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from '../../utills/Dimension';
import Fonts from '../../utills/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  scroll: {
    flex: 1,
    paddingBottom: height(1.5),
  },
});
export default styles;
