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
  Linking
} from 'react-native';
class RecipeScreen extends Component {
  state = {
    data: {}
  }
  constructor(props) {
    super(props)
  }

  render() {
    let recipe = this.props.recipe
    return (
      <View style={{height: '100%'}}>
        <Card title={recipe.title} style={{width: 125, height: 150}}
          image={{ uri: recipe.image }}
        >
        </Card>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex:1}}>Price</Text>
          <Text style={{flex:1}}>${recipe.price.toFixed(2)}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex:1}}>Express Score</Text>
          <Text style={{flex:1}}>{recipe.score.toFixed(2)}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex:1}}>Recommended Store</Text>
          <Text style={{flex:1}}>{recipe.store}</Text>
        </View>
        <Text style={{textAlign: 'center', fontSize: 18}}>Cheapest Ingredients to Buy</Text>
        <ScrollView style={{flex: 1}}>
          {
            recipe.cheapest_ingredients.map(grocery_item => {
              return (
                <Card>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{flex:1}}>Name</Text>
                    <Text style={{flex:1}}>{grocery_item.name.replace('\n','')}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{flex:1}}>Name</Text>
                    <Text style={{flex:1}}>{grocery_item.simple_name}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{flex:1}}>Price</Text>
                    <Text style={{flex:1}}>${grocery_item.totalprice}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{flex:1}}>price</Text>
                    <Text style={{flex:1}}>${grocery_item.price} / 100g</Text>
                  </View>
                </Card>
              )
            })
          }
        </ScrollView>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Button
          containerStyle={{flex: 1}}
            style={{flex: 1}}
            title="Close"
            onPress={this.props.closeModal}
          />
          <Button
          containerStyle={{flex: 1}}
            style={{flex: 1}}
            title="View Recipe"
            onPress={() => {
              Linking.openURL(this.props.recipe.url).catch(err => console.error("Couldn't load page", err));
            }}
          />
        </View>
      </View>
    )
  }
}

export default RecipeScreen;
