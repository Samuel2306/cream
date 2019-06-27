/**
 *
 * @param v：顶点个数
 * @constructor
 */
function Matrix(v) {
  this.vertices = v
  this.matrix = [] // 结果矩阵
  this.edges = 0 // 记录边的数量
  this.genMatrix()
}
Matrix.prototype = {
  constructor: Matrix,
  genMatrix(){
    for (var i = 0; i < this.vertices; i++) {
      this.matrix[i] = []
      for (var j = 0; j < this.vertices; j++) {
        this.matrix[i].push(0)
      }
    }
  },
  addEdge: function(v,w){
    if(v != w){
      this.matrix[v][w] += 1
      this.matrix[w][v] += 1
    }else{
      this.matrix[v][w] += 1
    }
    this.edges++
  },
  readLine: function(index){
    var line = this.matrix[index]
    var str = ""
    for (var i = 0; i < line.length; i++) {
      str += (line[i] + " ")
    }
    str += '\n'
    return str
  },
  showRes(){
    var list = "  "
    for (var i = 0; i < this.vertices; i++) {
      list += (i + " ")
    }
    console.log(list  + '\n')
    for (var i = 0; i < this.vertices; i++) {
      var str = this.readLine(i)
      str = i + " " + str
      console.log(str)
    }
  }
}