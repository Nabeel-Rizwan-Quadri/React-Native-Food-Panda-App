import { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Card, Title, Paragraph } from 'react-native-paper'
import { TextInput, Button, Text } from "@react-native-material/core";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/productSlice';


export default function Details({ route }) {
    const data = route.params.selectedDish
    const restInfo = route.params.restInfo
    // useSelector(state => console.log(state.productReducer.cart))

    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(1)
    const updateQuantity = (key, stock) => {
        if (key === "inc" && quantity !== stock) {
            setQuantity(quantity + 1)
        }
        if (key === "dec" && quantity !== 1) {
            setQuantity(quantity - 1)
        }
    }

    const handlePress = () => {
        let copyData = {
            quantity: '',
            restName: '',
            coords: {}
        }
        copyData = data
        copyData.quantity = quantity
        const { name, coords } = restInfo
        copyData.restName = name
        copyData.coords = coords

        dispatch(addToCart(copyData))

        copyData ={}
        // alert("Successfully added")
    }

    if (!data) {
        return <Text>Loading</Text>
    }

    return (
        <View style={styles.container}>
            {/* <Text>{data[0].name}</Text */}
            <Card mode={"elevated"}>
                <ScrollView>
                    {/* <Text variant="h4" style={styles.text}>Our Restaurants</Text> */}
                    {
                        <View style={styles.card} >
                            <Card.Cover style={{ borderRadius: 10, height: 150 }} source={{ uri: 'https://picsum.photos/700' }} />
                            <Card.Content>
                                <Title>{data.menuItem}</Title>
                                <Paragraph>{data.price}</Paragraph>

                                <View style={styles.counter}>
                                    <Button onPress={() => updateQuantity("dec")}
                                        title='-'
                                        style={styles.spacing}
                                    ></Button>
                                    <Text
                                        style={styles.spacing}
                                    >{quantity}</Text>
                                    <Button onPress={() => updateQuantity("inc", data.stock)}
                                        title='+'
                                        style={styles.spacing}
                                    ></Button>
                                    <Button onPress={handlePress}
                                        title="ADD TO CART"
                                        style={styles.spacing}
                                    ></Button>
                                </View>


                            </Card.Content>
                        </View>
                    }
                </ScrollView>
                {/* <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions> */}
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
        color: '#ffb6c1'
    },
    spacing: {
        margin: 30,
        marginBottom: 0
    },
    card: {
        // backgroundColor: "#ffb6c1",
        margin: 15,
        marginBottom: 15,
        borderRadius: 10
    },
    counter: {
        flexDirection: "row"
    }
    // map: {
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height,
    // },
});