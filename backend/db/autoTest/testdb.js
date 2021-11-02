process.env.NODE_ENV = "autotest";
const fs = require("fs").promises;
const path = require("path");
const dataIndex = require("./dataIndex");

/**
 * add data from data folder jsons files to autotest db
 */
const start = async () => {
  process.env.NODE_ENV = "autotest";
  const modelsPath = path.join(__dirname, "..", "..", "models");
  const testDataPath = path.join(__dirname, "data");
  const models = await loadFiles(modelsPath, ".js");
  const testData = await loadFiles(testDataPath, ".json");
  const testDbCollections = Object.keys(testData);
  try {
    await Promise.all(
      testDbCollections.map(async (collectionName) => {
        await models[collectionName].insertMany(testData[collectionName]);
      })
    );
  } catch (err) {
    console.log("Error while inserting auto test data: ", err);
    throw err;
  }
};
/**
 * delete all data from db
 */
const finish = async () => {
  process.env.NODE_ENV = "autotest";
  const modelsPath = path.join(__dirname, "..", "..", "models");
  const models = await loadFiles(modelsPath, ".js");
  const collectionList = Object.keys(models);
  try {
    await Promise.all(
      collectionList.map(async (collectionName) => {
        await models[collectionName].deleteMany({});
      })
    );
  } catch (err) {
    console.log("Error while clear auto test data: ", err);
    throw err;
  }
};
/**
 * reset db - clear all data and insert test data jsons
 * return promise
 */
const reset = async () => {
  const mongoose = require("../dbcon");
  process.env.NODE_ENV = "autotest";
  try {
    await finish();
    await start();
  } catch (err) {
    console.log(`Error: while reset data ${err}`);
  } finally {
    // await mongoose.disconnect();
  }
};
// TODO - check how to use from terminal
/**
 * create test data jsons files inside ./data folder - fetching from dev db - and filter by dataIndex
 */
const dataGen = async () => {
  process.env.NODE_ENV = "development"; // fetch data from this DB
  const mongoose = require("../dbcon");
  const modelsPath = path.join(__dirname, "..", "..", "models");
  const fileExt = ".json";
  const testDataPath = path.join(__dirname, "data");
  const models = await loadFiles(modelsPath, ".js");
  const dataIndexCollectionNames = Object.keys(dataIndex);
  try {
    await Promise.all(
      dataIndexCollectionNames.map(async (collectionName) => {
        await Promise.all(
          dataIndex[collectionName].map(async (query) => {
            let data = await models[collectionName].find().exec();
            data = JSON.stringify(data);
            console.log(data);
            await fs.writeFile(
              `${testDataPath}/${collectionName}${fileExt}`,
              data
            );
          })
        );
      })
    );
  } catch (err) {
    console.log("Error while collection test data: ", err);
    throw err;
  } finally {
    await mongoose.disconnect();
  }
};

/**
 * return object with keys of all files names in "path" and the value of each file is the export
 * @param {string} path folder path
 * @param {string} fileType file type eg. ".json"
 * @returns object with keys of all file names and the values file export
 */
const loadFiles = async (path, fileType) => {
  const fileNames = await fs.readdir(path);
  const loadedObj = {};
  fileNames.forEach((fileName) => {
    loadedObj[fileName.replace(fileType, "")] = require(`${path}/${fileName}`);
  });
  return loadedObj;
};
module.exports = { finish, start, reset };
