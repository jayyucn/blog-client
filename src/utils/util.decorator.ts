import { deepClone } from "./util.object";

export function deepCloneDecorator<T extends (new () => Object)>(target: T) {
  target.prototype.deepClone = function () { return deepClone(target.prototype) }
}



