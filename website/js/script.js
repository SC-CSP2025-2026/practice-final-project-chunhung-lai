const search_btn = document.querySelector("#search-btn");
const year_input = document.querySelector("#year-input");
const search_output = document.querySelector("#search-output");

const options = {
  headers: {
    "X-API-Key":
      "04fb8593dd38a31178c28b5cce304c2eeae3d7ad33432136839677ba0f7bb390",
  },
};

function renderTeams(teamList, output) {
  let html = "<ol>";

  teamList.forEach((team) => {
    html += `<li>${team.team.name}</li>`;
  });

  html += "</ol>";
  output.innerHTML = html;
}

async function loadWesternRanking(year, output) {
  if (!year || year < 2000 || year > 2026) {
    output.innerHTML = "Please enter a valid year between 2000 and 2026.";
    return;
  }

  const URL = `https://student-api-proxy.onrender.com/api/nba-api-free-data.p.rapidapi.com/nba-conference-standings?year=${year}`;

  output.innerHTML = "Loading...";
  try {
    const res = await fetch(URL, options);
    const data = await res.json();

    const standings = data.data.response.standings;
    const west = standings.find(
      (c) => (c.conference?.name || c.name) === "Western Conference",
    );

    const westTeams = west.standings.entries;
    renderTeams(westTeams, output);
  } catch (err) {
    output.innerHTML = "Failed to load.";
  }
}

search_btn.addEventListener("click", (event) => {
  const year = year_input.value;
  loadWesternRanking(year, search_output);
});
