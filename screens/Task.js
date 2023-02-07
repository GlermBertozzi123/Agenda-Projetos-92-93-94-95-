import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import database from "../config.js"
import { MaterialIcons } from "@expo/vector-icons"

export default function Task({ navigation }) {
    const [task, setTask] = useState([])
    function deleteTask(id) {
        Alert.alert(
            "Delete",
            "Tem certeza que quer deletar?",
            [{
                text: "Cancel",
                onPress: () => {
                    return;
                },
                style: "cancel"
            }, {
                text: "Ok",
                onPress: () => {
                    database.collection("Task").doc(id).delete()
                }
            }], {
            cancelable: false
        }
        )
    }
    useEffect(() => {
        database.collection("Task").onSnapshot((query) => {
            const list = []
            query.forEach(doc => {
                list.push({ ...doc.data(), id: doc.id })
            });
            setTask(list)
        })
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                Lista de Tarefas:
            </Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={task}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text 
                            style={styles.descriptionTask} 
                            onPress={() => {
                                navigation.navigate("Details", {
                                    id: item.id,
                                    description: item.description
                                })
                            }} >
                                {item.description}
                            </Text>
                            <TouchableOpacity
                                style={styles.deleteTask}
                                onPress={() => deleteTask(item.id)} >
                                <MaterialIcons
                                    name="delete-forever"
                                    size={25}
                                    color="#F64372" />
                            </TouchableOpacity>
                        </View>
                    )
                }} />
            < TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => navigation.navigate("NewTask")}>
                <Text style={styles.iconButton}>
                    +
                </Text>
            </TouchableOpacity >
        </View >
    )
}

const styles = StyleSheet.create({
    label: {
        width: "90%",
        marginTop: 50,
        fontSize: 16,
        marginLeft: 20,
        color: "#F92E6A"
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: 20
    },
    buttonNewTask: {
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 30,
        left: 20,
        backgroundColor: "#F92E6A",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    iconButton: {
        color: "#FFF",
        fontSize: 25,
        fontWeight: "bold"
    },
    deleteTask: {
        justifyContent: "center",
        paddingRight: 35
    },
    descriptionTask: {
        width: "75%",
        alignItems: "flex-start",
        backgroundColor: "#F5F5F5CF",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 5,
        marginRight: 15,
        marginLeft: 10,
        color: "#282B2DB5"
    }
})