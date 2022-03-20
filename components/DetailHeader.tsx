import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { useDB } from '../store/DBContext';
function DetailHeader({ id }: { id: number }) {
    const navigation = useNavigation();
    const { Delete } = useDB();
    return (
        <Appbar.Header statusBarHeight={0} >
            <Appbar.Content title="Detail" />
            <Appbar.Action icon="delete" onPress={() => { Delete(id); navigation.goBack() }} />
            <Appbar.Action icon="close" onPress={() => { navigation.goBack() }} />
        </Appbar.Header>
    );
}

export default DetailHeader;