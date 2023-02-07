import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import database from '../config'

export default function Details({navigation, route}) {
    const [descriptionEdit, setDescriptionEdit] = useState(route.params.description)
    const idTask = route.params.id
    function editTask(description, id) {
        database.collection("Task").doc(id).update({description:description})
        navigation.navigate("Task")
    }
    return (
        <View style={styles.container}>
        <Text style={styles.label}>
            Editar Tarefa
        </Text>
        <TextInput 
        style={styles.input}
        onChangeText={setDescriptionEdit}
        value={descriptionEdit} />
        <TouchableOpacity style={styles.buttonNewTask} onPress={() => {
            editTask(descriptionEdit, idTask)
        }}> 
            <Text style={styles.iconButton}>
                Salvar
            </Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    label: {
        width: "90%",
        marginTop: 70,
        fontSize: 16,
        marginLeft: 20,
        color: "#F92E6A"
    },
    input: {
        width: "90%",
        marginTop: 10,
        padding: 10,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#F92E6A",
        marginLeft: "auto",
        marginRight: "auto"
    },
    iconButton: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
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
    }
})