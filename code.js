function _1(md){return(
md`# Are Two-High Safeties Ruining the NFL?`
)}

function _2(md){return(
md`If you've spent any time around football discourse over the past few years, you've likely heard the complaints surrounding two-high safety defenses. Media personalities and fans alike blame the apparent decrease in explosive pass plays (passes completed over 20 yards downfield) on the increasing trend of the two-high safety defensive shells.`
)}

function _3(md){return(
md`On paper, the claim seems logical. Take, for example, the diagram below:`
)}

function _coverages(d3)
{
  const width = 1200;
  const height = 700;
  const fieldWidth = 500;
  const fieldHeight = 600;
  const gap = 50;
  
  const container = d3.create("div")
    .style("font-family", "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif")
    .style("background", "#f8f9fa")
    .style("padding", "32px")
    .style("border-radius", "20px")
    .style("box-shadow", "0 25px 70px rgba(0,0,0,0.15)")
    .style("color", "#2d3748");
  
  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("max-width", "100%")
    .style("height", "auto");
  
  const defs = svg.append("defs");
  
  const fieldGradient = defs.append("linearGradient")
    .attr("id", "fieldGradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");
  
  fieldGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#1a4d2e");
  
  fieldGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#2d5f3d");
  
  function drawField(x, y, title, is2High) {
    const fieldGroup = svg.append("g")
      .attr("transform", `translate(${x}, ${y})`);
    
    fieldGroup.append("rect")
      .attr("width", fieldWidth)
      .attr("height", fieldHeight)
      .attr("fill", "url(#fieldGradient)")
      .attr("rx", 12);
    
    for (let i = 0; i <= 10; i++) {
      const yPos = i * (fieldHeight / 10);
      fieldGroup.append("line")
        .attr("x1", 0)
        .attr("y1", yPos)
        .attr("x2", fieldWidth)
        .attr("y2", yPos)
        .attr("stroke", "rgba(255,255,255,0.15)")
        .attr("stroke-width", i === 5 ? 3 : 1);
    }
    
    // hashes
    const leftHash = fieldWidth * 0.35;
    const rightHash = fieldWidth * 0.65;
    
    for (let i = 0; i <= 10; i++) {
      const yPos = i * (fieldHeight / 10);
      
      // left
      fieldGroup.append("line")
        .attr("x1", leftHash - 10)
        .attr("y1", yPos)
        .attr("x2", leftHash + 10)
        .attr("y2", yPos)
        .attr("stroke", "rgba(255,255,255,0.4)")
        .attr("stroke-width", 2);
      
      // right
      fieldGroup.append("line")
        .attr("x1", rightHash - 10)
        .attr("y1", yPos)
        .attr("x2", rightHash + 10)
        .attr("y2", yPos)
        .attr("stroke", "rgba(255,255,255,0.4)")
        .attr("stroke-width", 2);
    }
    
    // LOS
    const losY = fieldHeight * 0.7;
    fieldGroup.append("line")
      .attr("x1", 0)
      .attr("y1", losY)
      .attr("x2", fieldWidth)
      .attr("y2", losY)
      .attr("stroke", "#4ECDC4")
      .attr("stroke-width", 4)
      .attr("stroke-dasharray", "10,5");
    
    // wrs
    const wrLeftX = 50;
    const wrRightX = fieldWidth - 50;
    const wrY = losY;
    
    // left
    fieldGroup.append("circle")
      .attr("cx", wrLeftX)
      .attr("cy", wrY)
      .attr("r", 18)
      .attr("fill", "#45B7D1")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 3);
    
    fieldGroup.append("text")
      .attr("x", wrLeftX)
      .attr("y", wrY + 6)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .attr("font-size", "14px")
      .attr("font-weight", "700")
      .text("WR");
    
    // right
    fieldGroup.append("circle")
      .attr("cx", wrRightX)
      .attr("cy", wrY)
      .attr("r", 18)
      .attr("fill", "#45B7D1")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 3);
    
    fieldGroup.append("text")
      .attr("x", wrRightX)
      .attr("y", wrY + 6)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .attr("font-size", "14px")
      .attr("font-weight", "700")
      .text("WR");
    
    // cb
    const cbY = losY - 40;
    
    // left
    fieldGroup.append("circle")
      .attr("cx", wrLeftX)
      .attr("cy", cbY)
      .attr("r", 18)
      .attr("fill", "#FF6B9D")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 3);
    
    fieldGroup.append("text")
      .attr("x", wrLeftX)
      .attr("y", cbY + 6)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .attr("font-size", "14px")
      .attr("font-weight", "700")
      .text("CB");
    
    // right
    fieldGroup.append("circle")
      .attr("cx", wrRightX)
      .attr("cy", cbY)
      .attr("r", 18)
      .attr("fill", "#FF6B9D")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 3);
    
    fieldGroup.append("text")
      .attr("x", wrRightX)
      .attr("y", cbY + 6)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .attr("font-size", "14px")
      .attr("font-weight", "700")
      .text("CB");
    
    // s
    const safetyY = fieldHeight * 0.2;
    
    if (is2High) {
      // two high
      const leftSafetyX = fieldWidth * 0.3;
      const rightSafetyX = fieldWidth * 0.7;
      
      // left
      fieldGroup.append("circle")
        .attr("cx", leftSafetyX)
        .attr("cy", safetyY)
        .attr("r", 22)
        .attr("fill", "#FECA57")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 3);
      
      fieldGroup.append("text")
        .attr("x", leftSafetyX)
        .attr("y", safetyY + 6)
        .attr("text-anchor", "middle")
        .attr("fill", "#0f0f23")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .text("S");
      
      // right
      fieldGroup.append("circle")
        .attr("cx", rightSafetyX)
        .attr("cy", safetyY)
        .attr("r", 22)
        .attr("fill", "#FECA57")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 3);
      
      fieldGroup.append("text")
        .attr("x", rightSafetyX)
        .attr("y", safetyY + 6)
        .attr("text-anchor", "middle")
        .attr("fill", "#0f0f23")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .text("S");
      
      // zones
      fieldGroup.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", fieldWidth / 2)
        .attr("height", safetyY + 50)
        .attr("fill", "rgba(254, 202, 87, 0.15)")
        .attr("stroke", "#FECA57")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
        .attr("rx", 8);
      
      fieldGroup.append("rect")
        .attr("x", fieldWidth / 2)
        .attr("y", 0)
        .attr("width", fieldWidth / 2)
        .attr("height", safetyY + 50)
        .attr("fill", "rgba(254, 202, 87, 0.15)")
        .attr("stroke", "#FECA57")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
        .attr("rx", 8);
      
    } else {
      // 1-high
      const centerSafetyX = fieldWidth / 2;
      
      fieldGroup.append("circle")
        .attr("cx", centerSafetyX)
        .attr("cy", safetyY)
        .attr("r", 22)
        .attr("fill", "#FECA57")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 3);
      
      fieldGroup.append("text")
        .attr("x", centerSafetyX)
        .attr("y", safetyY + 6)
        .attr("text-anchor", "middle")
        .attr("fill", "#0f0f23")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .text("S");
      
      // zone
      fieldGroup.append("rect")
        .attr("x", fieldWidth * 0.15)
        .attr("y", 0)
        .attr("width", fieldWidth * 0.7)
        .attr("height", safetyY + 50)
        .attr("fill", "rgba(254, 202, 87, 0.15)")
        .attr("stroke", "#FECA57")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
        .attr("rx", 8);
    }
    
    // routes
    const arrowMarker = defs.append("marker")
      .attr("id", `arrowhead-${is2High ? "2high" : "1high"}`)
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("refX", 9)
      .attr("refY", 3)
      .attr("orient", "auto");
    
    arrowMarker.append("polygon")
      .attr("points", "0 0, 10 3, 0 6")
      .attr("fill", "#45B7D1");
    
    // left
    const leftRoutePath = `M ${wrLeftX} ${wrY} L ${wrLeftX} ${fieldHeight * 0.1}`;
    fieldGroup.append("path")
      .attr("d", leftRoutePath)
      .attr("stroke", "#45B7D1")
      .attr("stroke-width", 6)
      .attr("stroke-opacity", 0.6)
      .attr("fill", "none")
      .attr("marker-end", `url(#arrowhead-${is2High ? "2high" : "1high"})`);
    
    // right
    const rightRoutePath = `M ${wrRightX} ${wrY} L ${wrRightX} ${fieldHeight * 0.1}`;
    fieldGroup.append("path")
      .attr("d", rightRoutePath)
      .attr("stroke", "#45B7D1")
      .attr("stroke-width", 6)
      .attr("stroke-opacity", 0.6)
      .attr("fill", "none")
      .attr("marker-end", `url(#arrowhead-${is2High ? "2high" : "1high"})`);
    
    // title
    fieldGroup.append("text")
      .attr("x", fieldWidth / 2)
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .attr("fill", "#2d3748")
      .attr("font-size", "20px")
      .attr("font-weight", "800")
      .text(title);
    
    return fieldGroup;
  }
  
  const leftFieldX = 50;
  const rightFieldX = leftFieldX + fieldWidth + gap;
  const fieldY = 50;
  
  drawField(leftFieldX, fieldY, "1-High Safety", false);
  drawField(rightFieldX, fieldY, "2-High Safeties", true);
  
  // legend
  const legendY = fieldY + fieldHeight + 30;
  const legend = svg.append("g")
    .attr("transform", `translate(${width / 2 - 200}, ${legendY})`);
  
  const legendItems = [
    { color: "#45B7D1", label: "Wide Receiver (WR)", x: -20 },
    { color: "#FF6B9D", label: "Cornerback (CB)", x: 150 },
    { color: "#FECA57", label: "Safety (S)", x: 300 }
  ];
  
  legendItems.forEach(item => {
    legend.append("circle")
      .attr("cx", item.x)
      .attr("cy", 0)
      .attr("r", 12)
      .attr("fill", item.color)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2);
    
    legend.append("text")
      .attr("x", item.x + 20)
      .attr("y", 5)
      .attr("fill", "#2d3748")
      .attr("font-size", "13px")
      .attr("font-weight", "600")
      .text(item.label);
  });
  
  return container.node();
}


function _5(md){return(
md`It's not difficult to see that on this play, an offense may have a better chance throwing the ball downfield against a one-high safety defense (left), given that the safety over the top can only pick one sideline to defend. This is the pick-your-poison nature of the one-high safety shells, typically run in **Cover 1** and **Cover 3**, as at least one of the two wide receivers will have a one-on-one matchup with a defender. In the NFL, that's not a bad shot.

Against a two-high safety look (right), it's much harder to take a chance downfield. Each wide receiver is matched up with their aligned defender, but as he reaches the safety's territory on his side, he is now in a one-on-two scenario. Typically against a **Cover 2** and sometimes **Cover 4**, this is a shot you almost never take.

(For the purpose of this analysis, it's not entirely important what each of Cover 1, 2, 3, or 4 is, but it is important to be able to distinguish which coverage is one or two-high safety coverages)

So, why don't defenses simply stay in two-high defense all game?

With an 11-man limit for each team, placing two high safeties means that there is one fewer defender to cover the underneath area of the field. Constantly running two safeties high to prioritize defending against the explosive plays means that an offense can wear you down through easy, short-yardage gains.`
)}

function _6(md){return(
md`Over the years in the last decade, it is true that defenses are lining up in two-high at an increasing rate. We can compare the safety alignment rates each year from 2015 and 2024 (ignoring other rare or case-specific formations like zero-high and goal line) to see a major shift from the one-high to two-high:`
)}

