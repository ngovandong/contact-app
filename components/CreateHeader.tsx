import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
function CreateHeader(props: { onPress: () => void, title: string }) {
    const navigation = useNavigation();
    return (
        <Appbar.Header statusBarHeight={0} style={{width:"100%"}}>
            <Appbar.Content title={props.title} />
            <Appbar.Action icon="account-multiple-check" onPress={props.onPress} />
            <Appbar.Action icon="close" onPress={() => { navigation.goBack() }} />
        </Appbar.Header>
    );
}

export default CreateHeader;