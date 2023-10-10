/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

  Promise.all([
    d3.json("../data/world.json"),
    d3.csv("../data/MoMA_nationalities.csv", d3.autoType),
  ]).then(([geojson, nationalities]) => {
   
    console.log('geojson, nationalities', geojson, nationalities)

  const svg = d3.select("#container")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .style("background-color", "pink")
    .style("overflow","visible")
  

  // // SPECIFY PROJECTION
  const projection = d3.geoNaturalEarth1()
     .fitSize([width, height], geojson)
     .scale([width/(2*Math.PI)])//width divided by the total angular circumference of the world (360 degrees = 2 Pi radians)
 
  // // DEFINE PATH FUNCTION
  const pathGenFn = d3.geoPath().projection(projection)

  // APPEND GEOJSON PATH  
  const nations = svg
    .selectAll("path.country")
    .data(geojson.features)
    .join("path")
    .attr("class", 'country')
    .attr("d", pathGenFn)
    .attr("stroke", "black")
    .attr("fill", 
     d => 
     {
       const artist_countries = new Set(nationalities.map(d => d.Country));
       if (artist_countries.has(d.properties.name)) 
         {
           return "black";
         } 
       else 
         {
          return "transparent";
         }
     });

//ADD TITLE
  svg.append("text")
     .attr("class", "title")
     .attr("text-anchor", "end")
     .attr("x", (width/2) - 320)
     .attr("y", height - 30)
     .style("fill", "purple")
     .style("font-size", "20px")
     .text("Home countries of artists whose work is displayed at the MoMA")   

  });