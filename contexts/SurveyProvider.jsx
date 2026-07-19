import React,{useState,createContext} from 'react'


export const SurveyContext = createContext()


function SurveyProvider({ children }) {
  const [surveyData, setSurveyData] = useState([]);

  const addSurvey = (survey) =>{
    setSurveyData((prev) => [
        {
            id:Date.now().toString(),
            title : survey.title,
            description : survey.description,
        },
        ...prev
    ])
  }

  return (
    <SurveyContext.Provider value={{ surveyData, addSurvey }}>
      {children}
    </SurveyContext.Provider>
  )
}

export default SurveyProvider