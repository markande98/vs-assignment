import json
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from util import is_direct_acyclic_graph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"], 
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    pipeline_data = json.loads(pipeline)
    num_nodes = len(pipeline_data['nodesData'])
    num_edges = len(pipeline_data['edgesData'])
    is_dag = is_direct_acyclic_graph(pipeline_data['nodesData'], pipeline_data['edgesData'])
    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
