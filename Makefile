# Variables
NODE_MODULES=./server/node_modules
DJANGO_VENV=./ai_server/venv

# Targets
.PHONY: all install_server install_client install_ai_server clean

all: install_server install_client install_ai_server

install_server:
    @echo "Installing server dependencies..."
    cd server && npm install

install_client:
    @echo "Installing client dependencies..."
    cd client && npm install

install_ai_server:
    @echo "Setting up Django virtual environment and installing dependencies..."
    cd ai_server && python3 -m venv venv && \
    $(DJANGO_VENV)/bin/pip install -r requirements.txt

clean:
    @echo "Cleaning up dependencies..."
	@git clean -xdf
    rm -rf $(NODE_MODULES) $(DJANGO_VENV)
