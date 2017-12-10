import React from 'react';
import { StyleSheet, Dimensions, Platform, Image, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, ToastAndroid, AsyncStorage, ScrollView  } from 'react-native';
import Drawer from 'react-native-drawer'
import axios from "axios"
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
	Thumbnail,
	Switch,
	Card,
	CardItem,
	Toast,
	Fab,
	Spinner
} from "native-base";
import { NavigationActions } from 'react-navigation'
const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width

export default class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
			isReady: false,
			page: 'Login',
			token: '',
			queue: [],
			firstname: '',
			lastname: '',
			pid: '',
			old_hv: '',
			search_start : false,
			search_contain: false,
			visit_type : '',
			search_result: [],
			loading: true,
			page: 1,
			show_load_more: false,
			isLoading: false
        }
		this.openControlPanel = this.openControlPanel.bind(this)
		this.logout = this.logout.bind(this)
		this.chooseProgram = this.chooseProgram.bind(this)
		this.renderQueue = this.renderQueue.bind(this)
		this.onSearch = this.onSearch.bind(this)
		this.renderSearchResult = this.renderSearchResult.bind(this)
		this.onReset = this.onReset.bind(this)
		this.renderSearchResultHeader = this.renderSearchResultHeader.bind(this)
		this.getQueue = this.getQueue.bind(this)
		this.onEndReached = this.onEndReached.bind(this)
		AsyncStorage.setItem('current_state', 'Patient')
    }

	async componentWillMount() {
		const patient_host = await AsyncStorage.getItem('patient_host')
        this.setState({ patient_host : patient_host })

		AsyncStorage.getItem('token')
		.then((token) => {
			this.setState({ token: token })
			this.getQueue()
		})
        this.setState({ isReady: true })
    }

	onEndReached = async () => {
		this.setState({ isLoading: true })
		if(this.state.search_result.length >= 15 ) {
			fetch(this.state.patient_host + '/api/patient/search_patient',{
				method: 'POST',
				body: JSON.stringify({
					token: this.state.token,
					firstname: this.state.firstname,
					lastname: this.state.lastname,
					pid: this.state.pid,
					old_hv: this.state.old_hv,
					search_start: this.state.search_start,
					search_contain: this.state.search_contain,
					visit_type: this.state.visit_type,
					page: this.state.page
				})
			})
			.then((res) => res.json())
			.then((response) => {
				const new_page = this.state.page + 1
				const new_list = [
					...this.state.search_result,
					...response.patientList
				]
				this.setState({ search_result: new_list, page: new_page, isLoading: false })
				if(this.state.search_result.length  >= response.total) {
						this.setState({ show_load_more: false })
				} else {
					this.setState({ show_load_more: true })
				}
			})
		}
	}

	getQueue = () => {
		this.setState({ loading: true })
		this.setState({ queue:[] })
		axios.get(this.state.patient_host + '/api/patient/get_queue?token='+ this.state.token)
		.then((response) => {
			this.setState({ queue: response.data.patientList })
			this.setState({ loading: false })
		})
	}

	onSearch = () => {
		fetch(this.state.patient_host + '/api/patient/search_patient',{
			method: 'POST',
			body: JSON.stringify({
				token: this.state.token,
				firstname: this.state.firstname,
				lastname: this.state.lastname,
				pid: this.state.pid,
				old_hv: this.state.old_hv,
				search_start: this.state.search_start,
				search_contain: this.state.search_contain,
				visit_type: this.state.visit_type,
				page: this.state.page
			})
		})
		.then((res) => res.json())
		.then((response) => {
			const new_page = this.state.page + 1
			this.setState({ search_result: response.patientList, page: new_page })
			let message = "ไม่พบข้อมูล"
			if(response.patientList.length >= 1) {
				message = "ผลการค้นหา " + response.total + " เร็คคอร์ด"
			}
			ToastAndroid.show(message, ToastAndroid.SHORT)
			if(this.state.search_result.length  >= response.total) {
					this.setState({ show_load_more: false })
			} else {
				this.setState({ show_load_more: true })
			}
		})
	}

	openControlPanel = () => {
		this._drawer.open()
	}

	onReset = () => {
		this.setState({
			firstname: '',
			lastname: '',
			pid: '',
			old_hv: '',
			search_start: false,
			search_contain: false,
			visit_type: '',
			search_result: [],
			page: 1,
			show_load_more: false
		})
	}

	logout = () => {
		AsyncStorage.removeItem('token')
		.then(() => {
			const resetAction = NavigationActions.reset({
					index: 0,
					actions: [
						NavigationActions.navigate({ routeName: 'Login'})
					]
				})
				this.props.navigation.dispatch(resetAction)
		})
	}

	chooseProgram = () => {
		const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'ChooseProgram'})
                ]
            })
    		this.props.navigation.dispatch(resetAction)
	}

	renderQueue = () => {
        const template = this.state.queue.map((queue, index) => (
			<ListItem
				onPress={() => this.props.navigation.navigate('Personal', {
					hn: queue.hn
				})}
				key={index}
			>
				<View style={{ width: 65, alignItems: 'center' }}>
					<Text note style={{ fontSize: 12 }}>No</Text>
					<Text note style={{ fontSize: 25 }}>{ index + 1 }</Text>
				</View>
				<Body>
					<Text>{ queue.prename + ' ' + queue.firstname + ' ' + queue.lastname }</Text>
					<Text>
						<Text note style={{ fontSize: 12 }}>HN    </Text>
						<Text note style={{ fontSize: 12 }}>{ queue.hn }</Text>
					</Text>
					<Text>
						<Text note style={{ fontSize: 12 }}>VN    </Text>
						<Text note style={{ fontSize: 12 }}>{ queue.vn }</Text>
					</Text>
				</Body>
			</ListItem>
        ))
        return template
    }

	renderSearchResult = () => {
        const template = this.state.search_result.map((person, index) => (
			<ListItem avatar key={index}
				onPress={() => this.props.navigation.navigate('Personal', {
					hn: person.hn
				})}
			>
				<Body>
					<Text>{ person.prename + ' ' + person.firstname + ' ' + person.lastname }</Text>
					<Text>
						<Text note style={{ fontSize: 12 }}>ID   </Text>
						<Text note style={{ fontSize: 12 }}>{ person.pid }</Text>
					</Text>
					<Text>
						<Text note style={{ fontSize: 12 }}>HN    </Text>
						<Text note style={{ fontSize: 12 }}>{ person.hn }</Text>
					</Text>
					<Text>
						<Text note style={{ fontSize: 12 }}>XN    </Text>
						<Text note style={{ fontSize: 12 }}>{ person.xn }</Text>
					</Text>
				</Body>
				<Right>
					<Text note>{ 'อายุ ' + person.age }</Text>
				</Right>
			</ListItem>
        ))
        return template
    }

	renderSearchResultHeader = () => {
		if(this.state.search_result.length >= 1) {
			return <View style={{ height: 30, paddingLeft: 15, marginBottom: 10 }}>
				<Text style={{ color: '#bdbdbd' }}>ผลการค้นหา</Text>
			</View>
		}
	}

    render() {
		const data = [
            { key: 2, label: 'None' },
            { key: 3, label: 'OPD' },
            { key: 4, label: 'IPD' }
        ];

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
                        	<Image square style={styles.drawerImage} source={  require('../../Images/patient.png') } />
	                    </View>
						<List>
							<ListItem itemHeader first style={{ paddingBottom: 3 }}>
								<Text>ACTIVITIES</Text>
							</ListItem>
							<ListItem button noBorder onPress={() => this.chooseProgram()}>
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
					<Container>
                        <Header hasTabs style={{ backgroundColor: '#FE6449' }}>
                        	<Left>
								<Button transparent onPress={() => this.openControlPanel()}>
									<Icon name="menu" />
								</Button>
                        	</Left>
                        	<Body>
                        		<Title>PATIENT</Title>
                        	</Body>
                        	<Right>
                        		<Button transparent onPress={() => this.props.navigation.navigate('Barcode')}>
                        			<Icon name="barcode" />
                        		</Button>
                        	</Right>
                        </Header>
                        <Tabs
						locked={ true }
						>
                        	<Tab heading={ <TabHeading style={{ backgroundColor: '#FE6449' }} ><Text>คิวผู้ป่วย</Text></TabHeading>}>
                        		<Content>
									{
										this.state.loading&&<View>
											<Spinner color='red' />
											<Text style={{ textAlign: 'center', color: '#d4d8da', marginTop: 5, fontSize: 20 }}>Loading...</Text>
										</View>
									}
									{
										this.state.queue.length >= 1&&<List>
											{
												this.renderQueue()
											}
										</List>
									}
									{
										!this.state.loading&&this.state.queue.length == 0&&<View>
											<Text style={{ textAlign: 'center', color: '#d4d8da', marginTop: 20, fontSize: 20 }}>ไม่พบข้อมูล</Text>
										</View>
									}

								</Content>
								<Fab
									active={true}
									direction="up"
									onPress={() => this.getQueue() }
									style={{ backgroundColor: '#FE6449' }}
									position="bottomRight">
										<Icon name="refresh"/>
								</Fab>
                        	</Tab>
                        	<Tab heading={ <TabHeading style={{ backgroundColor: '#FE6449' }} ><Icon name="search" /><Text>ค้นหาผู้ป่วย</Text></TabHeading>} >
                        		<Content style={{ backgroundColor: '#f4f4f4' }}>
									<View style={{ height: 30, paddingLeft: 15, paddingTop: 15 }}>


									</View>
									<KeyboardAvoidingView  behavior="padding" style={{ backgroundColor: '#f4f4f4', marginTop: 15, paddingLeft: 20, paddingRight: 20, marginBottom: 15 }}>
												<Item regular style={[styles.textInput, { backgroundColor: 'white', marginBottom: 10 } ]}>
				                        			<Input placeholderTextColor='#d4d8da' placeholder='ชื่อ'
														onChangeText={(firstname) => this.setState({firstname})}
	    												value={this.state.firstname}
													/>
				                        		</Item>
												<Item regular style={[styles.textInput, { backgroundColor: 'white', marginBottom: 10 } ]}>
				                        			<Input placeholderTextColor='#d4d8da' placeholder='นามสกุล'
														onChangeText={(lastname) => this.setState({lastname})}
														value={this.state.lastname}
													/>
				                        		</Item>
												<Item regular style={[styles.textInput, { backgroundColor: 'white', marginBottom: 10 } ]}>
													<Input placeholderTextColor='#d4d8da' placeholder='บัตรประชาชน'
														onChangeText={(pid) => this.setState({pid})}
														value={this.state.pid}
													/>
												</Item>
												<Item regular style={[styles.textInput, { backgroundColor: 'white', marginBottom: 10 } ]}>
													<Input placeholderTextColor='#d4d8da' placeholder='HV เก่า'
														onChangeText={(old_hv) => this.setState({old_hv})}
														value={this.state.old_hv}
													/>
												</Item>
												<View style={{ flex: 1, flexDirection: 'row', marginLeft: 10, marginBottom: 5, marginTop: 10 }}>
													<Text style={{ flex: 1}}>ขึ้นต้นด้วย</Text>
													<Switch value={this.state.search_start} onValueChange={(search_start) => this.setState({search_start})}/>
												</View>
												<View style={{ flex: 1, flexDirection: 'row', marginLeft: 10, marginBottom: 15, marginTop: 5 }}>
													<Text style={{ flex: 1}}>ประกอบด้วย</Text>
													<Switch value={this.state.search_contain} onValueChange={(search_contain) => this.setState({search_contain})}/>
												</View>


												
														<TextInput placeholderTextColor='#d4d8da' placeholder='ประเภทผู้ป่วย'
															style={[styles.textInput, { backgroundColor: 'white', marginBottom: 10 } ]}
															editable={false}
															value={this.state.visit_type}
														/>

												<View style={{ flex: 1, flexDirection: 'row' }}>
													<View style={{ flex: 1 }} />
													<Button warning style={{ marginTop: 10, marginRight: 5 }} onPress={() =>  this.onReset()} ><Text> Reset </Text></Button>
													<Button success style={{ marginTop: 10 }} onPress={() =>  this.onSearch()} ><Text> ค้นหา </Text></Button>
												</View>
									</KeyboardAvoidingView>
									{
										this.renderSearchResultHeader()
									}
									<List style={{ backgroundColor: 'white' }}
									>
										{
											this.renderSearchResult()
										}
									</List>
									{
										!this.state.isLoading&&this.state.show_load_more&&<Button block light onPress={() => this.onEndReached()}>
											<Text>Load More</Text>
										</Button>
									}
									{
										this.state.isLoading&&<Spinner color='red' />
									}
								</Content>
                        	</Tab>
                        </Tabs>
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
		backgroundColor: '#f4f4f4',
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
		borderWidth: 1,
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
		backgroundColor: '#FE6449'
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
