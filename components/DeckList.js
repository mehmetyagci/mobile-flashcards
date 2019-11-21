import React, { Component } from "react";
import { View, Text } from "react-native";
import { getDeckMetaInfo } from "..utils/helpers";

export default class DeckList extends Component {
  render() {
    return (
      <View>
        <Text>Deck List</Text>
        {JSON.stringify(getDeckMetaInfo())}
      </View>
    );
  }
}
