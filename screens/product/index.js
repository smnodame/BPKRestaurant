/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, BackHandler, View, TouchableOpacity, Platform, Image, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import GridView from 'react-native-super-grid';
import { Container, Spinner, Header, Content, Card, CardItem, Root, ActionSheet, Text, SwipeRow, Body, Left, Button, Label, Icon, Title, Right, Item, Switch, Input, List, ListItem, Separator  } from 'native-base';
import Modal from 'react-native-modal';

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
            draft_order: [],
            dialogVisible: false,
            billModal: false,
            orderModal: false,
            billHeight: height*.5,
            category: [],
            product_list: [],
            products: [],
            table_no: '',
            pos_name: '',
            choosed_category: {
                id: '0',
                name: 'ALL',
                index: 0
            },
            choosed_menu: {
                price: '0',
                product_name: '',
                note: '',
                amount: '1',
                isFreeGift: false,
                unit: '',
                sumPrice: '0',
                editable_sale_price: false
            },
            pending_sale_products: [],
            limit: 50,
            isShowLoadMore: false,
            isLoading: true,
            isLoadMoreProcess: false,
            isReady: false,
            pending_order_loading: true
        }
        this.renderModalContent = this.renderModalContent.bind(this)
        this.renderBillModal = this.renderBillModal.bind(this)
        this.renderOrderModal = this.renderOrderModal.bind(this)
        this.showCategoty = this.showCategoty.bind(this)
        this.openControlPanel = this.openControlPanel.bind(this)
        this.backToPrograms = this.backToPrograms.bind(this)
        this.logout = this.logout.bind(this)
        this.goToRestaurantPage = this.goToRestaurantPage.bind(this)
        this.goToTablePage = this.goToTablePage.bind(this)
        this.openOrderDialog = this.openOrderDialog.bind(this)
        this.addOrderToDraft = this.addOrderToDraft.bind(this)
        this.loadMore = this.loadMore.bind(this)
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

    async componentWillMount() {
        this.setState({ isReady: true })
    }

    openOrderDialog = (product_id) => {
        function find_product(product) {
          return product.product_id == product_id;
        }

        const product = this.state.products.find(find_product); // 130
        this.setState({
            choosed_menu: {
                product_id: product_id,
                price: parseInt(product.sale_price, 10).toString(),
                product_name: product.detail,
                note: '',
                amount: '1',
                isFreeGift: false,
                sumPrice: parseInt(product.sale_price, 10).toString(),
                unit: product.unit_detail,
                editable_sale_price: product.editable_sale_price=="F"? false : true
            },
            dialogVisible: true
        })
    }

    componentDidMount = () => {
        AsyncStorage.getItem('pos_host').then((pos_host) => {
            this.setState({ pos_host : pos_host })

    		AsyncStorage.getItem('token').then((token) => {
    			AsyncStorage.getItem('section_pos_id').then((section_pos_id) => {
                    fetch(`${this.state.pos_host}/api/sell/product_list?token=${token}&section_pos_id=${section_pos_id}`).then((res) => res.json())
                    .then((res) => {
                        const category = [
                            { text: "All", icon: "md-arrow-dropright", iconColor: "#ea943b", id : "0"},
                            ...res.data.product_cats.map((category) => {
                                return {
                                    text: category.detail,
                                    icon: "md-arrow-dropright",
                                    iconColor: "#ea943b",
                                    id: category.product_cat_id
                                }
                            })
                        ]
                        this.setState({
                            product_list: res.data.products,
                            category: category,
                            token: token,
                            section_pos_id: section_pos_id
                        })
                        this.loadMore()
                        this.setState({
                            isLoading: false
                        })
                    })
    			})
    		})
        })

        AsyncStorage.getItem('pos_name').then((pos_name) => {
			this.setState({
                pos_name
            })
		})

        AsyncStorage.getItem('table_no').then((table_no) => {
            this.setState({
                table_no: 'โต๊ะ ' + table_no
            })
        })

        AsyncStorage.getItem('pos_table_id').then((pos_table_id) => {
            this.setState({
                pos_table_id: pos_table_id
            })
        })
	}

    componentWillUnmount() {
        // BackHandler.removeEventListener('hardwareBackPress');
    }

    loadMore = () => {
        this.setState({
            isLoadMoreProcess: true
        })
        const filter_by_category = this.state.product_list.filter((product, index) => {
            if(this.state.choosed_category.index > 0) {
                return (this.state.category[this.state.choosed_category.index].id == product.product_cat_id)
            } else {
                return true
            }
        })

        const filter_by_limit = filter_by_category.filter((product, index) => {
            return index < (this.state.limit + this.state.products.length)
        })

        this.setState({
            products: filter_by_limit,
            isShowLoadMore: filter_by_limit.length < filter_by_category.length,
            isLoadMoreProcess: false
        })

    }

    addOrderToDraft = () => {
        this.setState({
            draft_order: [
                ...this.state.draft_order,
                {
                    product_id: this.state.choosed_menu.product_id,
                    qty: this.state.choosed_menu.amount,
                    price: this.state.choosed_menu.sumPrice,
                    note: this.state.choosed_menu.note,
                    name: this.state.choosed_menu.product_name,
                    unit: this.state.choosed_menu.unit,
                    is_free: this.state.choosed_menu.isFreeGift
                }
            ],
            dialogVisible: false
        })
    }

    logout = () => {
        AsyncStorage.removeItem('token').then(() => {
            const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Login'})
                    ]
                })
                this.props.navigation.dispatch(resetAction)
        })
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
                    NavigationActions.navigate({ routeName: 'ChooseProgram'})
                ]
            })
        this.props.navigation.dispatch(resetAction)
    }

    showCategoty = () => {
        if ( this.actionSheet !== null ) {
            this.actionSheet._root.showActionSheet(
                {
                    options: this.state.category,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    title: "เลือกประเภทสินค้า (Category)"
                },
                buttonIndex => {
                    if(buttonIndex >= 0 && buttonIndex < this.state.category.length) {
                        const filter_by_category = this.state.product_list.filter((product, index) => {
                            if(buttonIndex > 0) {
                                return (this.state.category[buttonIndex].id == product.product_cat_id)
                            } else {
                                return true
                            }
                        })

                        const filter_by_limit = filter_by_category.filter((product, index) => {
                            return index < this.state.limit
                        })
                        this.setState({ choosed_category: {
                                name: this.state.category[buttonIndex].text,
                                id: this.state.category[buttonIndex].id,
                                index: buttonIndex
                            },
                            products: filter_by_limit,
                            isShowLoadMore: filter_by_limit.length < filter_by_category.length
                        })
                    }
                }
            )
        }
    }

    renderOrderModal = () => {
        return (
            <View style={styles.modalContent}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={{ fontSize: 20 }}>
                            รายการที่สั่งเเล้ว
                        </Text>
                        <View style={{ flex: 1 }} />
                    <Button transparent
                    style={{ paddingBottom: 20 }}
                    onPress={() => this.setState({ orderModal: false })}>
                        <Icon name='md-close' />
                    </Button>
                </View>
                <View style={{ width: '100%' }}>
                    <ScrollView style={{ height: this.state.billHeight }}>
                    {
                        this.state.pending_order_loading?
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Spinner color='red' />
                            <Text style={{ textAlign: 'center', color: '#d4d8da', marginTop: 5, fontSize: 20 }}>Loading...</Text>
                        </View>
                        :
                        <List>
                            {
                                this.state.pending_sale_products.map((pending_sale_product, index) => {
                                    return (
                                        <SwipeRow
                                            key={pending_sale_product.pending_sale_product_id}
                                            rightOpenValue={-75}
                                            body={
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ width: '70%', marginLeft: 10 }}>
                                                        <Text style={{ textAlign: 'left', width: '100%' }} numberOfLines={1}>{ pending_sale_product.product_detail }</Text>
                                                        <Text style={{ textAlign: 'left', width: '100%' }} note numberOfLines={1}>{ 'x ' + parseInt(pending_sale_product.qty, 10).toString() + ' ' + pending_sale_product.unit_detail }</Text>
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={{ fontSize: 18, color: '#5cb85c', textAlign: 'right', width: '100%' }}>
                                                            { pending_sale_product.total_price + ' ฿'}
                                                        </Text>
                                                    </View>
                                                </View>
                                            }
                                            right={
                                                <Button danger onPress={() => {
                                                    fetch(`${this.state.pos_host}/api/sell/cancel_order`, {
                                        				method: 'POST',
                                        				body: JSON.stringify({
                                        					token: this.state.token,
                                                            pending_sale_product_id: pending_sale_product.pending_sale_product_id,
                                        				})
                                        			})
                                        			.then((res) => res.json())
                                        			.then((response) => {
                                                        this.setState({
                                                            pending_sale_products: this.state.pending_sale_products.filter((pending_sale_product, index_2) => {
                                                                return index_2 != index
                                                            })
                                                        })
                                                    })
                                                }}>
                                                    <Icon active name="trash" />
                                                </Button>
                                            }
                                        />
                                    )
                                })
                            }
                        </List>
                    }
                    {
                        !this.state.pending_order_loading&&this.state.pending_sale_products.length == 0&&<View>
                            <Text style={{ textAlign: 'center', color: '#d4d8da', marginTop: 20, fontSize: 20 }}>ไม่พบข้อมูล</Text>
                        </View>
                    }
                    </ScrollView>
                </View>
            </View>
        )
    }

    renderBillModal = () => {
        return (
            <View style={styles.modalContent}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    {
                        this.state.draft_order.length>0&&<Text style={{ fontSize: 20 }}>
                            รายการรอคอมเฟิร์ม
                        </Text>
                    }
                    {
                        this.state.draft_order.length==0&&<Text style={{ fontSize: 20 }}>
                            ชำระเงิน
                        </Text>
                    }
                    <View style={{ flex: 1 }} />
                    <Button transparent
                    style={{ paddingBottom: 20 }}
                    onPress={() => this.setState({ billModal: false })}>
                        <Icon name='md-close' />
                    </Button>
                </View>
                {
                    this.state.draft_order.length>0&&<View style={{ width: '100%' }}>
                        <ScrollView style={{ height: this.state.billHeight }}>
                        <List>
                            {
                                this.state.draft_order.map((draft_order, index) => {
                                    return (
                                        <SwipeRow
                                            key={ draft_order.product_id }
                                            rightOpenValue={-75}
                                            body={
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ width: '70%', marginLeft: 10 }}>
                                                        <Text style={{ textAlign: 'left', width: '100%' }} numberOfLines={1}>{ draft_order.name }</Text>
                                                        <Text style={{ textAlign: 'left', width: '100%' }} note numberOfLines={1}>{ 'x ' + parseInt(draft_order.qty, 10).toString() + ' ' + draft_order.unit }</Text>
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={{ fontSize: 18, color: '#5cb85c', textAlign: 'right', width: '100%' }}>
                                                            { (parseInt(draft_order.price, 0) * parseInt(draft_order.qty, 10)).toString() + ' ฿'}
                                                        </Text>
                                                    </View>
                                                </View>
                                            }
                                            right={
                                                <Button danger onPress={() => {
                                                    this.setState({
                                                        draft_order: this.state.draft_order.filter((draft_order, index_2) => {
                                                            return index_2 != index
                                                        })
                                                    })
                                                }}>
                                                    <Icon active name="trash" />
                                                </Button>
                                            }
                                        />
                                    )
                                })
                            }
                        </List>
                        </ScrollView>
                    </View>
                }
                {
                    this.state.draft_order.length>0&&<View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Button success onPress={() => {
                            fetch(`${this.state.pos_host}/api/sell/add_order`, {
                				method: 'POST',
                				body: JSON.stringify({
                					token: this.state.token,
                                    user_id: 'system',
                					section_pos_id: this.state.section_pos_id,
                					pos_table_id: this.state.pos_table_id,
                                    total_price: this.state.draft_order.reduce((o, n) => {
                                        return o + n.price
                                    }, 0),
                                    product_list: this.state.draft_order
                				})
                			})
                			.then((res) => res.json())
                			.then((response) => {
                                this.setState({
                                    draft_order: [],
                                    billModal: false
                                })
                            })
                        }}>
                            <Icon name='md-card' />
                            <Text>สร้างใบสั่ง</Text>
                        </Button>
                    </View>
                }
                {
                    this.state.draft_order.length==0&&<View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Button success onPress={() => {
                            fetch(`${this.state.pos_host}/api/sell/checkout`, {
                				method: 'POST',
                				body: JSON.stringify({
                					token: this.state.token,
                					section_pos_id: this.state.section_pos_id,
                					pos_table_id: this.state.pos_table_id
                				})
                			})
                			.then((res) => res.json())
                			.then((response) => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Table'})
                                    ]
                                })
                                this.props.navigation.dispatch(resetAction)
                            })
                        }}>
                            <Icon name='md-card' />
                            <Text>ชำระเงิน</Text>
                        </Button>
                    </View>
                }
            </View>
        )
    }

    renderModalContent = () => (
        <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ width: '60%' }}>
                {
                    this.state.choosed_menu.product_name
                }
            </Text>
            <View style={{ flex: 1 }}/>
            <Item regular style={[styles.textInput, { backgroundColor: 'white', width: 70 } ]}>
                <Input
                    placeholderTextColor='#d4d8da'
                    editable = {this.state.choosed_menu.editable_sale_price}
                    placeholder='ราคา'
                    value={this.state.choosed_menu.sumPrice}
                    style={{ textAlign: 'center', fontSize: 18, color: '#5cb85c' }}
                    onChangeText={
                        (text) => this.setState({
                            choosed_menu: {
                                ...this.state.choosed_menu,
                                sumPrice: text
                            }
                        })
                    }
                />
            </Item>
                <Text style={{ paddingLeft: 12, fontSize: 16, color: '#5cb85c' }}>
                    บาท
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <Switch
                    value={this.state.choosed_menu.isFreeGift}
                    onValueChange={
                        (status) => this.setState({
                            choosed_menu: {
                                ...this.state.choosed_menu,
                                isFreeGift: status,
                                sumPrice: status? '0' : this.state.choosed_menu.price
                            }
                        })
                    }
                />
                <Text>
                    เพิ่มเป็นของเเถม
                </Text>
                <View style={{ flex: 1 }}/>
            </View>
            <Item regular style={[styles.textInput, { backgroundColor: 'white', marginBottom: 10 } ]}>
                <Input
                    placeholderTextColor='#d4d8da'
                    placeholder='Note'
                    value={this.state.choosed_menu.note}
                    onChangeText={
                        (text) => this.setState({
                            choosed_menu: {
                                ...this.state.choosed_menu,
                                note: text
                            }
                        })
                    }
                />
            </Item>
            <View
                style={{
                    flexDirection: 'row'
                }}>

                <Button transparent
                    onPress={() => {
                            if(parseInt(this.state.choosed_menu.amount, 10)!=1) {
                                this.setState({
                                    choosed_menu: {
                                        ...this.state.choosed_menu,
                                        amount: (parseInt(this.state.choosed_menu.amount, 10) - 1).toString(),
                                        sumPrice: this.state.choosed_menu.price
                                    }
                                })
                            }
                        }
                    }
                >
                    <Icon name="ios-remove-circle-outline" style={styles.icon}/>
                </Button>
                <View height={50} width={50}
                    style={{
                        backgroundColor: '#5cb85c', borderRadius: 25,
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                    }}
                >
                    <Text style={{ color: 'white'  }}>
                        {
                            this.state.choosed_menu.amount
                        }
                    </Text>
                </View>
                <Button transparent
                    onPress={() =>
                        this.setState({
                            choosed_menu: {
                                ...this.state.choosed_menu,
                                amount: (parseInt(this.state.choosed_menu.amount, 10) + 1).toString(),
                                sumPrice: this.state.choosed_menu.price
                            }
                        })
                    }
                >
                    <Icon name="ios-add-circle-outline" style={styles.icon}/>
                </Button>
            </View>
            <Text style={{ fontSize: 15, color: '#5cb85c', width: '100%', textAlign: 'center', marginTop: 5, marginBottom: 5 }}>
                {
                    this.state.choosed_menu.unit
                }
            </Text>
            <Button block success onPress={() => this.addOrderToDraft() }>
                <Text>ยืนยัน</Text>
            </Button>
        </View>
    )

    componentDidMount() {

    }

    render() {

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
    								<Text>SETTING</Text>
    							</ListItem>
    							<ListItem button noBorder onPress={() => 	this.props.navigation.navigate('Config') }>
    								<Left>
    									<Icon active name='settings' style={{ color: "#777", fontSize: 26, width: 30 }} />
    									<Text style={styles.text}>
    										Configuration
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
            {
                this.state.isReady?
                <Container style={{ backgroundColor: '#f4f4f4' }}>
                    {
                        Platform.OS != 'ios'&&<View style={styles.statusBar} />
                    }
                    <Header style={{ backgroundColor: '#3b5998' }}>
                        <Left>
                            <Button transparent onPress={() => this.openControlPanel()}>
                                <Icon name="md-menu" />
                            </Button>
                        </Left>
                        <Body style={{ flex: 3, flexDirection: 'row'}}>
                            <Text style={{
                                    color: 'white',
                                    marginRight: 6,
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    flex: 1
                                }}
                                numberOfLines={1}
                                onPress={() => this.goToRestaurantPage() }

                            >
                                { this.state.pos_name }
                            </Text>
                            <Text style={{
                                    color: 'white',
                                    marginRight: 6,
                                    paddingTop: 8,
                                    paddingBottom: 8
                                }}>
                                >
                            </Text>
                            <Text style={{
                                    color: 'white',
                                    marginRight: 6,
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    flex: 1
                                }}
                                numberOfLines={1}
                                onPress={() => this.goToTablePage() }

                            >
                                { this.state.table_no }
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
                            <Body>
                                <Button transparent light
                                    onPress={() => {
                                            this.setState({
                                                pending_sale_products: [],
                                                orderModal: true,
                                                pending_order_loading: true
                                            })
                                        }
                                    }
                                >
                                    <Text>รายการที่สั่งไปเเล้ว</Text>
                                </Button>
                            </Body>
                            <Right>
                                <Button iconRight transparent
                                    onPress={() => this.showCategoty() }>
                                    <Text style={{ color: 'white' }}>
                                        {
                                            this.state.choosed_category.name
                                        }
                                    </Text>
                                    <Icon name="md-arrow-dropdown" />
                                </Button>
                                <ActionSheet ref={(c) => { this.actionSheet = c }} />
                            </Right>
                        </Header>
                        <Modal isVisible={this.state.billModal}>{this.renderBillModal()}</Modal>
                        <Modal onModalShow={() => {
                            fetch(`${this.state.pos_host}/api/sell/pos_table_product_list?token=${this.state.token}&section_pos_id=${this.state.section_pos_id}&pos_table_id=${this.state.pos_table_id}`)
                            .then((res) => res.json())
                            .then((response) => {
                                this.setState({
                                    pending_order_loading: false,
                                    pending_sale_products: response.data.products
                                })
                            }, (err) => {

                            }).catch(() => {
                                this.setState({
                                    pending_order_loading: false,
                                    pending_sale_products: []
                                })
                            })
                        }}
                        isVisible={this.state.orderModal}>{this.renderOrderModal()}</Modal>
                        <Modal isVisible={this.state.dialogVisible}
                        onRequestClose={() => this.setState({dialogVisible: false})}
                        onBackdropPress={() => this.setState({dialogVisible: false})}
                        style={{
                            justifyContent: 'flex-end',
                            margin: 0,
                        }}>
                            {this.renderModalContent() }
                        </Modal>
                        <GridView
                            itemWidth={130}
                            items={this.state.products}
                            style={styles.gridView}
                            renderItem={item => (
                                <TouchableOpacity key={item.product_id} onPress={() => {
                                    this.openOrderDialog(item.product_id)
                                }}>
                                    <View style={{ backgroundColor: 'white', borderRadius: 5, height: 220, borderColor: '#d3d3d3', borderWidth: 1, position: 'relative'}}>
                                        <Text style={{ width: '100%', position: 'absolute', top: 0, borderTopLeftRadius: 5, borderTopRightRadius: 5, padding: 15, zIndex: 999, backgroundColor: 'rgba(0,0,0,0.1)' }}>{ item.detail }</Text>
                                        {
                                            !!item.image_url&&<Image style={{ width: '100%', height: 120, position: 'absolute', top: 0, marginTop: 57  }} source={{ uri: item.image_url }} />
                                        }
                                        {
                                            !item.image_url&&<Image style={{ width: '100%', height: 120, position: 'absolute', top: 0, marginTop: 40 }} source={{ uri: 'http://www.biofreeze.com/media/catalog/product/cache/15/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/ImageNotFound_3.png' }} />
                                        }
                                        <View style={{ padding: 15, position: 'absolute', bottom: 0 }}>
                                            <Text style={{ color: '#4c4c4c', fontSize: 13 }}>ราคา { parseInt(item.sale_price) } บาท</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        {
                            this.state.isShowLoadMore&&!this.state.isLoadMoreProcess&&<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Button
                                    transparent
                                    onPress={() => this.loadMore() }
                                >
                                    <Text>Load More</Text>
                                </Button>
                            </View>
                        }

                        {
                            this.state.isLoadMoreProcess&&<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Spinner color='red' />
                            </View>
                        }

                        {
                            this.state.isLoading&&<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Spinner color='red' />
                                <Text style={{ textAlign: 'center', color: '#d4d8da', marginTop: 5, fontSize: 20 }}>Loading...</Text>
                            </View>
                        }
                    </Content>
                </Container>
                :
                <Container/>
            }
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
