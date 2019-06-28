var rootId = 0
var rootLabel = '根目录'
var rootNode = {id:rootId, pid:null, label:rootLabel, children: []}
var data = [
  {id:1, pid:rootId, label:"安装类"},
  {id:2, pid:rootId, label:"快递类"},
  {id:3, pid:rootId, label:"未迁移商品"},
  {id:4, pid:1, label:"车窗隔热膜"},
  {id:5, pid:1, label:"test"},
  {id:6, pid:2, label:"T恤"},
  {id:7, pid:3, label:"帽子"},
  {id:8, pid:1, label:"牛仔裤"},
  {id:9, pid:6, label:"短袖T恤"},
  {id:10, pid:8, label:"破洞牛仔裤"},
  {id:11, pid:10, label:"哈哈哈"}
]
// id与节点的映射图
var map = {}
map[rootId] = rootNode
// 节点关系对象
var graph = {}

// 保存结果的对象
var res = rootNode

function _formatter(list){
  list = list || data
  list.forEach((item) => {
    map[item.id] = item
    if(!graph[item.pid]){
      graph[item.pid] = []
    }
    graph[item.pid].push(item.id)
  })
}
function _genTreeData(id,item){
  var id = id || rootId
  var item = item || res
  item.children = item.children || []
  var childrenIds = graph[id]
  childrenIds.forEach((curId) => {
    item.children.push(map[curId])
    if(graph[curId] && graph[curId].length){
      _genTreeData(curId,map[curId])
    }
  })
}
function deleteNode(id){
  var pid = map[id].pid
  var parentNode = map[pid]
  var children = parentNode.children
  for (var i = children.length - 1; i >= 0; i--) {
    if(children[i].id = id){
      children.splice(i)
      graph[pid].splice(graph[pid].indexOf(id),1)
      delete map[id]
      break;
    }
  }
  if(!children.length){
    delete parentNode.children
  }
  if(!graph[pid].length){
    delete graph[pid]
  }
}

function addNodes(list){
  while(list.length){
    var flag = false
    for (var i = list.length - 1; i >= 0; i--) {
      var item = list[i]
      if(map[item.pid]){
        flag = true
        map[item.pid].children = map[item.pid].children || []
        map[item.pid].children.push(item)
        map[item.id] = item
        graph[item.pid] = graph[item.pid] || []
        graph[item.pid].push(item.id)
        list.splice(i,1)
      }
    }
    if(!flag){
      console.log("存在找不到父节点的数据")
      console.log(list)
      list = []
    }
  }
}


_formatter()
_genTreeData()
console.log(res)
console.log(map)
console.log(graph)

deleteNode(11)

console.log(res)
console.log(map)
console.log(graph)

addNodes([{id:12, pid:11, label:"子节点"},{id:11, pid:9, label:"哈哈哈"}])
console.log(res)
console.log(map)
console.log(graph)