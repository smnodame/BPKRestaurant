/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import GridView from 'react-native-super-grid';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Button, Icon, Title } from 'native-base';

export default class Restaurant extends Component<{}> {
    render() {

      return (
            <Container>
                <Header style={{ backgroundColor: '#3b5998' }}>
                    <Left>
                        <Button transparent>
                            <Icon name="md-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>เลือกจุดขาย</Title>
                    </Body>
                </Header>
                <Content style={{ padding: 20 }}>
                    <Button bordered block
                        style={{ backgroundColor: 'white', borderColor: '#d3d3d3', borderBottomWidth: 0.5, marginBottom: 15 }}
                        onPress={() => this.props.navigation.navigate("Table")}
                    >
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15 }}>
                            <Icon style={{color: '#4c4c4c'}} name='restaurant' />
                            <Text style={{color: '#4c4c4c' }}>WS001 - ศูนย์อาหาร 1 </Text>
                            <Icon style={{color: '#4c4c4c'}} name='ios-arrow-forward-outline' />
                        </View>
                    </Button>
                    <Button bordered block
                        style={{ backgroundColor: 'white', borderColor: '#d3d3d3', borderBottomWidth: 0.5, marginBottom: 15 }}
                        onPress={() => this.props.navigation.navigate("Table")}
                    >
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15 }}>
                            <Icon style={{color: '#4c4c4c'}} name='restaurant' />
                            <Text style={{color: '#4c4c4c' }}>WS002 - ศูนย์อาหาร 2 </Text>
                            <Icon style={{color: '#4c4c4c'}} name='ios-arrow-forward-outline' />
                        </View>
                    </Button>
                </Content>
            </Container>
      );
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
