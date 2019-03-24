import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  //passwordInputView
  passwordInputView          : {
    flexDirection: 'row',
    alignSelf    : 'center',
  },
  passwordInputViewItem      : {
    alignItems     : 'center',
    justifyContent : 'center',
    height         : 25,
    margin         : 5,
    width          : 25,
    borderRadius   : 25 / 2,
  },
  passwordInputViewItemActive: {
    alignItems     : 'center',
    justifyContent : 'center',
    height         : 25,
    width          : 25,
    margin         : 5,
    borderRadius   : 25 / 2,
  },
  // KeyboardView
  keyboardView               : {
    alignItems: 'center',
    // marginTop: 35
  },
  keyboardViewItem           : {
    alignItems      : 'center',
    justifyContent  : 'center',
    height          : 75,
    width           : 75,
    marginHorizontal: 10,
    marginVertical  : 10,
    borderRadius    : 75 / 2,
  },
  keyboardViewItemText       : {
    fontSize  : 22,
    fontWeight: '900',
  },
})