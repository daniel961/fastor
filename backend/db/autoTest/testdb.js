process.env.NODE_ENV = "autotest";
const fs = require("fs").promises;
const dataIndex = require("./dataIndex");

/**
 * add data from data folder jsons files to autotest db
 */
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
      testDbCollections.map(async (collectionName) => {
        await models[collectionName].insertMany(testData[collectionName]);
      })
    );
  } catch (err) {
    console.log("Error while inserting auto test data: ", err);
    throw err;
  } finally {
    await mongoose.disconnect();
  }
  return "auto test db filled with data";
};
/**
 * delete all data from db
 */
const finish = async () => {
  process.env.NODE_ENV = "autotest";
  const mongoose = require("../dbcon");
  const modelsPath = "../../models";
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
  } finally {
    await mongoose.disconnect();
  }
  return "auto test db cleared";
};
/**
 * reset db - clear all data and insert test data jsons
 */
const reset = async () => {
  try {
    await finish();
    await start();
  } catch (err) {
    console.log(`Error: while reset all data ${err}`);
  }
};
/**
 * create test data jsons files inside ./data folder - fetching from dev db - and filter by dataIndex
 */
const dataGen = async () => {
  process.env.NODE_ENV = "development";
  const mongoose = require("../dbcon");

  const modelsPath = "../../models";
  const fileExt = ".json";
  const testDataPath = "./data";
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
const loadFiles = async (path, fileType) => {
  const fileNames = await fs.readdir(path);
  const loadedObj = {};
  fileNames.forEach((fileName) => {
    loadedObj[fileName.replace(fileType, "")] = require(`${path}/${fileName}`);
  });
  return loadedObj;
};

finish()
  .then((res) => {
    start()
      .then((res) => {
        console.log("finish");
      })
      .catch((err) => {});
  })
  .catch((err) => {
    console.log(err);
  });
