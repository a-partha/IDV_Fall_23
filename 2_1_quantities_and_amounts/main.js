/* CONSTANTS AND GLOBALS */

var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = window.innerWidth *.8 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

/* LOAD DATA */
d3.csv('../data/MoMA_topTenNationalities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    // /* SCALES */
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.Nationality))
      .range([0, height])
      .padding(0.3)
  

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data.map(d => d.Count))])
      .range([0, width]) 

    // /* HTML ELEMENTS */

    // svg
    const svg = d3.select("#container")
      .append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       .style("background-color", "aliceblue")
       .style("overflow", "visible")

      .append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // bars
    const bars = svg.selectAll("rect.bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(0))
      .attr("y", d => yScale(d.Nationality))
      .attr("height", yScale.bandwidth())
      .attr("width", d => xScale(d.Count))  //go down to height value and go up the count value
     

    const xAxisGroup = svg.append("g")
    const yAxisGroup = svg.append("g")

    yAxisGroup
     .call(d3.axisLeft(yScale))


    xAxisGroup
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale))

  })