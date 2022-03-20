import React, { useContext, useEffect } from "react";
import * as SQLite from 'expo-sqlite'
import { Person } from "../types";
import { Provider } from "react-native-paper";
import { Platform } from "react-native";
import { useContactDispatch } from '../store/store';
import { setContacts } from "./ContactSlice";


type Provider = {
    GetContacts: () => void,
    AddContact: (person: Person) => void,
    Clear: () => void,
    Delete: (id: number) => void,
    Update: (person: Person) => void,

}


function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        };
    }

    const db = SQLite.openDatabase("db.Contact");
    return db;
}

const db = openDatabase();

const DBContext = React.createContext<Provider>({} as Provider);

export function useDB() {
    return useContext(DBContext);
}


export function DBProvider({ children }: { children: any }) {
    const dispatch = useContactDispatch();
    useEffect(() => {
        // db.transaction(tx => {
        //     tx.executeSql(
        //         'drop table Contact'
        //     )
        // })
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Contact (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT,phone TEXT, email TEXT,img TEXT)'
            )
        })
    }, [])

    const GetContacts = () => {
        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql(
                'SELECT * FROM Contact',
                undefined, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => dispatch(setContacts(_array)),
                // failure callback which sends two things Transaction object and Error
                (txObj, Error) => { console.log('Error ', Error); return false; }
            ) // end executeSQL
        }) // end transaction
    }

    const AddContact = (person: Person): void => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Contact (firstName , lastName, phone, email, img) values (?, ?, ?, ?,?)',
                [person.firstName, person.lastName, person.phone, person.email, person.img],
                (txObj, resultSet) => { GetContacts() },
                (txObj, error) => { console.log('Error', error); return false }
            )
        }
        )
    }

    const Clear = () => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM Contact')
        }
        )
    }

    const Delete = (id: number) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM Contact where id= ?',
                [id],
                (txObj, resultSet) => { GetContacts() },
                (txObj, error) => { console.log('Error', error); return false }
            )
        }
        )
    }

    const Update = (person: Person) => {
        db.transaction(tx => {
            tx.executeSql('UPDATE Contact SET firstName=?, lastName=?, phone=?, email=?,img=? WHERE id = ?',
                [person.firstName, person.lastName, person.phone, person.email, person.img, person.id],
                (txObj, resultSet) => { GetContacts() },
                (txObj, error) => { console.log('Error', error); return false }
            )
        }
        )
    }


    const value = {
        GetContacts,
        AddContact,
        Clear,
        Delete,
        Update
    };

    return (
        <DBContext.Provider value={value} >
            {children}
        </DBContext.Provider>
    )
}