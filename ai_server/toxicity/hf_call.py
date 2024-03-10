from typing import Dict, Union, List
import requests
import os

RESPONSE_TYPE = Dict[str, Union[str, float]]


def _transform_response(response: List[List[RESPONSE_TYPE]]) -> RESPONSE_TYPE:
    """
    Transforms the response from the API call.

    Args:
        response (List[List[RESPONSE_TYPE]]): The response from the API call.

    Returns:
        RESPONSE_TYPE: The transformed response.
    """
    if response[0][0]["score"] > response[0][1]["score"]:
        return response[0][0]
    return response[0][1]


def call(text: str) -> RESPONSE_TYPE:
    """
    Calls the Hugging Face API to classify toxic comments.

    Args:
        text (str): The text to classify.

    Returns:
        RESPONSE_TYPE: The response from the API.
    """
    if "HF_TOKEN" not in os.environ or not os.environ["HF_TOKEN"]:
        return {
            "success": False,
            "message": "Huggingface Token not found or empty",
        }

    HF_TOKEN = os.environ["HF_TOKEN"]
    headers = {"Authorization": f"Bearer {HF_TOKEN}"}
    api_url = (
        "https://api-inference.huggingface.co/models/martin-ha/toxic-comment-model"
    )

    response = requests.post(api_url, headers=headers, json={"inputs": text})

    if response.status_code != 200:
        return {
            "success": False,
            "message": f"API returned status code {response.status_code}",
        }

    response_data = response.json()
    transformed_response = _transform_response(response_data)
    transformed_response["success"] = True
    
    return transformed_response
