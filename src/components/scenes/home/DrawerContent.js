import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Button, Text } from 'native-base';

export default class DrawerContent extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'column', alignItems: 'stretch', flex: 1, padding: 15, paddingTop: 50 }}>
        <Button transparent dark onPress={Actions.HOME_MAIN}>
          <Text>ホーム</Text>
        </Button>
      </View>
    );
  }
}