function _createTrendGraph(d3,data)
{
  const width = 1000;
  const height = 500;
  const margin = { top: 60, right: 120, bottom: 60, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  
  const container = d3.create("div")
    .style("font-family", "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif")
    .style("background", "#f8f9fa")
    .style("padding", "32px")
    .style("border-radius", "20px")
    .style("box-shadow", "0 25px 70px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.1)")
    .style("color", "#2d3748")
    .style("max-width", `${width}px`)
    .style("margin", "0 auto")
    .style("position", "relative");
  
  // Title
  container.append("div")
    .style("text-align", "center")
    .style("margin-bottom", "16px")
    .html(`
      <div style="font-size: 26px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 8px; color: #2d3748;">
        Pre-Snap Safety Alignment Trends
      </div>
    `);
  
  // Legend (moved below title)
  const legendContainer = container.append("div")
    .style("display", "flex")
    .style("justify-content", "center")
    .style("gap", "32px")
    .style("margin-bottom", "24px");
  
  // 1-High legend item
  const legend1High = legendContainer.append("div")
    .style("display", "flex")
    .style("align-items", "center")
    .style("gap", "8px");
  
  legend1High.append("svg")
    .attr("width", 40)
    .attr("height", 20)
    .style("display", "block")
    .append("g")
    .call(g => {
      g.append("line")
        .attr("x1", 0).attr("x2", 30)
        .attr("y1", 10).attr("y2", 10)
        .attr("stroke", "#FF6B9D")
        .attr("stroke-width", 3);
      g.append("circle")
        .attr("cx", 15).attr("cy", 10).attr("r", 5)
        .attr("fill", "#FF6B9D")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 2);
    });
  
  legend1High.append("span")
    .style("font-size", "14px")
    .style("font-weight", "600")
    .style("color", "#2d3748")
    .text("1-High");
  
  // 2-High legend item
  const legend2High = legendContainer.append("div")
    .style("display", "flex")
    .style("align-items", "center")
    .style("gap", "8px");
  
  legend2High.append("svg")
    .attr("width", 40)
    .attr("height", 20)
    .style("display", "block")
    .append("g")
    .call(g => {
      g.append("line")
        .attr("x1", 0).attr("x2", 30)
        .attr("y1", 10).attr("y2", 10)
        .attr("stroke", "#4ECDC4")
        .attr("stroke-width", 3);
      g.append("circle")
        .attr("cx", 15).attr("cy", 10).attr("r", 5)
        .attr("fill", "#4ECDC4")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 2);
    });
  
  legend2High.append("span")
    .style("font-size", "14px")
    .style("font-weight", "600")
    .style("color", "#2d3748")
    .text("2-High");
  
  // Tooltip
  const tooltip = container.append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "rgba(255, 255, 255, 0.98)")
    .style("backdrop-filter", "blur(20px)")
    .style("border-radius", "12px")
    .style("padding", "14px 18px")
    .style("box-shadow", "0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.1)")
    .style("pointer-events", "none")
    .style("font-size", "13px")
    .style("z-index", "1000")
    .style("min-width", "180px");
  
  // SVG
  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("display", "block")
    .style("margin", "0 auto");
  
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  // Scales
  const xScale = d3.scaleLinear()
    .domain([2015, 2024])
    .range([0, chartWidth]);
  
  const yScale = d3.scaleLinear()
    .domain([25, 75])
    .range([chartHeight, 0]);
  
  // Grid lines
  const yTicks = yScale.ticks(10);
  g.selectAll(".grid-line")
    .data(yTicks)
    .join("line")
    .attr("class", "grid-line")
    .attr("x1", 0)
    .attr("x2", chartWidth)
    .attr("y1", d => yScale(d))
    .attr("y2", d => yScale(d))
    .attr("stroke", "rgba(0,0,0,0.1)")
    .attr("stroke-width", 1);
  
  // Axes
  const xAxis = d3.axisBottom(xScale)
    .tickFormat(d => d.toString())
    .ticks(10);
  
  const yAxis = d3.axisLeft(yScale)
    .tickFormat(d => d + "%")
    .ticks(10);
  
  g.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis)
    .call(g => g.select(".domain").attr("stroke", "rgba(0,0,0,0.2)"))
    .call(g => g.selectAll(".tick line").attr("stroke", "rgba(0,0,0,0.2)"))
    .call(g => g.selectAll(".tick text")
      .attr("fill", "rgba(0,0,0,0.7)")
      .attr("font-size", "12px")
      .attr("font-weight", "600"));
  
  g.append("g")
    .call(yAxis)
    .call(g => g.select(".domain").attr("stroke", "rgba(0,0,0,0.2)"))
    .call(g => g.selectAll(".tick line").attr("stroke", "rgba(0,0,0,0.2)"))
    .call(g => g.selectAll(".tick text")
      .attr("fill", "rgba(0,0,0,0.7)")
      .attr("font-size", "12px")
      .attr("font-weight", "600"));
  
  // Line generators
  const line1High = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.pct_1_high_pre_snap))
    .curve(d3.curveMonotoneX);
  
  const line2High = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.pct_2_high_pre_snap))
    .curve(d3.curveMonotoneX);
  
  // Gradients
  const gradient1High = svg.append("defs")
    .append("linearGradient")
    .attr("id", "gradient1HighLight")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");
  
  gradient1High.append("stop").attr("offset", "0%").attr("stop-color", "#FF6B9D").attr("stop-opacity", 1);
  gradient1High.append("stop").attr("offset", "100%").attr("stop-color", "#FF6B9D").attr("stop-opacity", 0.8);
  
  const gradient2High = svg.append("defs")
    .append("linearGradient")
    .attr("id", "gradient2HighLight")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");
  
  gradient2High.append("stop").attr("offset", "0%").attr("stop-color", "#4ECDC4").attr("stop-opacity", 0.8);
  gradient2High.append("stop").attr("offset", "100%").attr("stop-color", "#4ECDC4").attr("stop-opacity", 1);
  
  // Draw lines
  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "url(#gradient1HighLight)")
    .attr("stroke-width", 4)
    .attr("d", line1High);
  
  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "url(#gradient2HighLight)")
    .attr("stroke-width", 4)
    .attr("d", line2High);
  
  // Dots with tooltips for 1-High
  g.selectAll(".dot-1high")
    .data(data)
    .join("circle")
    .attr("class", "dot-1high")
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.pct_1_high_pre_snap))
    .attr("r", 5)
    .attr("fill", "#FF6B9D")
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 2)
    .style("cursor", "pointer")
    .on("mouseover", function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 7)
        .attr("stroke-width", 3);
      
      tooltip
        .html(`
          <div style="font-weight: 700; font-size: 15px; margin-bottom: 8px; color: #2d3748;">
            ${d.year} Season
          </div>
          <div style="color: #FF6B9D; font-size: 14px; font-weight: 600; margin-bottom: 4px;">
            1-High: ${d.pct_1_high_pre_snap.toFixed(1)}%
          </div>
          <div style="color: #718096; font-size: 12px;">
            ${d.total_1_high_pre_snap.toLocaleString()} plays
          </div>
        `)
        .style("visibility", "visible");
    })
    .on("mousemove", function(event) {
      const containerRect = container.node().getBoundingClientRect();
      tooltip
        .style("left", (event.clientX - containerRect.left + 15) + "px")
        .style("top", (event.clientY - containerRect.top - 15) + "px");
    })
    .on("mouseout", function() {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 5)
        .attr("stroke-width", 2);
      
      tooltip.style("visibility", "hidden");
    });
  
  // Dots with tooltips for 2-High
  g.selectAll(".dot-2high")
    .data(data)
    .join("circle")
    .attr("class", "dot-2high")
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.pct_2_high_pre_snap))
    .attr("r", 5)
    .attr("fill", "#4ECDC4")
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 2)
    .style("cursor", "pointer")
    .on("mouseover", function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 7)
        .attr("stroke-width", 3);
      
      tooltip
        .html(`
          <div style="font-weight: 700; font-size: 15px; margin-bottom: 8px; color: #2d3748;">
            ${d.year} Season
          </div>
          <div style="color: #4ECDC4; font-size: 14px; font-weight: 600; margin-bottom: 4px;">
            2-High: ${d.pct_2_high_pre_snap.toFixed(1)}%
          </div>
          <div style="color: #718096; font-size: 12px;">
            ${d.total_2_high_pre_snap.toLocaleString()} plays
          </div>
        `)
        .style("visibility", "visible");
    })
    .on("mousemove", function(event) {
      const containerRect = container.node().getBoundingClientRect();
      tooltip
        .style("left", (event.clientX - containerRect.left + 15) + "px")
        .style("top", (event.clientY - containerRect.top - 15) + "px");
    })
    .on("mouseout", function() {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 5)
        .attr("stroke-width", 2);
      
      tooltip.style("visibility", "hidden");
    });
  
  // Labels
  const firstYear = data[0];
  const lastYear = data[data.length - 1];
  
  g.append("text")
    .attr("x", xScale(firstYear.year) - 10)
    .attr("y", yScale(firstYear.pct_1_high_pre_snap))
    .attr("text-anchor", "end")
    .attr("fill", "#FF6B9D")
    .attr("font-size", "14px")
    .attr("font-weight", "700")
    .text(firstYear.pct_1_high_pre_snap.toFixed(1) + "%");
  
  g.append("text")
    .attr("x", xScale(firstYear.year) - 10)
    .attr("y", yScale(firstYear.pct_2_high_pre_snap))
    .attr("text-anchor", "end")
    .attr("fill", "#4ECDC4")
    .attr("font-size", "14px")
    .attr("font-weight", "700")
    .text(firstYear.pct_2_high_pre_snap.toFixed(1) + "%");
  
  g.append("text")
    .attr("x", xScale(lastYear.year) + 10)
    .attr("y", yScale(lastYear.pct_1_high_pre_snap))
    .attr("text-anchor", "start")
    .attr("fill", "#FF6B9D")
    .attr("font-size", "14px")
    .attr("font-weight", "700")
    .text(lastYear.pct_1_high_pre_snap.toFixed(1) + "%");
  
  g.append("text")
    .attr("x", xScale(lastYear.year) + 10)
    .attr("y", yScale(lastYear.pct_2_high_pre_snap))
    .attr("text-anchor", "start")
    .attr("fill", "#4ECDC4")
    .attr("font-size", "14px")
    .attr("font-weight", "700")
    .text(lastYear.pct_2_high_pre_snap.toFixed(1) + "%");

  return container.node();
}


function _8(md){return(
md`As the years go by, the gap between the one-high alignment and two-high alignment closes, almost to an equivalent rate. At a glance, the complaints seem to hold value. Defenses are moving towards two-high defenses more than ever, right?`
)}

function _9(md){return(
md`Well, not quite.

In 2015, Seattle's Legion of Boom, arguably the most dominant defensive unit in football history, popularized the usage of Cover 3, the most common one-high safety defense. The league average rate of running Cover 3 in 2015 was 26.5%. A decade later, in 2024, this number actually **increases** to 29.7%. So, how is it possible that the increased rate of two-high safeties is ruining the NFL if teams are running the most common one-high safety defense more than ever?

Notice that the lines above show the _pre-snap_ alignment of safeties. The "snap" marks the actual start of the play, so what actually matters is not what the defense _showed_ before the snap, but rather what they are actually assigned to run during the play.

Many defensive coordinators over the years, most notably Vic Fangio, pioneered the evolution of the **rotation** in defensive philosophy. This means that a defense will set up in a certain safety alignment before the play to give the impression they are running a certain coverage, then rotate a safety into a different part of the field to run a completely different coverage. It's like the idea of bluffing in poker.

The two most common cases of defensive rotations are shown below:`
)}

