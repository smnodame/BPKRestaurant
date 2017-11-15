/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import GridView from 'react-native-super-grid';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Button, Icon, Title, Right } from 'native-base';
import {BottomSheetBehavior} from 'react-native-bottom-sheet-behavior';

export default class Product extends Component<{}> {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
        this.setModalVisible = this.logousetModalVisiblet.bind(this)
    }
    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        const items = [
                {
                    key: 1,
                    price: 300,
                    name: {
                        th: 'ไก่ทอดเกลือตะไคร้กรอบ',
                        en: 'NOODLE'
                    },
                    uri: 'http://www.chingcancook.com/head_photo/02_20150122172551GLWY.jpg'
                },
                {
                    key: 2,
                    price: 120,
                    name:  {
                        th: 'ทอดมันข้าวโพดกุ้งสับ',
                        en: 'SHUSI'
                    },
                    uri: 'http://www.easycookingmenu.com/media/k2/items/cache/e2bf3b11df0b872112757f1c2fee6e32_XL.jpg'
                },
                {
                    key: 3,
                    price: 100,
                    name: {
                        th: 'ทอดมันปลากราย',
                        en: 'STECK'
                    },
                    uri: 'https://s.isanook.com/mn/0/rp/r/w700h420/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL21uLzAvdWQvMzIvMTYzOTEyL3N0ZWFrc21hbGwuanBn.jpg'
                },
                {
                    key: 4,
                    price: 20,
                    name: {
                        th: 'กุ้งมะนาว เปรี้ยวแซ่บ',
                        en: 'RICE'
                    },
                    uri: 'http://ipattaya.co/wp-content/uploads/2016/12/DSC08017.jpg'
                },
                {
                    key: 5,
                    price: 300,
                    name: {
                        th: 'ไก่ทอดเกลือตะไคร้กรอบ',
                        en: 'NOODLE'
                    },
                    uri: 'http://www.chingcancook.com/head_photo/02_20150122172551GLWY.jpg'
                },
                {
                    key: 6,
                    price: 120,
                    name:  {
                        th: 'ทอดมันข้าวโพดกุ้งสับ',
                        en: 'SHUSI'
                    },
                    uri: 'http://www.easycookingmenu.com/media/k2/items/cache/e2bf3b11df0b872112757f1c2fee6e32_XL.jpg'
                },
                {
                    key: 7,
                    price: 100,
                    name: {
                        th: 'ทอดมันปลากราย',
                        en: 'STECK'
                    },
                    uri: 'https://s.isanook.com/mn/0/rp/r/w700h420/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL21uLzAvdWQvMzIvMTYzOTEyL3N0ZWFrc21hbGwuanBn.jpg'
                },
                {
                    key: 8,
                    price: 20,
                    name: {
                        th: 'กุ้งมะนาว เปรี้ยวแซ่บ',
                        en: 'RICE'
                    },
                    uri: 'http://ipattaya.co/wp-content/uploads/2016/12/DSC08017.jpg'
                }
            ]

        return (
            <Container>
                <Header style={{ backgroundColor: '#3b5998' }}>
                    <Left>
                        <Button transparent>
                            <Icon name="md-arrow-round-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ alignSelf: 'center'}}>โต๊ะ 1</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content>
                    <GridView
                        itemWidth={130}
                        items={items}
                        style={styles.gridView}
                        renderItem={item => (
                            <TouchableOpacity>
                                <View style={{ backgroundColor: 'white', borderRadius: 5, height: 220, borderColor: '#d3d3d3', borderWidth: 1}}>
                                    <View style={{ padding: 15 }}>
                                        <Text numberOfLines={1} >{ item.name.th }</Text>
                                    </View>
                                    <Image style={{ width: '100%', height: 120 }} source={{ uri: item.uri }} />
                                    <View style={{ padding: 15 }}>
                                        <Text style={{ color: '#4c4c4c', fontSize: 13 }}>ราคา { item.price } บาท</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    <BottomSheetBehavior
                        ref='bottomSheet'
                        peekHeight={70}
                        hideable={false}
                        state={BottomSheetBehavior.STATE_COLLAPSED}>
                            <View style={{backgroundColor: '#4389f2'}}>
                                <View style={{padding: 26}}>
                                    <Text>BottomSheetBehavior!</Text>
                                </View>
                                <View style={{height: 200, backgroundColor: '#fff'}} />
                            </View>
                    </BottomSheetBehavior>
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
