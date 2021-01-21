export function getObjProp(objInstance,propChainStr){
    var propChainArray = propChainStr.split(".");
    if(!objInstance) return null;
    var result = objInstance;
    for(var i=0;i<propChainArray.length;i++){
        var propName = propChainArray[i];
        if(!result.hasOwnProperty(propName)) return null;
        result = result[propName];
    }
    return result;
}