function _rotations(d3)
{
  const width = 1200;
  const height = 850;
  const fieldWidth = 500;
  const fieldHeight = 350;
  const gap = 50;
  
  const container = d3.create("div")
    .style("font-family", "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif")
    .style("background", "#f8f9fa")
    .style("padding", "32px")
    .style("border-radius", "20px")
    .style("box-shadow", "0 25px 70px rgba(0,0,0,0.15)")
    .style("color", "#2d3748");
  
  const sliderContainer = container.append("div")
    .style("max-width", "500px")
    .style("margin", "0 auto 32px auto");
  
  const sliderWrapper = sliderContainer.append("div")
    .style("position", "relative");
  
  const slider = sliderWrapper.append("input")
    .attr("type", "range")
    .attr("min", "0")
    .attr("max", "100")
    .attr("value", "0")
    .attr("id", "animation-slider")
    .style("width", "100%")
    .style("height", "6px")
    .style("border-radius", "3px")
    .style("background", "rgba(0,0,0,0.15)")
    .style("outline", "none")
    .style("-webkit-appearance", "none")
    .style("appearance", "none")
    .style("cursor", "pointer");
  
  const timeLabels = sliderWrapper.append("div")
    .style("display", "flex")
    .style("justify-content", "space-between")
    .style("margin-top", "8px")
    .style("font-size", "12px")
    .style("color", "rgba(0,0,0,0.5)")
    .style("font-weight", "500");
  
  timeLabels.append("span").text("Pre-Snap");
  timeLabels.append("span").text("Post-Snap");
  
  const style = container.append("style").text(`
    #animation-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #4ECDC4;
      cursor: pointer;
      margin-top: -6px;
      transition: none !important;
      animation: none !important;
      border: none;
      outline: none;
      box-shadow: none;
    }
    
    #animation-slider::-webkit-slider-thumb:hover {
      transform: none;
      transition: none !important;
      animation: none !important;
      border: none;
      outline: none;
      box-shadow: none;
    }
    
    #animation-slider::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #4ECDC4;
      cursor: pointer;
      border: none;
      transition: none !important;
      animation: none !important;
      outline: none;
      box-shadow: none;
    }
    
    #animation-slider::-moz-range-thumb:hover {
      transform: none;
      transition: none !important;
      animation: none !important;
      border: none;
      outline: none;
      box-shadow: none;
    }
    
    #animation-slider::-webkit-slider-runnable-track {
      background: rgba(0,0,0,0.15);
      height: 6px;
      border-radius: 3px;
    }
    
    #animation-slider::-moz-range-track {
      background: rgba(0,0,0,0.15);
      height: 6px;
      border-radius: 3px;
    }
  `);
  
  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("max-width", "100%")
    .style("height", "auto");
  
  const defs = svg.append("defs");
  
  const fieldGradient = defs.append("linearGradient")
    .attr("id", "fieldGradientRotation")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");
  
  fieldGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#1a4d2e");
  
  fieldGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#2d5f3d");
  
  function drawAnimatedField(x, y, title, scenario) {
    const fieldGroup = svg.append("g")
      .attr("transform", `translate(${x}, ${y})`);
    
    // field
    fieldGroup.append("rect")
      .attr("width", fieldWidth)
      .attr("height", fieldHeight)
      .attr("fill", "url(#fieldGradientRotation)")
      .attr("rx", 12);

    fieldGroup.append("text")
      .attr("x", fieldWidth / 2)
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .attr("fill", "#2d3748")
      .attr("font-size", "18px")
      .attr("font-weight", "700")
      .text(title);
    
    // line
    for (let i = 0; i <= 5; i++) {
      const yPos = i * (fieldHeight / 5);
      fieldGroup.append("line")
        .attr("x1", 0)
        .attr("y1", yPos)
        .attr("x2", fieldWidth)
        .attr("y2", yPos)
        .attr("stroke", "rgba(255,255,255,0.15)")
        .attr("stroke-width", i === 3 ? 3 : 1);
    }
    
    // LOS
    const losY = fieldHeight * 0.65;
    fieldGroup.append("line")
      .attr("x1", 0)
      .attr("y1", losY)
      .attr("x2", fieldWidth)
      .attr("y2", losY)
      .attr("stroke", "#4ECDC4")
      .attr("stroke-width", 4)
      .attr("stroke-dasharray", "10,5");
    
    return { fieldGroup, losY };
  }
  
  const topY = 50;
  const bottomY = topY + fieldHeight + 80;
  const fieldX = (width - fieldWidth) / 2;
  
  const field1 = drawAnimatedField(fieldX, topY, "2-High Rotating to 1-High", "2high_to_1high");
  const field2 = drawAnimatedField(fieldX, bottomY, "1-High Rotating to 2-High", "1high_to_2high");
  
  let isAutoPlaying = true;
  let animationFrame = null;
  let currentTime = 0;
  let direction = 1;
  const cycleDuration = 3000; // 3 seconds
  
  // 1
  const leftPreX = fieldWidth * 0.3;
  const rightPreX = fieldWidth * 0.7;
  const preSnapY = fieldHeight * 0.25;
  const centerPostX = fieldWidth / 2;
  const centerPostY = fieldHeight * 0.20;
  const boxPostX = fieldWidth * 0.65;
  const boxPostY = field1.losY - 40;
  
  const leftSafety1 = field1.fieldGroup.append("g");
  const leftCircle1 = leftSafety1.append("circle")
    .attr("cx", leftPreX)
    .attr("cy", preSnapY)
    .attr("r", 22)
    .attr("fill", "#FECA57")
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 3);
  const leftText1 = leftSafety1.append("text")
    .attr("x", leftPreX)
    .attr("y", preSnapY + 6)
    .attr("text-anchor", "middle")
    .attr("fill", "#0f0f23")
    .attr("font-size", "14px")
    .attr("font-weight", "700")
    .text("S");
  
  const rightSafety1 = field1.fieldGroup.append("g");
  const rightCircle1 = rightSafety1.append("circle")
    .attr("cx", rightPreX)
    .attr("cy", preSnapY)
    .attr("r", 22)
    .attr("fill", "#FECA57")
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 3);
  const rightText1 = rightSafety1.append("text")
    .attr("x", rightPreX)
    .attr("y", preSnapY + 6)
    .attr("text-anchor", "middle")
    .attr("fill", "#0f0f23")
    .attr("font-size", "14px")
    .attr("font-weight", "700")
    .text("S");
  
  // 2
  const centerPreX = fieldWidth / 2;
  const fsPreY = fieldHeight * 0.25;
  const ssPreX = fieldWidth * 0.65;
  const ssPreY = field2.losY - 40;
  const leftPostX = fieldWidth * 0.3;
  const rightPostX = fieldWidth * 0.7;
  const postSnapY = fieldHeight * 0.22;
  
  const fsSafety2 = field2.fieldGroup.append("g");
  const fsCircle2 = fsSafety2.append("circle")
    .attr("cx", centerPreX)
    .attr("cy", fsPreY)
    .attr("r", 22)
    .attr("fill", "#FECA57")
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 3);
  const fsText2 = fsSafety2.append("text")
    .attr("x", centerPreX)
    .attr("y", fsPreY + 6)
    .attr("text-anchor", "middle")
    .attr("fill", "#0f0f23")
    .attr("font-size", "14px")
    .attr("font-weight", "700")
    .text("S");
  
  const ssSafety2 = field2.fieldGroup.append("g");
  const ssCircle2 = ssSafety2.append("circle")
    .attr("cx", ssPreX)
    .attr("cy", ssPreY)
    .attr("r", 22)
    .attr("fill", "#FECA57")
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 3);
  const ssText2 = ssSafety2.append("text")
    .attr("x", ssPreX)
    .attr("y", ssPreY + 6)
    .attr("text-anchor", "middle")
    .attr("fill", "#0f0f23")
    .attr("font-size", "14px")
    .attr("font-weight", "700")
    .text("S");
  
  function updatePositions(progress) {
    const t = progress / 100;
    
    const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    
    const left1X = leftPreX + (centerPostX - leftPreX) * easeT;
    const left1Y = preSnapY + (centerPostY - preSnapY) * easeT;
    leftCircle1.attr("cx", left1X).attr("cy", left1Y);
    leftText1.attr("x", left1X).attr("y", left1Y + 6);
    
    const right1X = rightPreX + (boxPostX - rightPreX) * easeT;
    const right1Y = preSnapY + (boxPostY - preSnapY) * easeT;
    rightCircle1.attr("cx", right1X).attr("cy", right1Y);
    rightText1.attr("x", right1X).attr("y", right1Y + 6);
    
    const fs2X = centerPreX + (leftPostX - centerPreX) * easeT;
    const fs2Y = fsPreY + (postSnapY - fsPreY) * easeT;
    fsCircle2.attr("cx", fs2X).attr("cy", fs2Y);
    fsText2.attr("x", fs2X).attr("y", fs2Y + 6);
    
    const ss2X = ssPreX + (rightPostX - ssPreX) * easeT;
    const ss2Y = ssPreY + (postSnapY - ssPreY) * easeT;
    ssCircle2.attr("cx", ss2X).attr("cy", ss2Y);
    ssText2.attr("x", ss2X).attr("y", ss2Y + 6);
  }
  
  const sliderElement = container.select("#animation-slider").node();
  
  sliderElement.addEventListener("input", (e) => {
    isAutoPlaying = false;
    const progress = parseFloat(e.target.value);
    updatePositions(progress);
  });
  
  let lastTime = 0;
  function animate(timestamp) {
    if (!isAutoPlaying) return;
    
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    currentTime += (deltaTime / cycleDuration * 100) * direction;
    
    if (currentTime >= 100) {
      currentTime = 100;
      direction = -1;
      setTimeout(() => {}, 800);
    } else if (currentTime <= 0) {
      currentTime = 0;
      direction = 1;
      setTimeout(() => {}, 800);
    }
    
    sliderElement.value = currentTime;
    updatePositions(currentTime);
    
    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);
  
  return container.node();
}


function _11(md){return(
md`This effectively 'disguises' the actual coverage as something else, and an offense cannot know for sure what coverage they are facing until after the ball is snapped.

When a defense rotates from a 2-high look to a 1-high coverage (top), the idea is that the defense hopes to discourage the opposing quarterback pre-snap from wanting to throw the ball deep, then rotates into a coverage that defends the short routes better. This allows the partial benefits of both one and two-high safety coverages simultaneously, and has proven to be quite effective in the modern NFL.

Below is a flow diagram that shows the number of plays starting in a specific pre-snap alignment on the left, flowing to the actual coverage that was run on the right.`
)}

