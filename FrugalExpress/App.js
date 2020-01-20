/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import Voice from 'react-native-voice';
import { Button, Text, Overlay } from 'react-native-elements';
import { Card, ListItem, Icon } from 'react-native-elements'
import React, {Component} from 'react';
import RecipeScreen from './Recipe'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
const SERVER = 'http://130.211.228.169:5000'
class HomeScreen extends Component {
  state = {
    speech: '',
    buttonVisible: true,
    isVisible: false,
    selectedRecipe: {},
    data: []
  }
  constructor(props) {
    super(props)
    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResultsHandler.bind(this);
    this.onStartButtonPress = this.onStartButtonPress.bind(this)
  }

  async componentDidMount() {
    console.log('hi')
  }

  onSpeechStartHandler(event) {
    console.log(event)
  }

  onSpeechEndHandler(event) {
    console.log(event)
  }

  onSpeechResultsHandler(event) {
    console.log(event)
    this.setState({speech: event.value[0], buttonVisible: true})
    this.sendRequest(event.value[0])
  }

  onSpeechPartialResultsHandler(event) {
    console.log(event)
    this.setState({speech: event.value})
  }

  onStartButtonPress(e){
    Voice.start('en-US');
    this.setState({buttonVisible: false})
  }

  async sendRequest(text) {
    let data = {
      text: text
    }
    let result = await fetch(SERVER+'/text', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    result = await result.json()
    this.setState({data: result})
  }

  render() {
    return (
      <SafeAreaView style={{height: '100%'}}>
      <ScrollView style={{flex:1}}>
        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
          {
            this.state.data.map((recipe, i) => {
              return (
                <TouchableOpacity key={i}
                onPress={()=>{
                  console.log('pressed')
                  this.setState({isVisible: true, selectedRecipe: recipe})}
                }>
                <Card key={i} title={`$${recipe.price.toFixed(2)}`} style={{width: 125, height: 250}}
                image={{ uri: recipe.image }}
                >
                  <Text style={{width: 125}}>{recipe.title}</Text>
                </Card>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
      <View style={{justifyContent: 'flex-end'}}>
        <Text style={{height: 70, fontSize: 18}}>
        {this.state.speech}
        </Text>
        {
          this.state.buttonVisible ?
          <Button
            style={{height: 20}}
            title="Talk"
            onPress={this.onStartButtonPress}
          />
          :null
        }
      </View>
      <Overlay isVisible={this.state.isVisible} fullScreen={true}>
        <RecipeScreen recipe={this.state.selectedRecipe} closeModal={() => {this.setState({selectedRecipe: null, isVisible: false})}}/>
      </Overlay>
      </SafeAreaView>
    )
  }
}


export default HomeScreen;
