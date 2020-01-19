/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import Voice from 'react-native-voice';
import { Button, Text } from 'react-native-elements';
import { Card, ListItem, Icon } from 'react-native-elements'
import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import RecipeScreen from './Recipe'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  StatusBar,
} from 'react-native';
const SERVER = 'http://130.211.228.169:5000'
class HomeScreen extends Component {
  state = {
    speech: '',
    buttonVisible: true,
    data: [
    {'ingredients': [{'text': '1 (3 ounce) package watermelon gelatin'}, {'text': '14 cup boiling water'}, {'text': '1 (12 ounce) package Cool Whip, thawed'}, {'text': '2 cups cubed seedless watermelon'}, {'text': '1 graham cracker crust'}], 'url': 'http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340', 'partition': 'train', 'title': "Cool 'n Easy Creamy Watermelon Pie", 'id': '00004320bb', 'instructions': [{'text': 'Dissolve Jello in boiling water.'}, {'text': 'Allow to cool to room temp.'}, {'text': 'Whisk in Cool Whip.'}, {'text': 'Fold in watermelon.'}, {'text': 'Spoon into crust.'}, {'text': 'Chill for 2-3 hours or overnight.'}, {'text': 'Yum!'}], 'simple_ingredients': ['whip', 'watermelon', 'crust'], 'score': 45.824999999999996, 'coverage': 0.75, 'price': 6.109999999999999, 'cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e247e1943b64cc8a5a8bd35', 'store': 'nofrills', 'name': 'PillsburyEasy Roll Pie Crust400 g', 'simple_name': 'crust', 'totalprice': 3.0, 'price': 0.75}], 'chosen_store_price': 8.33, 'chosen_store_cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'_id': '5e240d263959fd08855e2302', 'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e240e26bdd9e0a381b534e9', 'name': 'Pillsbury Pizza Crust', 'price': 0, 'simple_name': 'crust', 'totalprice': 2.97, 'store': 'walmart'}], 'num_instructions': 7, 'num_ingredients': 3, 'store': 'walmart'},
    {'ingredients': [{'text': '1 (3 ounce) package watermelon gelatin'}, {'text': '14 cup boiling water'}, {'text': '1 (12 ounce) package Cool Whip, thawed'}, {'text': '2 cups cubed seedless watermelon'}, {'text': '1 graham cracker crust'}], 'url': 'http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340', 'partition': 'train', 'title': "Cool 'n Easy Creamy Watermelon Pie", 'id': '00004320bb', 'instructions': [{'text': 'Dissolve Jello in boiling water.'}, {'text': 'Allow to cool to room temp.'}, {'text': 'Whisk in Cool Whip.'}, {'text': 'Fold in watermelon.'}, {'text': 'Spoon into crust.'}, {'text': 'Chill for 2-3 hours or overnight.'}, {'text': 'Yum!'}], 'simple_ingredients': ['whip', 'watermelon', 'crust'], 'score': 45.824999999999996, 'coverage': 0.75, 'price': 6.109999999999999, 'cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e247e1943b64cc8a5a8bd35', 'store': 'nofrills', 'name': 'PillsburyEasy Roll Pie Crust400 g', 'simple_name': 'crust', 'totalprice': 3.0, 'price': 0.75}], 'chosen_store_price': 8.33, 'chosen_store_cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'_id': '5e240d263959fd08855e2302', 'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e240e26bdd9e0a381b534e9', 'name': 'Pillsbury Pizza Crust', 'price': 0, 'simple_name': 'crust', 'totalprice': 2.97, 'store': 'walmart'}], 'num_instructions': 7, 'num_ingredients': 3, 'store': 'walmart'},
    {'ingredients': [{'text': '1 (3 ounce) package watermelon gelatin'}, {'text': '14 cup boiling water'}, {'text': '1 (12 ounce) package Cool Whip, thawed'}, {'text': '2 cups cubed seedless watermelon'}, {'text': '1 graham cracker crust'}], 'url': 'http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340', 'partition': 'train', 'title': "Cool 'n Easy Creamy Watermelon Pie", 'id': '00004320bb', 'instructions': [{'text': 'Dissolve Jello in boiling water.'}, {'text': 'Allow to cool to room temp.'}, {'text': 'Whisk in Cool Whip.'}, {'text': 'Fold in watermelon.'}, {'text': 'Spoon into crust.'}, {'text': 'Chill for 2-3 hours or overnight.'}, {'text': 'Yum!'}], 'simple_ingredients': ['whip', 'watermelon', 'crust'], 'score': 45.824999999999996, 'coverage': 0.75, 'price': 6.109999999999999, 'cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e247e1943b64cc8a5a8bd35', 'store': 'nofrills', 'name': 'PillsburyEasy Roll Pie Crust400 g', 'simple_name': 'crust', 'totalprice': 3.0, 'price': 0.75}], 'chosen_store_price': 8.33, 'chosen_store_cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'_id': '5e240d263959fd08855e2302', 'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e240e26bdd9e0a381b534e9', 'name': 'Pillsbury Pizza Crust', 'price': 0, 'simple_name': 'crust', 'totalprice': 2.97, 'store': 'walmart'}], 'num_instructions': 7, 'num_ingredients': 3, 'store': 'walmart'},
    {'ingredients': [{'text': '1 (3 ounce) package watermelon gelatin'}, {'text': '14 cup boiling water'}, {'text': '1 (12 ounce) package Cool Whip, thawed'}, {'text': '2 cups cubed seedless watermelon'}, {'text': '1 graham cracker crust'}], 'url': 'http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340', 'partition': 'train', 'title': "Cool 'n Easy Creamy Watermelon Pie", 'id': '00004320bb', 'instructions': [{'text': 'Dissolve Jello in boiling water.'}, {'text': 'Allow to cool to room temp.'}, {'text': 'Whisk in Cool Whip.'}, {'text': 'Fold in watermelon.'}, {'text': 'Spoon into crust.'}, {'text': 'Chill for 2-3 hours or overnight.'}, {'text': 'Yum!'}], 'simple_ingredients': ['whip', 'watermelon', 'crust'], 'score': 45.824999999999996, 'coverage': 0.75, 'price': 6.109999999999999, 'cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e247e1943b64cc8a5a8bd35', 'store': 'nofrills', 'name': 'PillsburyEasy Roll Pie Crust400 g', 'simple_name': 'crust', 'totalprice': 3.0, 'price': 0.75}], 'chosen_store_price': 8.33, 'chosen_store_cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'_id': '5e240d263959fd08855e2302', 'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e240e26bdd9e0a381b534e9', 'name': 'Pillsbury Pizza Crust', 'price': 0, 'simple_name': 'crust', 'totalprice': 2.97, 'store': 'walmart'}], 'num_instructions': 7, 'num_ingredients': 3, 'store': 'walmart'},
    {'ingredients': [{'text': '1 (3 ounce) package watermelon gelatin'}, {'text': '14 cup boiling water'}, {'text': '1 (12 ounce) package Cool Whip, thawed'}, {'text': '2 cups cubed seedless watermelon'}, {'text': '1 graham cracker crust'}], 'url': 'http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340', 'partition': 'train', 'title': "Cool 'n Easy Creamy Watermelon Pie", 'id': '00004320bb', 'instructions': [{'text': 'Dissolve Jello in boiling water.'}, {'text': 'Allow to cool to room temp.'}, {'text': 'Whisk in Cool Whip.'}, {'text': 'Fold in watermelon.'}, {'text': 'Spoon into crust.'}, {'text': 'Chill for 2-3 hours or overnight.'}, {'text': 'Yum!'}], 'simple_ingredients': ['whip', 'watermelon', 'crust'], 'score': 45.824999999999996, 'coverage': 0.75, 'price': 6.109999999999999, 'cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e247e1943b64cc8a5a8bd35', 'store': 'nofrills', 'name': 'PillsburyEasy Roll Pie Crust400 g', 'simple_name': 'crust', 'totalprice': 3.0, 'price': 0.75}], 'chosen_store_price': 8.33, 'chosen_store_cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'_id': '5e240d263959fd08855e2302', 'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e240e26bdd9e0a381b534e9', 'name': 'Pillsbury Pizza Crust', 'price': 0, 'simple_name': 'crust', 'totalprice': 2.97, 'store': 'walmart'}], 'num_instructions': 7, 'num_ingredients': 3, 'store': 'walmart'},
    {'ingredients': [{'text': '1 (3 ounce) package watermelon gelatin'}, {'text': '14 cup boiling water'}, {'text': '1 (12 ounce) package Cool Whip, thawed'}, {'text': '2 cups cubed seedless watermelon'}, {'text': '1 graham cracker crust'}], 'url': 'http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340', 'partition': 'train', 'title': "Cool 'n Easy Creamy Watermelon Pie", 'id': '00004320bb', 'instructions': [{'text': 'Dissolve Jello in boiling water.'}, {'text': 'Allow to cool to room temp.'}, {'text': 'Whisk in Cool Whip.'}, {'text': 'Fold in watermelon.'}, {'text': 'Spoon into crust.'}, {'text': 'Chill for 2-3 hours or overnight.'}, {'text': 'Yum!'}], 'simple_ingredients': ['whip', 'watermelon', 'crust'], 'score': 45.824999999999996, 'coverage': 0.75, 'price': 6.109999999999999, 'cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e247e1943b64cc8a5a8bd35', 'store': 'nofrills', 'name': 'PillsburyEasy Roll Pie Crust400 g', 'simple_name': 'crust', 'totalprice': 3.0, 'price': 0.75}], 'chosen_store_price': 8.33, 'chosen_store_cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'_id': '5e240d263959fd08855e2302', 'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e240e26bdd9e0a381b534e9', 'name': 'Pillsbury Pizza Crust', 'price': 0, 'simple_name': 'crust', 'totalprice': 2.97, 'store': 'walmart'}], 'num_instructions': 7, 'num_ingredients': 3, 'store': 'walmart'},
    {'ingredients': [{'text': '1 (3 ounce) package watermelon gelatin'}, {'text': '14 cup boiling water'}, {'text': '1 (12 ounce) package Cool Whip, thawed'}, {'text': '2 cups cubed seedless watermelon'}, {'text': '1 graham cracker crust'}], 'url': 'http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340', 'partition': 'train', 'title': "Cool 'n Easy Creamy Watermelon Pie", 'id': '00004320bb', 'instructions': [{'text': 'Dissolve Jello in boiling water.'}, {'text': 'Allow to cool to room temp.'}, {'text': 'Whisk in Cool Whip.'}, {'text': 'Fold in watermelon.'}, {'text': 'Spoon into crust.'}, {'text': 'Chill for 2-3 hours or overnight.'}, {'text': 'Yum!'}], 'simple_ingredients': ['whip', 'watermelon', 'crust'], 'score': 45.824999999999996, 'coverage': 0.75, 'price': 6.109999999999999, 'cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e247e1943b64cc8a5a8bd35', 'store': 'nofrills', 'name': 'PillsburyEasy Roll Pie Crust400 g', 'simple_name': 'crust', 'totalprice': 3.0, 'price': 0.75}], 'chosen_store_price': 8.33, 'chosen_store_cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'_id': '5e240d263959fd08855e2302', 'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e240e26bdd9e0a381b534e9', 'name': 'Pillsbury Pizza Crust', 'price': 0, 'simple_name': 'crust', 'totalprice': 2.97, 'store': 'walmart'}], 'num_instructions': 7, 'num_ingredients': 3, 'store': 'walmart'},
    {'ingredients': [{'text': '1 (3 ounce) package watermelon gelatin'}, {'text': '14 cup boiling water'}, {'text': '1 (12 ounce) package Cool Whip, thawed'}, {'text': '2 cups cubed seedless watermelon'}, {'text': '1 graham cracker crust'}], 'url': 'http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340', 'partition': 'train', 'title': "Cool 'n Easy Creamy Watermelon Pie", 'id': '00004320bb', 'instructions': [{'text': 'Dissolve Jello in boiling water.'}, {'text': 'Allow to cool to room temp.'}, {'text': 'Whisk in Cool Whip.'}, {'text': 'Fold in watermelon.'}, {'text': 'Spoon into crust.'}, {'text': 'Chill for 2-3 hours or overnight.'}, {'text': 'Yum!'}], 'simple_ingredients': ['whip', 'watermelon', 'crust'], 'score': 45.824999999999996, 'coverage': 0.75, 'price': 6.109999999999999, 'cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e247e1943b64cc8a5a8bd35', 'store': 'nofrills', 'name': 'PillsburyEasy Roll Pie Crust400 g', 'simple_name': 'crust', 'totalprice': 3.0, 'price': 0.75}], 'chosen_store_price': 8.33, 'chosen_store_cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'_id': '5e240d263959fd08855e2302', 'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e240e26bdd9e0a381b534e9', 'name': 'Pillsbury Pizza Crust', 'price': 0, 'simple_name': 'crust', 'totalprice': 2.97, 'store': 'walmart'}], 'num_instructions': 7, 'num_ingredients': 3, 'store': 'walmart'},
    {'ingredients': [{'text': '1 (3 ounce) package watermelon gelatin'}, {'text': '14 cup boiling water'}, {'text': '1 (12 ounce) package Cool Whip, thawed'}, {'text': '2 cups cubed seedless watermelon'}, {'text': '1 graham cracker crust'}], 'url': 'http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340', 'partition': 'train', 'title': "Cool 'n Easy Creamy Watermelon Pie", 'id': '00004320bb', 'instructions': [{'text': 'Dissolve Jello in boiling water.'}, {'text': 'Allow to cool to room temp.'}, {'text': 'Whisk in Cool Whip.'}, {'text': 'Fold in watermelon.'}, {'text': 'Spoon into crust.'}, {'text': 'Chill for 2-3 hours or overnight.'}, {'text': 'Yum!'}], 'simple_ingredients': ['whip', 'watermelon', 'crust'], 'score': 45.824999999999996, 'coverage': 0.75, 'price': 6.109999999999999, 'cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e247e1943b64cc8a5a8bd35', 'store': 'nofrills', 'name': 'PillsburyEasy Roll Pie Crust400 g', 'simple_name': 'crust', 'totalprice': 3.0, 'price': 0.75}], 'chosen_store_price': 8.33, 'chosen_store_cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'_id': '5e240d263959fd08855e2302', 'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e240e26bdd9e0a381b534e9', 'name': 'Pillsbury Pizza Crust', 'price': 0, 'simple_name': 'crust', 'totalprice': 2.97, 'store': 'walmart'}], 'num_instructions': 7, 'num_ingredients': 3, 'store': 'walmart'},
    {'ingredients': [{'text': '1 (3 ounce) package watermelon gelatin'}, {'text': '14 cup boiling water'}, {'text': '1 (12 ounce) package Cool Whip, thawed'}, {'text': '2 cups cubed seedless watermelon'}, {'text': '1 graham cracker crust'}], 'url': 'http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340', 'partition': 'train', 'title': "Cool 'n Easy Creamy Watermelon Pie", 'id': '00004320bb', 'instructions': [{'text': 'Dissolve Jello in boiling water.'}, {'text': 'Allow to cool to room temp.'}, {'text': 'Whisk in Cool Whip.'}, {'text': 'Fold in watermelon.'}, {'text': 'Spoon into crust.'}, {'text': 'Chill for 2-3 hours or overnight.'}, {'text': 'Yum!'}], 'simple_ingredients': ['whip', 'watermelon', 'crust'], 'score': 45.824999999999996, 'coverage': 0.75, 'price': 6.109999999999999, 'cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e247e1943b64cc8a5a8bd35', 'store': 'nofrills', 'name': 'PillsburyEasy Roll Pie Crust400 g', 'simple_name': 'crust', 'totalprice': 3.0, 'price': 0.75}], 'chosen_store_price': 8.33, 'chosen_store_cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'_id': '5e240d263959fd08855e2302', 'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e240e26bdd9e0a381b534e9', 'name': 'Pillsbury Pizza Crust', 'price': 0, 'simple_name': 'crust', 'totalprice': 2.97, 'store': 'walmart'}], 'num_instructions': 7, 'num_ingredients': 3, 'store': 'walmart'},
    {'ingredients': [{'text': '1 (3 ounce) package watermelon gelatin'}, {'text': '14 cup boiling water'}, {'text': '1 (12 ounce) package Cool Whip, thawed'}, {'text': '2 cups cubed seedless watermelon'}, {'text': '1 graham cracker crust'}], 'url': 'http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340', 'partition': 'train', 'title': "Cool 'n Easy Creamy Watermelon Pie", 'id': '00004320bb', 'instructions': [{'text': 'Dissolve Jello in boiling water.'}, {'text': 'Allow to cool to room temp.'}, {'text': 'Whisk in Cool Whip.'}, {'text': 'Fold in watermelon.'}, {'text': 'Spoon into crust.'}, {'text': 'Chill for 2-3 hours or overnight.'}, {'text': 'Yum!'}], 'simple_ingredients': ['whip', 'watermelon', 'crust'], 'score': 45.824999999999996, 'coverage': 0.75, 'price': 6.109999999999999, 'cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e247e1943b64cc8a5a8bd35', 'store': 'nofrills', 'name': 'PillsburyEasy Roll Pie Crust400 g', 'simple_name': 'crust', 'totalprice': 3.0, 'price': 0.75}], 'chosen_store_price': 8.33, 'chosen_store_cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'_id': '5e240d263959fd08855e2302', 'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e240e26bdd9e0a381b534e9', 'name': 'Pillsbury Pizza Crust', 'price': 0, 'simple_name': 'crust', 'totalprice': 2.97, 'store': 'walmart'}], 'num_instructions': 7, 'num_ingredients': 3, 'store': 'walmart'},
    {'ingredients': [{'text': '1 (3 ounce) package watermelon gelatin'}, {'text': '14 cup boiling water'}, {'text': '1 (12 ounce) package Cool Whip, thawed'}, {'text': '2 cups cubed seedless watermelon'}, {'text': '1 graham cracker crust'}], 'url': 'http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340', 'partition': 'train', 'title': "Cool 'n Easy Creamy Watermelon Pie", 'id': '00004320bb', 'instructions': [{'text': 'Dissolve Jello in boiling water.'}, {'text': 'Allow to cool to room temp.'}, {'text': 'Whisk in Cool Whip.'}, {'text': 'Fold in watermelon.'}, {'text': 'Spoon into crust.'}, {'text': 'Chill for 2-3 hours or overnight.'}, {'text': 'Yum!'}], 'simple_ingredients': ['whip', 'watermelon', 'crust'], 'score': 45.824999999999996, 'coverage': 0.75, 'price': 6.109999999999999, 'cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e247e1943b64cc8a5a8bd35', 'store': 'nofrills', 'name': 'PillsburyEasy Roll Pie Crust400 g', 'simple_name': 'crust', 'totalprice': 3.0, 'price': 0.75}], 'chosen_store_price': 8.33, 'chosen_store_cheapest_ingredients': [{'_id': '5e240d653959fd08855e2557', 'store': 'walmart', 'name': 'Miracle Whip Original Spread', 'totalprice': 3.47, 'simple_name': 'whip', 'price': 0.39}, {'_id': '5e240d263959fd08855e2302', 'store': 'walmart', 'name': 'Watermelon, Mini Seedless', 'totalprice': 4.97, 'simple_name': 'watermelon', 'price': 0}, {'_id': '5e240e26bdd9e0a381b534e9', 'name': 'Pillsbury Pizza Crust', 'price': 0, 'simple_name': 'crust', 'totalprice': 2.97, 'store': 'walmart'}], 'num_instructions': 7, 'num_ingredients': 3, 'store': 'walmart'}
    ]
  }
  constructor(props) {
    super(props)
    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResultsHandler.bind(this);
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
    //this.sendRequest(event.value[0])
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
    console.log(result)
  }

  render() {
    return (
      <SafeAreaView style={{height: '100%'}}>
      <ScrollView style={{flex:1}}>
        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
          {
            this.state.data.map((recipe, i) => {
              return (
                <Card key={i} title={`$${recipe.price.toFixed(2)}`} style={{width: 125, height: 250}}
                image={{ uri: recipe.image }}
                >
                  <Text style={{width: 125}}>{recipe.title}</Text>
                </Card>
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
      </SafeAreaView>
    )
  }
}

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Recipe: {screen: RecipeScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