function _sankey(d3,prepareSankeyData,data)
{
  let currentYear = 2024;
  
  const mainContainer = d3.create("div")
    .style("font-family", "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif");
  
  // container
  const outerContainer = mainContainer.append("div")
    .style("position", "relative")
    .style("padding", "20px");
  
  const svg = outerContainer.append("svg")
    .attr("width", 1200)
    .attr("height", 700)
    .attr("viewBox", [0, 0, 1200, 700])
    .style("max-width", "100%")
    .style("height", "auto")
    .style("background", "#f8f9fa")
    .style("border-radius", "20px")
    .style("box-shadow", "0 25px 70px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.1)");
  
  // title
  const titleText = svg.append("text")
    .attr("x", 600)
    .attr("y", 45)
    .attr("text-anchor", "middle")
    .attr("font-size", "32px")
    .attr("font-weight", "800")
    .attr("fill", "#2d3748")
    .attr("letter-spacing", "-0.5px")
    .style("text-shadow", "none")
    .text(`NFL Coverage Flows: ${currentYear}`);
  
  // subtitle
  svg.append("text")
    .attr("x", 600)
    .attr("y", 72)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("font-weight", "500")
    .attr("fill", "rgba(0,0,0,0.7)")
    .attr("letter-spacing", "0.5px")
    .style("text-shadow", "none")
    .text("PRE-SNAP LOOKS → POST-SNAP COVERAGES");
  
  // slider
  const sliderFO = svg.append("foreignObject")
    .attr("x", 350)
    .attr("y", 82)
    .attr("width", 500)
    .attr("height", 60);
  
  const sliderDiv = sliderFO.append("xhtml:div")
    .style("width", "100%")
    .style("padding", "0 12px");
  
  const slider = sliderDiv.append("input")
    .attr("type", "range")
    .attr("min", "2015")
    .attr("max", "2024")
    .attr("value", currentYear)
    .attr("step", "1")
    .attr("id", "year-slider")
    .style("width", "calc(100% - 24px)")
    .style("height", "6px")
    .style("border-radius", "3px")
    .style("background", "rgba(0,0,0,0.15)")
    .style("outline", "none")
    .style("-webkit-appearance", "none")
    .style("appearance", "none")
    .style("cursor", "pointer");
  
  const sliderLabels = sliderDiv.append("div")
    .style("display", "flex")
    .style("justify-content", "space-between")
    .style("margin-top", "8px")
    .style("font-size", "12px")
    .style("color", "rgba(0,0,0,0.5)")
    .style("font-weight", "500")
    .style("width", "calc(100% - 24px)");
  
  sliderLabels.append("span").text("2015");
  sliderLabels.append("span").text("2024");
  
  const style = mainContainer.append("style").text(`
    #year-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #4ECDC4;
      cursor: pointer;
      margin-top: -6px;
      transition: none !important;
      animation: none !important;
      border: none;
      outline: none;
      box-shadow: none;
    }
  
    #year-slider::-webkit-slider-thumb:hover {
      transform: none;
      transition: none !important;
      animation: none !important;
      border: none;
      outline: none;
      box-shadow: none;
    }
  
    #year-slider::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #4ECDC4;
      cursor: pointer;
      border: none;
      transition: none !important;
      animation: none !important;
      outline: none;
      box-shadow: none;
    }
  
    #year-slider::-moz-range-thumb:hover {
      transform: none;
      transition: none !important;
      animation: none !important;
      border: none;
      outline: none;
      box-shadow: none;
    }
  
    #year-slider::-webkit-slider-runnable-track {
      background: rgba(0,0,0,0.15);
      height: 6px;
      border-radius: 3px;
    }
  
    #year-slider::-moz-range-track {
      background: rgba(0,0,0,0.15);
      height: 6px;
      border-radius: 3px;
    }
  `);
  
  const sankeyGroup = svg.append("g");
  
  const tooltip = outerContainer.append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "rgba(255, 255, 255, 0.95)")
    .style("backdrop-filter", "blur(20px)")
    .style("border-radius", "16px")
    .style("padding", "18px 24px")
    .style("box-shadow", "0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2)")
    .style("pointer-events", "none")
    .style("font-size", "14px")
    .style("z-index", "1000")
    .style("min-width", "200px");
  
  function createSankeyDiagram(year) {
    const width = 1200;
    const height = 700;
    const margin = { top: 160, right: 220, bottom: 40, left: 220 };
    
    const sankeyData = prepareSankeyData(year, data);
    const yearData = data.find(d => d.year === year);
    const totalSnaps = yearData ? yearData.total_defensive_snaps : 1;
    
    const colorScale = d3.scaleOrdinal()
      .domain(["Cover 1", "Cover 2", "Cover 3", "Cover 4", "Cover 6", "Cover 0", "Bracket", "Other"])
      .range(["#FF6B9D", "#4ECDC4", "#45B7D1", "#95E1D3", "#FFA07A", "#C7CEEA", "#FECA57", "#DFE4EA"]);
    
    // update title
    titleText.text(`NFL Coverage Flows: ${year}`);
    
    sankeyGroup.selectAll("*").remove();
    
    const defs = sankeyGroup.append("defs");
    
    const glow = defs.append("filter")
      .attr("id", "glow-sankey");
    
    glow.append("feGaussianBlur")
      .attr("stdDeviation", "4")
      .attr("result", "coloredBlur");
    
    const feMerge = glow.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    
    const sankey = d3.sankey()
      .nodeId(d => d.name)
      .nodeAlign(d3.sankeyJustify)
      .nodeWidth(28)
      .nodePadding(22)
      .nodeSort((a, b) => {
        const postSnapOrder = ["Cover 1", "Cover 3", "Cover 2", "Cover 4", "Cover 6", "Cover 0", "Bracket", "Other"];
        const indexA = postSnapOrder.indexOf(a.name);
        const indexB = postSnapOrder.indexOf(b.name);
        
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        return 0;
      })
      .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]]);
    
    const graph = sankey({
      nodes: sankeyData.nodes.map(d => ({...d})),
      links: sankeyData.links.map(d => ({...d}))
    });
    
    graph.links.forEach((link, i) => {
      const gradient = defs.append("linearGradient")
        .attr("id", `gradient-sankey-${i}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", link.source.x1)
        .attr("x2", link.target.x0);
      
      const preSnapColor = "#8B7FD8";
      const sourceColor = link.source.category === "pre" ? preSnapColor : colorScale(link.source.name);
      const targetColor = colorScale(link.target.name);
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", sourceColor)
        .attr("stop-opacity", 0.85);
      
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", targetColor)
        .attr("stop-opacity", 0.85);
    });
    
    const linkGroup = sankeyGroup.append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.75)
      .selectAll("g")
      .data(graph.links)
      .join("g");
    
    linkGroup.append("path")
      .attr("d", d3.sankeyLinkHorizontal())
      .attr("stroke", (d, i) => `url(#gradient-sankey-${i})`)
      .attr("stroke-width", d => Math.max(2, d.width))
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("stroke-opacity", 1)
          .attr("stroke-width", d => Math.max(2, d.width) + 3)
          .style("filter", "drop-shadow(0 0 8px rgba(255,255,255,0.6))");
        
        linkGroup.selectAll("path")
          .filter(link => link !== d)
          .transition()
          .duration(200)
          .attr("stroke-opacity", 0.15);
        
        tooltip.html(`
          <div style="font-weight: 700; font-size: 17px; margin-bottom: 10px; color: #1a1a2e; letter-spacing: -0.3px;">
            ${d.source.name} → ${d.target.name}
          </div>
          <div style="color: #4a5568; font-size: 15px; margin-bottom: 6px;">
            <strong style="color: ${colorScale(d.target.name)}; font-size: 18px;">${d.value.toLocaleString()}</strong> plays
          </div>
          <div style="color: #718096; font-size: 13px; padding-top: 6px; border-top: 1px solid #e2e8f0;">
            ${((d.value / d.source.value) * 100).toFixed(1)}% of ${d.source.name}
          </div>
          <div style="color: #718096; font-size: 13px; padding-top: 4px;">
            ${((d.value / d.target.value) * 100).toFixed(1)}% of ${d.target.name}
          </div>
        `).style("visibility", "visible");
      })
      .on("mousemove", function(event) {
        const containerRect = outerContainer.node().getBoundingClientRect();
        tooltip
          .style("left", (event.clientX - containerRect.left + 20) + "px")
          .style("top", (event.clientY - containerRect.top - 20) + "px");
      })
      .on("mouseout", function() {
        linkGroup.selectAll("path")
          .transition()
          .duration(200)
          .attr("stroke-opacity", 0.75)
          .attr("stroke-width", d => Math.max(2, d.width))
          .style("filter", "none");
        
        tooltip.style("visibility", "hidden");
      });
    
    const nodeGroup = sankeyGroup.append("g")
      .selectAll("g")
      .data(graph.nodes)
      .join("g");
    
    const preSnapColor = "#8B7FD8";
    
    nodeGroup.append("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("fill", d => d.category === "pre" ? preSnapColor : colorScale(d.name))
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2.5)
      .attr("rx", 8)
      .style("filter", "drop-shadow(0 6px 12px rgba(0,0,0,0.4))")
      .on("mouseover", function(event, d) {
        tooltip.html(`
          <div style="font-weight: 700; font-size: 17px; margin-bottom: 10px; color: #1a1a2e; letter-spacing: -0.3px;">
            ${d.name}
          </div>
          <div style="color: #4a5568; font-size: 15px;">
            <strong style="color: ${d.category === "pre" ? preSnapColor : colorScale(d.name)}; font-size: 18px;">
              ${d.value.toLocaleString()}
            </strong> total plays
          </div>
          <div style="color: #718096; font-size: 13px; padding-top: 6px; border-top: 1px solid #e2e8f0;">
            ${((d.value / totalSnaps) * 100).toFixed(1)}% of all defensive snaps
          </div>
        `).style("visibility", "visible");
      })
      .on("mousemove", function(event) {
        const containerRect = outerContainer.node().getBoundingClientRect();
        tooltip
          .style("left", (event.clientX - containerRect.left + 20) + "px")
          .style("top", (event.clientY - containerRect.top - 20) + "px");
      })
      .on("mouseout", function() {
        tooltip.style("visibility", "hidden");
      });
    
    sankeyGroup.append("g")
      .selectAll("text")
      .data(graph.nodes)
      .join("text")
      .attr("x", d => d.x0 < width / 2 ? d.x1 + 14 : d.x0 - 14)
      .attr("y", d => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
      .attr("font-weight", "700")
      .attr("font-size", "15px")
      .attr("fill", "#2d3748")
      .attr("letter-spacing", "-0.3px")
      .style("text-shadow", "none")
      .text(d => d.name);
    
    sankeyGroup.append("g")
      .selectAll("text")
      .data(graph.nodes)
      .join("text")
      .attr("x", d => d.x0 < width / 2 ? d.x1 + 14 : d.x0 - 14)
      .attr("y", d => (d.y1 + d.y0) / 2 + 18)
      .attr("dy", "0.35em")
      .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
      .attr("font-size", "12px")
      .attr("font-weight", "500")
      .attr("fill", "rgba(0,0,0,0.65)")
      .style("text-shadow", "none")
      .text(d => `${d.value.toLocaleString()} plays`);
  }
  
  slider.on("input", function() {
    currentYear = +this.value;
    createSankeyDiagram(currentYear);
    mainContainer.node().value = currentYear;
    mainContainer.node().dispatchEvent(new CustomEvent("input"));
  });
  
  createSankeyDiagram(currentYear);
  
  mainContainer.node().value = currentYear;
  return mainContainer.node();
}


function _13(md){return(
md`Based on the above diagram (hover to see details), we can see that in 2015, NFL defenses lined up in 1-high (68.2%) pre-snap at a considerably higher rate than that of 2-high (31.8%). After the snap, only about 26% of Cover 3 usage and 15% of Cover 1 usage (both one-high defenses) came from a 2-high safety look pre-snap, meaning that on most plays where the defense lined up in one-high, they stayed in one-high without rotating, so offenses could easily predict the actual coverage.

A decade later, the pre-snap rate of the one-high safety look falls to 51.4%, while the two-high look jumps to 48.6%: roughly at an equivalent rate. Now, almost 43.3% of Cover 3 usage and 29% of Cover 1 usage come from a 2-high safety look pre-snap. 

Both values almost double, indicating a clear increase in safety rotations, especially from a 2-high disguise to a 1-high coverage. Namely, in recent years, the rate at which a defense attempts to disguise its coverage with its pre-snap alignment has almost doubled, making it difficult for an offense to predict the defensive coverage.`
)}

function _14(md){return(
md`Ultimately, the root cause of the narrative that two-high safety defenses are limiting explosive offense is that people are conflating lining up in a two-high shell pre-snap with actually running a two-high coverage.`
)}

function _pie(d3,data)
{
  let currentYear = 2024;
  
  const mainContainer = d3.create("div")
    .style("font-family", "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif");
  
  // main container
  const outerContainer = mainContainer.append("div")
    .style("background", "#f8f9fa")
    .style("padding", "24px")
    .style("border-radius", "20px")
    .style("box-shadow", "0 25px 70px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.1)")
    .style("color", "#2d3748")
    .style("max-width", "900px")
    .style("margin", "0 auto")
    .style("position", "relative");
  
  // title
  const titleDiv = outerContainer.append("div")
    .style("text-align", "center")
    .style("margin-bottom", "20px");
  
  const titleText = titleDiv.append("div")
    .style("font-size", "24px")
    .style("font-weight", "800")
    .style("letter-spacing", "-0.5px")
    .style("margin-bottom", "4px")
    .style("color", "#2d3748")
    .text(`Post-Snap Coverage Distribution: ${currentYear}`);
  
  // slider
  const sliderWrapper = outerContainer.append("div")
    .style("max-width", "500px")
    .style("margin", "0 auto 24px auto");
  
  const slider = sliderWrapper.append("input")
    .attr("type", "range")
    .attr("min", "2015")
    .attr("max", "2024")
    .attr("value", currentYear)
    .attr("step", "1")
    .attr("id", "pie-slider")
    .style("width", "100%")
    .style("height", "6px")
    .style("border-radius", "3px")
    .style("background", "rgba(0,0,0,0.15)")
    .style("outline", "none")
    .style("-webkit-appearance", "none")
    .style("appearance", "none")
    .style("cursor", "pointer");
  
  const sliderLabels = sliderWrapper.append("div")
    .style("display", "flex")
    .style("justify-content", "space-between")
    .style("margin-top", "8px")
    .style("font-size", "12px")
    .style("color", "rgba(0,0,0,0.5)")
    .style("font-weight", "500");
  
  sliderLabels.append("span").text("2015");
  sliderLabels.append("span").text("2024");
  
  const pieContentContainer = outerContainer.append("div");
  
  function updatePieChart(year) {
    const width = 900;
    const height = 500;
    const pieWidth = 550;
    const radius = Math.min(pieWidth, height) / 2 - 40;
    
    const yearData = data.find(d => d.year === year);
    
    const cover1Total = yearData.cover_1_from_1_high + yearData.cover_1_from_2_high;
    const cover2Total = yearData.cover_2_from_1_high + yearData.cover_2_from_2_high;
    const cover3Total = yearData.cover_3_from_1_high + yearData.cover_3_from_2_high;
    const cover4Total = yearData.cover_4_from_1_high + yearData.cover_4_from_2_high;
    const cover6Total = yearData.cover_6_from_1_high + yearData.cover_6_from_2_high;
    const cover0Total = yearData.cover_0_from_1_high + yearData.cover_0_from_2_high;
    const bracketTotal = yearData.bracket_cover_from_1_high + yearData.bracket_cover_from_2_high;
    const otherTotal = yearData.other_defense_from_1_high + yearData.other_defense_from_2_high;
    
    const oneHigh = cover1Total + cover3Total;
    const twoHigh = cover2Total + cover4Total;
    const others = cover0Total + cover6Total + bracketTotal + otherTotal;
    const total = oneHigh + twoHigh + others;
    
    const pieData = [
      { name: "1-High", value: oneHigh, color: "#FF6B9D", description: "Cover 1 + Cover 3" },
      { name: "2-High", value: twoHigh, color: "#4ECDC4", description: "Cover 2 + Cover 4" },
      { name: "Others", value: others, color: "#FECA57", description: "Cover 0, 6, Bracket, Other" }
    ];
    
    // update title
    titleText.text(`Post-Snap Coverage Distribution: ${year}`);
    
    pieContentContainer.selectAll("*").remove();
    
    const mainContent = pieContentContainer.append("div")
      .style("display", "flex")
      .style("align-items", "center")
      .style("gap", "32px")
      .style("justify-content", "center");
    
    const pieChartContainer = mainContent.append("div")
      .style("position", "relative");
    
    const svg = pieChartContainer.append("svg")
      .attr("width", pieWidth)
      .attr("height", height)
      .style("display", "block");
    
    const g = svg.append("g")
      .attr("transform", `translate(${pieWidth / 2}, ${height / 2 - 20})`);
    
    const tooltip = outerContainer.append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(255, 255, 255, 0.95)")
      .style("backdrop-filter", "blur(20px)")
      .style("border-radius", "16px")
      .style("padding", "18px 24px")
      .style("box-shadow", "0 10px 40px rgba(0,0,0,0.3)")
      .style("pointer-events", "none")
      .style("font-size", "14px")
      .style("z-index", "1000");
    
    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);
    
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);
    
    g.selectAll("path")
      .data(pie(pieData))
      .join("path")
      .attr("d", arc)
      .attr("fill", d => d.data.color)
      .attr("stroke", "#f8f9fa")
      .attr("stroke-width", 3)
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        const percentage = ((d.data.value / total) * 100).toFixed(1);
        
        tooltip
          .html(`
            <div style="font-weight: 700; font-size: 17px; margin-bottom: 10px; color: #1a1a2e;">
              ${d.data.name}
            </div>
            <div style="color: #4a5568; font-size: 15px; margin-bottom: 8px;">
              <strong style="color: ${d.data.color}; font-size: 18px;">${d.data.value.toLocaleString()}</strong> plays
            </div>
            <div style="color: #718096; font-size: 13px; margin-bottom: 8px;">
              <strong style="color: ${d.data.color}; font-size: 16px;">${percentage}%</strong> of all coverages
            </div>
            <div style="color: #718096; font-size: 12px; padding-top: 8px; border-top: 1px solid #e2e8f0; font-style: italic;">
              ${d.data.description}
            </div>
          `)
          .style("visibility", "visible");
      })
      .on("mousemove", function(event) {
        const containerRect = outerContainer.node().getBoundingClientRect();
        tooltip
          .style("left", (event.clientX - containerRect.left + 20) + "px")
          .style("top", (event.clientY - containerRect.top - 20) + "px");
      })
      .on("mouseout", function() {
        tooltip.style("visibility", "hidden");
      });
    
    const labelArc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.6);
    
    g.selectAll("text")
      .data(pie(pieData))
      .join("text")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", "13px")
      .style("font-weight", "700")
      .style("fill", "#ffffff")
      .style("text-shadow", "0 2px 8px rgba(0,0,0,0.8)")
      .style("pointer-events", "none")
      .each(function(d) {
        const percentage = ((d.data.value / total) * 100).toFixed(1);
        d3.select(this).append("tspan")
          .attr("x", 0)
          .attr("dy", "-0.3em")
          .style("font-size", "16px")
          .text(d.data.name);
        
        d3.select(this).append("tspan")
          .attr("x", 0)
          .attr("dy", "1.4em")
          .style("font-size", "18px")
          .style("font-weight", "800")
          .text(`${percentage}%`);
      });
    
    const summaryBox = mainContent.append("div")
      .style("min-width", "240px");
    
    const oneHighPct = ((oneHigh / total) * 100).toFixed(1);
    const twoHighPct = ((twoHigh / total) * 100).toFixed(1);
    const othersPct = ((others / total) * 100).toFixed(1);
    
    summaryBox.html(`
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="text-align: center;">
          <div style="font-size: 11px; color: rgba(0,0,0,0.5); margin-bottom: 4px;">1-High Coverages</div>
          <div style="font-size: 28px; font-weight: 800; color: #FF6B9D; margin-bottom: 2px;">${oneHighPct}%</div>
          <div style="font-size: 10px; color: rgba(0,0,0,0.4);">Cover 1 + Cover 3</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 11px; color: rgba(0,0,0,0.5); margin-bottom: 4px;">2-High Coverages</div>
          <div style="font-size: 28px; font-weight: 800; color: #4ECDC4; margin-bottom: 2px;">${twoHighPct}%</div>
          <div style="font-size: 10px; color: rgba(0,0,0,0.4);">Cover 2 + Cover 4</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 11px; color: rgba(0,0,0,0.5); margin-bottom: 4px;">Other Coverages</div>
          <div style="font-size: 28px; font-weight: 800; color: #FECA57; margin-bottom: 2px;">${othersPct}%</div>
          <div style="font-size: 10px; color: rgba(0,0,0,0.4);">0, 6, Bracket, Other</div>
        </div>
      </div>
    `);
  }
  
  const style = mainContainer.append("style").text(`
    #pie-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #4ECDC4;
      cursor: pointer;
      margin-top: -6px;
      transition: none !important;
      animation: none !important;
      border: none;
      outline: none;
      box-shadow: none;
    }
    
    #pie-slider::-webkit-slider-thumb:hover {
      transform: none;
      transition: none !important;
      animation: none !important;
      border: none;
      outline: none;
      box-shadow: none;
    }
    
    #pie-slider::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #4ECDC4;
      cursor: pointer;
      border: none;
      transition: none !important;
      animation: none !important;
      outline: none;
      box-shadow: none;
    }
    
    #pie-slider::-moz-range-thumb:hover {
      transform: none;
      transition: none !important;
      animation: none !important;
      border: none;
      outline: none;
      box-shadow: none;
    }
    
    #pie-slider::-webkit-slider-runnable-track {
      background: rgba(0,0,0,0.15);
      height: 6px;
      border-radius: 3px;
    }
    
    #pie-slider::-moz-range-track {
      background: rgba(0,0,0,0.15);
      height: 6px;
      border-radius: 3px;
    }
  `);
  
  slider.on("input", function() {
    currentYear = +this.value;
    updatePieChart(currentYear);
    mainContainer.node().value = currentYear;
    mainContainer.node().dispatchEvent(new CustomEvent("input"));
  });
  
  updatePieChart(currentYear);
  
  mainContainer.node().value = currentYear;
  return mainContainer.node();
}


