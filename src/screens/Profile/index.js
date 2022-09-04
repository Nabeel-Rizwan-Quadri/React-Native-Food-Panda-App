import { useState, useEffect } from 'react'
import { View, StyleSheet } from "react-native"

import { TextInput, Button, Text } from "@react-native-material/core";

import { onAuthStateChanged } from 'firebase/auth'

import { getCurrentUserData, updateCurrentUserData } from '../../config/firebase'
import { auth } from '../../config/firebase';

export default function Profile() {

    const [text, setText] = useState()
    console.log("profile", text)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid
                // console.log(uid)
                const result = await getCurrentUserData(uid)
                setText(result)
            } else {
                setUser(null)
            }
        });
    }, [])

    const handleChangeText = (key, value) => {
        setText({ ...text, [key]: value })
    }

    const handlePress = () => {
        if (!text.name) {
            return alert("Enter name")
        }
        if (text.phoneNumber.length != 11) {
            return alert("Enter phoneNumber of 11 digits")
        }
        if (!text.email) {
            return alert("Enter email")
        }
        if (text.password.length != 6) {
            return alert("Password must be al least 6 characters long")
        }
        updateCurrentUserData(text)
    }

    if (!text) {
        return <Text> Loading </Text>
    }

    return (<View style={styles.container}>
        <Text variant="h5" style={styles.text}>Update Your Profile</Text>
        <TextInput
            onChangeText={text => handleChangeText('name', text)}
            value={text.name}
            label="name"
            style={styles.spacing}
            color="#E75480"
        />
        <TextInput
            onChangeText={text => handleChangeText('phoneNumber', text)}
            value={text.phoneNumber}
            label="phoneNumber"
            style={styles.spacing}
            color="#E75480"
        />
        <TextInput
            onChangeText={text => handleChangeText('email', text)}
            value={text.email}
            label="email"
            style={styles.spacing}
            color="#E75480"
        />
        <Button
            title="Update"
            onPress={handlePress}
            color="#E75480"
            style={styles.spacing}
        >
        </Button>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center'
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