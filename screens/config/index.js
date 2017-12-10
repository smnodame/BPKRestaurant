/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, AsyncStorage } from 'react-native';
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

export default class Config extends Component<{}> {

    constructor(props) {
        super(props)
        this.state = {
            dialogVisible: false,
            default_host: '',
            pos_host: '',
            patient_host: '',
            isReady: false
        }
        this.showCategoty = this.showCategoty.bind(this)
        AsyncStorage.getItem('default_host').then((host) => {
            this.setState({
                default_host: host
            })
        })
        AsyncStorage.getItem('pos_host').then((host) => {
            this.setState({
                pos_host: host
            })
        })
        AsyncStorage.getItem('patient_host').then((host) => {
            this.setState({
                patient_host: host
            })
        })

        AsyncStorage.getItem('current_state').then((current_state) => {
            this.setState({
                current_state
            })
        })
        this.save = this.save.bind(this)
    }

    async componentWillMount() {
		const current_state = await AsyncStorage.getItem('current_state')
		this.setState({ current_state : current_state, isReady: true })
    }

    save = () => {
        if(this.state.current_state=='Login') {
            AsyncStorage.setItem('default_host', this.state.default_host).then(() => {
                const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: this.state.current_state})
                        ]
                    })
                this.props.navigation.dispatch(resetAction)
            })
        } else {
            AsyncStorage.setItem('pos_host', this.state.pos_host).then(() => {
                AsyncStorage.setItem('patient_host', this.state.patient_host).then(() => {
                    console.log(this.state.current_state)
                    const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: this.state.current_state})
                            ]
                        })
                    this.props.navigation.dispatch(resetAction)
                })
            })
        }
    }

    back = () => {
        const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: this.state.current_state})
                ]
            })
        this.props.navigation.dispatch(resetAction)
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
                    <Title>Configuration</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() =>  this.save() }>
                        <Icon name="md-checkmark" />
                    </Button>
                </Right>
            </Header>
            {
                this.state.isReady?
                <Content>
                    <List>
                        <ListItem itemHeader first>
                            <Text>HOSTS</Text>
                        </ListItem>
                    </List>
                    {
                        this.state.current_state=='Login'?
                        <Form>
                            <Item inlineLabel>
                                <Label>Default</Label>
                                <Input
                                    onChangeText={(default_host) => this.setState({default_host})}
                                    value={this.state.default_host}
                                />
                            </Item>
                        </Form>
                        :
                        <Form>
                            <Item inlineLabel>
                                <Label>Patient</Label>
                                <Input
                                    onChangeText={(patient_host) => this.setState({patient_host})}
                                    value={this.state.patient_host}
                                />
                            </Item>
                            <Item inlineLabel>
                                <Label>Pos</Label>
                                <Input
                                    onChangeText={(pos_host) => this.setState({pos_host})}
                                    value={this.state.pos_host}
                                />
                            </Item>
                        </Form>
                    }

                </Content>
                :
                <Content />
            }
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
  textInput: {
      height: 50,
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
