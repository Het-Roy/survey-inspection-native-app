import React, { createContext, useState } from "react";

export const SurveyContext = createContext();

function SurveyProvider({ children }) {
  const [surveyData, setSurveyData] = useState([
    {
      id: "1",
      siteName: "ABC Construction",
      clientName: "John Smith",
      contact: "9876543210",
      location: "Ahmedabad",
      notes: "Need electrical inspection",
      priority: "High",
      photo: "No Photo",
    },
    {
      id: "2",
      siteName: "XYZ Factory",
      clientName: "David",
      contact: "9123456780",
      location: "Surat",
      notes: "Safety inspection",
      priority: "Medium",
      photo: "No Photo",
    },
  ]);

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