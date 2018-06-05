import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Container, Header, Content, Card, CardItem, Body, H2, Button, Text, Fab, Icon, Item, Input, Textarea } from 'native-base';

import firebase from '../../../firebase';

const firebaseAuth = firebase.auth();
const db = firebase.database();
const usersRef = db.ref('users');
const messagesRef = db.ref('messages');

export default class NewMessage extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      body: '',
    }
  }
  componentDidMount() {
    firebaseAuth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) return;
      const { uid } = firebaseUser;
      usersRef.child(uid).once('value', (snapshot) => {
        const user = snapshot.val();
        this.setState({ user });
      });
    });
  }
  onChangeBody = body => this.setState({ body })
  save = () => {
    const { user: { uid }, body } = this.state;
    messagesRef.child(uid).push({
      uid,
      body,
    }).then(Actions.HOME_MAIN);
  }
  render() {
    const { user, body } = this.state;
    return (
      <Container>
        <View style={{ flex: 1, padding: 20, justifyContent: 'flex-start' }}>
          <Item>
            <Input placeholder="ごはんですよ！" placeholderTextColor="#ccc" onChangeText={this.onChangeBody} />
          </Item>
          <Button primary block style={{ marginTop: 20 }} onPress={this.save} disabled={!user || !body}>
            <Text>登録</Text>
          </Button>
        </View>
      </Container>
    );
  }
};
