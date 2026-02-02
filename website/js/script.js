const url =
  "https://student-api-proxy.onrender.com/api/nba-api-free-data.p.rapidapi.com/ENDPOINT";
const options = {
  method: "GET",
  headers: {
    "X-API-Key":
      "04fb8593dd38a31178c28b5cce304c2eeae3d7ad33432136839677ba0f7bb390",
  },
};

fetch(url, options)
  .then((response) =>
    response.json().then((result) => {
      console.log(result.data); // Your API data
      console.log(`Cost: $${result.meta.cost}`);
      console.log(`Remaining: $${result.meta.remaining_budget}`);
    }),
  )
  .catch((error) => {
    console.log(error);
  });
