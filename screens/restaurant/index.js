/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Platform, Image, Dimensions, AsyncStorage } from 'react-native';
import GridView from 'react-native-super-grid';
import {
	Content,
	Spinner,
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


export default class Restaurant extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
			restaurants: [],
			isLoading: true
        }
		this.openControlPanel = this.openControlPanel.bind(this)
        this.backToPrograms = this.backToPrograms.bind(this)
        this.logout = this.logout.bind(this)
		this.rendetRestaurant = this.rendetRestaurant.bind(this)
		this.goToTablePage = this.goToTablePage.bind(this)
    }

	componentDidMount = () => {
		AsyncStorage.getItem('token').then((token) => {
			AsyncStorage.getItem('password').then((password) => {
				fetch(`http://itsmartone.com/pos/api/user/pos_list?token=${token}&emp_id=system&password=${password}`)
				.then((res) => res.json())
				.then((res) => {
					this.setState({
						restaurants: res.data,
						isLoading: false
					})
				})
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

	goToTablePage = (section_pos_id, pos_name) => {
		AsyncStorage.setItem('section_pos_id',  section_pos_id)
		.then(() => {
			AsyncStorage.setItem('pos_name',  pos_name)
			.then(() => {
				this.props.navigation.navigate('Table')
			})
		})
	}

	rendetRestaurant = () => {
		return this.state.restaurants.map((restaurant) => {
				return (
					<Button bordered block
						key={restaurant.section_pos_id}
                        style={{ backgroundColor: 'white', borderColor: '#d3d3d3', borderBottomWidth: 0.5, marginBottom: 15 }}
                        onPress={() => this.goToTablePage(restaurant.section_pos_id, restaurant.pos_name) }
                    >
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5 }}>
                            <Text style={{color: '#4c4c4c' }}>
								{
									 restaurant.pos_name
								}
							</Text>
                            <Icon style={{color: '#4c4c4c'}} name='ios-arrow-forward-outline' />
                        </View>
                    </Button>
				)
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
                    <Body>
                        <Title>เลือกจุดขาย</Title>
                    </Body>
                </Header>
                <Content style={{ padding: 20 }}>
					{
						this.rendetRestaurant()
					}
					{
                        this.state.isLoading&&<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Spinner color='red' />
                            <Text style={{ textAlign: 'center', color: '#d4d8da', marginTop: 5, fontSize: 20 }}>Loading...</Text>
                        </View>
                    }
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
  }
});
