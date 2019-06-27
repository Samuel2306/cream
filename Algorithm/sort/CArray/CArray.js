function CArray(numElements) {
  this.dataStore = []
  this.pos = 0
  this.numElements = numElements
  for (let i = 0; i < this.numElements; i++) {
    this.dataStore[i] = i
  }
}

CArray.prototype = {
  constructor: CArray,
  setData: function(){
    for (let i = 0; i < this.numElements; i++) {
      this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1))
    }
  },
  clear: function(){
    for (let i = 0; i < this.numElements; i++) {
      this.dataStore[i] = 0
    }
  },
  insert: function(element){
    this.dataStore[this.pos++] = element
  },
  toString: function(){
    var restr = ""
    for (var i = 0; i < this.dataStore.length; i++) {
      restr += this.dataStore[i] + " "
      if(i > 0 && i%10 == 0){
        restr += '\n'
      }
    }
    return restr
  },
  swap: function(arr,index1,index2){
    var temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
  },

  bubbleSort: function(){
    var numElements = this.dataStore.length
    var temp
    for (var outer = numElements; outer >= 2 ; outer--) {
      for (var inner = 0; inner <= outer - 1; inner++) {
        if(this.dataStore[inner] > this.dataStore[inner + 1]){
          this.swap(this.dataStore, inner,inner + 1)
        }
      }
    }
  }
}