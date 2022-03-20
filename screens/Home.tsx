import { useEffect, useMemo } from 'react';

import { StyleSheet, ScrollView, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Row from '../components/Row';
import { RootStackScreenProps } from '../types';
import { IconButton } from 'react-native-paper';
import { useDB } from '../store/DBContext';
import { Person } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectSearchString, setCurrentId } from '../store/ContactSlice';

export default function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const contacts = useSelector(selectContacts);
  const searchString = useSelector(selectSearchString);
  const db = useDB();
  const dispatch = useDispatch();
  useEffect(() => {
    db.GetContacts();
  }, [])

  const listContact: Array<Person> = useMemo(
    () => {
      return contacts.filter(c => (c.lastName + " " + c.firstName).toLocaleLowerCase().includes(searchString.toLocaleLowerCase()));
    },
    [searchString, contacts]
  )
  const handleUpdate = (id: number) => {
    dispatch(setCurrentId(id))
    navigation.navigate("Update");
  }
  const handleClick = (id: number) => {
    dispatch(setCurrentId(id))
    navigation.navigate("Detail");
  }
  return (

    <View
      style={styles.container}>
      <HeaderBar />
      <ScrollView  >
        {listContact && listContact.map(c => <Row img={c.img} onUpdate={() => handleUpdate(c.id)} onClick={() => handleClick(c.id)} key={c.id} avatar={c.lastName[0] + c.firstName[0]} name={c.lastName + " " + c.firstName} />)}
      </ScrollView>
      <IconButton
        icon="plus"
        color="#fff"
        size={32}
        onPress={() => navigation.navigate("Add")}
        style={styles.add}
        animated
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  add: {
    backgroundColor: "rgb(98, 0, 238)",
    position: "absolute",
    right: 15,
    bottom: 15,
    opacity: 1,
    zIndex: 100
  }
});
