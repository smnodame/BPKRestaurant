import React from 'react';
import { StyleSheet, Dimensions, Platform, Image, TextInput, TouchableOpacity, Keyboard, AsyncStorage } from 'react-native';
import Drawer from 'react-native-drawer'
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
	View,
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
} from "native-base";
import axios from "axios"
import { NavigationActions } from 'react-navigation'

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width

const datas = [
	{
		name: "เลือกโปรเเกรม",
		route: "ChooseProgram",
		icon: "home",
		bg: "#C5F442",
	},
	{
		name: "Logout",
		route: "Logout",
		icon: "log-out",
		bg: "#C5F442",
	}
];

export default class Programs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
			isReady: false,
			page: 'Login',
			token: "",
			activity: [{
                app_id: 'ร้านอาหาร'
            }]
        }
		Keyboard.dismiss()
		this.openControlPanel = this.openControlPanel.bind(this)
		this.logout = this.logout.bind(this)
		this.restaurant = this.restaurant.bind(this)
		this.renderActivity = this.renderActivity.bind(this)
    }

    restaurant = () => {
        const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Restaurant'})
                ]
            })
        this.props.navigation.dispatch(resetAction)
    }

	async componentWillMount() {
		// AsyncStorage.getItem('app_list', (err, result) => {
		// 	this.setState({ activity: JSON.parse(result) })
		// })
        this.setState({ isReady: true })
    }

	renderActivity = () => {
        const template = this.state.activity.map((activity, index) => (
			<Button key={index} bordered block style={{ backgroundColor: 'white', borderColor: '#d3d3d3', borderBottomWidth: 0.5 }}
                onPress={() => this.restaurant() }
			>
				<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15 }}>
					<Icon style={{color: '#4c4c4c'}} name='ios-person-outline' />
					<Text style={{color: '#4c4c4c' }}>{ activity.app_id.toUpperCase() }</Text>
					<Icon style={{color: '#4c4c4c'}} name='ios-arrow-forward-outline' />
				</View>
			</Button>
        ))
        return template
    }

	openControlPanel = () => {
		this._drawer.open()
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
							<ListItem button noBorder onPress={() => this._drawer.close()}>
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
		{
                this.state.isReady?
					<Container style={{ backgroundColor: '#f4f4f4' }}>
						<Header style={{ backgroundColor: '#3b5998' }}>
							<Left>
								<Button transparent onPress={() => this.openControlPanel()}>
									<Icon name="menu" />
								</Button>
							</Left>
							<Body>
								<Title>เลือกโปรเเกรม</Title>
							</Body>
						</Header>
						<View style={{ padding: 20 }}>
							<Text style={{ marginBottom: 10, color: '#bdbdbd'}}>โปรเเกรมทั้งหมด</Text>
							{
								this.renderActivity()
							}
						</View>
					</Container>
					:
					<Container />
			}
			</Drawer>
    );
  }
}

const drawerStyles = {
     drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
     main: {paddingLeft: 3},
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3b5998',
		alignItems: 'center',
		justifyContent: 'center',
	},
	sidebar: {
		flex: 1,
		backgroundColor: "#fff"
	},
	textInput: {
		height: 50,
		borderRadius: 3,
		borderWidth: 0.5,
		borderColor: '#d3d3d3',
		paddingHorizontal: 19,
		paddingLeft: 10, paddingRight: 10
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
	listItemContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center"
	},
	iconContainer: {
		width: 37,
		height: 37,
		borderRadius: 18,
		marginRight: 12,
		paddingTop: Platform.OS === "android" ? 7 : 5
	},
	sidebarIcon: {
		fontSize: 21,
		color: "#fff",
		lineHeight: Platform.OS === "android" ? 21 : 25,
		backgroundColor: "transparent",
		alignSelf: "center"
	},
	text: {
		fontWeight: Platform.OS === "ios" ? "500" : "400",
		fontSize: 16,
		marginLeft: 20
	},
	badgeText: {
		fontSize: Platform.OS === "ios" ? 13 : 11,
		fontWeight: "400",
		textAlign: "center",
		marginTop: Platform.OS === "android" ? -3 : undefined
	},
	button: {
		height: 60,
		borderRadius: 3,
		backgroundColor: '#11B8FF',
		justifyContent: "center",
		alignItems: "center"
	}
});
