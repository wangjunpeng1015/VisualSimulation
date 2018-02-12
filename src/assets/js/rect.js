var svg = d3.select("#forceMap").append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("id", "forceSvg");
var mapG = svg.append("g")
  .attr("id", "forceGroup");

var force = d3.layout.force()
  .nodes(nodes)
  .links(links)
  .size([width, height])
  .linkDistance(100)
  .charge([ - 1250])
  .gravity(0.5)
  .friction(0.5);
force.start();
var linkG = mapG.selectAll(".link")
  .data(links)
  .enter()
  .append("line")
  .attr("class", "link")
  .attr("stroke", "#ccc");
var nodeG = mapG.selectAll(".node")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("class", "node unselected")
  .attr("r", 8)
  .attr("fill", function(d) {
  switch (d.type) {
  case "home":
    return "red";
    break;
  case "phone":
    return "blue";
    break;
  case "weixin":
    return "green";
    break;
  }
})
  .call(force.drag);

force.on("tick", function() {
  linkG.attr("x1", function(d) {
    return d.source.x;
  })
    .attr("y1", function(d) {
    return d.source.y;
  })
    .attr("x2", function(d) {
    return d.target.x;
  })
    .attr("y2", function(d) {
    return d.target.y;
  });

  nodeG.attr("cx", function(d) {
    return d.x
  })
    .attr("cy", function(d) {
    return d.y
  });
});

var clickTime = "";
var startLoc = [];
var endLoc = [];
var flag = "";
function drawSquare() {

  var rect = svg.append("rect")
    .attr("width", 0)
    .attr("height", 0)
    .attr("fill", "rgba(33,20,50,0.3)")
    .attr("stroke", "#ccc")
    .attr("stroke-width", "2px")
    .attr("transform", "translate(0,0)")
    .attr("id", "squareSelect");

  svg.on("mousedown", function() {

    clickTime = (new Date()).getTime();
    if(d3.event.target.localName == "svg"){
    flag = true;
    rect.attr("transform", "translate(" + d3.event.layerX + "," + d3.event.layerY + ")");
    startLoc = [d3.event.layerX, d3.event.layerY];
    }
  });

  svg.on("mousemove", function() {

    if (d3.event.target.localName == "svg" && flag == true || d3.event.target.localName == "rect" && flag == true) {

      var width = d3.event.layerX - startLoc[0];
      var height = d3.event.layerY - startLoc[1];
      if (width < 0) {
        rect.attr("transform", "translate(" + d3.event.layerX + "," + startLoc[1] + ")");
      }
      if (height < 0) {
        rect.attr("transform", "translate(" + startLoc[0] + "," + d3.event.layerY + ")");
      }
      if (height < 0 && width < 0) {
        rect.attr("transform", "translate(" + d3.event.layerX + "," + d3.event.layerY + ")");
      }
      rect.attr("width", Math.abs(width)).attr("height", Math.abs(height))
    }

  })
  
  svg.on("mouseup", function(){
            if(flag == true){
                flag = false;
                endLoc = [d3.event.layerX, d3.event.layerY];
                var leftTop = [];
                var rightBottom = []
                if(endLoc[0]>=startLoc[0]){
                    leftTop[0] = startLoc[0];
                    rightBottom[0] = endLoc[0];
                }else{
                    leftTop[0] = endLoc[0];
                    rightBottom[0] = startLoc[0];
                }

                if(endLoc[1]>=startLoc[1]){
                    leftTop[1] = startLoc[1];
                    rightBottom[1] = endLoc[1];
                }else{
                    leftTop[1] = endLoc[1];
                    rightBottom[1] = startLoc[1];
                }

                var nodes = d3.selectAll(".node").attr("temp", function(d){
                    if(d.x<rightBottom[0] && d.x>leftTop[0] && d.y>leftTop[1] && d.y<rightBottom[1]){
                        
                            d3.select(this).attr("class","node selected");
                    }
                })
                rect.attr("width",0).attr("height",0);
            }
            var times = (new Date()).getTime()-clickTime;
            if (times<100 && d3.event.target.id !== "squareSelect") {
             	  var nodes = d3.selectAll(".node").attr("class", "node unselected")
                }
        
        })

}
drawSquare();