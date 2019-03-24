import React from 'react';
import { Animated, FlatList, Text, TouchableOpacity } from "react-native";

const KeyboardView = ({keyboardOnPress, pinLength, onComplete, onInputChange, bgColor, returnType, textColor, animatedDeleteButton, textSize, textWeight,
  deleteText, animatedDeleteButtonOnPress, styles, hasOptionalBtn, optionalBtnText, optionalBtnClick, borderColor, borderWidth}) => {
  const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", deleteText, "0", optionalBtnText];
  const renderItem = ({ item, index }) => {
    let style;
    let onPressActive;
    if(item === optionalBtnText){
      if(hasOptionalBtn){
        onPressActive = optionalBtnClick;
        onPressActive = false;
        style = [styles[0], {
          opacity: 1,
        }]
      }
      else if(!hasOptionalBtn){
        style = [styles[0],{
          opacity: 0,
        }]
      }
    }
    else if (item === deleteText) {
      onPressActive = animatedDeleteButtonOnPress;
      style = [styles[0], {
        opacity: animatedDeleteButton
      }]
    } else {
      onPressActive = false;
      style = [styles[0]]
    }
    return (
        <TouchableOpacity activeOpacity={0.85}
                          onPress={() => keyboardOnPress(item, returnType, pinLength, onComplete, onInputChange)}
                          disabled={onPressActive}>
          <Animated.View style={[style, {
            backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
          }]}>
            <Text style={[styles[1], {
              color: textColor,
            fontSize: textSize,
            fontWeight: textWeight,
              opacity: 1,
            }]}>{item}</Text>
          </Animated.View>
        </TouchableOpacity>
    )
  };
  return (
      <FlatList
          scrollEnabled={false}
          horizontal={false}
          vertical={true}
          numColumns={3}
          renderItem={renderItem}
          data={data}
          keyExtractor={(val, index) => "pinViewItem-" + index}
      />
  )
};
export default KeyboardView