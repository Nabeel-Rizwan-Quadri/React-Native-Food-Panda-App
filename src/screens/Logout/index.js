import { View } from "react-native"
import { TextInput, Button, Text } from "@react-native-material/core";
import { logoutUser } from '../../config/firebase'

function Logout() {

    const handelPress = () => {
        logoutUser()
    }

    return <View>
        <Button
            variant="outlined"
            title="logout"
            color="red"
            style={{ margin: 30, textAlign: "center" }}
            onPress={handelPress}
        >

        </Button>
    </View>
}

export default Logout