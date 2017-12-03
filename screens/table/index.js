/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { StyleSheet, View, Platform, Image, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
 import GridView from 'react-native-super-grid';
 import {
 	Content,
 	Text,
 	List,
 	ListItem,
 	Icon,
 	Container,
 	Left,
 	Right,
 	Badge,
 	Button,
 	StyleProvider,
 	getTheme,
 	variables,
     Header,
 	Item,
 	Input,
 	Body,
 	Title,
 	Tab,
 	Tabs,
 	TabHeading
 } from "native-base"
 import Drawer from 'react-native-drawer'
 import { NavigationActions } from 'react-navigation'

 const deviceHeight = Dimensions.get("window").height
 const deviceWidth = Dimensions.get("window").width

export default class Table extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            pos_name: '',
            tables: []
        }
		this.openControlPanel = this.openControlPanel.bind(this)
        this.backToPrograms = this.backToPrograms.bind(this)
        this.logout = this.logout.bind(this)
        this.gotoMenuPage = this.gotoMenuPage.bind(this)
        this.goToRestaurantPage = this.goToRestaurantPage.bind(this)
    }

    componentDidMount = () => {
		AsyncStorage.getItem('token').then((token) => {
			AsyncStorage.getItem('section_pos_id').then((section_pos_id) => {
                fetch(`http://itsmartone.com/pos/api/sell/table_list?token=${token}&section_pos_id=${section_pos_id}`).then((res) => res.json())
                .then((res) => {
                    console.log(res.data)
                    this.setState({
                        tables: res.data
                    })
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

    gotoMenuPage = (table_no, pos_table_id) => {
        AsyncStorage.setItem('pos_table_id', pos_table_id).then(() => {
            AsyncStorage.setItem('table_no', table_no).then(() => {
                const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Product'})
                        ]
                    })
                this.props.navigation.dispatch(resetAction)
            })
        })
    }

    render() {

      return (
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
                  <Body style={{flex: 3, flexDirection: 'row'}}>
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
                  </Body>
                  <Right/>
                </Header>
                <Content>
                    <GridView
                        itemWidth={130}
                        items={this.state.tables}
                        style={styles.gridView}
                        renderItem={item => (
                            <TouchableOpacity  onPress={() => this.gotoMenuPage(item.table_no, item.pos_table_id)}>
                                <View style={{ backgroundColor: 'white', borderRadius: 5, height: 220, borderColor: '#d3d3d3', borderWidth: 1}}>
                                    <View style={{ padding: 15, backgroundColor: '#dfe3ee', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                        <Text numberOfLines={1} >โต๊ะ { item.table_no }</Text>
                                    </View>
                                    {
                                        item.isused=='T'&&<View style={{ padding: 15 }}>
                                            {
                                                item.pending_sale_products.map((pending_product, index) => {
                                                        if(index==6) {
                                                            return (
                                                                <Text numberOfLines={1} style={{ color: '#4c4c4c', fontSize: 13, marginBottom: 5 }}>
                                                                    ...
                                                                </Text>
                                                            )
                                                        } else {
                                                            return (
                                                                <Text numberOfLines={1} style={{ color: '#4c4c4c', fontSize: 13, marginBottom: 5 }}>
                                                                    {
                                                                        pending_product.product_detail + ' x ' + parseInt(pending_product.qty, 10).toString()
                                                                    }
                                                                </Text>
                                                            )
                                                        }
                                                })
                                            }
                                        </View>
                                    }
                                    {
                                        item.isused!='T'&&<View style={{ padding: 15,flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text numberOfLines={1} style={{ fontSize: 20, color: '#d3d3d3' }}>ว่าง</Text>
                                        </View>
                                    }
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </Content>
            </Container>
        </Drawer>
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
  statusContainer: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  statusText: { color: '#FFF', fontSize: 12, padding: 2, backgroundColor: '#ebb72d', borderRadius: 5 }
});
