// utils/helpers.js
import React from "react";
import { View } from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { white } from "./colors";

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split("T")[0];
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20
  }
});

export function getDeckMetaInfo(deck) {
  const info = {
    react: {
      title: "React",
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]         
    },
    javascript: {
      title: "JavaScript",
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]          
    },      
  };

  return typeof deck === "undefined" ? info : info[deck];
}
