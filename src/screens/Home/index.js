import { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Card, Title, Paragraph } from 'react-native-paper'
import { Text } from '@react-native-material/core'
import { fetchAllResturants } from "../../config/firebase"
// import * as Location from 'expo-location';

export default function Home({ navigation }) {

    const [data, setData] = useState()

    useEffect(() => {

        (async () => {
            const result = await fetchAllResturants()
            setData(result)
        })()

        // (async () => {
        //     let { status } = await Location.requestForegroundPermissionsAsync();
        //     if (status !== 'granted') {
        //         setErrorMsg('Permission to access location was denied');
        //         return;
        //     }
        // })();
    }, [])

    const handlePress = (id) => {
        navigation.navigate('menu', { id })
    }

    if (!data) {
        return <Text>Loading</Text>
    }

    return (
        <View style={styles.container}>
            {/* <Text>{data[0].name}</Text */}
            <Card mode={"elevated"}>
                <ScrollView>
                    <Text variant="h4" style={styles.text}>Our Restaurants</Text>
                    {
                        data.map((item, index) => {
                            return <TouchableOpacity onPress={() => handlePress(item.id)} key={index}>
                                <View style={styles.card} key={index} >
                                    <Card.Cover style={{ borderRadius: 10, height: 150 }} source={{ uri: 'https://picsum.photos/700' }} />
                                    <Card.Content>
                                        <Title>{item.name}</Title>
                                        <Paragraph>Card content</Paragraph>
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