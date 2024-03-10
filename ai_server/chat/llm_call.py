from typing import Dict, Union
import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from .prompt import PROMPT

def call(user_input: str) -> Dict[str, Union[bool, str]]:
    """
    Calls the OpenAI Chat API to generate a response.

    Args:
        user_input (str): The input text to generate a response for.

    Returns:
        Dict[str, Union[bool, str]]: A dictionary containing the success status and the generated response.
    """
    if "OPENAI_API_KEY" not in os.environ or not os.environ["OPENAI_API_KEY"]:
        return {
            "success": False,
            "message": "OpenAI API key not found or empty",
        }
        
    prompt = ChatPromptTemplate.from_template(PROMPT)
    model = ChatOpenAI(temperature=0)
    chain = prompt | model | StrOutputParser()
    
    try:
        response: str = chain.invoke({"prompt": user_input})
    except Exception as e:
        return {
            "success": False,
            "message": f"Error in generation: {str(e)}",
        }

    if not response:
        return {
            "success": False,
            "message": "Error in generation",
        }
        
    return {
        "success": True,
        "message": response,
    }
