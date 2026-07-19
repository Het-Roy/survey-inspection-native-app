import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import { router } from 'expo-router';
import React from 'react'
import {SurveyContext} from "@/contexts/SurveyProvider";
import { useContext } from 'react';

const Dashboard = () => {
  const { surveyData } = useContext(SurveyContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Survey and Inspection App</Text>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Roy Het Jayeshkumar</Text>
        <Text style={styles.userName}>SUK250054CE058</Text>
        <Text style={styles.userName}>BE(CE), SUK</Text>
      </View>
      <View style={styles.surveyCount}>
        <Text style={styles.surveyCountText}>Survey Count: {surveyData.length}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => router.push("/(tabs)/new_survey")}>
          <Text style={styles.buttonText}>New Survey</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => router.push("/(tabs)/history")}>
          <Text style={styles.buttonText}>History</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => router.push("/(tabs)/profile")}>
          <Text style={styles.buttonText}>View Profile</Text>
        </Pressable>
      </View>
      <View style={styles.recentSurveys}>
        <Text style={styles.recentSurveysTitle}>Recent Surveys</Text>
        <FlatList
          data={surveyData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <Text style={styles.recentSurveyItem}>{item.title}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
  userInfo: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: 'black',
    padding: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  surveyCount: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: 'black',
    padding: 12,
  },
  surveyCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  recentSurveys: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'black',
    padding: 12,
  },
  recentSurveysTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  recentSurveyItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
})