function _16(md){return(
md`When we look above at the overall distribution of the main one-high and two-high safety defenses being played, the differences across the years are not meaningfully large. In 2015, one-high defenses (Cover 1 + Cover 3) were being played at a 40.5% rate, and two-high defenses (Cover 2 + Cover 4) were being played at a 35.7% rate, while in 2024, these values are 40% and 36.5%, respectively. 

Specifically, it is true that having two deep safeties will indeed limit explosive offensive plays. But defenses aren't _actually_ running more two-high coverages– they are only pretending to do so through rotations and disguises`
)}

function _17(md){return(
md`We encourage you to test your learning and see the field through the eyes of the offense, facing a potentially disguised coverage through the mini-game below! This is a probability game based on the proportions from the flow diagram, so there is no guaranteed correct answer to any one situation, reflecting the reality of the offense that cannot 100% know the coverage they are facing until after the snap.`
)}

function _game($0,gameState,d3,playData,getCoverageName,determineActualCoverage,getSuccessRate)
{
  function resetPlay() {
    $0.value = {
      ...gameState,
      step: 1,
      formation: null,
      route: null,
      preSnap: null,
      prediction: null,
      actual: null
    };
  }
  
  const container = d3.create("div")
    .attr("class", "play-simulator")
    .style("font-family", "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif")
    .style("background", "#f8f9fa")
    .style("padding", "32px")
    .style("border-radius", "20px")
    .style("box-shadow", "0 25px 70px rgba(0,0,0,0.15)")
    .style("color", "#2d3748")
    .style("max-width", "1400px")
    .style("margin", "0 auto");
  
  container.append("div")
    .style("text-align", "center")
    .style("margin-bottom", "32px")
    .style("font-weight", "700")
    .style("font-size", "24px")
    .text("Play Outcome Simulator");
  
  // year
  const yearSection = container.append("div")
    .style("background", "rgba(0,0,0,0.05)")
    .style("padding", "20px")
    .style("border-radius", "12px")
    .style("margin-bottom", "24px");
  
  const yearLabel = yearSection.append("div")
    .style("font-size", "14px")
    .style("font-weight", "600")
    .style("margin-bottom", "12px")
    .text("Select Year:");
  
  const yearBtns = yearSection.append("div")
    .style("display", "flex")
    .style("gap", "12px");
  
  [2015, 2024].forEach(year => {
    const btn = yearBtns.append("button")
      .style("flex", "1")
      .style("padding", "14px")
      .style("border", gameState.year === year ? "3px solid #4ECDC4" : "2px solid rgba(0,0,0,0.2)")
      .style("border-radius", "10px")
      .style("background", gameState.year === year ? "rgba(78, 205, 196, 0.2)" : "rgba(0,0,0,0.05)")
      .style("color", "#2d3748")
      .style("font-size", "16px")
      .style("font-weight", "700")
      .style("cursor", "pointer")
      .style("transition", "all 0.2s")
      .text(year)
      .on("click", () => {
        $0.value = { 
          ...gameState, 
          year: year,
          step: 1,
          formation: null,
          route: null,
          preSnap: null,
          prediction: null,
          actual: null
        };
      });
  });
  
  const mainContent = container.append("div")
    .style("display", "grid")
    .style("grid-template-columns", "300px 1fr")
    .style("gap", "24px")
    .style("margin-top", "24px");
  
  const controls = mainContent.append("div");
  
  // formation
  const formationBox = controls.append("div")
    .style("background", "rgba(0,0,0,0.05)")
    .style("padding", "20px")
    .style("border-radius", "12px")
    .style("margin-bottom", "16px")
    .style("border", gameState.step === 1 ? "2px solid #4ECDC4" : "2px solid transparent");
  
  formationBox.append("div")
    .style("font-size", "13px")
    .style("font-weight", "700")
    .style("color", "#4ECDC4")
    .style("margin-bottom", "8px")
    .text("STEP 1");
  
  formationBox.append("div")
    .style("font-size", "16px")
    .style("font-weight", "700")
    .style("margin-bottom", "12px")
    .text("Choose Formation");
  
  playData.formations.forEach(formation => {
    const btn = formationBox.append("button")
      .style("display", "block")
      .style("width", "100%")
      .style("padding", "12px")
      .style("margin-bottom", "8px")
      .style("border", gameState.formation?.id === formation.id ? "2px solid #FF6B9D" : "2px solid rgba(0,0,0,0.2)")
      .style("border-radius", "8px")
      .style("background", gameState.formation?.id === formation.id ? "rgba(255, 107, 157, 0.2)" : "rgba(0,0,0,0.05)")
      .style("color", "#2d3748")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("cursor", "pointer")
      .style("text-align", "left")
      .style("transition", "all 0.2s")
      .html(`
        <div style="font-weight: 700; margin-bottom: 2px;">${formation.name}</div>
        <div style="font-size: 11px; color: rgba(0,0,0,0.6);">${formation.desc}</div>
      `)
      .on("click", () => {
        $0.value = { 
          ...gameState, 
          formation: formation, 
          step: 2,
          route: null,
          preSnap: null,
          prediction: null,
          actual: null
        };
      });
  });
  
  // route
  const routeBox = controls.append("div")
    .style("background", "rgba(0,0,0,0.05)")
    .style("padding", "20px")
    .style("border-radius", "12px")
    .style("margin-bottom", "16px")
    .style("opacity", gameState.step >= 2 ? "1" : "0.4")
    .style("pointer-events", gameState.step >= 2 ? "auto" : "none")
    .style("border", gameState.step === 2 ? "2px solid #4ECDC4" : "2px solid transparent");
  
  routeBox.append("div")
    .style("font-size", "13px")
    .style("font-weight", "700")
    .style("color", "#4ECDC4")
    .style("margin-bottom", "8px")
    .text("STEP 2");
  
  routeBox.append("div")
    .style("font-size", "16px")
    .style("font-weight", "700")
    .style("margin-bottom", "12px")
    .text("Choose Route Concept");
  
  playData.routes.forEach(route => {
    const btn = routeBox.append("button")
      .style("display", "block")
      .style("width", "100%")
      .style("padding", "12px")
      .style("margin-bottom", "8px")
      .style("border", gameState.route?.id === route.id ? "2px solid #45B7D1" : "2px solid rgba(0,0,0,0.2)")
      .style("border-radius", "8px")
      .style("background", gameState.route?.id === route.id ? "rgba(69, 183, 209, 0.2)" : "rgba(0,0,0,0.05)")
      .style("color", "#2d3748")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("cursor", "pointer")
      .style("text-align", "left")
      .style("transition", "all 0.2s")
      .html(`
        <div style="font-weight: 700; margin-bottom: 2px;">${route.name}</div>
        <div style="font-size: 11px; color: rgba(0,0,0,0.6);">${route.desc}</div>
      `)
      .on("click", () => {
        const preSnap = Math.random() > 0.5 ? "single_high" : "two_high";
        $0.value = { 
          ...gameState, 
          route: route, 
          preSnap: preSnap,
          step: 3
        };
      });
  });
  
  // field
  const fieldArea = mainContent.append("div");
  
  if (gameState.step >= 3) {
    const fieldBox = fieldArea.append("div")
      .style("background", "#1a4d2e")
      .style("border-radius", "12px")
      .style("padding", "24px")
      .style("margin-bottom", "20px");
    
    fieldBox.append("h3")
      .style("margin", "0 0 16px 0")
      .style("font-size", "20px")
      .style("font-weight", "700")
      .style("color", "#ffffff")
      .text(`Pre-Snap: Defense Shows ${gameState.preSnap === "single_high" ? "1-High Safety" : "2-High Safeties"}`);
    
    const fieldSvg = fieldBox.append("svg")
      .attr("width", 700)
      .attr("height", 280)
      .style("background", "#2d5f3d")
      .style("border-radius", "8px");
    
    for (let i = 0; i <= 7; i++) {
      fieldSvg.append("line")
        .attr("x1", i * 100)
        .attr("y1", 0)
        .attr("x2", i * 100)
        .attr("y2", 280)
        .attr("stroke", "rgba(255,255,255,0.15)")
        .attr("stroke-width", 2);
    }
    
    fieldSvg.append("line")
      .attr("x1", 0)
      .attr("y1", 180)
      .attr("x2", 700)
      .attr("y2", 180)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 4);
    
    // safeties
    if (gameState.preSnap === "single_high") {
      const safety = fieldSvg.append("g");
      safety.append("circle")
        .attr("cx", 350)
        .attr("cy", 60)
        .attr("r", 25)
        .attr("fill", "#FF6B9D")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 3);
      
      safety.append("text")
        .attr("x", 350)
        .attr("y", 68)
        .attr("text-anchor", "middle")
        .attr("fill", "#ffffff")
        .attr("font-size", "16px")
        .attr("font-weight", "700")
        .text("FS");
    } else {
      const safety1 = fieldSvg.append("g");
      safety1.append("circle")
        .attr("cx", 230)
        .attr("cy", 60)
        .attr("r", 25)
        .attr("fill", "#FF6B9D")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 3);
      
      safety1.append("text")
        .attr("x", 230)
        .attr("y", 68)
        .attr("text-anchor", "middle")
        .attr("fill", "#ffffff")
        .attr("font-size", "16px")
        .attr("font-weight", "700")
        .text("S");
      
      const safety2 = fieldSvg.append("g");
      safety2.append("circle")
        .attr("cx", 470)
        .attr("cy", 60)
        .attr("r", 25)
        .attr("fill", "#FF6B9D")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 3);
      
      safety2.append("text")
        .attr("x", 470)
        .attr("y", 68)
        .attr("text-anchor", "middle")
        .attr("fill", "#ffffff")
        .attr("font-size", "16px")
        .attr("font-weight", "700")
        .text("S");
    }
    
    if (gameState.step === 3) {
      const predBox = fieldArea.append("div")
        .style("background", "rgba(0,0,0,0.05)")
        .style("padding", "24px")
        .style("border-radius", "12px")
        .style("border", "2px solid #4ECDC4");
      
      predBox.append("div")
        .style("font-size", "13px")
        .style("font-weight", "700")
        .style("color", "#4ECDC4")
        .style("margin-bottom", "8px")
        .text("STEP 3");
      
      predBox.append("h3")
        .style("margin", "0 0 20px 0")
        .style("font-size", "20px")
        .style("font-weight", "700")
        .text("What coverage will they ACTUALLY run?");
      
      const grid = predBox.append("div")
        .style("display", "grid")
        .style("grid-template-columns", "repeat(3, 1fr)")
        .style("gap", "12px")
        .style("margin-bottom", "20px");
      
      ["cover_0", "cover_1", "cover_2", "cover_3", "cover_4", "cover_6"].forEach(coverage => {
        grid.append("button")
          .style("padding", "18px")
          .style("border", gameState.prediction === coverage ? "3px solid #FECA57" : "2px solid rgba(0,0,0,0.2)")
          .style("border-radius", "10px")
          .style("background", gameState.prediction === coverage ? "rgba(254, 202, 87, 0.2)" : "rgba(0,0,0,0.05)")
          .style("color", "#2d3748")
          .style("font-size", "14px")
          .style("font-weight", "700")
          .style("cursor", "pointer")
          .style("transition", "all 0.2s")
          .text(getCoverageName(coverage))
          .on("click", () => {
            $0.value = { ...gameState, prediction: coverage };
          });
      });
      
      if (gameState.prediction) {
        predBox.append("button")
          .style("width", "100%")
          .style("padding", "18px")
          .style("border", "none")
          .style("border-radius", "10px")
          .style("background", "linear-gradient(135deg, #4ECDC4 0%, #45B7D1 100%)")
          .style("color", "#ffffff")
          .style("font-size", "18px")
          .style("font-weight", "800")
          .style("cursor", "pointer")
          .style("box-shadow", "0 6px 20px rgba(78, 205, 196, 0.4)")
          .style("transition", "all 0.2s")
          .text("SNAP THE BALL🏈!")
          .on("mouseover", function() {
            d3.select(this).style("transform", "translateY(-2px)");
          })
          .on("mouseout", function() {
            d3.select(this).style("transform", "translateY(0)");
          })
          .on("click", () => {
            const actual = determineActualCoverage(gameState.preSnap, gameState.year);
            const correct = gameState.prediction === actual;
            const success = getSuccessRate(gameState.route.id, actual);
            
            $0.value = {
              ...gameState,
              actual: actual,
              step: 4,
              history: [...gameState.history, {
                year: gameState.year,
                formation: gameState.formation.name,
                route: gameState.route.name,
                preSnap: gameState.preSnap,
                prediction: gameState.prediction,
                actual: actual,
                correct: correct,
                success: success
              }]
            };
          });
      }
    }
    
    if (gameState.step === 4) {
      const correct = gameState.prediction === gameState.actual;
      const success = getSuccessRate(gameState.route.id, gameState.actual);
      
      const resultBox = fieldArea.append("div")
        .style("background", correct ? "rgba(78, 205, 196, 0.15)" : "rgba(255, 107, 157, 0.15)")
        .style("padding", "28px")
        .style("border-radius", "12px")
        .style("border", `3px solid ${correct ? "#4ECDC4" : "#FF6B9D"}`);
      
      resultBox.append("h3")
        .style("margin", "0 0 20px 0")
        .style("font-size", "28px")
        .style("font-weight", "800")
        .text(correct ? "🎯 Correct Prediction!" : "❌ Incorrect Prediction");
      
      resultBox.append("div")
        .style("background", "rgba(0,0,0,0.1)")
        .style("padding", "16px")
        .style("border-radius", "8px")
        .style("margin-bottom", "12px")
        .html(`
          <div style="font-size: 15px; margin-bottom: 8px;">
            <strong>You predicted:</strong> ${getCoverageName(gameState.prediction)}
          </div>
          <div style="font-size: 15px;">
            <strong>Defense actually ran:</strong> <span style="color: ${correct ? "#4ECDC4" : "#FF6B9D"}; font-weight: 700;">${getCoverageName(gameState.actual)}</span>
          </div>
        `);
      
      resultBox.append("div")
        .style("background", "rgba(0,0,0,0.1)")
        .style("padding", "16px")
        .style("border-radius", "8px")
        .style("margin-bottom", "20px")
        .html(`
          <div style="font-size: 14px; color: rgba(0,0,0,0.9);">
            <strong>Expected offensive success rate:</strong><br>
            <span style="font-size: 24px; font-weight: 800; color: #FECA57;">${(success * 100).toFixed(1)}%</span><br>
            <span style="font-size: 13px; color: rgba(0,0,0,0.7);">for ${gameState.route.name} vs ${getCoverageName(gameState.actual)}</span>
          </div>
        `);
      
      resultBox.append("button")
        .style("width", "100%")
        .style("padding", "16px")
        .style("border", "none")
        .style("border-radius", "10px")
        .style("background", "#2d3748")
        .style("color", "#ffffff")
        .style("font-size", "16px")
        .style("font-weight", "700")
        .style("cursor", "pointer")
        .style("transition", "all 0.2s")
        .text("Run Another Play")
        .on("click", () => {
          $0.value = {
            ...gameState,
            step: 1,
            formation: null,
            route: null,
            preSnap: null,
            prediction: null,
            actual: null
          };
        });
    }
  }
  
  if (gameState.history.length > 0) {
    const statsBox = container.append("div")
      .style("margin-top", "32px")
      .style("background", "rgba(0,0,0,0.05)")
      .style("padding", "24px")
      .style("border-radius", "12px");
    
    statsBox.append("h3")
      .style("margin", "0 0 16px 0")
      .style("font-size", "20px")
      .style("font-weight", "700")
      .text("Your Prediction Stats");
    
    const correct = gameState.history.filter(p => p.correct).length;
    const total = gameState.history.length;
    const accuracy = ((correct / total) * 100).toFixed(1);
    
    statsBox.append("div")
      .style("font-size", "32px")
      .style("font-weight", "800")
      .style("color", "#4ECDC4")
      .html(`${correct}/${total} Correct <span style="font-size: 24px;">(${accuracy}%)</span>`);
  }
  
  return container.node();
}


