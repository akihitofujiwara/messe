import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { View, Container, Header, Content, Card, CardItem, Body, H2, Button, Text, Fab, Icon } from 'native-base';
import { values, entries } from 'lodash';
import axios from 'axios';

import firebase from '../../../firebase';

const firebaseAuth = firebase.auth();
const db = firebase.database();
const usersRef = db.ref('users');
const messagesRef = db.ref('messages');

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      messages: {},
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
  componentDidUpdate(_, prevState) {
    if(!prevState.user && this.state.user) {
      this.fetchMessages();
    }
  }
  fetchMessages() {
    const { user: { uid } } = this.state;
    messagesRef.child(uid).on('value', (snapshot) => {
      const messages = snapshot.val() || {};
      this.setState({ messages });
    });
  }
  onPress = (index) => () => {
    const { user: { uid }, messages } = this.state;
    const [messageId] = entries(messages)[index];
    axios.get(`https://us-central1-messe-25e9d.cloudfunctions.net/push?uid=${uid}&messageId=${messageId}`);
  }
  render() {
    const { messages } = this.state;
    return (
      <Container>
        <View style={{ flex: 1, padding: 20, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <Fab
            onPress={Actions.HOME_NEW_MESSAGE}
          >
            <Icon name="add" />
          </Fab>
          {
            values(messages).map((message, i) => {
              return (
                <TouchableWithoutFeedback key={i} onPress={this.onPress(i)}>
                  <Card style={{ flex: 0 }}>
                    <CardItem>
                      <Text>{message.body}</Text>
                    </CardItem>
                  </Card>
                </TouchableWithoutFeedback>
              );
            })
          }
        </View>
      </Container>
    );
  }
};
