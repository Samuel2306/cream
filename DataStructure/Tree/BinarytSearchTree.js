/**
 * 二叉搜索树
 */
import Node from './Element'

function BinarytSearchTree(){
  this.root = null
}
BinarytSearchTree.prototype = {
  constructor: BinarytSearchTree,
  resList: [],
  clearResList: function(){
    this.resList = []
  },
  showResList: function(){
    console.log(this.resList.join(' '))
  },
  putStr: function(str){
    this.resList.push(str)
  },
  insert: function(data){
    var node = new Node(data,null,null)
    if(this.root == null){
      this.root = node
    }else{
      var current = this.root
      var parent
      // 循环遍历
      while(true){
        parent = current;
        if(data < current.data){
          current = current.left
          if(current == null){
            parent.left = n;
            break;
          }
        }else {
          current = current.right
          if(current == null){
            parent.right = n;
            break;
          }
        }
      }
    }
  },
  // 中序遍历
  inOrder: function(node){
    if(!(node == null)){
      this.inOrder(node.left)
      this.putStr(node.show())
      this.inOrder(node.right)
    }
  },
  // 先序遍历
  preOrder: function(node){
    if(!(node == null)){
      this.putStr(node.show())
      this.inOrder(node.left)
      this.inOrder(node.right)
    }
  },
  // 后序遍历
  postOrder: function(node){
    if(!(node == null)){
      this.inOrder(node.left)
      this.inOrder(node.right)
      this.putStr(node.show())
    }
  },

  //查找最小值
  getMin: function(){
    var current = this.root
    while(current.left != null){
      current = current.left
    }
    return current.data
  },

  //查找最大值
  getMax: function(){
    var current = this.root
    while(current.right != null){
      current = current.right
    }
    return current.data
  },

  // 查找给定值
  find: function(data){
    var current = this.root
    while(current != null){
      if(current.data == data){
        return current
      }else if(current.data > data){
        current = current.left
      }else{
        current = current.right
      }
    }
    return null
  },


  // 如果待删除节点是叶子节点，那么只需要把父节点指向它的链接指向null就行
  // 如果待删除节点只包含一个子节点，那么原本指向它的节点就得做一些调整，使其指向它的子节点
  // 如果待删除节点包含两个子节点，正确的做法有两种：要么查找待删除节点左子树上的最大值，要么查找其右子树上的最小值。我们选择后一种方式
  // 选择以上两种方式的原因是要保证搜索二叉树的结构正确
  // 我们需要定义一个查找子树上最小值的方法，后面会用它找到的最小值创建一个临时节点。将临时节点上的值复制到待删除节点，然后再删除临时节点

  // 本函数返回null的结果就是解除父子节点的关联关系，相当于删除子节点
  removeNode: function(node,data){
    // 节点不存在直接返回null
    if(node == null){
      return null
    }

    if(data == node.data){
      // 没有子节点的节点
      if(node.left == null && node.right == null){
        return null;
      }
      // 没有左子节点的节点
      if(node.left == null){
        return node.right
      }
      // 没有右子节点的节点
      if(node.right == null){
        return node.left
      }

      // 有两个子节点的节点
      var tempNode = this.getSmallest(node.right)
      node.data = tempNode.data
      node.right = this.removeNode(node.right,tempNode.data)
      return node
    }else if(data < node.data){
      node.left = this.removeNode(node.left,data)
      return node
    }else{
      node.right = this.removeNode(node.right,data)
      return node
    }
  },
  remove: function(data){
    // 重新给root赋值的过程就是刷新整棵树的过程
    this.root = this.removeNode(this.root,data)
  },
  getSmallest: function(node){
    while(node.left != null){
      node = node.left
    }
    return node
  }
}
