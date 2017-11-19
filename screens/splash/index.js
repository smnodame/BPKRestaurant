import React from 'react';
import { StyleSheet, Image, View} from 'react-native';


export default class Splash extends React.Component {
    constructor(props) {
        super(props);
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
