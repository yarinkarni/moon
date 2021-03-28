import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { observer, inject } from 'mobx-react'
@inject("MoonsiteStore")
@observer
export default class Movie extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
