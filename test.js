// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({
  region: "eu-west-2",
});
// Create S3 service object
s3 = new AWS.S3({
  apiVersion: "2006-03-01",
});

var objectArra = [],
  keyArray = [],
  getArray = [];

// Create the parameters for calling listObjects
var bucketParams = {
  Bucket: "machine-learning-ipf-scans-raw",
  Delimiter: "/",
};
// Call S3 to obtain a list of the objects in the bucket
s3.listObjectsV2(bucketParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    for (var i = 0; i < data.CommonPrefixes.length; i++) {
      var a = data.CommonPrefixes[i].Prefix;
      objectArra.push(a);
    }
    getParams();
  }
});

const getParams = () => {
  const files = objectArra;
  for (var i = 0; i < files.length; i++) {
    var params = {
      Bucket: "machine-learning-ipf-scans-raw",
      Prefix: files[i],
      Delimiter: "/",
    };
    keyArray.push(params);
  }
  getFile();

  // getData(keyArray)
  //   .then(function (done) {
  //     console.log(done);
  //   })
  //   .catch(function (err) {
  //     console.log("Error");
  //   });

  // function getData(keyArray) {
  //   return new Promise((resolve, reject) => {
  //     keyArray.forEach((index) => {
  //       s3.listObjectsV2(index, function (err, data) {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           new Promise(function (resolve, reject) {
  //             if (data.CommonPrefixes.length != 0) {
  //               data.CommonPrefixes.map((item) => {
  //                 getArray.push(item.Prefix);
  //               });
  //             } else {
  //               getArray.push(index.Prefix);
  //             }
  //           });
  //         }
  //       });
  //       // console.log(getArray);
  //     });
  //     resolve(getArray);
  //   });
  // }
};

const getFile = () => {
  keyArray.forEach((index, i) => {
      var getPromises = s3.listObjectsV2(index).promise();
      getP {
        if (err) {
          console.log("Error", err);
        } else {
          if (data.CommonPrefixes.length != 0) {
            data.CommonPrefixes.map((item) => {
              // console.log(item); // entire
              getArray.push(item.Prefix);
            });
          } else {
            getArray.push(index.Prefix);
          }
          // console.log("index = " + i, getArray);
        }
      });
  });
};
