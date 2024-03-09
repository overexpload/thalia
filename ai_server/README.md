# AI Server 🤖 [[Thalia](https://github.com/Auto-Playground/thalia)]
@hosted ai [thalia-ai-server.vercel.app](https://thalia-ai-server.vercel.app/)

Welcome to the Thalia AI Server repository! This folder contains all the code for the Django server that provides chat functionality for the Thalia web app. The server is built with Django Rest Framework and integrates LangChain and OpenAI LLM for chat capabilities.

## Features

- **Chat Functionality:** Provides real-time chat functionality for the Thalia web app, allowing users to interact with AI-powered chatbots.
- **Django Rest Framework:** Utilizes Django Rest Framework for building RESTful APIs to handle chat requests and responses.
- **LangChain Integration:** Integrates LangChain for natural language processing and understanding, enabling intelligent conversation flows.
- **OpenAI LLM:** Utilizes OpenAI's Language Learning Model (LLM) for generating responses to user queries and messages.
- **Security:** Implements security best practices to protect user data and ensure secure communication between clients and the server.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Auto-Playground/thalia
cd ai_server
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Configure environment variables:

```bash
# Create a .env file in the ai_server directory and add the following:
HF_TOKEN=<your_hf_token>
OPENAI_API_KEY=<openai_api_key>
```

4. Run database migrations:

```bash
python manage.py migrate
```

5. Start the development server:

```bash
python manage.py runserver
```

6. The server will start running at the specified port. You can now integrate the chat functionality into the Thalia web app.

## Directory Structure

The ai_server folder is organized as follows:

```
ai_server/
│
├── chat/                     # Chat app directory
├── ai_server/                # Django project directory
│
├── .env                      # Environment variables file
├── .gitignore                # Git ignore file
├── manage.py                 # Django management script
├── requirements.txt          # Python dependencies
├── vercel.json               # Vercel deployment configuration
└── README.md                 # This README file
```

## Contributing

Contributions to the Thalia AI Server are welcome! Please refer to the [CONTRIBUTING.md](../CONTRIBUTING.md) file for guidelines and instructions.

## License

This project is licensed under the MIT License - see the [LICENSE.md](../LICENSE) file for details.

## Acknowledgements

- Thalia team would like to thank the creators and contributors of Django, Django Rest Framework, LangChain, and OpenAI for their amazing work and contributions.
- Special thanks to all contributors and supporters who help make Thalia AI Server a reality.