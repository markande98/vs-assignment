# This project contains information about nodes and edges in the form of UI (react), backend is written using python/FastAPI which tells us the graph is DAG or not.

## DAG - (Direct Acyclic Graph)

## Setup

### Locally

#### navigate to /frontend

Install dependencies:

```
npm install
```

Compile scripts and styles:

```
npm start
```

It will start the frontend on localhost:3000

#### navigate to /backend

Create virtual environment variable:

```
python -m venv env
```

Activate this env varibale:

```
source env/bin/activate
```

Install dependencies:

```
pip install -r requirements.txt
```

Start the backend:

```
python -m uvicorn main:app --reload
```

It will start the backend on localhost:8000

## with docker

#### run this command from root directory.

```
docker compose up -d
```

## Screenshots:

| Nodes                                                     | DAG Graph                                                     | NOT DAG GRAPH                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------- |
| ![Login page](screenshots/nodes.png?raw=true "Node page") | ![Registration page](screenshots/dag.png?raw=true "DAG page") | ![Registration page](screenshots/not_dag.png?raw=true "Not DAG page") |
