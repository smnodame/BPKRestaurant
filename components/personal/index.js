import React from 'react';
import { StyleSheet, Dimensions, Platform, Image, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
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
	Thumbnail
} from "native-base";
import { NavigationActions } from 'react-navigation'
import axios from "axios"

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width

export default class Personal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
			isReady: false,
			page: 'Login',
			detail: {}
        }
		this.openControlPanel = this.openControlPanel.bind(this)
    }

	async componentWillMount() {
		const patient_host = await AsyncStorage.getItem('patient_host')
        this.setState({ patient_host : patient_host })

		AsyncStorage.getItem('token')
		.then((token) => {
			this.setState({ token: token })
			axios.get(this.state.patient_host + '/api/patient/get_patient_data?token='+ token + '&hn=' + this.props.navigation.state.params.hn)
			.then((response) => {
				this.setState({ detail: response.data.patientData })
				this.setState({ isReady: true })
			})
		})
    }

	openControlPanel = () => {
		this._drawer.open()
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
	                    <Image source={ require('../../Images/drawer-cover.png') } style={styles.drawerCover}>
	                        <Image square style={styles.drawerImage} source={  require('../../Images/logo-kitchen-sink.png') } />
	                    </Image>
						<List>
							<ListItem itemHeader first style={{ paddingBottom: 3 }}>
								<Text>ACCOUNT</Text>
							</ListItem>
							<ListItem button noBorder>
								<Left>
									<Icon active name='lock' style={{ color: "#777", fontSize: 26, width: 30 }} />
									<Text style={styles.text}>
										Log in
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
					<Container style={{ backgroundColor: 'white' }}>
						{
							Platform.OS != 'ios'&&<View style={styles.statusBar} />
						}
                        <Header style={{ backgroundColor: '#FE6449' }}>
                        	<Left>
                        		<Button transparent onPress={() => this.props.navigation.dispatch(NavigationActions.back()) }>
                        			<Icon name="md-arrow-round-back" />
                        		</Button>
                        	</Left>
                        	<Body>
                        		<Title>ประวัติผู้ป่วย</Title>
                        	</Body>
                        </Header>
                        <Content>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', padding: 15, backgroundColor: '#f4f4f4' }}>
                                <Image source={{ uri: this.state.detail.image_path }} style={{ width: 135, height: 135, borderRadius: 5, borderColor: 'white', borderWidth: 2 }}/>
                                <Text style={{ marginTop: 10, fontSize: 23, fontFamily: "Roboto", }}>{ this.state.detail.firstname + ' ' + this.state.detail.lastname }</Text>
                            </View>
                            <List>
                                <ListItem itemDivider>
                                    <Text>รายละเอียดส่วนตัว</Text>
                                </ListItem>
                                <ListItem>
                                    <View style={{ width: 100 }}>
                                        <Text>ชื่อ</Text>
                                    </View>
                                    <Body>
                                        <Text>{ this.state.detail.prename + ' ' + this.state.detail.firstname + ' ' + this.state.detail.lastname }</Text>
                                    </Body>
                                </ListItem>
								<ListItem>
                                    <View style={{ width: 100 }}>
                                        <Text>หมายเลขบัตรประชนชน</Text>
                                    </View>
                                    <Body>
                                        <Text>{ this.state.detail.pid }</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <View style={{ width: 100 }}>
                                        <Text>อายุ</Text>
                                    </View>
                                    <Body>
                                        <Text>{ this.state.detail.age }</Text>
                                    </Body>
                                </ListItem>
                                <ListItem itemDivider>
                                    <Text>รายละเอียดทางการเเพทย์</Text>
                                </ListItem>
                                <ListItem>
                                    <View style={{ width: 100 }}>
                                        <Text>HN</Text>
                                    </View>
                                    <Body>
                                        <Text>{ this.state.detail.hn }</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <View style={{ width: 100 }}>
                                        <Text>VN</Text>
                                    </View>
                                    <Body>
                                        <Text>{ this.state.detail.vn }</Text>
                                    </Body>
                                </ListItem>

                                <ListItem>
                                    <View style={{ width: 100 }}>
                                        <Text>รอที่</Text>
                                    </View>
                                    <Body>
                                        <Text>{ this.state.detail.next_sp_name }</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <View style={{ width: 100 }}>
                                        <Text>วันเข้ารับบริการ</Text>
                                    </View>
                                    <Body>
                                        <Text>{ this.state.detail.visit_date + ' ' + this.state.detail.visit_time }</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <View style={{ width: 100 }}>
                                        <Text>โรคประจำตัว</Text>
                                    </View>
                                    <Body>
                                        <Text>{ this.state.detail.personal_illness.join(', ') }</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <View style={{ width: 100 }}>
                                        <Text>สิทธิ์การรักษา</Text>
                                    </View>
                                    <Body>
                                        <Text>{ this.state.detail.base_plan_group_description.join(', ') }</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <View style={{ width: 100 }}>
                                        <Text>มาจาก</Text>
                                    </View>
                                    <Body>
                                        <Text>{ this.state.detail.last_sp_name }</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <View style={{ width: 100 }}>
                                        <Text>เตียง</Text>
                                    </View>
                                    <Body>
                                        <Text>{ this.state.detail.current_ward_name }</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <View style={{ width: 100 }}>
                                        <Text>เเพ้ยา</Text>
                                    </View>
                                    <Body>
                                        <Text>{ this.state.detail.drug_allergy.join(', ') }</Text>
                                    </Body>
                                </ListItem>
                            </List>
                        </Content>
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
		marginBottom: 10
	},
	drawerImage: {
		position: "absolute",
		// left: (Platform.OS === 'android') ? 30 : 40,
		left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
		// top: (Platform.OS === 'android') ? 45 : 55,
		top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
		width: 210,
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
