import { useState } from 'react'
import { View, StyleSheet } from "react-native"

import { TextInput, Button, Text } from "@react-native-material/core";

export default function PlaceOrder({ navigation }) {
    // const [text, setText] = useState()
    // // console.log("login", text)

    // const handleChangeText = (key, value) => {
    //     setText({ ...text, [key]: value })
    // }

    // const handlePress = () => {
    //     if (!text.email) {
    //         return alert("Enter email")
    //     }
    //     if (text.password.length != 6) {
    //         return alert("Password must be al least 6 characters long")
    //     }
    // }

    return (
        <View style={styles.container}>
            <Text variant="h3" style={styles.text}>Order Successfully placed</Text>
            {/* <TextInput
                onChangeText={text => handleChangeText('email', text)}
                value={text.email}
                label="email"
                style={styles.spacing}
                color="#E75480"
            />
            <TextInput
                onChangeText={text => handleChangeText('password', text)}
                value={text.password}
                label="password"
                style={styles.spacing}
                color="#E75480"
            />
            <Button
                title="Login"
                onPress={handlePress}
                color="#E75480"
                style={styles.spacing}
            >
            </Button>
            <Button
                title="Go To Signup"
                onPress={() => navigation.navigate("signup")}
                variant="text"
                color="#E75480"
                style={styles.spacing}
            >
            </Button> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#fff',

    },
    spacing: {
        margin: 30,
        marginBottom: 0
    },
    text: {
        margin: 16,
        textAlign: "center"
    }
})