/**
 * 数组的形式表示顶点之间的关联
 * @param v：顶点个数
 * @constructor
 */
function Graph(v){
  // 图中顶点的长度
  this.vertices = v
  // 用来记录图中边的数量
  this.edges = 0
  this.adj = []
  // 为每个顶点添加一个子数组来存储所有相邻顶点，并在数组中放入一个空的字符串
  for(var i = 0; i < this.vertices; i++){
    this.adj[i] = []
    // this.adj[i].push("")
  }
  this.resStr = ""

  this.marked = []
  for(var i = 0; i < this.vertices; i++){
    this.marked[i] = false
  }
  // 用来保存一个顶点到下一个顶点的所有边
  this.edgeTo = []
}
Graph.prototype = {
  constructor: Graph,
  addEdge: function(v,w){
    this.adj[v].push(w)
    this.adj[w].push(v)
    this.edges++
  },
  showGraph(){
    for(var i = 0; i < this.vertices; i++){
      this.resStr = ""
      this.putStr(i + " -> ")
      var list = this.adj[i]
      for(var j = 0; j < list.length; j++){
        this.putStr(list[j] + ' ')
      }
      this.resStr += '\n'
      this.print()
    }
  },
  putStr: function(str){
    this.resStr += str
  },
  print: function(str){
    if(str){
      console.log(str)
      return
    }
    console.log(this.resStr)
  },
  // 深度优先的搜索方式
  dfs: function(v){
    this.marked[v] = true
    if(this.adj[v] != undefined){
      // this.print("Visited vertex: " + v)
    }
    for (var i = 0; i < this.adj[v].length; i++) {
      if(!this.marked[this.adj[v][i]]){
        this.dfs(this.adj[v][i])
      }
    }
  },
  topSort: function() {
    var stack = []
    var visited = []
    for (var i = 0; i < this.vertices; i++) {
      visited[i] = false
    }
    for (var i = 0; i < this.vertices; i++) {
      if(visited[i] == false){
        this.topSortHelper(i,visited,stack)
      }
    }
    console.log(stack)
  },
  topSortHelper: function(v,visited,stack){
    visited[v] = true
    for (var i = 0; i < this.adj[v].length; i++) {
      var w = this.adj[v][i]
      if(!visited[w]){
        this.topSortHelper(w,visited,stack)
      }
    }
    stack.push(v)
  },
  // 广度优先的搜索方式
  bfs: function(s){
    var queue = [] // 把层级深的元素先推到队列里面，采用先进先出的方式体现广度优先
    this.marked[s] = true
    queue.push(s)
    while(queue.length > 0){
      // 从对首移除
      var v = queue.shift()
      if(v != undefined){
        // this.print("Visited vertex: " + v)
      }

      for (var i = 0; i < this.adj[v].length; i++) {
        var w = this.adj[v][i]
        if(!this.marked[w]){
          this.edgeTo[w] = v
          this.marked[w] = true
          queue.push(w)
        }
      }
    }
  },
  pathTo: function(v){
    var source = 0;
    if(!this.hasPathTo(v)){
      return undefined
    }
    var path = []
    for (var i = v; i != source; i = this.edgeTo[i]) {
      path.push(i)
    }
    path.push(source)
    return path
  },
  hasPathTo(v){
    return this.marked[v]
  }
}
