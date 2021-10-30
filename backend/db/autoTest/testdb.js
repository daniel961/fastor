process.env.NODE_ENV = "autotest";
const fs = require("fs").promises;
// todo make sure you doing that to auto test db only and allways check the enviroment variables

// reset all data - remove all data and reload all records

// start insert all data - the data will be json files and the names is the collection name

// clear remove all data

const start = async () => {
  process.env.NODE_ENV = "autotest";
  const mongoose = require("../dbcon");
  const modelsPath = "../../models";
  const testDataPath = "./data";
  const models = await loadFiles(modelsPath, ".js");
  const testData = await loadFiles(testDataPath, ".json");
  const testDbCollections = Object.keys(testData);
  try {
    await Promise.all(
      testDbCollections.map(
        async (collectionName) =>
          await models[collectionName].insertMany(testData[collectionName])
      )
    );
  } catch (err) {
    console.log("Error while inserting auto test data: ", err);
    throw err;
  } finally {
    await mongoose.disconnect();
  }
  return "auto test db filled with data";
};

const finish = () => {};

const reset = () => {};

const dataGen = () => {
  // fetch all data from data index
};

const loadFiles = async (path, fileType) => {
  const fileNames = await fs.readdir(path);
  const loadedObj = {};
  fileNames.forEach((fileName) => {
    loadedObj[fileName.replace(fileType, "")] = require(`${path}/${fileName}`);
  });
  return loadedObj;
};

start()
  .then((res) => {
    console.log("finished!");
  })
  .catch((err) => {
    console.log("Error:!");
    console.log(err);
  });

module.exports = reset;
