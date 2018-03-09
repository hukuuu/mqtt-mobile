import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { Fonts, Colors, Images, Metrics } from '../../Themes'
import Widget from './Widget'

import { Icon } from 'react-native-elements'

const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#bada55',
        flex: 1,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        margin: 1,
        borderRadius: 4
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  )
}

export default ({ sensor, onPower, onMode, onPlus, onMinus }) => (
  // <Widget>
  <View
    style={{
      height: 50,
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Button onPress={onPower}>
      <Icon inverse name="power" type="foundation" />
    </Button>
    <Button onPress={onMode}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 17
        }}
      >
        M
      </Text>
    </Button>
    <Button onPress={onMinus}>
      <Icon inverse name="minus" type="entypo" />
    </Button>
    <Button onPress={onPlus}>
      <Icon inverse name="plus" type="entypo" />
    </Button>
  </View>
  // </Widget>
)
