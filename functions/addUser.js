const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const handler = async (event) => {
  const { name, email, phoneNumber } = event.arguments;
  var input = {
    TableName: "users",
    Item: {
      name: {
        S: name,
      },
      email: {
        S: email,
      },
      phoneNumber: {
        S: phoneNumber,
      },
    },
  };

  return dynamodb
    .putItem(input)
    .promise()
    .then((data) => ({ name, email, phoneNumber, success: true }))
    .catch((err) => console.error(err));
};

module.exports.handler = handler;

// (async () =>
//   console.log(
    // await handler({
    //   name: "manan",
    //   email: "sdfgdfgdfgdjbfgs",
    //   phoneNumber: "123456789",
    // })
//   ))();

// console.log(
//   handler({ name: "manan", email: "sdnnsdjbfgs", phoneNumber: "123456789" })
// );

// (async () => {
//   console.log(
//     await handler({
//       name: "manan",
//       email: "sdnnsdjbfgs",
//       phoneNumber: "123456789",
//     })
//   );
// })();
