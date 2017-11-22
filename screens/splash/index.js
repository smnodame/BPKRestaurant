import React from 'react';
import { StyleSheet, Image, View, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            AsyncStorage.getItem('token').then((token) => {
    			if(token) {
    				const resetAction = NavigationActions.reset({
    						index: 0,
    						actions: [
    							NavigationActions.navigate({ routeName: 'Programs'})
    						]
    					})
    				this.props.navigation.dispatch(resetAction)
    			} else {
                    const resetAction = NavigationActions.reset({
        					index: 0,
        					actions: [
        						NavigationActions.navigate({ routeName: 'Login'})
        					]
        				})
        			this.props.navigation.dispatch(resetAction)
                }
    		})
        }, 1500)
    }

    render() {
    return (
        <View style={styles.container}>
            <Image style={{ width: 320, height: 80 }}
          source={require('../../Images/logo.png')}
        />
        </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});
