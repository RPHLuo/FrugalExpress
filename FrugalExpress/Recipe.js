/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { Button, Text } from 'react-native-elements';
import { Card, ListItem, Icon } from 'react-native-elements'
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  StatusBar,
} from 'react-native';
const SERVER = 'http://130.211.228.169:5000'
class RecipeScreen extends Component {
  state = {
    data: {}
  }
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
      </View>
    )
  }
}

export default RecipeScreen;
