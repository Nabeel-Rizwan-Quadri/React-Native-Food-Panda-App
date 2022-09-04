import { useState } from 'react'
import { View, StyleSheet } from "react-native"

import { TextInput, Button, Text } from "@react-native-material/core";

import { signupUser } from "../../config/firebase";

export default function Signup({ navigation }) {
    const [text, setText] = useState({
        name: "nabeel rizwan",
        phoneNumber: "03362319053",
        email: "nabeel@gmail.com",
        password: "123456"
    })
    // console.log("signup", text)

    const handleChangeText = (key, value) => {
        setText({ ...text, [key]: value })
    }

    const handlePress = () => {
        if (!text.name) {
            return alert("Enter name")
        }
        if (!text.phoneNumber.length) {
            return alert("Enter phone number of 11 digits")
        }
        if (!text.email) {
            return alert("Enter email")
        }
        if (text.password.length != 6) {
            return alert("Password must be al least 6 characters long")
        }
        signupUser(text)
        // navigation.navigate("login")
    }

    return (
        <View style={styles.container}>
            <Text variant="h3" style={styles.text}>Signup</Text>
            <TextInput
                onChangeText={text => handleChangeText('name', text)}
                value={text.name}
                label="Full Name"
                style={styles.spacing}
                color="#E75480"
            />
            <TextInput
                onChangeText={text => handleChangeText('phoneNumber', text)}
                value={text.phoneNumber}
                label="Phone Number"
                style={styles.spacing}
                color="#E75480"
            />
            <TextInput
                onChangeText={text => handleChangeText('email', text)}
                value={text.email}
                label="Email"
                style={styles.spacing}
                color="#E75480"
            />
            <TextInput
                onChangeText={text => handleChangeText('password', text)}
                value={text.password}
                label="Password"
                style={styles.spacing}
                color="#E75480"
            />
            <Button
                title="Signup"
                onPress={handlePress}
                color="#E75480"
                style={styles.spacing}
            >
            </Button>
            <Button
                title="Go To Login"
                onPress={() => navigation.navigate("login")}
                color="#E75480"
                style={styles.spacing}
                variant="text"
            >
            </Button>
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