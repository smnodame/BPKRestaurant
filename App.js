/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import GridView from 'react-native-super-grid';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Button, Icon, Title } from 'native-base';

import { StackNavigator } from 'react-navigation'
import Product from './screens/product'
import Restaurant from './screens/restaurant'
import Table from './screens/table'
import Bill from './screens/bill'
import Login from './screens/login'
import Splash from './screens/splash'
import ChooseProgram from './screens/programs'
import Patient from './screens/patient'

import Config from './screens/config'

const BPKRestaurant = StackNavigator({
    Product: { screen: Product },
    Restaurant: { screen: Restaurant },
    Table: { screen: Table },
    Bill: { screen: Bill },
    Login: { screen: Login },
    Splash: { screen: Splash },
    ChooseProgram: { screen: ChooseProgram },
    Config: { screen: Config },
    Patient: { screen: Patient }
},
{
    initialRouteName: "Splash",
    headerMode: "none",
})

export default BPKRestaurant
