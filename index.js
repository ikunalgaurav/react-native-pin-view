import React from 'react';
import { Animated, Easing, View } from "react-native";

import KeyboardView from './libs/parts/KeyboardView'
import InputView from './libs/parts/InputView'
import Styles from './libs/parts/styles'
import PropTypes from 'prop-types'

class PinView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedInputIndex: Object.assign([]),
      animatedDeleteButton: new Animated.Value(0),
      pinViewAnim: new Animated.Value(0),
      animatedDeleteButtonOnPress: true
    };
    this.keyboardOnPress = this.keyboardOnPress.bind(this);
    this.setDeleteButton = this.setDeleteButton.bind(this);
    this.clear = this.clear.bind(this)
  }

  userInput = [];
  setDeleteButton = (status) => {
    Animated.timing(
        // Animate value over time
        this.state.animatedDeleteButton, // The value to drive
        {
          toValue: status ? 1 : 0, // Animate to final value of 1
          duration: 100
        }
    ).start(); // Start the animation
    this.setState({
      animatedDeleteButtonOnPress: !status,
    })
  };

  clear() {
    this.userInput = [];
    this.setState({
      animatedInputIndex: Object.assign([]),
      pinViewAnim: new Animated.Value(0),
    })
  }

  keyboardOnPress = (val, returnType, pinLength, onComplete, onInputChange) => {
    if (val === this.props.deleteText) {
      this.userInput = this.userInput.slice(0, -1);
      this.setState({
        animatedInputIndex: this.state.animatedInputIndex.slice(0, -1)
      });
      if (this.userInput.length === 0) {
        this.setDeleteButton(false);
      }
    } else if(val === this.props.optionalBtnText){
      const { optionalBtnClick } = this.props;
      if(optionalBtnClick){
        optionalBtnClick();
      }
    }
     else {
      if (pinLength === this.userInput.length + 1) {
        this.userInput = this.userInput.concat(parseInt(val));
        this.setDeleteButton(true);
        this.setState({
          animatedInputIndex: this.state.animatedInputIndex.concat(this.userInput.indexOf(parseInt(val)))
        }, () => {
          if (returnType === "string") {
            return onComplete(this.userInput.join(""), this.clear)
          } else if (returnType === "array") {
            return onComplete(this.userInput, this.clear)
          } else {
            console.log("Unkown return type!")
          }
        });
      } else if (this.userInput.length < pinLength) {
        this.userInput = this.userInput.concat(parseInt(val));
        this.setDeleteButton(true);
        this.setState({
          animatedInputIndex: this.state.animatedInputIndex.concat(this.userInput.indexOf(parseInt(val)))
        });
      }
    }
    if (onInputChange) {
      onInputChange(this.userInput)
    }
  };

  render () {
    const {pinLength, buttonTextColor, returnType, buttonBgColor, borderColor,
      borderWidth, inputBgColor, onComplete, onInputChange,
      disabled, inputActiveBgColor, inputBgOpacity, deleteText,
      optionalBtnClick,
      optionalBtnText,
      hasOptionalBtn,
      buttonFontSize, buttonFontWeight,
      inputBorderColor, inputBorderWidth,
      inputVisible
    } = this.props;
    return (
      <View style={{flex: 1}} pointerEvents={disabled ? "none" : undefined}>
          <InputView
              userInput={this.userInput}
              inputVisible={inputVisible}
              bgOpacity={inputBgOpacity}
              pinLength={pinLength}
              activeBgColor={inputActiveBgColor}
              inputBorderColor={inputBorderColor}
              inputBorderWidth={inputBorderWidth}
              animatedInputIndex={this.state.animatedInputIndex}
              pinViewAnim={this.state.pinViewAnim}
              bgColor={inputBgColor}
              styles={[Styles.passwordInputView, Styles.passwordInputViewItem, Styles.passwordInputViewItemActive]}
          />
          <View style={Styles.keyboardView}>
            <KeyboardView
                styles={[Styles.keyboardViewItem, Styles.keyboardViewItemText]}
                bgColor={buttonBgColor}
                borderColor={borderColor}
                borderWidth={borderWidth}
                textColor={buttonTextColor}
                textSize={buttonFontSize}
                textWeight={buttonFontWeight}
                animatedDeleteButton={this.state.animatedDeleteButton}
                pinLength={pinLength}
                deleteText={deleteText}
                onComplete={onComplete}
                onInputChange={onInputChange}
                animatedDeleteButtonOnPress={this.state.animatedDeleteButtonOnPress}
                keyboardOnPress={this.keyboardOnPress}
                returnType={returnType}
                optionalBtnClick={optionalBtnClick}
                optionalBtnText={optionalBtnText}
                hasOptionalBtn={hasOptionalBtn}
            />
          </View>
        </View>
    )
  }
}

PinView.defaultProps = {
  inputVisible: false,
  deleteText: "DEL",
  buttonBgColor: '#FFF',
  borderColor: '#FFF',
  borderWidth: 0,
  buttonTextColor: '#333',
  buttonFontWeight: '900',
  buttonFontSize: 22,
  inputBgColor: '#333',
  inputActiveBgColor: '#333',
  inputBorderColor: '#333',
  inputBorderWidth: 0,
  returnType: 'string',
  inputBgOpacity: 0.1,
  disabled: false,
  clear: false,
  hasOptionalBtn: false,
  optionalBtnClick: null,
  optionalBtnText: "Reset"
};
PinView.propTypes = {
  inputVisible: PropTypes.bool,
  disabled: PropTypes.bool,
  deleteText: PropTypes.string,
  returnType: PropTypes.string,
  buttonBgColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  buttonTextColor: PropTypes.string,
  buttonFontWeight: PropTypes.string,
  buttonFontSize: PropTypes.number,
  inputBgColor: PropTypes.string,
  inputActiveBgColor: PropTypes.string,
  inputBorderColor: PropTypes.string,
  inputBorderWidth: PropTypes.number,
  inputBgOpacity: PropTypes.number,
  onComplete: PropTypes.func.isRequired,
  pinLength: PropTypes.number.isRequired,
  onInputChange: PropTypes.func,
  clear: PropTypes.bool,
  hasOptionalBtn: PropTypes.bool,
  optionalBtnText: PropTypes.string,
  optionalBtnClick: PropTypes.func
};

export default PinView
