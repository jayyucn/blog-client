
// 导出一个deepClone函数，用于深拷贝一个对象
export function deepClone<T>(source: T): T {
    // 如果source不是对象类型，或者source为null，则直接返回source
    if (typeof source !== "object" || source === null) {
      return source as T
    }
  
    // 如果source是数组类型，则遍历数组，对每一个元素进行深拷贝，最后返回一个新的数组
    if (Array.isArray(source)) {
      return (source.map(item => deepClone(item)) as unknown) as T
    }
  
    // 否则，source是普通对象，创建一个新的空对象，用于存放深拷贝后的结果
    const target = {} as T
    // 遍历source对象的每一个属性，对每一个属性进行深拷贝，并将结果赋值给target对象
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = deepClone(source[key])
      }
    }
  
    // 最后返回target对象
    return target as T
  }