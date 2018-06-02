import React, { Component } from 'react';
import { Drawer, Scene } from 'react-native-router-flux';

import DrawerContent from './DrawerContent';
import Main from './Main';

export default function Init() {
  return (
    <Drawer
      key="home"
      hideNavBar
      contentComponent={DrawerContent}
    >
      <Scene key="HOME_MAIN"
        component={Main}
        initial
      />
    </Drawer>
  );
};
