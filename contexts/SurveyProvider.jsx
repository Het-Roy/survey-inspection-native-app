import React, { createContext, useState } from "react";

export const SurveyContext = createContext();

function SurveyProvider({ children }) {
  const [surveyData, setSurveyData] = useState([]);

  const addSurvey = (survey) => {
    setSurveyData((prev) => [
      {
        id: Date.now().toString(),
        ...survey,
      },
      ...prev,
    ]);
  };

  const updateSurvey = (id, updatedSurvey) => {
    setSurveyData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedSurvey } : item
      )
    );
  };

  const deleteSurvey = (id) => {
    setSurveyData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SurveyContext.Provider
      value={{
        surveyData,
        addSurvey,
        updateSurvey,
        deleteSurvey,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export default SurveyProvider;