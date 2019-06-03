import config from "../config";

const defaultOptions = { authenticate: true };

export const queryGraphQl = async (
  query,
  variables = {},
  extraOptions = {}
) => {
  const options = { ...defaultOptions, ...extraOptions };
  const authHeaders = {};
  // options.authenticate && !!authStore.token
  //   ? {
  //       authorization: `Bearer ${authStore.token}`
  //     }
  //   : {};

  console.log(
    "-- request:",
    `${config.graphqlPath}`,
    query.split("{")[1],
    variables
  );

  let response;
  try {
    response = await fetch(`${config.graphqlPath}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        ...authHeaders
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
  } catch (e) {
    console.log("-- GraphQL Request failed:", e);
    throw e;
  }

  if (!response.ok) {
    console.log("gql fail:", response);
  }

  let responseBody;

  try {
    responseBody = await response.json();
  } catch (e) {
    throw new Error(`GraphQL Request failed: HTTP ${response.status} `);
  }

  console.log("bodyy", responseBody);
  if (responseBody.errors) {
    console.log("errors");
    throw new Error(`GraphQL Request failed ${responseBody.errors[0].message}`);
  }
  // console.log("gql response", responseBody);
  // console.log("-- request response:", responseBody);
  return responseBody;
};
