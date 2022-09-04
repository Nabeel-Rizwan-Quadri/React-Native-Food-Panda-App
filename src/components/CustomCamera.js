import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function CustomCamera() {
    const [type, setType] = useState(CameraType.back)
    const [permission, requestPermission] = Camera.useCameraPermissions()
    const [photoUrl, setPhotoUrl] = useState()
    const ref = useRef(null)

    if (!permission) {
        return <Text>No Permission</Text>
    }


    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }


    function toggleCameraType() {
        setType((current) => (
            current === CameraType.back ? CameraType.front : CameraType.back
        ));
    }

    const takePicture = async () => {
        console.log('takePicture chala -->')
        const photo = await ref.current.takePictureAsync()
        console.log('photo', photo)
        setPhotoUrl(photo.uri)
    }

    return (
        <View style={styles.container}>
            {photoUrl ? 
             <Image source={{ uri: photoUrl }} style={styles.photoUrl}/>
             :
             <Camera style={styles.camera} type={type} ref={ref}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={takePicture}>
                        <Image
                        style={styles.image}
                        source={{
                            uri: 'https://www.freeiconspng.com/uploads/camera-icon-circle-21.png',
                          }} />
                    </TouchableOpacity>
                </View>
            </Camera>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'gray'
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    image: {
        width: 60,
        height: 60
    },
    photoUrl: {
        flex: 1
    }
});