import { StyleSheet, Text, View,FlatList } from 'react-native'
import React,{useContext} from 'react'
import { SurveyContext } from '../../../contexts/SurveyProvider'

const history = () => {

    const {surveyData} = useContext(SurveyContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <Text style={styles.description}>Your survey history will be displayed here.</Text>
      <FlatList
        data={surveyData}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        )}
       />
    </View>
  )
}

export default history

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    item: {
        padding: 12,
        borderWidth: 1,
        borderColor: 'red',
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
})