from typing import Dict, Union
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

def call(input: str) -> Dict[str, Union[bool, str]]:
    if "GOOGLE_API_KEY" not in os.environ:
        print(f"{dict(os.environ).keys()}")      # for debug
        return {
            "success": False,
            "message": "Gemini API not found",
            }
        
    prompt = ChatPromptTemplate.from_template("be like an assistant and answer to this:  {prompt}")
    model = ChatGoogleGenerativeAI(model="gemini-pro", convert_system_message_to_human=True)
    chain  = prompt | model | StrOutputParser()
    
    response:str = chain.invoke({"prompt": input})
    
    if not response:
        return {
            "success": False,
            "message": "Error in generation",
            }
        
    return {
        "success": True,
        "message": response,
        }
