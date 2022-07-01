const WIDTH = 900
const HEIGHT = 500
const MARGIN = 40

let data = await d3.json('../../data/clean/sortedEngineeringJobs.json');
data = data.slice(0, 7);

const PIE = d3.pie();
const ARC_DATA = PIE(data.map(job => job.count));
const ARC_GEN = d3.arc()
  .innerRadius(40)
  .outerRadius(200)
  .padAngle(0.01)

const TOTAL = data.reduce((total, current) => total + current.count, 0);

const SVG = d3.select('#svg');
const PIE_GROUP = SVG
  .append('g')
  .attr('transform', `translate(${WIDTH / 2}, ${HEIGHT / 2})`)

const color = d3.scaleOrdinal()
  .domain(data)
  .range(["#fff100", "#ff8c00", "#e81123", "#ec008c", "#68217a", "#00188f", "#00bcf2", "#00b294", "#009e49", "#bad80a"])

const PIE_PATH = PIE_GROUP
  .selectAll('path')
  .data(ARC_DATA)
  .enter()
  .append('path')
  .attr('d', ARC_GEN)
  .attr('fill', (d, i) => color(i))

const LEGEND_COLORS = SVG
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('r', '5')
  .attr('cx', 10)
  .attr('cy', (d, i) => (i * 20) + 15)
  .attr('fill', (d, i) => color(i))

const LEGEND_LABELS = SVG
  .selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .text(d => `${d.title} - ${Math.round((d.count / TOTAL) * 100)}%`)
  .attr('x', 20)
  .attr('y', (d, i) => (i * 20) + 20)
