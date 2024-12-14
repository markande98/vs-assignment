from typing import List, Dict

class Graph:

    def __init__(self, nodes: List[str]):
        self.graph: Dict[str, List[str]] = {} # initialze the graph
        for i in range(len(nodes)):
            self.graph[nodes[i]] = [] # map each node to empty list
        self.nodes = nodes # info on list of nodes
    
    def add_edge(self, u: str, v: str):
        self.graph[u].append(v) # add the edge from u to v node.
    
    def is_dag(self) -> bool:
        color = {} # Dict for coloring the graph
        for i in range(len(self.nodes)):
            color[self.nodes[i]] = 0 # 0 means the node is not visited

        def dfs(node: str): # depth first search 

            color[node] = 1 # mark the current node as being visited

            for neighbour in self.graph[node]: # explore the neighbours

                if color[neighbour] == 1: # means marked earlier in current dfs, cycle detected
                    return True
                
                if color[neighbour] == 0: # not visited, call the dfs on this node
                    if dfs(neighbour): # if found cycle through any neighbour return true
                        return True
            
            color[node] = 2 # mark for completely visited, cycle is not detected yet and return false
            return False

        for node in range(len(self.nodes)):
            if color[self.nodes[node]] == 0: # checks for node if it is visited or not and call dfs if not visited
                if dfs(self.nodes[node]): # cycle detected, graph is not DAG
                    return False
        return True # Graph is DAG

def is_direct_acyclic_graph(nodesData, edgesData) -> bool:
    dag_graph = Graph(nodesData) # initialize the graph
    
    for i in range(len(edgesData)):
        dag_graph.add_edge(edgesData[i]['from'], edgesData[i]['to'])
    
    res = dag_graph.is_dag();
    return res