function _d3(require){return(
require("d3@7", "d3-sankey@0.12")
)}

function _prepareSankeyData(){return(
function(year, data) {
  const yearData = data.find(d => d.year === year);
  
  if (!yearData) return { nodes: [], links: [] };
  const nodes = [
    { name: "1-High Pre-Snap", category: "pre" },
    { name: "2-High Pre-Snap", category: "pre" },
    { name: "Cover 1", category: "post" },
    { name: "Cover 2", category: "post" },
    { name: "Cover 3", category: "post" },
    { name: "Cover 4", category: "post" },
    { name: "Cover 6", category: "post" },
    { name: "Cover 0", category: "post" },
    { name: "Bracket", category: "post" },
    { name: "Other", category: "post" }
  ];
  
  const links = [
    { source: "1-High Pre-Snap", target: "Cover 1", value: yearData.cover_1_from_1_high },
    { source: "1-High Pre-Snap", target: "Cover 2", value: yearData.cover_2_from_1_high },
    { source: "1-High Pre-Snap", target: "Cover 3", value: yearData.cover_3_from_1_high },
    { source: "1-High Pre-Snap", target: "Cover 4", value: yearData.cover_4_from_1_high },
    { source: "1-High Pre-Snap", target: "Cover 6", value: yearData.cover_6_from_1_high },
    { source: "1-High Pre-Snap", target: "Cover 0", value: yearData.cover_0_from_1_high },
    { source: "1-High Pre-Snap", target: "Bracket", value: yearData.bracket_cover_from_1_high },
    { source: "1-High Pre-Snap", target: "Other", value: yearData.other_defense_from_1_high },
    
    { source: "2-High Pre-Snap", target: "Cover 1", value: yearData.cover_1_from_2_high },
    { source: "2-High Pre-Snap", target: "Cover 2", value: yearData.cover_2_from_2_high },
    { source: "2-High Pre-Snap", target: "Cover 3", value: yearData.cover_3_from_2_high },
    { source: "2-High Pre-Snap", target: "Cover 4", value: yearData.cover_4_from_2_high },
    { source: "2-High Pre-Snap", target: "Cover 6", value: yearData.cover_6_from_2_high },
    { source: "2-High Pre-Snap", target: "Cover 0", value: yearData.cover_0_from_2_high },
    { source: "2-High Pre-Snap", target: "Bracket", value: yearData.bracket_cover_from_2_high },
    { source: "2-High Pre-Snap", target: "Other", value: yearData.other_defense_from_2_high }
  ];
  
  return {
    nodes: nodes,
    links: links.filter(l => l.value > 0)
  };
}
)}

function _createSankeyDiagram(prepareSankeyData,d3){return(
function(year, data) {
  const width = 1200;
  const height = 700;
  const margin = { top: 100, right: 220, bottom: 40, left: 220 };
  
  const sankeyData = prepareSankeyData(year, data);
  const yearData = data.find(d => d.year === year);
  const totalSnaps = yearData ? yearData.total_defensive_snaps : 1;
  
  const colorScale = d3.scaleOrdinal()
    .domain(["Cover 1", "Cover 2", "Cover 3", "Cover 4", "Cover 6", "Cover 0", "Bracket", "Other"])
    .range(["#FF6B9D", "#4ECDC4", "#45B7D1", "#95E1D3", "#FFA07A", "#C7CEEA", "#FECA57", "#DFE4EA"]);
  
  const container = d3.create("div")
    .style("position", "relative")
    .style("font-family", "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif")
    .style("padding", "20px");
  
  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("max-width", "100%")
    .style("height", "auto")
    .style("background", "#0f0f23")
    .style("border-radius", "20px")
    .style("box-shadow", "0 25px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)");
  
  const tooltip = container.append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "rgba(255, 255, 255, 0.95)")
    .style("backdrop-filter", "blur(20px)")
    .style("border-radius", "16px")
    .style("padding", "18px 24px")
    .style("box-shadow", "0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2)")
    .style("pointer-events", "none")
    .style("font-size", "14px")
    .style("z-index", "1000")
    .style("min-width", "200px");
  
  const sankey = d3.sankey()
    .nodeId(d => d.name)
    .nodeAlign(d3.sankeyJustify)
    .nodeWidth(28)
    .nodePadding(22)
    .nodeSort((a, b) => {
      const postSnapOrder = ["Cover 1", "Cover 3", "Cover 2", "Cover 4", "Cover 6", "Cover 0", "Bracket", "Other"];
      const indexA = postSnapOrder.indexOf(a.name);
      const indexB = postSnapOrder.indexOf(b.name);
      
      // If both are post-snap coverages, use fixed order
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      
      // Otherwise, use default sorting
      return 0;
    })
    .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]]);
  
  const graph = sankey({
    nodes: sankeyData.nodes.map(d => ({...d})),
    links: sankeyData.links.map(d => ({...d}))
  });
  
  const defs = svg.append("defs");
  
  const glow = defs.append("filter")
    .attr("id", "glow");
  
  glow.append("feGaussianBlur")
    .attr("stdDeviation", "4")
    .attr("result", "coloredBlur");
  
  const feMerge = glow.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "coloredBlur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");
  
  graph.links.forEach((link, i) => {
    const gradient = defs.append("linearGradient")
      .attr("id", `gradient-${i}`)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", link.source.x1)
      .attr("x2", link.target.x0);
    
    const sourceColor = link.source.category === "pre" ? "#A8B5E8" : colorScale(link.source.name);
    const targetColor = colorScale(link.target.name);
    
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", sourceColor)
      .attr("stop-opacity", 0.85);
    
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", targetColor)
      .attr("stop-opacity", 0.85);
  });
  
  const linkGroup = svg.append("g")
    .attr("fill", "none")
    .attr("stroke-opacity", 0.75)
    .selectAll("g")
    .data(graph.links)
    .join("g");
  
  linkGroup.append("path")
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("stroke", (d, i) => `url(#gradient-${i})`)
    .attr("stroke-width", d => Math.max(2, d.width))
    .on("mouseover", function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("stroke-opacity", 1)
        .attr("stroke-width", d => Math.max(2, d.width) + 3)
        .style("filter", "drop-shadow(0 0 8px rgba(255,255,255,0.6))");
      
      linkGroup.selectAll("path")
        .filter(function(link) { return link !== d; })
        .transition()
        .duration(200)
        .attr("stroke-opacity", 0.15);
      
      tooltip
        .html(`
          <div style="font-weight: 700; font-size: 17px; margin-bottom: 10px; color: #1a1a2e; letter-spacing: -0.3px;">
            ${d.source.name} → ${d.target.name}
          </div>
          <div style="color: #4a5568; font-size: 15px; margin-bottom: 6px;">
            <strong style="color: ${colorScale(d.target.name)}; font-size: 18px;">${d.value.toLocaleString()}</strong> plays
          </div>
          <div style="color: #718096; font-size: 13px; padding-top: 6px; border-top: 1px solid #e2e8f0;">
            ${((d.value / d.source.value) * 100).toFixed(1)}% of ${d.source.name}
          </div>
          <div style="color: #718096; font-size: 13px; padding-top: 4px;">
            ${((d.value / d.target.value) * 100).toFixed(1)}% of ${d.target.name}
          </div>
        `)
        .style("visibility", "visible");
    })
    .on("mousemove", function(event) {
      const containerRect = container.node().getBoundingClientRect();
      tooltip
        .style("left", (event.clientX - containerRect.left + 20) + "px")
        .style("top", (event.clientY - containerRect.top - 20) + "px");
    })
    .on("mouseout", function() {
      linkGroup.selectAll("path")
        .transition()
        .duration(200)
        .attr("stroke-opacity", 0.75)
        .attr("stroke-width", d => Math.max(2, d.width))
        .style("filter", "none");
      
      tooltip.style("visibility", "hidden");
    });
  
  const nodeGroup = svg.append("g")
    .selectAll("g")
    .data(graph.nodes)
    .join("g");
  
  const preSnapGradient = defs.append("linearGradient")
    .attr("id", "pre-snap-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");
  
  preSnapGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#667eea");
  
  preSnapGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#764ba2");
  
  nodeGroup.append("rect")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("height", d => d.y1 - d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("fill", d => d.category === "pre" ? "url(#pre-snap-gradient)" : colorScale(d.name))
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 2.5)
    .attr("rx", 8)
    .style("filter", "drop-shadow(0 6px 12px rgba(0,0,0,0.4))")
    .on("mouseover", function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("stroke-width", 4)
        .style("filter", "drop-shadow(0 8px 20px rgba(0,0,0,0.5)) url(#glow)");
      
      tooltip
        .html(`
          <div style="font-weight: 700; font-size: 17px; margin-bottom: 10px; color: #1a1a2e; letter-spacing: -0.3px;">
            ${d.name}
          </div>
          <div style="color: #4a5568; font-size: 15px;">
            <strong style="color: ${d.category === "pre" ? "#667eea" : colorScale(d.name)}; font-size: 18px;">${d.value.toLocaleString()}</strong> total plays
          </div>
          <div style="color: #718096; font-size: 13px; padding-top: 6px; border-top: 1px solid #e2e8f0;">
            ${((d.value / totalSnaps) * 100).toFixed(1)}% of all defensive snaps
          </div>
        `)
        .style("visibility", "visible");
    })
    .on("mousemove", function(event) {
      const containerRect = container.node().getBoundingClientRect();
      tooltip
        .style("left", (event.clientX - containerRect.left + 20) + "px")
        .style("top", (event.clientY - containerRect.top - 20) + "px");
    })
    .on("mouseout", function() {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("stroke-width", 2.5)
        .style("filter", "drop-shadow(0 6px 12px rgba(0,0,0,0.4))");
      
      tooltip.style("visibility", "hidden");
    });
  
  svg.append("g")
    .selectAll("text")
    .data(graph.nodes)
    .join("text")
    .attr("x", d => d.x0 < width / 2 ? d.x1 + 14 : d.x0 - 14)
    .attr("y", d => (d.y1 + d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
    .attr("font-weight", "700")
    .attr("font-size", "15px")
    .attr("fill", "#ffffff")
    .attr("letter-spacing", "-0.3px")
    .style("text-shadow", "0 3px 8px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.4)")
    .text(d => d.name);
  
  svg.append("g")
    .selectAll("text")
    .data(graph.nodes)
    .join("text")
    .attr("x", d => d.x0 < width / 2 ? d.x1 + 14 : d.x0 - 14)
    .attr("y", d => (d.y1 + d.y0) / 2 + 18)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
    .attr("font-size", "12px")
    .attr("font-weight", "500")
    .attr("fill", "rgba(255,255,255,0.75)")
    .style("text-shadow", "0 2px 6px rgba(0,0,0,0.5)")
    .text(d => `${d.value.toLocaleString()} plays`);
  
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 45)
    .attr("text-anchor", "middle")
    .attr("font-size", "32px")
    .attr("font-weight", "800")
    .attr("fill", "#ffffff")
    .attr("letter-spacing", "-0.5px")
    .style("text-shadow", "0 4px 12px rgba(0,0,0,0.6), 0 0 30px rgba(102,126,234,0.4)")
    .text(`NFL Coverage Flows: ${year}`);
  
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 72)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("font-weight", "500")
    .attr("fill", "rgba(255,255,255,0.8)")
    .attr("letter-spacing", "0.5px")
    .style("text-shadow", "0 2px 6px rgba(0,0,0,0.4)")
    .text("PRE-SNAP LOOKS → POST-SNAP COVERAGES");
  
  return container.node();
}
)}

