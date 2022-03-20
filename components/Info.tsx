import { Image, StyleSheet, TextInput, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

enum Mode {
    DETAIL,
    ADD,
    UPDATE,
}
function Infor({ person, mode }: { person: any, mode: Mode }) {
    return (
        <View style={styles.container}>
            <View style={styles.photo}>
                <Image style={styles.img} source={require("../assets/images/people.png")} />
                {mode != Mode.DETAIL && <IconButton
                    icon="camera"
                    color="#fff"
                    size={28}
                    onPress={() => console.log('Pressed')}
                    style={styles.addPhoto}
                />}
            </View>
            <View style={styles.info}>
                <View style={styles.row} >
                    <Ionicons name="ios-person-circle-sharp" size={34} color="#aaa" />
                    <TextInput placeholder='First name' style={styles.input} value={person.firstName} editable={mode!=Mode.DETAIL} />
                </View>
                <View style={styles.row} >
                    <TextInput placeholder='Last name' style={[styles.input, { marginLeft: 44 }]} editable={mode!=Mode.DETAIL} value={person.lastName} />
                </View>
                <View style={styles.row} >
                    <FontAwesome5 name="phone-alt" size={34} color="#aaa" />
                    <TextInput placeholder='Phone' style={styles.input} editable={mode!=Mode.DETAIL} value={person.phone} />
                </View>
                <View style={styles.row} >
                    <Ionicons name="mail" size={34} color="#aaa" />
                    <TextInput placeholder='Email' style={styles.input} editable={mode!=Mode.DETAIL} value={person.email} />
                </View>
            </View>
        </View>
    );
}

export default Infor;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: "100%"
    },
    photo: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        backgroundColor: "#ddd",
        padding: 10,
        position: "relative"
    },
    info: {
        flex: 3,
        display: 'flex'
    },
    img: {
        height: "100%",
        width: "auto",
        resizeMode: "contain",
    },
    addPhoto: {
        position: "absolute",
        right: 0,
        bottom: 0,
    },
    row: {
        height: 60,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        marginLeft: 10,
        fontSize: 20,
        borderBottomWidth: 1,
        height: 50,
        width: "75%",
    }

})