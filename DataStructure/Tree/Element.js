function Node(data, left, right){
  this.data = data
  this.left = left
  this.right = right
}

Node.prototype = {
  constructor: Node,
  show: function(){
    return this.data
  }
}

export default Node