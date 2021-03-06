// Set margins and dimensions 
const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 900; //- margin.left - margin.right;
const height = 650; //- margin.top - margin.bottom;

// Append svg object to the body of the page to house Scatterplot1
const svg1 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 

// Initialize brush for Scatterplot1 and points. We will need these to be global. 
let myCircles1;
let brush1; 


//TODO: append svg object to the body of the page to house Scatterplot2 (call it svg2)
const svg2 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 


//TODO: Initialize brush for Scatterplot2 and points. We will need these to be global.
let myCircles2; 
let brush2; 

//TODO: append svg object to the body of the page to house bar chart 
const svg3 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 
//TODO: Initialize bars. We will need these to be global. 
let myBar; 


// Define color scale
const color = d3.scaleOrdinal()
                .domain(["setosa", "versicolor", "virginica"])
                .range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Plotting 
d3.csv("data/iris.csv").then((data) => {
  
  // We will need scales for all of the following charts to be global
  let x1, y1, x2, y2, x3, y3;  

  // We will need keys to be global
  let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3;

  // Scatterplot1
  {
    xKey1 = "Sepal_Length";
    yKey1 = "Petal_Length";

    // max x
    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    // Create scale for x
    x1 = d3.scaleLinear()
                .domain([0,maxX1])
                .range([margin.left, width-margin.right]); 
    
    // Add axis for x 
    svg1.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x1))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey1)
      );

    // max y 
    let maxY1 = d3.max(data, (d) => { return d[yKey1]; });

    // Create scale for y
    y1 = d3.scaleLinear()
                .domain([0, maxY1])
                .range([height - margin.bottom, margin.top]); 

    // Add axis for y
    svg1.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y1)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey1)
      );

    // Add points to 1st scatterplot
    myCircles1 = svg1.selectAll("circle")
                            .data(data)
                            .enter()
                              .append("circle")
                              .attr("id", (d) => d.id)
                              .attr("cx", (d) => x1(d[xKey1]))
                              .attr("cy", (d) => y1(d[yKey1]))
                              .attr("r", 8)
                              .style("fill", (d) => color(d.Species))
                              .style("opacity", 0.5);

    //TODO: Define a brush (call it brush1)
    brush1 = d3.brush().extent([[0,0], [width, height]])



    //TODO: Add brush1 to svg1
    svg1.call(brush1
      .on("start", clear)
      .on("brush", updateChart_1));

  }

  //TODO: Scatterplot 2 (show Sepal width on x-axis and Petal width on y-axis)
  {
  //Scatterplot2 code here
    xKey2 = "Sepal_Width"
    yKey2 = "Petal_Width"

    // max x
    let maxX2 = d3.max(data, (d) => { return d[xKey2]; });

    // Create scale for X
    x2 = d3.scaleLinear()
                .domain([0,maxX2])
                .range([margin.left, width-margin.right]); 
    
    // Add axis for x
    svg2.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x2))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right) 
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey2)
      );

    // max y 
    let maxY2 = d3.max(data, (d) => { return d[yKey2]; });

    // Create scale for Y
    y2 = d3.scaleLinear()
                .domain([0, maxY2])
                .range([height - margin.bottom, margin.top]); 

    // Add axis for y
    svg2.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y2)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey2)
      );

    //Circles 2nd scatter
    myCircles2 = svg2.selectAll("circle")
                            .data(data)
                            .enter()
                              .append("circle")
                              .attr("id", (d) => d.id)
                              .attr("cx", (d) => x2(d[xKey2]))
                              .attr("cy", (d) => y2(d[yKey2]))
                              .attr("r", 8)
                              .style("fill", (d) => color(d.Species))
                              .style("opacity", 0.5);


    //TODO: Define a brush (call it brush2)
    brush2 = d3.brush().extent([[0,0], [width, height]])

    //TODO: Add brush1 to svg2
    svg2.call(brush2
      .on("start", clear)
      .on("brush", updateChart_2));
  }

  //TODO: Barchart with counts of different species
  {

    //Bar chart code here
    const data2 = [
      {Species: 'setosa', Count: 50},
      {Species: 'versicolor', Count: 50},
      {Species: 'virginica', Count: 50}
    ];

    //keys
    xKey3 = "Species"
    yKey3 = "Count"


    // Create scale for x
    x3 = d3.scaleBand()
                .domain(d3.range(data2.length))
                .range([margin.left, width - margin.right])
                .padding(0.1); 

    // Add axis for x
    svg3.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(x3)
            .tickFormat(i => data2[i][xKey3]))   
    .attr("font-size", '20px')
    .call((g) => g.append("text")
                  .attr("x", width - margin.right) 
                  .attr("y", margin.bottom - 4)
                  .attr("fill", "black")
                  .attr("text-anchor", "end")
                  .text(xKey3)
  );

    // max y 
    let maxY3 = d3.max(data2, (d) => { return d[yKey3]; });

    // Create scale for y
    y3 = d3.scaleLinear()
                .domain([0, maxY3 + 2])
                .range([height - margin.bottom, margin.top]); 

    // Add axis for y
    svg3.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y3)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey3)
      );
    //bars
    myBar = svg3.selectAll("rect")
                            .data(data2)
                            .enter()
                            .append("rect")
                              .attr("class", "bar")
                              .attr("x", (d, i) => x3(i))
                              .attr("y", (d) => y3(d[yKey3]))
                              .attr("width", x3.bandwidth())
                              .attr("height", (d) => (height - margin.bottom) - y3(d[yKey3]))
                              .style("fill", (d) => color(d[xKey3]))
                              .style("opacity", 0.5);

  }

  //Brushing Code---------------------------------------------------------------------------------------------
    
  // Call to removes existing brushes 
  function clear() {
      svg1.call(brush1.move, null);
      //TODO: add code to clear existing brush from svg2
      svg2.call(brush2.move, null)
  }
  

  // Call when Scatterplot1 is brushed 
  function updateChart_1(brushEvent) {

    //TODO: Find coorindates of brushed region
    let coords = d3.brushSelection(this);

    //brushed classed attribute for each circle in file
    // black outline
    myCircles1.classed("brush", function (d) {
      return isBrushed(coords, x1(d[xKey1]), y1(d[yKey1]))
      
    })

    //Outlines same in the 2nd scatterplot
    // corresponding to points within the brush region in the 1st scatter
    myCircles2.classed("brush", function (d) {
      return isBrushed(coords, x1(d[xKey1]), y1(d[yKey1]))
    })

  }
    

  // Call when Scatterplot2 is brushed 
  function updateChart_2(brushEvent) {

    //Find coordinates of brushed region 
    let coords = d3.brushSelection(this);

    //Start an empty set that you can store names of selected species in 
    let selected_species = new Set();

    //Give bold outline to all points within the brush region in Scatterplot2 & collected names of brushed species
    myCircles2.classed("brush", function (d) {

      is_selected = isBrushed(coords, x2(d[xKey2]), y2(d[yKey2]));

      if (is_selected) {
        selected_species.add(d[xKey3]);
      }
      return is_selected;
    })

    //Give bold outline to all points in Scatterplot1 corresponding to points within the brush region in Scatterplot2
    myCircles1.classed("brush", function (d) {
      return isBrushed(coords, x2(d[xKey2]), y2(d[yKey2]));
    })

    //Give bold outline to all bars in bar chart with corresponding to species selected by Scatterplot2 brush
    myBar.classed("brush", function (d) {
      return selected_species.has(d[xKey3]);
    })

  }

    //Finds dots within the brushed region
    function isBrushed(brush_coords, cx, cy) {
      if (brush_coords === null) return;
      var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
    }
});