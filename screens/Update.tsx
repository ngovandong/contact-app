
import React, { useState } from 'react';

import { Image, StyleSheet, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import CreateHeader from '../components/CreateHeader';
import { useDB } from '../store/DBContext';
import { Person } from '../types';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

import { selectCurrentId, selectCurrentPerson } from '../store/ContactSlice';

function Update() {
    const db = useDB();
    const navigation = useNavigation();
    const person = useSelector(selectCurrentPerson);
    const currentId = useSelector(selectCurrentId);

    const [first, setFirst] = useState(person.firstName);
    const [last, setLast] = useState(person.lastName);
    const [phone, setPhone] = useState(person.phone);
    const [email, setEmail] = useState(person.email);
    const [imgsource, setImgsource] = useState(person.img);

    const Update = () => {
        if (first && last && phone && email) {
            const person: Person = { id: currentId, firstName: first, lastName: last, phone, email, img: imgsource }
            db.Update(person);
            navigation.goBack();
        } else {
            console.log("wrong input!");
        }
    }
    const handleUploadImg = async () => {

        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        const options: ImagePicker.ImagePickerOptions = {
            base64: true
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync(options);
        if (!pickerResult.cancelled) {
            setImgsource('data:image/jpeg;base64,' + pickerResult.base64)
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <CreateHeader onPress={Update} title="Update contact" />
            <View style={styles.container}>
                <View style={styles.photo}>
                    {imgsource == "" && <Image style={styles.img} resizeMode="contain" source={require("../assets/images/people.png")} />}
                    {imgsource != "" && <Image style={styles.img} resizeMode="cover" source={{ uri: imgsource }} />}
                    <IconButton
                        icon="camera"
                        color="#fff"
                        size={28}
                        onPress={() => handleUploadImg()}
                        style={styles.addPhoto}
                    />
                </View>
                <View style={styles.info}>
                    <View style={styles.row} >
                        <Ionicons name="ios-person-circle-sharp" size={34} color="#aaa" />
                        <TextInput placeholder='First name' style={styles.input} value={first} onChangeText={setFirst} />
                    </View>
                    <View style={styles.row} >
                        <TextInput placeholder='Last name' style={[styles.input, { marginLeft: 44 }]} value={last} onChangeText={setLast} />
                    </View>
                    <View style={styles.row} >
                        <FontAwesome5 name="phone-alt" size={34} color="#aaa" />
                        <TextInput placeholder='Phone' style={styles.input} value={phone} onChangeText={setPhone} />
                    </View>
                    <View style={styles.row} >
                        <Ionicons name="mail" size={34} color="#aaa" />
                        <TextInput placeholder='Email' style={styles.input} value={email} onChangeText={setEmail} />
                    </View>
                </View>
            </View>

        </KeyboardAvoidingView>
    );
}

export default Update;

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
        width: "75%"
    }

})