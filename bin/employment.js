const fs = require('fs');

let data = JSON.parse(fs.readFileSync(`../data/dirty/employment.json`).toString());

data = data.map((stat) => {
  return {
    date: new Date(stat.year, 0, 1),
    employed_percent: stat.employed_percent,
    population: stat.population,
  }
})

fs.writeFileSync('../data/clean/employment.json', JSON.stringify(data));
