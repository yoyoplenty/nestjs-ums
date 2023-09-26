const main = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0 from Yoyoplenty! Your function executed successfully!',
        input: event,
      },
      null,
      2,
    ),
  };
};

export const handler = main;
