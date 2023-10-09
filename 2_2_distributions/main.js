const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40 };

d3.csv("../data/MoMA_distributions.csv", d3.autoType)

.then(data => {

  // console.log("Data", data)
  // console.log('Lifespan', data.map(d => d['Artist Lifespan']))
  // console.log('Lifespan range',d3.extent(data.map(d => d['Artist Lifespan'])))

  const xScale = d3.scaleLinear()
     .domain([0, 1100])
     .range([margin.left, width - margin.right])

  const yScale = d3.scaleLinear()
     .domain([0, 350])
     .range([height - margin.bottom, margin.top])

  const zScale = d3.scaleLinear()
     .domain(d3.extent(data.map(d => d['Artist Lifespan'])))//scale is dynamic to any dataset as it ranges from min to max values
     .range([ 5, 50]);// zero lifespans will have take the value 4
    

  const svg = d3.select("#container")
     .append("svg")
     .attr("width", width)
     .attr("height", height)
     .style("background-color", "aliceblue")
     .style("overflow", "visible")
  

  const circles = svg.selectAll("circle.lifespan")
     .data(data, d => d.Title)
     .join("circle")
     .attr("class", "lifespan")
     .attr("cx", d => xScale(d['Length (cm)']))
     .attr("cy", d => yScale(d['Width (cm)']))
     .attr("r", d => zScale(d['Artist Lifespan']))
     .style("fill", "blue")
     .style("opacity", "0.5")
     .attr("stroke", "purple")

  const xAxisGroup = svg.append("g")
  const yAxisGroup = svg.append("g")

  xAxisGroup
     .attr("transform", `translate(${0},${height - margin.bottom})`)
     .call(d3.axisBottom(xScale))

    
  yAxisGroup
     .attr("transform", `translate(${margin.left},${0})`)
     .call(d3.axisLeft(yScale))


  svg.append("text")
       .attr("class", "x label")
       .attr("text-anchor", "middle")
       .attr("x", (width/2))
       .attr("y", height - 20)
       .style("font-size", "20px")
       .text("Length (cm)")

  svg.append("text")
       .attr("class", "y label")
       .attr("text-anchor", "end")
       .attr("transform", "rotate(-90)")
       .attr("y", margin.left - 37)
       .attr("x", margin.top - 400)
       .style("font-size", "20px")
       .text("Width (cm)")
  
  svg.append("text")
       .attr("class", "title")
       .attr("text-anchor", "middle")
       .attr("x", (width/2))
       .attr("y", margin.top + 15)
       .style("fill", "purple")
       .style("font-size", "30px")
       .text("Length vs width for different titles based on the artist's lifespan")   

});