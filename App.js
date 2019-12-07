import React from 'react';
import RootNavigator from './navigation';

import {setLocalNotification} from './utils/helpers';

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification ();
  }

  render () {
    return <RootNavigator />;
  }
}
