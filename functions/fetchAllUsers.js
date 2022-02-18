const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const dynamodb = new AWS.DynamoDB();

const docClient = new AWS.DynamoDB.DocumentClient();

const handler = async (event) => {
  return new Promise((resolve, reject) => {
    const tableName = event.arguments.tableName;
    var params = {
      TableName: tableName,
    };
    docClient.scan(params, function (err, data) {
      const results = [];
      if (err) {
        resolve(
          "Unable to read item. Error JSON:" + JSON.stringify(err, null, 2)
        );
      } else {
        results.push(...data.Items);
      }
      resolve(results);
    });
  });
};
module.exports.handler = handler;
// (async () => {
//   console.log(await handler({ tableName: "users" }));
// })();
