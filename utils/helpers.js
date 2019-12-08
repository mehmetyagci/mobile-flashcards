// utils/helpers.js
import React from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import {white, black, red, orange, blue, lightPurp, pink} from './colors';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

export function clearLocalNotification () {
  return AsyncStorage.removeItem (NOTIFICATION_KEY).then (
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification () {
  return {
    title: 'Complete a deck!',
    body: "👋 don't forget to complete at least one deck for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification () {
  AsyncStorage.getItem (NOTIFICATION_KEY).then (JSON.parse).then (data => {
    if (data === null) {
      Permissions.askAsync (Permissions.NOTIFICATIONS).then (({status}) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync ();

          let tomorrow = new Date ();
          tomorrow.setDate (tomorrow.getDate () + 1);
          tomorrow.setHours (20);
          tomorrow.setMinutes (15);

          Notifications.scheduleLocalNotificationAsync (createNotification (), {
            time: tomorrow,
            repeat: 'day',
          });

          AsyncStorage.setItem (NOTIFICATION_KEY, JSON.stringify (true));
        }
      });
    }
  });
}
