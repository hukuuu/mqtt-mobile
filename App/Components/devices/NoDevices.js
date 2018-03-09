import React from 'react'
import { Text } from 'react-native'
import { Fonts, Colors } from '../../Themes'
import Widget from './Widget'

export default () => (
  <Widget>
    <Text
      style={{
        ...Fonts.style.h4,
        color: Colors.coal
      }}
    >
      No devices.
    </Text>
  </Widget>
)
