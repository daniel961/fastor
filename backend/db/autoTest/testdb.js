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
  const modelsList = Object.keys(models);
  const dataIndexCollectionNames = Object.keys(dataIndex);
  try {
    await Promise.all(
      dataIndexCollectionNames.map(async (collectionName) => {
        await Promise.all(
          dataIndex[collectionName].map(async (query) => {
            const data = await models[collectionName].find(query).exec();
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

dataGen()
  .then((res) => {
    console.log("finish data gen");
  })
  .catch((err) => {
    console.log(err);
  });

// start()
//   .then((res) => {
//     console.log("finished!");
//   })
//   .catch((err) => {
//     console.log("Error:!");
//     console.log(err);
//   });

module.exports = reset;
