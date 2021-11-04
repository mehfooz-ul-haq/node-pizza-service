const result = [];
const obj = {
  chainMe: function(value) {
      if(!value)
      return result.join(" ");
    
    result.push(value);
    return this
  }
}

console.log(obj.chainMe("This").chainMe("is").chainMe("function").chainMe("testing").chainMe());