function _playData(){return(
{
  formations: [
    { id: "trips", name: "Trips Right", desc: "3 receivers to one side" },
    { id: "doubles", name: "2x2 Doubles", desc: "2 receivers each side" },
    { id: "empty", name: "Empty (5 Wide)", desc: "All skill players split out" },
    { id: "twin_te", name: "Twin TE", desc: "2 TEs on same side" }
  ],

  routes: [
    { id: "sail", name: "Sail Concept", desc: "Vertical stretch (flat-corner-post)" },
    { id: "mesh", name: "Mesh Cross", desc: "Two crossing routes" },
    { id: "verts", name: "Four Verticals", desc: "All receivers go deep" },
    { id: "levels", name: "Levels", desc: "Hi-lo stretch concept" },
    { id: "stick", name: "Stick", desc: "Horizontal stretch" }
  ],
  
  // success rates
  successRates: {
    sail: { cover_0: 0.75, cover_1: 0.65, cover_2: 0.45, cover_3: 0.25, cover_4: 0.20, cover_6: 0.35 },
    mesh: { cover_0: 0.75, cover_1: 0.65, cover_2: 0.5, cover_3: 0.35, cover_4: 0.45, cover_6: 0.25 },
    verts: { cover_0: 0.70, cover_1: 0.80, cover_2: 0.25, cover_3: 0.50, cover_4: 0.25, cover_6: 0.45 },
    levels: { cover_0: 0.75, cover_1: 0.65, cover_2: 0.55, cover_3: 0.65, cover_4: 0.35, cover_6: 0.50 },
    stick: { cover_0: 0.65, cover_1: 0.65, cover_2: 0.50, cover_3: 0.75, cover_4: 0.30, cover_6: 0.65 }
  },

  // coverage probabilities
  coverageProbs: {
    2015: {
      single_high: { cover_3: 0.60, cover_1: 0.25, cover_2: 0.15 },
      two_high:    { cover_3: 0.15, cover_2: 0.30, cover_4: 0.35, cover_6: 0.05 }
    },
    2024: {
      single_high: { cover_3: 0.70, cover_1: 0.20, cover_0: 0.10 },
      two_high:    { cover_3: 0.40, cover_2: 0.25, cover_4: 0.25, cover_6: 0.10 }
    }
  }
}
)}

function _getCoverageName(){return(
(coverage) => {
  const names = {
    cover_0: "Cover 0",
    cover_1: "Cover 1",
    cover_2: "Cover 2",
    cover_3: "Cover 3",
    cover_4: "Cover 4",
    cover_6: "Cover 6"
  };
  return names[coverage] || coverage;
}
)}

function _determineActualCoverage(playData){return(
(preSnap, year) => {
  const probs = playData.coverageProbs[year][preSnap];
  const rand = Math.random();
  let cumulative = 0;

  for (const [coverage, prob] of Object.entries(probs)) {
    cumulative += prob;
    if (rand < cumulative) return coverage;
  }
  return "cover_3";
}
)}

function _getSuccessRate(playData){return(
(route, coverage) =>
  playData.successRates[route]?.[coverage] || 0.5
)}

function _gameState(){return(
{
  year: 2024,
  step: 1,
  formation: null,
  route: null,
  preSnap: null,
  prediction: null,
  actual: null,
  history: []
}
)}

function _resetPlay($0,gameState){return(
() => {
  $0.value = {
    ...gameState,
    step: 1,
    formation: null,
    route: null,
    preSnap: null,
    prediction: null,
    actual: null
  };
}
)}

