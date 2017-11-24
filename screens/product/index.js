/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Image, ScrollView, Dimensions, AsyncStorage } from 'react-native';
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

import Drawer from 'react-native-drawer'
import { NavigationActions } from 'react-navigation'

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width

var {height, width} = Dimensions.get('window');
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
            billModal: false,
            billHeight: height*.5
        }
        this.renderModalContent = this.renderModalContent.bind(this)
        this.renderBillModal = this.renderBillModal.bind(this)
        this.showCategoty = this.showCategoty.bind(this)
        this.openControlPanel = this.openControlPanel.bind(this)
        this.backToPrograms = this.backToPrograms.bind(this)
        this.logout = this.logout.bind(this)
        this.goToRestaurantPage = this.goToRestaurantPage.bind(this)
        this.goToTablePage = this.goToTablePage.bind(this)
        // Event Listener for orientation changes
        Dimensions.addEventListener('change', () => {
            const {height, width} = Dimensions.get('window')
            if(height > width) {
                this.setState({ billHeight: height*.5 })
            } else {
                this.setState({ billHeight: height*.3 })
            }

        })
    }

    componentDidMount = () => {
		AsyncStorage.getItem('token').then((token) => {
			AsyncStorage.getItem('section_pos_id').then((section_pos_id) => {
                fetch(`http://itsmartone.com/pos/api/sell/product_list?token=${token}&section_pos_id=${section_pos_id}`).then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    // this.setState({
                    //     product_list: res.data
                    // })
                })
			})
		})

        AsyncStorage.getItem('pos_name').then((pos_name) => {
			this.setState({
                pos_name: pos_name
            })
		})
	}

    logout = () => {
        const resetAction = NavigationActions.reset({
        	index: 0,
        	actions: [
        		NavigationActions.navigate({ routeName: 'Login'})
        	]
        })
        this.props.navigation.dispatch(resetAction)
	}

    goToRestaurantPage = () => {
        const resetAction = NavigationActions.reset({
        	index: 0,
        	actions: [
        		NavigationActions.navigate({ routeName: 'Restaurant'})
        	]
        })
        this.props.navigation.dispatch(resetAction)
	}

    goToTablePage = () => {
        const resetAction = NavigationActions.reset({
        	index: 0,
        	actions: [
        		NavigationActions.navigate({ routeName: 'Table'})
        	]
        })
        this.props.navigation.dispatch(resetAction)
	}

    openControlPanel = () => {
		this._drawer.open()
	}

    backToPrograms = () => {
        const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Programs'})
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
                    title: "เลือกประเภทสินค้า (Category)"
                },
                buttonIndex => {
                    this.setState({ clicked: BUTTONS[buttonIndex] });
                }
            )
        }
    }

    renderBillModal = () => {
        return (
            <View style={styles.modalContent}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ fontSize: 20 }}>
                        รายการที่สั่ง
                    </Text>
                    <View style={{ flex: 1 }} />
                    <Button transparent
                    style={{ paddingBottom: 20 }}
                    onPress={() => this.setState({ billModal: false })}>
                        <Icon name='md-close' />
                    </Button>
                </View>
                <View style={{ width: '100%' }}>
                    <ScrollView style={{ height: this.state.billHeight }}>
                    <List>
                        <ListItem style={{ marginLeft: 0 }}>
                            <Body>
                                <Text>กุ้งมะนาว เปรี้ยวแซ่บ</Text>
                                <Text note>x 4 จาน</Text>
                            </Body>
                            <Right>
                                <Text style={{ fontSize: 18, color: '#5cb85c' }}>
                                    50 ฿
                                </Text>
                            </Right>
                        </ListItem>
                        <ListItem style={{ marginLeft: 0 }}>
                            <Body>
                                <Text>ทอดมันปลากราย </Text>
                                <Text note>x 9 ชิ้น</Text>
                            </Body>
                            <Right>
                                <Text style={{ fontSize: 18, color: '#5cb85c' }}>
                                    150 ฿
                                </Text>
                            </Right>
                        </ListItem>
                        <ListItem style={{ marginLeft: 0 }}>
                            <Body>
                                <Text>ทอดมันข้าวโพดกุ้งสับ</Text>
                                <Text note>x 1 จาน</Text>
                            </Body>
                            <Right>
                                <Text style={{ fontSize: 18, color: '#5cb85c' }}>
                                    120 ฿
                                </Text>
                            </Right>
                        </ListItem>
                        <ListItem style={{ marginLeft: 0 }}>
                            <Body>
                                <Text>เต้าหู้ทรงเครื่อง</Text>
                                <Text note>x 3 ชุด</Text>
                            </Body>
                            <Right>
                                <Text style={{ fontSize: 18, color: '#5cb85c' }}>
                                    875 ฿
                                </Text>
                            </Right>
                        </ListItem>
                        <ListItem style={{ marginLeft: 0 }}>
                            <Body>
                                <Text>น้ำเเปปซี่</Text>
                                <Text note>x 1 ขวด</Text>
                            </Body>
                            <Right>
                                <Text style={{ fontSize: 18, color: '#5cb85c' }}>
                                    25 ฿
                                </Text>
                            </Right>
                        </ListItem>
                    </List>
                    </ScrollView>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Button iconLeft success style={{ marginRight: 20 }}>
                        <Icon name='md-print' />
                        <Text>พิมพ์ใบสั่ง</Text>
                    </Button>
                    <Button success onPress={() => {
                        this.setState({
                            billModal: false
                        })
                        this.props.navigation.navigate("Bill")
                    }}>
                        <Icon name='md-card' />
                        <Text>ชำระเงิน</Text>
                    </Button>
                </View>
            </View>
        )
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

    componentDidMount() {

    }

    componentWillUnmount() {

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
            <Root>
            <Drawer
    	        ref={(ref) => this._drawer = ref}
    	        type="overlay"
    	        tapToClose={true}
    	        openDrawerOffset={0.2} // 20% gap on the right side of drawer
    	        panCloseMask={0.2}
    	        closedDrawerOffset={-3}
    	        styles={drawerStyles}
    	        tweenHandler={(ratio) => ({
    	            main: { opacity:(2-ratio)/2, backgroundColor: 'black' }
    	        })}
    	        content=
    	        {
    	            <Container>
    					<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
    						<View style={styles.drawerCover}>
    							<Image square style={styles.drawerImage} source={  require('../../Images/logo.png') } />
    						</View>
    						<List>
    							<ListItem itemHeader first style={{ paddingBottom: 3 }}>
    								<Text>ACTIVITIES</Text>
    							</ListItem>
    							<ListItem button noBorder onPress={() => this.backToPrograms() }>
    								<Left>
    									<Icon active name='home' style={{ color: "#777", fontSize: 26, width: 30 }} />
    									<Text style={styles.text}>
    										เลือกโปรเเกรม
    									</Text>
    								</Left>
    							</ListItem>
    							<ListItem itemHeader first style={{ paddingBottom: 3 }}>
    								<Text>ACCOUNT</Text>
    							</ListItem>
    							<ListItem button noBorder onPress={() => this.logout()}>
    								<Left>
    									<Icon active name='log-out' style={{ color: "#777", fontSize: 26, width: 30 }} />
    									<Text style={styles.text}>
    										Log Out
    									</Text>
    								</Left>
    							</ListItem>
    						</ List>
    					</Content>
    				</Container>
    	        }
    	    >
            <Container style={{ backgroundColor: '#f4f4f4' }}>
                <Header style={{ backgroundColor: '#3b5998' }}>
                    <Left>
                        <Button transparent onPress={() => this.openControlPanel()}>
                            <Icon name="md-menu" />
                        </Button>
                    </Left>
                    <Body style={{ flexDirection: 'row'}}>
                        <Text style={{
                                color: 'white',
                                marginRight: 6,
                                paddingTop: 8,
                                paddingBottom: 8
                            }}
                            onPress={() => this.goToRestaurantPage() }

                        >
                            ศูนย์อาหาร 1  >
                        </Text>
                        <Text style={{
                                color: 'white',
                                marginRight: 6,
                                paddingTop: 8,
                                paddingBottom: 8
                            }}
                            onPress={() => this.goToTablePage() }

                        >
                            โต๊ะ 1
                        </Text>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.setState({ billModal: true })}>
                            <Icon name="md-clipboard" />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Header style={{ backgroundColor: '#3b5998' }}>
                        <Right>
                            <Button iconRight transparent
                                onPress={() => this.showCategoty() }>
                                <Text style={{ color: 'white' }}>
                                    All
                                </Text>
                                <Icon name="md-arrow-dropdown" />
                            </Button>
                            <ActionSheet ref={(c) => { this.actionSheet = c }} />
                        </Right>
                    </Header>
                    <Modal isVisible={this.state.billModal}>{this.renderBillModal()}</Modal>
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
            </Drawer>
            </Root>
        );
  }
}

const drawerStyles = {
     drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
     main: {paddingLeft: 3},
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  drawerCover: {
      alignSelf: "stretch",
      // resizeMode: 'cover',
      height: deviceHeight / 3.5,
      width: null,
      position: "relative",
      marginBottom: 10,
      backgroundColor: '#004B85'
  },
  drawerImage: {
      position: "absolute",
      // left: (Platform.OS === 'android') ? 30 : 40,
      left: Platform.OS === "android" ? deviceWidth / 15 : deviceWidth / 12,
      // top: (Platform.OS === 'android') ? 45 : 55,
      top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
      width: 250,
      height: 75,
      resizeMode: "cover"
  },
  text: {
      fontWeight: Platform.OS === "ios" ? "500" : "400",
      fontSize: 16,
      marginLeft: 20
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
