const margin = { top: 30, right: 40, bottom: 30, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 270 - margin.top - margin.bottom;

const data = await d3.json("../../data/clean/employment.json");

const svg = d3
  .select("#svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const x = d3.scaleTime()
    .domain([new Date(data[0].date), new Date(data[[...data].length - 1].date)])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  const y = d3.scaleLinear()
    .domain([d3.min(data, d => d.employed_percent) - d3.min(data, d => d.employed_percent) / 10, d3.max(data, d => d.employed_percent) + d3.max(data, d => d.employed_percent) / 10])
    .range([ height, 0 ]);
  svg.append("g")
    .style("stroke", "steelblue")
    .call(d3.axisLeft(y));

  const y1 = d3.scaleLinear()
    .domain([d3.min(data, d => d.population) - d3.min(data, d => d.population) / 10, d3.max(data, d => d.population) + d3.max(data, d => d.population) / 10])
    .range([ height, 0 ]);
  svg.append("g")
    .attr("transform", "translate(" + width + " ,0)")
    .style("stroke", "green")
    .call(d3.axisRight(y1));
  
  data.forEach((d) => {
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x((d) => x(new Date(d.date)))
        .y((d) => y(d.employed_percent))
      )

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x((d) => x(new Date(d.date)))
        .y((d) => y1(d.population))
      )
  }
);
