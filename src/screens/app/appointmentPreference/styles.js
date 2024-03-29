import {StyleSheet} from 'react-native';
import AppColors from '../../../utills/AppColors';
import {height, width} from '../../../utills/Dimension';
import Fonts from '../../../utills/Fonts';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: AppColors.bgWhite,
    overflow: 'hidden',
  },
  leftHeart: {
    position: 'absolute',
    left: -width(27),
    top: height(8),
  },
  rightHeart: {
    position: 'absolute',
    right: -width(25),
    top: height(3),
  },
  phoneNumberInput: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.darkPurple,
    color: AppColors.greyText,
    fontSize: width(4),
    width: width(85),
    alignSelf: 'center',
    marginBottom: height(4),
    marginTop: height(4),
    paddingBottom: height(1),
    textAlign: 'center',
    fontFamily: Fonts.MontsMedium,
    alignSelf: 'center',
    width: width(70),
  },
  back: {
    marginLeft: width(5),
    marginTop: height(3),
  },
  title: {
    alignSelf: 'center',
    fontSize: width(7),
    color: AppColors.darkPurple,
    marginTop: height(6),
    fontWeight: 'bold',
    maxWidth: width(70),
    textAlign: 'center',
  },
  genderList: {
    flexGrow: 0,
    alignSelf: 'center',
    marginVertical: height(1.5),
    marginTop: height(5),
  },
  genderContainer: isSelected => ({
    width: width(70),
    paddingVertical: height(2),
    alignItems: 'center',
    backgroundColor: AppColors.white,
    marginBottom: height(1.5),
    borderRadius: width(30),
    borderWidth: 1,
    borderColor: isSelected ? AppColors.purple : AppColors.transparent,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginHorizontal: width(2),
  }),
  gendertext: {
    color: AppColors.purple,
    fontWeight: 'bold',
    fontSize: width(3.8),
  },
  row: {
    width: width(75),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width(4),
    marginTop: height(2),
  },
  img: {
    height: height(2.5),
    width: height(2.5),
  },
  descr: {
    marginLeft: width(2),
    color: AppColors.greyText,
    fontSize: width(3.3),
  },
});
export default styles;
