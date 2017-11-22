import React from 'react';
import { StyleSheet, Dimensions, Platform, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';
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
	TabHeading,
	Keyboard
} from "native-base";
import axios from "axios"
import { NavigationActions } from 'react-navigation'

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width

const datas = [
	{
		name: "Login",
		route: "Login",
		icon: "lock",
		bg: "#C5F442",
	}
];



export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
			isReady: false,
			page: 'Login',
			error: ""
        }
		this.openControlPanel = this.openControlPanel.bind(this)
		this.onLogin = this.onLogin.bind(this)
    }

	openControlPanel = () => {
		this._drawer.open()
	}

	async onLogin() {
		if(this.state.username && this.state.password) {
			axios.get('http://itsmartone.com/bpkservice/api/user/login?username=' + this.state.username + '&password='+ this.state.password)
			.then((response) => {
				if(response.data.success == "1") {
					this.setState({ error: "" })
					AsyncStorage.setItem('token',  response.data.token)
					.then(() => {
						AsyncStorage.setItem('app_list', JSON.stringify(response.data.app_list)).then(() => {
							const resetAction = NavigationActions.reset({
									index: 0,
									actions: [
										NavigationActions.navigate({ routeName: 'Programs'})
									]
								})
							this.props.navigation.dispatch(resetAction)
						})
					})
				} else {
					this.setState({ error: response.data.error, password: ""})
				}
			})
		} else {
			this.setState({ error: 'กรุณาระบุ Username เเละ Password' })
		}
	}

    async componentWillMount() {
        this.setState({ isReady: true })
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
	            main: { opacity:(2-ratio)/2}
	        })}
	        content=
	        {
	            <Container>
					<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
						<View  style={styles.drawerCover}>
							<Image square style={styles.drawerImage} source={  require('../../Images/logo.png') } />
						</View>
						<List>
							<ListItem itemHeader first style={{ paddingBottom: 3 }}>
								<Text>ACCOUNT</Text>
							</ListItem>
							<ListItem button noBorder onPress={() => this._drawer.close()}>
								<Left>
									<Icon active name='lock' style={{ color: "#777", fontSize: 26, width: 30 }} />
									<Text style={styles.text}>
										Log In
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
					<Container style={{ backgroundColor: '#3b5998' }}>
                        <Header style={{ backgroundColor: '#3b5998' }}>
                        	<Left>
                        		<Button transparent onPress={() => this.openControlPanel()}>
                        			<Icon name="menu" />
                        		</Button>
                        	</Left>
                        	<Body>
                        		<Title>Authentication</Title>
                        	</Body>
                        </Header>
                        <View style={styles.container} behavior="padding">
                        		<Item regular style={[styles.textInput, { marginLeft: 15, marginRight: 15, marginBottom: 10, backgroundColor: 'white' } ]}>
                        			<Icon active name='ios-contact' style={{ color: '#d4d8da' }} />
                        			<Input
										placeholderTextColor='#d4d8da'
										placeholder='Username'
										onChangeText={(username) => this.setState({username})}
										value={this.state.username}
									/>
                        		</Item>
                        		<Item regular style={[styles.textInput, { marginLeft: 15, marginRight: 15, backgroundColor: 'white' } ]}>
                        			<Icon active name='lock' style={{ color: '#d4d8da' }} />
                        			<Input placeholderTextColor='#d4d8da'
										secureTextEntry={true}
										placeholder='Password'
										onChangeText={(password) => this.setState({password})}
	    								value={this.state.password}
									/>
                        		</Item>
                        		<Button block style={{ marginRight: 15, marginLeft: 15, marginTop: 15, backgroundColor: '#8b9dc3' }}
									onPress={() =>  this.onLogin()}
								>
                        			<Text>Log In</Text>
                        		</Button>
								{
									!!this.state.error&&<Text style={{ textAlign: 'center', color: 'white', marginTop: 10 }}>{ this.state.error }</Text>
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
