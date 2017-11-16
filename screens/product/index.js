/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import GridView from 'react-native-super-grid';
import { Container, Header, Content, Card, CardItem, Root, ActionSheet, Text, Body, Left, Button, Label, Icon, Title, Right, Item, Switch, Input, List, ListItem, Separator  } from 'native-base';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation,
} from 'react-native-popup-dialog';
import Modal from 'react-native-modal';
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';

var BUTTONS = [
  { text: "All", icon: "md-arrow-dropright", iconColor: "#ea943b"},
  { text: "ข้าว", icon: "md-arrow-dropright", iconColor: "#ea943b"},
  { text: "ซุป", icon: "md-arrow-dropright", iconColor: "#ea943b"},
  { text: "น้ำดื่ม", icon: "md-arrow-dropright", iconColor: "#ea943b"}
];
// { text: "ซุป", icon: "md-arrow-dropright", iconColor: "#ea943b" },
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class Product extends Component<{}> {
    constructor(props) {
        super(props)
        this.state = {
            dialogVisible: false,
        }
        this.renderModalContent = this.renderModalContent.bind(this)
    }

    renderModalContent = () => (
        <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text numberOfLines={1}>
                    ไก่ทอดเกลือตะไคร้
                </Text>
                <View style={{ flex: 1 }}/>
                <Item regular style={[styles.textInput, { backgroundColor: 'white', width: 80 } ]}>
                    <Input placeholderTextColor='#d4d8da' placeholder='ราคา' value={'20'} style={{ textAlign: 'center', fontSize: 22, color: '#5cb85c' }}/>
                </Item>
                <Text style={{ paddingLeft: 20, fontSize: 22, color: '#5cb85c' }}>
                    บาท
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <Switch value={false} />
                <Text>
                    เพิ่มเป็นของเเถม
                </Text>
                <View style={{ flex: 1 }}/>
            </View>
            <Item regular style={[styles.textInput, { backgroundColor: 'white', marginBottom: 10 } ]}>
                <Input placeholderTextColor='#d4d8da' placeholder='Note'
            />
            </Item>
            <View
                style={{
                    flexDirection: 'row'
                }}>

                <Button transparent>
                    <Icon name="ios-remove-circle-outline" style={styles.icon}/>
                </Button>
                <View height={50} width={50}
                    style={{
                        backgroundColor: '#5cb85c', borderRadius: 25, marginBottom: 20,
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                    }}
                >
                    <Text style={{ color: 'white'  }}>
                        0
                    </Text>
                </View>
                <Button transparent>
                    <Icon name="ios-add-circle-outline" style={styles.icon}/>
                </Button>
            </View>
            <Button block success>
                <Text>ยืนยัน</Text>
            </Button>
        </View>
    )

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
            <Root>
            <Container>
                <Header style={{ backgroundColor: '#3b5998' }}>
                    <Left>
                        <Button transparent>
                            <Icon name="md-menu" />
                        </Button>
                    </Left>
                    <Body style={{ flexDirection: 'row'}}>
                        <Text style={{ color: 'white', marginRight: 6 }}>
                            ศูนย์อาหาร 1  >
                        </Text>
                        <Text style={{ color: 'white' }}>
                            โต๊ะ 1
                        </Text>
                    </Body>
                    <Right>
                        <Button transparent >
                            <Icon name="md-clipboard" />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <View style={{ flexDirection: 'row', paddingTop: 15, paddingRight: 15 }}>
                        <Text style={{ color: '#b2b0b0', fontSize: 25, paddingLeft: 20, paddingTop: 5 }}>
                            เมนู
                        </Text>
                        <View style={{ flex: 1 }}/>
                        <Button iconRight style={{ backgroundColor: '#3b5998' }}
                            onPress={() =>
                                ActionSheet.show(
                                {
                                    options: BUTTONS,
                                    cancelButtonIndex: CANCEL_INDEX,
                                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                    title: "เลือกประเภทสินค้า (Category)"
                                },
                                buttonIndex => {
                                    this.setState({ clicked: BUTTONS[buttonIndex] });
                                }
                        )}>
                            <Text style={{ color: 'white' }}>
                                All
                            </Text>
                            <Icon name="md-arrow-dropdown" />
                        </Button>
                    </View>
                    <Modal isVisible={this.state.dialogVisible}
                    onBackdropPress={() => this.setState({dialogVisible: false})}
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0,
                    }}>
                        {this.renderModalContent() }
                    </Modal>
                    <GridView
                        itemWidth={130}
                        items={items}
                        style={styles.gridView}
                        renderItem={item => (
                            <TouchableOpacity onPress={() => {
                                this.setState({dialogVisible: true})
                            }}>
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
                </Content>
            </Container>
            </Root>
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
  dialogContentView: {
    flex: 1
  },
  textInput: {
		height: 40,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: '#d3d3d3',
		paddingHorizontal: 19,
		paddingLeft: 10, paddingRight: 10
	},
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    icon: {fontSize: 40, color: '#5cb85c'},
});
