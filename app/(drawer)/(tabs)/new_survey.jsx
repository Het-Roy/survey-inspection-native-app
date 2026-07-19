import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React,{useContext,useState} from 'react'
import { SurveyContext } from '@/contexts/SurveyProvider';

const new_survey = () => {

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const { addSurvey } = useContext(SurveyContext);

    const handlePress = () => {
        addSurvey({title,description});
        setTitle("");
        setDescription("");
    }


  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Text style={styles.title}>New Survey</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>Please fill out the following information to create a new survey.</Text>
        <TextInput placeholder="Survey Title" style={styles.input} value={title} onChangeText={setTitle}/>
        <TextInput placeholder="Survey Description" style={styles.inputDescription} multiline value={description} onChangeText={setDescription}/>
        <Pressable style={styles.button} onPress={handlePress}>
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