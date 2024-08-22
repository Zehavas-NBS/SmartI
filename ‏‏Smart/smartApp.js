const express = require('express')
const app = express()
app.use(express.json())
const entitiesController = require('./Src/SmartControllers/mergeController')
//open it for run unit test!!!!
//const mergeService = require('./Src/SmartService/mergeService')


app.post('/mergeData', entitiesController.mergeData);

//open it for run unit test!!!!
// app.post('/mergeDataTest', async (req, res) => {
//     const data = req.body;
//     console.log(data);
//     const mergedData = await mergeService.mergeData(data);
//     return res.json(mergedData);
//   });

// close this code for run unit test !!!!- can't run test if app express is listen
const port = 8000
app.listen(port, () => {
    console.log(`Server is running... port is ${port}`);
}
)

//open it for run unit test!!!!
//module.exports = app; // Export the app
