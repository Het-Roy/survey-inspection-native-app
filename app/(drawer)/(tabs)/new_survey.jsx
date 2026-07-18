import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React from 'react'

const new_survey = () => {
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Text style={styles.title}>New Survey</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>Please fill out the following information to create a new survey.</Text>
        <TextInput placeholder="Survey Title" style={styles.input} />
        <TextInput placeholder="Survey Description" style={styles.inputDescription} multiline />
        <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Create Survey</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default new_survey

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    formContainer: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        width: '90%',
        marginHorizontal: '5%',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 16,

    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 16,
        width: '90%',
        marginHorizontal: '5%',
    },
    inputDescription: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 16,
        width: '90%',
        marginHorizontal: '5%',
        minHeight: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: 'black',
        padding: 12,
        width: '90%',
        marginHorizontal: '5%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})