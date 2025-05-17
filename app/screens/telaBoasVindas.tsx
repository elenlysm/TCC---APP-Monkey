import React from "react";
import { SafeAreaView, View, ScrollView, StyleSheet, } from "react-native";
export default (props) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
			    <View style={styles.column}>
			        <ImageBackground
			            source={require('"..\app\assets\images\Layout\deep-0ECAhyBYxhE-unsplash (1).png"')}
			            style={styles.view}
			        >
			    </view>
			</ScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFC6",
	},
});