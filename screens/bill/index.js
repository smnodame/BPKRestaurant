/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import GridView from 'react-native-super-grid';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Button, Icon, Title } from 'native-base';

export default class Bill extends Component<{}> {
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
                <Title>รายการที่สั่ง</Title>
            </Body>
        </Header>
            <Content>
                <List>
                    <ListItem>
                        <Body>
                            <Text>Sankhadeep</Text>
                            <Text note>Its time to build a difference . .</Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Body>
                            <Text>Sankhadeep</Text>
                            <Text note>Its time to build a difference . .</Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Body>
                            <Text>Sankhadeep</Text>
                            <Text note>Its time to build a difference . .</Text>
                        </Body>
                    </ListItem>
                </List>
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
    backgroundColor: 'yellow'
  },
  statusContainer: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  statusText: { color: '#FFF', fontSize: 12, padding: 2, backgroundColor: '#ebb72d', borderRadius: 5 }
});