function _createRotationVisualization(d3){return(
function createRotationVisualization() {
  const width = 1200;
  const height = 850;
  const fieldWidth = 500;
  const fieldHeight = 350;
  const gap = 50;
  
  const container = d3.create("div")
    .style("font-family", "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif")
    .style("background", "#0f0f23")
    .style("padding", "32px")
    .style("border-radius", "20px")
    .style("box-shadow", "0 25px 70px rgba(0,0,0,0.5)")
    .style("color", "#ffffff");
  
  // // Title
  // container.append("h2")
  //   .style("margin", "0 0 12px 0")
  //   .style("font-size", "28px")
  //   .style("font-weight", "800")
  //   .style("text-align", "center")
  //   .style("letter-spacing", "-0.5px")
  //   .text("Safety Rotation Examples");
  
  // container.append("p")
  //   .style("margin", "0 0 32px 0")
  //   .style("font-size", "15px")
  //   .style("text-align", "center")
  //   .style("color", "rgba(255,255,255,0.7)")
  //   .text("How defenses disguise their coverage by rotating safeties after the snap");
  
  // SVG container
  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("max-width", "100%")
    .style("height", "auto");
  
  // Create gradient for field
  const defs = svg.append("defs");
  
  const fieldGradient = defs.append("linearGradient")
    .attr("id", "fieldGradientRotation")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");
  
  fieldGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#1a4d2e");
  
  fieldGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#2d5f3d");
  
  // Arrow marker for rotation paths (smaller)
  const arrowMarker = defs.append("marker")
    .attr("id", "rotationArrow")
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("refX", 7)
    .attr("refY", 3)
    .attr("orient", "auto");
  
  arrowMarker.append("polygon")
    .attr("points", "0 0, 8 3, 0 6")
    .attr("fill", "#FECA57");
  
  // Helper function to draw a field with rotation
  function drawRotationField(x, y, title, scenario) {
    const fieldGroup = svg.append("g")
      .attr("transform", `translate(${x}, ${y})`);
    
    // Field background
    fieldGroup.append("rect")
      .attr("width", fieldWidth)
      .attr("height", fieldHeight)
      .attr("fill", "url(#fieldGradientRotation)")
      .attr("rx", 12);
    
    // Yard lines
    for (let i = 0; i <= 5; i++) {
      const yPos = i * (fieldHeight / 5);
      fieldGroup.append("line")
        .attr("x1", 0)
        .attr("y1", yPos)
        .attr("x2", fieldWidth)
        .attr("y2", yPos)
        .attr("stroke", "rgba(255,255,255,0.15)")
        .attr("stroke-width", i === 3 ? 3 : 1);
    }
    
    // Line of scrimmage
    const losY = fieldHeight * 0.65;
    fieldGroup.append("line")
      .attr("x1", 0)
      .attr("y1", losY)
      .attr("x2", fieldWidth)
      .attr("y2", losY)
      .attr("stroke", "#4ECDC4")
      .attr("stroke-width", 4)
      .attr("stroke-dasharray", "10,5");
    
    // Title above field
    fieldGroup.append("text")
      .attr("x", fieldWidth / 2)
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .attr("font-size", "18px")
      .attr("font-weight", "800")
      .text(title);
    
    if (scenario === "2high_to_1high") {
      // 2-High rotating to 1-High (Cover 3)
      
      // PRE-SNAP positions (ghosted)
      const preSnapGroup = fieldGroup.append("g")
        .attr("opacity", 0.4);
      
      const leftPreX = fieldWidth * 0.3;
      const rightPreX = fieldWidth * 0.7;
      const preSnapY = fieldHeight * 0.25;
      
      // Left safety pre-snap (ghost)
      preSnapGroup.append("circle")
        .attr("cx", leftPreX)
        .attr("cy", preSnapY)
        .attr("r", 20)
        .attr("fill", "none")
        .attr("stroke", "#FECA57")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,3");
      
      preSnapGroup.append("text")
        .attr("x", leftPreX)
        .attr("y", preSnapY + 6)
        .attr("text-anchor", "middle")
        .attr("fill", "#FECA57")
        .attr("font-size", "12px")
        .attr("font-weight", "700")
        .text("S");
      
      // Right safety pre-snap (ghost)
      preSnapGroup.append("circle")
        .attr("cx", rightPreX)
        .attr("cy", preSnapY)
        .attr("r", 20)
        .attr("fill", "none")
        .attr("stroke", "#FECA57")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,3");
      
      preSnapGroup.append("text")
        .attr("x", rightPreX)
        .attr("y", preSnapY + 6)
        .attr("text-anchor", "middle")
        .attr("fill", "#FECA57")
        .attr("font-size", "12px")
        .attr("font-weight", "700")
        .text("S");
      
      // POST-SNAP positions (solid)
      const postSnapGroup = fieldGroup.append("g");
      
      // Center safety (rotated to middle)
      const centerX = fieldWidth / 2;
      const centerY = fieldHeight * 0.20;
      
      postSnapGroup.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", 22)
        .attr("fill", "#FECA57")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 3);
      
      postSnapGroup.append("text")
        .attr("x", centerX)
        .attr("y", centerY + 6)
        .attr("text-anchor", "middle")
        .attr("fill", "#0f0f23")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .text("S");
      
      // Safety rotating down to box
      const boxX = fieldWidth * 0.65;
      const boxY = losY - 40;
      
      postSnapGroup.append("circle")
        .attr("cx", boxX)
        .attr("cy", boxY)
        .attr("r", 22)
        .attr("fill", "#FECA57")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 3);
      
      postSnapGroup.append("text")
        .attr("x", boxX)
        .attr("y", boxY + 6)
        .attr("text-anchor", "middle")
        .attr("fill", "#0f0f23")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .text("S");
      
      // Rotation paths (dotted lines without arrows)
      const arrowGroup = fieldGroup.append("g");
      
      // Calculate angle and offset for left safety to center rotation
      const leftDx = centerX - leftPreX;
      const leftDy = centerY - preSnapY;
      const leftAngle = Math.atan2(leftDy, leftDx);
      const leftStartX = leftPreX + 20 * Math.cos(leftAngle);
      const leftStartY = preSnapY + 20 * Math.sin(leftAngle);
      const leftEndX = centerX - 22 * Math.cos(leftAngle);
      const leftEndY = centerY - 22 * Math.sin(leftAngle);
      
      // Left safety to center (curve)
      const leftPath = `M ${leftStartX} ${leftStartY} Q ${leftPreX + 30} ${(preSnapY + centerY) / 2} ${leftEndX} ${leftEndY}`;
      arrowGroup.append("path")
        .attr("d", leftPath)
        .attr("stroke", "#FECA57")
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("stroke-dasharray", "8,4");
      
      // Calculate angle and offset for right safety to box rotation
      const rightDx = boxX - rightPreX;
      const rightDy = boxY - preSnapY;
      const rightAngle = Math.atan2(rightDy, rightDx);
      const rightStartX = rightPreX + 20 * Math.cos(rightAngle);
      const rightStartY = preSnapY + 20 * Math.sin(rightAngle);
      const rightEndX = boxX - 22 * Math.cos(rightAngle);
      const rightEndY = boxY - 22 * Math.sin(rightAngle);
      
      // Right safety to box (curve)
      const rightPath = `M ${rightStartX} ${rightStartY} Q ${rightPreX} ${(preSnapY + boxY) / 2} ${rightEndX} ${rightEndY}`;
      arrowGroup.append("path")
        .attr("d", rightPath)
        .attr("stroke", "#FECA57")
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("stroke-dasharray", "8,4");
      
      // Labels
      fieldGroup.append("text")
        .attr("x", 20)
        .attr("y", 30)
        .attr("fill", "rgba(255,255,255,0.6)")
        .attr("font-size", "12px")
        .attr("font-weight", "600")
        .text("PRE-SNAP: 2-High");
      
      fieldGroup.append("text")
        .attr("x", 20)
        .attr("y", fieldHeight - 15)
        .attr("fill", "#FECA57")
        .attr("font-size", "12px")
        .attr("font-weight", "700")
        .text("POST-SNAP: Cover 3");
      
    } else if (scenario === "1high_to_2high") {
      // 1-High rotating to 2-High (Cover 2)
      
      // PRE-SNAP positions (ghosted) - FS deep and SS in box
      const preSnapGroup = fieldGroup.append("g")
        .attr("opacity", 0.4);
      
      const centerPreX = fieldWidth / 2;
      const fsPreY = fieldHeight * 0.25;
      const ssPreX = fieldWidth * 0.65;
      const ssPreY = losY - 40;
      
      // Free safety pre-snap (ghost) - deep middle
      preSnapGroup.append("circle")
        .attr("cx", centerPreX)
        .attr("cy", fsPreY)
        .attr("r", 20)
        .attr("fill", "none")
        .attr("stroke", "#FECA57")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,3");
      
      preSnapGroup.append("text")
        .attr("x", centerPreX)
        .attr("y", fsPreY + 6)
        .attr("text-anchor", "middle")
        .attr("fill", "#FECA57")
        .attr("font-size", "12px")
        .attr("font-weight", "700")
        .text("S");
      
      // Strong safety pre-snap (ghost) - in the box
      preSnapGroup.append("circle")
        .attr("cx", ssPreX)
        .attr("cy", ssPreY)
        .attr("r", 20)
        .attr("fill", "none")
        .attr("stroke", "#FECA57")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,3");
      
      preSnapGroup.append("text")
        .attr("x", ssPreX)
        .attr("y", ssPreY + 6)
        .attr("text-anchor", "middle")
        .attr("fill", "#FECA57")
        .attr("font-size", "12px")
        .attr("font-weight", "700")
        .text("S");
      
      // POST-SNAP positions (solid) - both deep in 2-high shell
      const postSnapGroup = fieldGroup.append("g");
      
      const leftPostX = fieldWidth * 0.3;
      const rightPostX = fieldWidth * 0.7;
      const postSnapY = fieldHeight * 0.22;
      
      // Left safety (moved left)
      postSnapGroup.append("circle")
        .attr("cx", leftPostX)
        .attr("cy", postSnapY)
        .attr("r", 22)
        .attr("fill", "#FECA57")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 3);
      
      postSnapGroup.append("text")
        .attr("x", leftPostX)
        .attr("y", postSnapY + 6)
        .attr("text-anchor", "middle")
        .attr("fill", "#0f0f23")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .text("S");
      
      // Right safety (moved up and right)
      postSnapGroup.append("circle")
        .attr("cx", rightPostX)
        .attr("cy", postSnapY)
        .attr("r", 22)
        .attr("fill", "#FECA57")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 3);
      
      postSnapGroup.append("text")
        .attr("x", rightPostX)
        .attr("y", postSnapY + 6)
        .attr("text-anchor", "middle")
        .attr("fill", "#0f0f23")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .text("S");
      
      // Rotation paths (dotted lines without arrows)
      const arrowGroup = fieldGroup.append("g");
      
      // Calculate angle and offset for FS center to left rotation
      const leftDx = leftPostX - centerPreX;
      const leftDy = postSnapY - fsPreY;
      const leftAngle = Math.atan2(leftDy, leftDx);
      const leftStartX = centerPreX + 20 * Math.cos(leftAngle);
      const leftStartY = fsPreY + 20 * Math.sin(leftAngle);
      const leftEndX = leftPostX - 22 * Math.cos(leftAngle);
      const leftEndY = postSnapY - 22 * Math.sin(leftAngle);
      
      // FS center to left (curve)
      const leftPath = `M ${leftStartX} ${leftStartY} Q ${centerPreX - 60} ${(fsPreY + postSnapY) / 2} ${leftEndX} ${leftEndY}`;
      arrowGroup.append("path")
        .attr("d", leftPath)
        .attr("stroke", "#FECA57")
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("stroke-dasharray", "8,4");
      
      // Calculate angle and offset for SS box to right deep rotation
      const rightDx = rightPostX - ssPreX;
      const rightDy = postSnapY - ssPreY;
      const rightAngle = Math.atan2(rightDy, rightDx);
      const rightStartX = ssPreX + 20 * Math.cos(rightAngle);
      const rightStartY = ssPreY + 20 * Math.sin(rightAngle);
      const rightEndX = rightPostX - 22 * Math.cos(rightAngle);
      const rightEndY = postSnapY - 22 * Math.sin(rightAngle);
      
      // SS box to right deep (curve)
      const rightPath = `M ${rightStartX} ${rightStartY} Q ${ssPreX + 40} ${(ssPreY + postSnapY) / 2 - 20} ${rightEndX} ${rightEndY}`;
      arrowGroup.append("path")
        .attr("d", rightPath)
        .attr("stroke", "#FECA57")
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("stroke-dasharray", "8,4");
      
      // Labels
      fieldGroup.append("text")
        .attr("x", 20)
        .attr("y", 30)
        .attr("fill", "rgba(255,255,255,0.6)")
        .attr("font-size", "12px")
        .attr("font-weight", "600")
        .text("PRE-SNAP: 1-High");
      
      fieldGroup.append("text")
        .attr("x", 20)
        .attr("y", fieldHeight - 15)
        .attr("fill", "#FECA57")
        .attr("font-size", "12px")
        .attr("font-weight", "700")
        .text("POST-SNAP: Cover 2");
    }
    
    return fieldGroup;
  }
  
  // Draw both rotation scenarios
  const topY = 50;
  const bottomY = topY + fieldHeight + 80;
  const fieldX = (width - fieldWidth) / 2;
  
  drawRotationField(fieldX, topY, "2-High Rotating to 1-High", "2high_to_1high");
  drawRotationField(fieldX, bottomY, "1-High Rotating to 2-High (Cover 2", "1high_to_2high");
  
  // Legend (moved to the right side)
  const legendX = width - 220;
  const legendY = height / 2 - 60;
  const legend = svg.append("g")
    .attr("transform", `translate(${legendX}, ${legendY})`);
  
  // Background box for legend
  legend.append("rect")
    .attr("x", -15)
    .attr("y", -20)
    .attr("width", 200)
    .attr("height", 120)
    .attr("fill", "rgba(255,255,255,0.05)")
    .attr("rx", 8)
    .attr("stroke", "rgba(255,255,255,0.1)")
    .attr("stroke-width", 1);
  
  const legendItems = [
    { color: "#FECA57", label: "Safety (S)", y: 0, type: "solid" },
    { label: "Pre-Snap Position", y: 35, type: "ghost" },
    { label: "Rotation Path", y: 70, type: "line" }
  ];
  
  legendItems.forEach(item => {
    if (item.type === "solid") {
      // Solid circle
      legend.append("circle")
        .attr("cx", 0)
        .attr("cy", item.y)
        .attr("r", 12)
        .attr("fill", item.color)
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 2);
      
      legend.append("text")
        .attr("x", 20)
        .attr("y", item.y + 5)
        .attr("fill", "#ffffff")
        .attr("font-size", "13px")
        .attr("font-weight", "600")
        .text(item.label);
    } else if (item.type === "ghost") {
      // Ghosted circle
      legend.append("circle")
        .attr("cx", 0)
        .attr("cy", item.y)
        .attr("r", 12)
        .attr("fill", "none")
        .attr("stroke", "#FECA57")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "3,2");
      
      legend.append("text")
        .attr("x", 20)
        .attr("y", item.y + 5)
        .attr("fill", "#ffffff")
        .attr("font-size", "13px")
        .attr("font-weight", "600")
        .text(item.label);
    } else if (item.type === "line") {
      // Dotted line
      legend.append("line")
        .attr("x1", -10)
        .attr("y1", item.y)
        .attr("x2", 10)
        .attr("y2", item.y)
        .attr("stroke", "#FECA57")
        .attr("stroke-width", 3)
        .attr("stroke-dasharray", "8,4");
      
      legend.append("text")
        .attr("x", 20)
        .attr("y", item.y + 5)
        .attr("fill", "#ffffff")
        .attr("font-size", "13px")
        .attr("font-weight", "600")
        .text(item.label);
    }
  });
  
  return container.node();
}
)}

function _data(FileAttachment){return(
FileAttachment("nfl_coverage_data@2.csv").csv({typed: true})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["nfl_coverage_data@2.csv", {url: new URL("./files/9dac0424a851b1e59399bc7022bfe6a27cb4794c95cce687ed1cb920a9c573561cb5f8bc2621c5dea5a7e8c9db33fd3c897cd2658a122a48f3c837a9a68cefa4.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof coverages")).define("viewof coverages", ["d3"], _coverages);
  main.variable(observer("coverages")).define("coverages", ["Generators", "viewof coverages"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof createTrendGraph")).define("viewof createTrendGraph", ["d3","data"], _createTrendGraph);
  main.variable(observer("createTrendGraph")).define("createTrendGraph", ["Generators", "viewof createTrendGraph"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof rotations")).define("viewof rotations", ["d3"], _rotations);
  main.variable(observer("rotations")).define("rotations", ["Generators", "viewof rotations"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof sankey")).define("viewof sankey", ["d3","prepareSankeyData","data"], _sankey);
  main.variable(observer("sankey")).define("sankey", ["Generators", "viewof sankey"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof pie")).define("viewof pie", ["d3","data"], _pie);
  main.variable(observer("pie")).define("pie", ["Generators", "viewof pie"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("viewof game")).define("viewof game", ["mutable gameState","gameState","d3","playData","getCoverageName","determineActualCoverage","getSuccessRate"], _game);
  main.variable(observer("game")).define("game", ["Generators", "viewof game"], (G, _) => G.input(_));
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("prepareSankeyData")).define("prepareSankeyData", _prepareSankeyData);
  main.variable(observer("createSankeyDiagram")).define("createSankeyDiagram", ["prepareSankeyData","d3"], _createSankeyDiagram);
  main.variable(observer("playData")).define("playData", _playData);
  main.variable(observer("getCoverageName")).define("getCoverageName", _getCoverageName);
  main.variable(observer("determineActualCoverage")).define("determineActualCoverage", ["playData"], _determineActualCoverage);
  main.variable(observer("getSuccessRate")).define("getSuccessRate", ["playData"], _getSuccessRate);
  main.define("initial gameState", _gameState);
  main.variable(observer("mutable gameState")).define("mutable gameState", ["Mutable", "initial gameState"], (M, _) => new M(_));
  main.variable(observer("gameState")).define("gameState", ["mutable gameState"], _ => _.generator);
  main.variable(observer("resetPlay")).define("resetPlay", ["mutable gameState","gameState"], _resetPlay);
  main.variable(observer("createRotationVisualization")).define("createRotationVisualization", ["d3"], _createRotationVisualization);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  return main;
}
