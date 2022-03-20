import { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchString, setString } from '../store/ContactSlice';

function HeaderBar() {
    const [active, setActive] = useState(false);
    const searchString = useSelector(selectSearchString);
    const dispatch = useDispatch();
    const handleBack = () => {
        setActive(false);
        dispatch(setString(""));
    }
    return (
        <Appbar.Header statusBarHeight={0} style={active ? styles.active : styles.inactive}>
            {!active && <Appbar.Content title="Contacts" />}
            {!active && <Appbar.Action icon="magnify" onPress={() => setActive(true)} />}
            {!active && <Appbar.Action icon="dots-vertical" onPress={() => { }} />}
            {active && <Appbar.BackAction onPress={handleBack} />}
            {active && <TextInput
                autoFocus
                placeholder='Search'
                style={styles.input}
                value={searchString}
                onChangeText={(t) => dispatch(setString(t))}
            />}
        </Appbar.Header>
    );
}

export default HeaderBar;

const styles = StyleSheet.create({
    inactive: {

    },
    active: {
        backgroundColor: "#fff"
    },
    input: {
        fontSize: 20
    }
})