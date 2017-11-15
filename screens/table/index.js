/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import GridView from 'react-native-super-grid';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Button, Icon, Title } from 'native-base';

export default class Table extends Component<{}> {
    render() {
      // Taken from https://flatuicolors.com/
      const items = [
        { name: 'โต๊ะ 1', code: '#1abc9c' }, { name: 'โต๊ะ 2', code: '#2ecc71' },
        { name: 'โต๊ะ 3', code: '#3498db' }, { name: 'โต๊ะ 4', code: '#9b59b6' },
        { name: 'โต๊ะ 5', code: '#34495e' }, { name: 'โต๊ะ 6', code: '#16a085' },
        { name: 'โต๊ะ 7', code: '#27ae60' }, { name: 'โต๊ะ 8', code: '#2980b9' },
        { name: 'โต๊ะ 9', code: '#8e44ad' }, { name: 'โต๊ะ 10', code: '#2c3e50' },
        { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
        { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
        { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
        { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
        { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
      ];

      return (
            <Container>
            <Header style={{ backgroundColor: '#3b5998' }}>
              <Left>
                  <Button transparent onPress={() => this.openControlPanel()}>
                      <Icon name="md-menu" />
                  </Button>
              </Left>
              <Body>
                  <Title>ศูนย์อาหาร 1</Title>
              </Body>
          </Header>
                <Content>
                    <GridView
                        itemWidth={130}
                        items={items}
                        style={styles.gridView}
                        renderItem={item => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Product")}>
                                <View style={{ backgroundColor: 'white', borderRadius: 5, height: 220, borderColor: '#d3d3d3', borderWidth: 1}}>
                                    <View style={{ padding: 15, backgroundColor: '#dfe3ee', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                        <Text numberOfLines={1} >{ item.name }</Text>
                                    </View>
                                    {
                                        item.name!='โต๊ะ 1'&&<View style={{ padding: 15 }}>
                                            <Text numberOfLines={1} style={{ color: '#4c4c4c', fontSize: 13, marginBottom: 5 }}>กระเพรากุ้ง x 100 (สั่ง)</Text>
                                            <Text numberOfLines={1} style={{ color: '#4c4c4c', fontSize: 13, marginBottom: 5 }}>กระเพราหมู x 2 (สั่ง)</Text>
                                            <Text numberOfLines={1} style={{ color: '#4c4c4c', fontSize: 13, marginBottom: 5 }}>ส้มตำ x 1 (สั่ง)</Text>
                                        </View>
                                    }
                                    {
                                        item.name=='โต๊ะ 1'&&<View style={{ padding: 15,flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text numberOfLines={1} style={{ fontSize: 20, color: '#d3d3d3' }}>ว่าง</Text>
                                        </View>
                                    }
                                </View>
                            </TouchableOpacity>
                        )}
                    />
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
