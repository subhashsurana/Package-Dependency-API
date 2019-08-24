const axios = require("axios");

getRemoteApiData = async () => {
  let myArgs = process.argv[2];
  var depArr = [];
  var devDepArr = [];
  let getApiData = await axios.get(`http://registry.npmjs.org/${myArgs}/`);
  getDependencies(getApiData.data.versions, depArr, devDepArr);
  console.log("Dependency Array: ", depArr);
  console.log("devDependency Array:", devDepArr);
};

getRemoteApiData();

getDependencies = (apiData, objArrDep, objArrDev) => {
  const objLen = Object.keys(apiData).length;
  let currVerNo = Object.keys(apiData)[objLen - 1];

  for (let key of Object.keys(apiData)) {
    if (key === currVerNo) {
      const value = apiData[key];
      var { dependencies, devDependencies } = value;

      let depArr = dependencies;
      let devDepArr = devDependencies;
      objArrDep.push(depArr);
      objArrDev.push(devDepArr);

      return [objArrDep, objArrDev];
    }
  }
};
