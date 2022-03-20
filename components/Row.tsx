import { Avatar, IconButton } from 'react-native-paper';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export interface Props {
    onUpdate: () => void,
    onClick: () => void,
    name: string,
    avatar: string,
    img: string,
}

function Row(props: Props) {
    return (
        <TouchableHighlight onPress={props.onClick} underlayColor="#aaa" >
            <View style={styles.container}>
                <View style={styles.left}>
                    {props.img == "" && <Avatar.Text size={40} label={props.avatar} style={styles.avatar} />}
                    {props.img != "" && <Avatar.Image size={40} source={{ uri: props.img }} style={styles.avatar} />}
                    <Text style={styles.name} >{props.name}</Text>
                </View>
                <IconButton
                    icon="account-edit"
                    color="#888"
                    size={32}
                    onPress={props.onUpdate}
                    style={styles.right}
                />
            </View>
        </TouchableHighlight>);
}

export default Row;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        justifyContent: "space-between",
        alignItems: 'center',
        paddingLeft: 20,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    left: {
        flex: 3,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    right: {
        flex: 1
    },
    avatar: {
        marginRight: 15
    },
    name: {
        fontSize: 18
    },


})