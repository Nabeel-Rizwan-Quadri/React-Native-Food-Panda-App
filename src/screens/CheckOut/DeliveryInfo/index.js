import { useState } from 'react'
import { View, StyleSheet } from "react-native"

import { TextInput, Button, Text } from "@react-native-material/core";
import { useDispatch } from 'react-redux';

import { setDeliveryInfo } from '../../../store/slices/orderSlice'

// import * as Location from 'expo-location';

export default function DeliveryInfo({ navigation }) {
    const dispatch = useDispatch()

    // const [location, setLocation] = useState({});

    // useEffect(() => {
    //     (async () => {
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //             setErrorMsg('Permission to access location was denied');
    //             return;
    //         }

    //         let location = await Location.getCurrentPositionAsync({});
    //         setLocation(location);
    //     })();
    // }, []);

    const [text, setText] = useState({
        name: "nabeel",
        phoneNumber: "03362319053",
        location: true
    })
    // console.log("login", text)

    const handleChangeText = (key, value) => {
        setText({ ...text, [key]: value })
    }

    const handlePress = () => {
        if (!text.name) {
            return alert("Enter name")
        }
        if (text.phoneNumber.length != 11) {
            return alert("phoneNumber must be al least 6 characters long")
        }
        if (!text.location) {
            return alert("kindly set your location")
        }
        dispatch(setDeliveryInfo(text))
        navigation.navigate('payment')
    }

    return (
        <View style={styles.container}>
            <Text variant="h3" style={styles.text}>Delivery Info</Text>
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

            <Button
                title="Proceed To Payment"
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