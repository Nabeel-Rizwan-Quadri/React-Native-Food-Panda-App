import { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Card, Title, Paragraph } from 'react-native-paper'
import { TextInput, Button, Text } from "@react-native-material/core";
import { useDispatch, useSelector } from 'react-redux';
import { updateCart, removeFromCart } from '../../store/slices/productSlice'
import { setCartItems, setCartTotal } from '../../store/slices/orderSlice'

export default function Cart({ navigation }) {

    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.productReducer.cart)
    // console.log(cartItem)

    // const cartItems = [
    //     {
    //         menuItem: "food name",
    //         price: 1000,
    //         quantity: 2,
    //         stock: 3,
    //         coords: {}

    //     }
    // ]

    let cartTotal = 0

    const updateQuantity = (key, item, index) => {
        let copyCartItems = [...cartItems]
        let copyData = { ...item }

        console.log(copyData.quantity)

        if (key === "inc" && copyData.quantity !== item.stock) {
            copyData.quantity = copyData.quantity + 1
            copyCartItems[index] = copyData
            dispatch(updateCart(copyCartItems))
        }
        if (key === "dec" && copyData.quantity !== 0) {
            copyData.quantity = copyData.quantity - 1
            copyCartItems[index] = copyData
            dispatch(updateCart(copyCartItems))
        }
    }

    const removeItem = (index) => {
        let copyData = [...cartItems]
        copyData.splice(index, 1)
        dispatch(removeFromCart(copyData))
    }

    const checkout = () => {
        dispatch(setCartItems(cartItems))
        dispatch(setCartTotal(cartTotal))
        navigation.navigate("deliveryInfo")
    }

    if (!cartItems[0]) {
        return <Text varient='h2' style={styles.text}>Cart Is Empty</Text>

    }

    return (
        <View style={styles.container}>
            <Text style={styles.text} variant="h3" >Cart Items</Text>
            <Card mode={"elevated"} style={styles.card}>
                <ScrollView>
                    <View style={styles.card} >
                        <Text style={styles.spacing}>Item Name</Text>
                        <Text style={styles.spacing}>Price</Text>
                        <Text style={styles.spacing}>Quantity</Text>
                        <Text style={styles.spacing}>Subtotal</Text>
                    </View>

                    {cartItems.map((item, index) => {
                        cartTotal = cartTotal + (item.price * item.quantity)

                        return <View style={styles.card} key={index}>
                            <Text style={styles.spacing}>{item.menuItem}</Text>
                            <Text style={styles.spacing}>{item.price}</Text>
                            <Button
                                title="-"
                                onPress={() => updateQuantity("dec", item, index)}
                                style={styles.spacing}
                            ></Button>
                            <Text style={styles.spacing}>{item.quantity}</Text>
                            <Button
                                title="+"
                                onPress={() => updateQuantity("inc", item, index)}
                                style={styles.spacing}
                            ></Button>
                            <Text style={styles.spacing}>{item.quantity * item.price}</Text>
                            <Text style={styles.spacing} onPress={() => removeItem(item, index)}>Remove</Text>
                        </View>
                    })}
                    <View style={styles.card} >
                        <Text style={styles.spacing}>Total</Text>
                        <Text style={styles.cartTotal}>{cartTotal}</Text>
                    </View>
                    <Button
                        title={"Proceed To Checkout"}
                        onPress={checkout}
                    ></Button>
                </ScrollView>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'black',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        margin: 16,
        textAlign: "center",
        // color: '#ffb6c1'
    },
    spacing: {
        margin: 30,
        marginBottom: 0
    },
    card: {
        // backgroundColor: "#ffb6c1",
        margin: 15,
        marginBottom: 15,
        borderRadius: 10,
        flexDirection: 'row'
    },
    counter: {
        flexDirection: "row"
    },
    cartTotal: {
        textAlign: 'right',
        margin: 30,
        marginBottom: 0
    }
    // map: {
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height,
    // },
});