import { useState } from 'react'
import { View, StyleSheet } from "react-native"

import { TextInput, Button, Text } from "@react-native-material/core";

import { loginUser } from '../../config/firebase'

export default function Login({ navigation }) {
    const [text, setText] = useState({
        email: "nabeel@gmail.com",
        password: "123456"
    })
    // console.log("login", text)

    const handleChangeText = (key, value) => {
        setText({ ...text, [key]: value })
    }

    const handlePress = () => {
        if (!text.email) {
            return alert("Enter email")
        }
        if (text.password.length != 6) {
            return alert("Password must be at least 6 characters long")
        }
        loginUser(text)
    }

    return (
        <View style={styles.container}>
            <Text variant="h3" style={styles.text}>Login</Text>
            <TextInput
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