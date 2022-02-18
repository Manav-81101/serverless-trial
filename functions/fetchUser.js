const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

handler = async (event) => {
  return new Promise((resolve, reject) => {
    const { tableName, key, value } = event.arguments;
    var params = {
      TableName: tableName,
      Key: {
        [key]: value,
      },
    };
    docClient.get(params, function (err, data) {
      if (err) resolve("Error " + err);
      else resolve(data.Item);
    });
  });
};
module.exports.handler = handler;

// (async () => {
//   console.log(
//     await handler({
//       tableName: "users",
//       key: "email",
//       value: "sdnnsdjbfgs",
//     })
//   );
// })();
