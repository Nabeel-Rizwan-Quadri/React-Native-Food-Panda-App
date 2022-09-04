import { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Card, Title, Paragraph } from 'react-native-paper'
import { Text } from '@react-native-material/core'
import { fetchResturantById } from "../../config/firebase"

export default function Menu({ navigation, route }) {

    const id = route.params.id

    const [data, setData] = useState()

    useEffect(() => {
        (async () => {
            const result = await fetchResturantById(id)
            setData(result)
        })()
    }, [])

    const handlePress = (selectedDish) => {
        navigation.navigate('details', { selectedDish, restInfo: data })
    }

    if (!data) {
        return <Text>Loading</Text>
    }

    return (
        <View style={styles.container}>
            {/* <Text>{data[0].name}</Text */}
            <Card mode={"elevated"}>
                <ScrollView>
                    <Text variant="h4" style={styles.text}>{data.name}'s Menu</Text>
                    {
                        data.menu.map((item, index) => {
                            return <TouchableOpacity onPress={() => handlePress(item)} key={index}>
                                <View style={styles.card} >
                                    <Card.Cover style={{ borderRadius: 10, height: 150 }} source={{ uri: 'https://picsum.photos/700' }} />
                                    <Card.Content>
                                        <Title>{item.menuItem}</Title>
                                        <Paragraph>{item.price}/-</Paragraph>
                                    </Card.Content>
                                </View>
                            </TouchableOpacity>
                        })
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
        // flex: 1,
        backgroundColor: 'black',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        margin: 16,
        textAlign: "center",
        color: '#ffb6c1'
    },
    card: {
        // backgroundColor: "#ffb6c1",
        margin: 15,
        marginBottom: 15,
        borderRadius: 10
    }
    // map: {
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height,
    // },
});