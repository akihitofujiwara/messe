import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Permissions, Notifications } from 'expo';

import HomeScene from './src/components/scenes/home/index';
import firebase from './src/firebase';

const firebaseAuth = firebase.auth();
const db = firebase.database();
const usersRef = db.ref('users');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      expoPushToken: null,
      uid: null,
    };
  }
  registerPushNotificationService() {
    Permissions.getAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
      return status !== 'granted' ? Permissions.askAsync(Permissions.NOTIFICATIONS) : { status };
    }).then(({ status }) => {
      if (status !== 'granted') return;
      return Notifications.getExpoPushTokenAsync();
    }).then((expoPushToken) => {
      if(!expoPushToken) return;
      this.setState({ expoPushToken });
    });
  }
  componentDidMount() {
    firebaseAuth.signInAnonymously();
    this.registerPushNotificationService();
    firebaseAuth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) return;
      const { uid } = firebaseUser;
      this.setState({ uid });
    });
  }
  componentDidUpdate(_, prevState) {
    if ((!prevState.uid && this.state.uid) || (!prevState.expoPushToken && this.state.expoPushToken)) {
      this.saveUser();
    }
  }
  saveUser() {
    const { uid, expoPushToken } = this.state;
    if (!uid) return;
    usersRef.child(uid).update({
      uid, expoPushToken
    });
  }
  render() {
    return (
      <Router hideNavBar={true}>
        <Scene>
          {HomeScene()}
        </Scene>
      </Router>
    );
  }
};
