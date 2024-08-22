const mergeService = require('../SmartService/mergeService')
const mergeData = async (requset, response) => 
    {
        const data = requset.body.entities;
        console.log(data);
        const mergedData = await mergeService.mergeData(data);
        return response.json(mergedData);
    }

module.exports = {mergeData} 