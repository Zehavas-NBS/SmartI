const prioritiyRespository = require('../Respositories/priorityCache')

const getValue = (obj, path) => {
  const result =  path.split('/').reduce((value, part) => value && value[part], obj);
  return result;
} 

const mergeData = async(data)=>
{
    let priorities = {};
    const mergedDataResult = {};
    priorities = await prioritiyRespository.getPriorities();

    if(!priorities)
    {
        console.log("priorities is missing, Can't merge");
        return;
    }
 
    const mergeSingleField = (fieldPriority, path) => {
      
      const dataMap = new Map(data.map(e => [e.sourceData, e.data]));
    
      for (const sourceData of fieldPriority) {
        const entityData = dataMap.get(sourceData);
        if (entityData) {
          const value = getValue(entityData, path);
          if (value !== undefined) {
            return value;
          }
        }
      }
      return null;
    }
 
 const mergeHierarchyFields = (priorities, parentData, path) => {
  for (const [priority, value] of Object.entries(priorities)) {
    const newPath = path ? `${path}/${priority}` : priority;

    if (typeof value === 'object' && !Array.isArray(value)) {
      const subData = {};
      mergeHierarchyFields(value, subData, newPath);
      if (Object.keys(subData).length > 0) {
        parentData[priority] = subData;
      }
    } 
    else 
    {
      const mergeResult = mergeSingleField(value, newPath);
     if(mergeResult != null && mergeResult != {})
        mergedDataResult[priority] = mergeResult;
    }
  }
}

  mergeHierarchyFields(priorities, mergedDataResult, null)
  return mergedDataResult;
}

module.exports = {mergeData}