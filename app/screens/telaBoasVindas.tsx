import React from "react";
import { SafeAreaView, View, ScrollView, StyleSheet, ImageBackground, } from "react-native";
export default (props: any) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<View style={styles.column}>
					<ImageBackground
						source={require('"..\app\assets\images\Layout\deep-0ECAhyBYxhE-unsplash (1).png"')}
						style={styles.view}
					>
					</ImageBackground>
				</View>
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
	column: {
		flexDirection: "column",
		flex: 1,
	},
	view: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
	},
});