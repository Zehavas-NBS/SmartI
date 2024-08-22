const fs = require('fs/promises')
const path = require('path')
const nodeCache = require('node-cache')
const cache = new nodeCache()

let priorities = {}

const loadPrioritiesToCache = async () => {
    const filePath = path.join(__dirname,  '../../priorities.json')
    try{
      const data = await fs.readFile(filePath, { encoding: 'utf8' })
      priorities = JSON.parse(data).priorities
      cache.set("prioritiesData", priorities)
      return priorities;
    }
    catch(err){
     console.log("Error reading file to cache", err)
    }
}


const getPriorities = () => {
  let cachedPriorities ;
  if( !cache.has("prioritiesData"))
  {
    cachedPriorities = loadPrioritiesToCache()
    return cachedPriorities;
  }
  cachedPriorities = cache.get("prioritiesData");
  return cachedPriorities;
}

module.exports = {getPriorities}