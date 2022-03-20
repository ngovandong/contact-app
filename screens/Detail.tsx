
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import DetailHeader from '../components/DetailHeader';
import { useSelector } from 'react-redux';
import { selectCurrentId, selectCurrentPerson } from '../store/ContactSlice';

function Detail() {
    const currentId = useSelector(selectCurrentId);
    const person = useSelector(selectCurrentPerson);
    return (
        <View>
            <DetailHeader id={currentId} />
            <View style={styles.container}>
                <View style={styles.photo}>
                    {person.img == "" && <Image style={styles.img} resizeMode="contain" source={require("../assets/images/people.png")} />}
                    {person.img != "" && < Image style={styles.img} resizeMode="cover" source={{ uri: person.img }} />}
                </View>
                <View style={styles.info}>
                    <View style={styles.row} >
                        <Ionicons name="ios-person-circle-sharp" size={34} color="#aaa" />
                        <TextInput placeholder='First name' style={styles.input} value={person.firstName} editable={false} />
                    </View>
                    <View style={styles.row} >
                        <TextInput placeholder='Last name' style={[styles.input, { marginLeft: 44 }]} editable={false} value={person.lastName} />
                    </View>
                    <View style={styles.row} >
                        <FontAwesome5 name="phone-alt" size={34} color="#aaa" />
                        <TextInput placeholder='Phone' style={styles.input} editable={false} value={person.phone} />
                    </View>
                    <View style={styles.row} >
                        <Ionicons name="mail" size={34} color="#aaa" />
                        <TextInput placeholder='Email' style={styles.input} editable={false} value={person.email} />
                    </View>
                </View>
            </View>

        </View>
    );
}

export default Detail;

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
        position: "relative"
    },
    info: {
        flex: 3,
        display: 'flex'
    },
    img: {
        height: "100%",
        width: "auto",
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
        color: "#555"
    }

})