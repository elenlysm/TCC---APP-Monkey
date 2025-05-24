import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFC6",
    },
    ImageBackground: {
        width: 917,
        height: 917,
        marginTop: -37,
        marginBottom: 37,
        marginLeft: -253,
        marginRight: -252,
    },
    scrollView: {
        flex: 1,
    },
    page: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    fullScreen: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    logo: {
        width: 180,
        height: 180,
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        color: "#000",
        fontWeight: "bold",
    },
    textCenter: {
        fontSize: 24,
        textAlign: "center",
        color: "#000",
        marginBottom: 20,
    },
    imageBottom: {
        width: "80%",
        height: 200,
        marginTop: 20,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginVertical: 10,
        elevation: 3,
    },
    buttonText: {
        fontSize: 20,
        color: "#000",
        marginRight: 10,
    },
    icon: {
        width: 16,
        height: 16,
    },
    label: {
        fontSize: 18,
        color: "#000",
        alignSelf: "flex-start",
        marginBottom: 8,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 15,
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: "#fff",
    },
});
