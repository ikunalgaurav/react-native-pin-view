import React from 'react';
import {Animated, Text} from "react-native";

const InputView = ({userInput, inputVisible, pinViewAnim, animatedInputIndex, pinLength, bgColor, activeBgColor, styles, bgOpacity, inputBorderColor, inputBorderWidth}) => {
  const tilt = pinViewAnim.interpolate({
    inputRange: [0, 0.3, 0.6, 0.9],
    outputRange: [0, -50, 50, 0]
  });

  const inactiveInput = (index) => {
    return <Animated.View
        key={"passwordItem-" + index}
        style={[styles[1], {
          backgroundColor: bgColor,
        borderColor: inputBorderColor,
        borderWidth: inputBorderWidth,
          opacity: bgOpacity
        }]}/>;
  };

  const activeInput = (index) => {
    return <Animated.View
        key={"passwordItem-" + index}
        style={[styles[2], {
          backgroundColor: activeBgColor,
        borderColor: inputBorderColor,
        borderWidth: inputBorderWidth,
          opacity: 1
        }]}/>
  };

  const visibleInput = (index, input) => {
    return <Animated.View
      key={"passwordItem-" + index}
      style={[styles[2], {
        borderBottomWidth: inputBorderWidth,
        borderBottomColor: inputBorderColor,
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1
      }]} >
      <Text style={{color: activeBgColor, fontSize: 20}}>
        {input}
      </Text>
    </Animated.View>
  };

  const ShowInput = (pinLength) => {
    let table = [];
    {
      for (let i = 0; i < pinLength; i++) {
        if (inputVisible) {
          table.push(visibleInput(i, userInput[i]))
        }
        else if (animatedInputIndex[i] === undefined) {
          table.push(inactiveInput(i))
        } else {
          table.push(activeInput(i))
        }
      }
    }
    return table
  };

  return (
      <Animated.View style={[styles[0], {
        transform: [{ translateX: tilt }]
      }]}>
        {ShowInput(pinLength)}
      </Animated.View>
  )

};

export default InputView