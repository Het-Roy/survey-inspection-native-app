import React, { useContext } from "react";
import { Alert, Button, Text, View } from "react-native";
import { SurveyContext } from "../context/SurveyContext";

const SurveyPreview = ({ navigation }) => {
  const { surveyData } = useContext(SurveyContext);

  const survey = surveyData[0];

  return (
    <View>

      <Text>Site : {survey.siteName}</Text>

      <Text>Client : {survey.clientName}</Text>

      <Text>Contact : {survey.contact}</Text>

      <Text>Location : {survey.location}</Text>

      <Text>Priority : {survey.priority}</Text>

      <Text>Notes : {survey.notes}</Text>

      <Text>Photo : {survey.photo}</Text>

      <Button
        title="Edit Survey"
        onPress={() => navigation.goBack()}
      />

      <Button
        title="Submit Survey"
        onPress={() => Alert.alert("Success", "Survey Submitted")}
      />

    </View>
  );
};

export default SurveyPreview;