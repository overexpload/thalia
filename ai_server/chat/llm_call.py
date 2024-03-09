from typing import Dict, Union
import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from .prompt import PROMPT

def call(input: str) -> Dict[str, Union[bool, str]]:
    if "OPENAI_API_KEY" not in os.environ:
        return {
            "success": False,
            "message": "OpenAI API key not found",
            }
        
    prompt = ChatPromptTemplate.from_template(PROMPT)
    model = ChatOpenAI(temperature=0)
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
