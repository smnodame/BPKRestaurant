import React from 'react';
import { StyleSheet, Alert, Dimensions, Platform, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';
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
import { NavigationActions } from 'react-navigation'
import axios from "axios"
const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width

export default class Barcode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			hasCameraPermission: null,
			token: '',
			round: 0
        }
    }

    async componentWillMount() {
		const patient_host = await AsyncStorage.getItem('patient_host')
		this.setState({ patient_host : patient_host })
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
		AsyncStorage.getItem('token')
		.then((token) => {
			this.setState({ token: token })
		})
        this.setState({hasCameraPermission: status === 'granted'});
    }

    _handleBarCodeRead = ({ type, data }) => {
		const hn = data
		if(this.state.round == 0) {
			this.setState({ round: 1 })
			axios.get(this.state.patient_host + '/api/patient/get_patient_data?token='+ this.state.token + '&hn=' + hn)
			.then((response) => {
				if( response.data.success == "1" ) {
					const resetAction = NavigationActions.reset({
			            index: 1,
			            actions: [
			                NavigationActions.navigate({ routeName: 'Patient' }),
			                NavigationActions.navigate({ routeName: 'Personal', params: { hn: hn }  })
			            ]
			        })
			        this.props.navigation.dispatch(resetAction);
				} else {
					Alert.alert(
					'ผลการค้นหา',
					'ไม่พบผู้ป่วย HN : ' + hn,
						[
							{text: 'ยกเลิก', onPress: () => this.props.navigation.dispatch(NavigationActions.back()), style: 'cancel'},
							{text: 'ค้นหาใหม่', onPress: () => this.setState({ round: 0 })}
						],
						{
							cancelable: false
						}
					)
				}
			})
		}
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        style={StyleSheet.absoluteFill}
                    >
					</BarCodeScanner>
					<View style={styles.header}>
						<View style={{ borderColor: 'orange', borderWidth: 2, height: 300, width: 300}}>
						</View>
					</View>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3b5998',
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 100,
	},
	title: {
		color: 'white',
		fontSize: 30
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
