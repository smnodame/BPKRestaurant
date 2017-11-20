/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import GridView from 'react-native-super-grid';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Button, Icon, Title, List, ListItem, Item, Input, Right, Form, Label, Picker, ActionSheet } from 'native-base';
import Modal from 'react-native-modal';
import { NavigationActions } from 'react-navigation'

var BUTTONS = [
  { text: "เงินสด", icon: "md-arrow-dropright", iconColor: "#ea943b"},
  { text: "บัตรเครดิต", icon: "md-arrow-dropright", iconColor: "#ea943b"},
  { text: "คูปอง", icon: "md-arrow-dropright", iconColor: "#ea943b"}
];
// { text: "ซุป", icon: "md-arrow-dropright", iconColor: "#ea943b" },
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class Bill extends Component<{}> {

    constructor(props) {
        super(props)
        this.state = {
            dialogVisible: false
        }
        this.showCategoty = this.showCategoty.bind(this)
    }

    showCategoty = () => {
        if ( this.actionSheet !== null ) {
            this.actionSheet._root.showActionSheet(
                {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    title: "เลือกประเภทการชำระ"
                },
                buttonIndex => {
                    this.setState({ clicked: BUTTONS[buttonIndex] });
                }
            )
        }
    }

    render() {
      return (
        <Container style={{ backgroundColor: '#fff' }}>
            <Header style={{ backgroundColor: '#3b5998' }}>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.dispatch(NavigationActions.back()) }>
                        <Icon name="md-arrow-round-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>ชำระเงิน</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => this.props.navigation.dispatch(NavigationActions.back()) }>
                        <Icon name="md-checkmark" />
                    </Button>
                </Right>
            </Header>
            <Content>
                <List>
                    <ListItem icon style={{ marginLeft: 0, paddingLeft: 20 }} onPress={() => this.showCategoty() }>
                            <Body>
                                <Text>ประเภทการชำระ</Text>
                            </Body>
                            <Right style={{ flex: 1, flexDirection: 'row' }}>
                                 <Text note>เงินสด</Text>
                                 <Icon name="md-arrow-dropdown" />
                            </Right>
                            <ActionSheet ref={(c) => { this.actionSheet = c }} />
                    </ListItem>
                    <ListItem icon style={{ marginLeft: 0, paddingLeft: 20 }}>
                        <Body>
                            <Text>ราคารวม</Text>
                        </Body>
                        <Right style={{ flex: 1, flexDirection: 'row' }}>
                             <Input style={{ textAlign: 'right'}} placeholder="0 ฿" placeholderTextColor='#d4d8da'/>
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ marginLeft: 0, paddingLeft: 20 }}>
                        <Body>
                            <Text>ส่วนลด</Text>
                        </Body>
                        <Right style={{ flex: 1, flexDirection: 'row' }}>
                              <Input style={{ textAlign: 'right'}} placeholder="0 ฿" placeholderTextColor='#d4d8da'/>
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ marginLeft: 0, paddingLeft: 20 }}>
                        <Body>
                            <Text>ราคาสุทธิ</Text>
                        </Body>
                        <Right style={{ flex: 1, flexDirection: 'row' }}>
                             <Text note></Text>
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ marginLeft: 0, paddingLeft: 20 }}>
                        <Body>
                            <Text>ชำระ</Text>
                        </Body>
                        <Right style={{ flex: 1, flexDirection: 'row' }}>
                             <Input style={{ textAlign: 'right'}} placeholder="0 ฿" placeholderTextColor='#d4d8da'/>
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ marginLeft: 0, paddingLeft: 20 }}>
                        <Body>
                            <Text>ทอน</Text>
                        </Body>
                        <Right style={{ flex: 1, flexDirection: 'row' }}>
                             <Text note></Text>
                        </Right>
                    </ListItem>
                    <Modal isVisible={this.state.dialogVisible}
                    onBackdropPress={() => this.setState({dialogVisible: false})}
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0,
                    }}>
                        <View style={styles.modalContent}>
                            <Item regular style={[styles.textInput, { backgroundColor: 'white', marginBottom: 10 } ]}>
                                <Input placeholderTextColor='#d4d8da' ref={(c) => { this.editInput = c }} />
                            </Item>
                            <Button block success>
                                <Text>เเก้ไข</Text>
                            </Button>
                        </View>
                    </Modal>
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
  modalContent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
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
