import { useState } from 'react'
import { View, StyleSheet } from "react-native"

import { TextInput, Button, Text } from "@react-native-material/core";

import { useDispatch, useSelector } from 'react-redux';
import { auth, createOrder } from '../../../config/firebase'

export default function Payment({ navigation }) {
    const dispatch = useDispatch()
    const deliveryInfo = useSelector(state => state.orderSlice.deliveryInfo)
    const cartItems = useSelector(state => state.orderSlice.cartItems)
    const currentUserUid = auth.currentUser.uid
    console.log(currentUserUid)

    const [text, setText] = useState({
        type: "COD"
    })
    // console.log("login", text)

    const handleChangeText = (key, value) => {
        setText({ ...text, [key]: value })
    }

    const handlePress = () => {
        if (!text.type) {
            return alert("Select type")
        }
        createOrder(deliveryInfo, cartItems, currentUserUid)
        navigation.navigate('placeOrder')
    }

    return (
        <View style={styles.container}>
            <Text variant="h3" style={styles.text}>Payment Type</Text>
            <TextInput
                onChangeText={text => handleChangeText('type', text)}
                value={text.type}
                label="type"
                style={styles.spacing}
                color="#E75480"
            />
            <Button
                title="PlaceOrder"
                onPress={handlePress}
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