/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
height = window.innerHeight * 0.7,
margin = { top: 20, bottom: 50, left: 100, right: 60 }

/* LOAD DATA */
d3.csv('../data/tdf_winners.csv', 
d => 
{
  return {
    year: new Date(+d.Year, 0, 1),
    stages_won: +d.SW ,
  }
})
.then(data => {
console.log('data', data)

// SCALES
const xScale = d3.scaleTime()
  .domain(d3.extent(data, d => d.year))
  .range([margin.left, width-margin.right])


const yScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.stages_won))
  .range([height - margin.bottom, margin.top])

// CREATE SVG ELEMENT
const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height+30)
  .style("background-color", "aliceblue")
  .style("overflow", "visible")

// BUILD AND CALL AXES
const xAxis = d3.axisBottom(xScale)
const xAxisGroup = svg.append("g")
  .attr("class", "xAxis")
  .attr("transform", `translate(${0}, ${height - margin.bottom})`)
  .call(xAxis)

const yAxis = d3.axisLeft(yScale)
const yAxisGroup = svg.append("g")
  .attr("class", "yAxis")
  .attr("transform", `translate(${margin.left}, ${0})`)
  .call(yAxis)

// LINE GENERATOR FUNCTION
const lineGen = d3.line()
  .x(d => xScale(d.year))
  .y(d => yScale(d.stages_won))

// DRAW LINE
svg.append("path")
  .datum(data)
  .attr("d", lineGen)
  .attr("fill", "none")
  .attr("stroke", "blue")
  .attr("stroke-width", 4)

// AREA GENERATOR FUNCTION
const areaGen = d3.area()
  .x(d => xScale(d.year))
  .y0(height - margin.bottom)
  .y1(d => yScale(d.stages_won))

//DRAW AREA
svg.append("path")
    .datum(data)
    .attr("d", areaGen)
    .attr("fill", "green")
    .attr("fill-opacity",0.4)
    .attr("stroke", "none")
    
//AXES LABELS
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", (width/2))
    .attr("y", height - 5)
    .style("font-size", "20px")
    .text("Year")

svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", margin.left - 37)
    .attr("x", margin.top - 220)
    .style("font-size", "20px")
    .text("Number of stages won")

//TITLE
svg.append("text")
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .attr("x", (width/2) - 250)
    .attr("y", margin.top + 20)
    .style("fill", "purple")
    .style("font-size", "25px")
    .text("Tour de France winners")   

});