const width = window.innerWidth;
const height = window.innerHeight;

const svgWidth = 600;  // SVG width (make sure this matches your SVG's actual width)
const svgHeight = 500; // SVG height (make sure this matches your SVG's actual height)
const margin = 30

const nodes = [
    { id: 1, name: "Research & Development"}, // x: Math.random() * (400 - 130) + 100, y: Math.random() * (400 - 50) + 100 },  // Random positions between 5 and 400
    { id: 2, name: "Molecular Science"}, // x: Math.random() * (400 - 130) + 100, y: Math.random() * (400 - 50) + 100 },
    { id: 3, name: "Software Engineering"}, // x: Math.random() * (400 - 130) + 100, y: Math.random() * (400 - 50) + 100 },
    { id: 4, name: "UC Berkeley"}, // x: Math.random() * (400 - 130) + 100, y: Math.random() * (400 - 50) + 100 },
    { id: 5, name: "Data Science"}, // x: Math.random() * (400 - 130) + 100, y: Math.random() * (400 - 50) + 100},
    { id: 6, name: "Scientist"}, // x: Math.random() * (400 - 130) + 100, y: Math.random() * (400 - 50) + 50 },
    // { id: 7, name: "Woman in STEM", x: Math.random() * (400 - 130) + 100, y: Math.random() * (400 - 50) + 100},
    { id: 8, name: "Woman in STEM"}, // x: Math.random() * (400 - 130) + 100, y: Math.random() * (400 - 50) + 100},
    { id: 9, name: "Machine Learning"} //, x: 100, y: 100}  
];

const links = [
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 4, target: 2 },
    { source: 4, target: 3 },
    { source: 6, target: 1 },
    { source: 5, target: 4 },
    { source: 5, target: 6 },
    // { source: 7, target: 6 },
    // { source: 7, target: 3 },
    { source: 8, target: 2 },
    { source: 9, target: 1 },
    { source: 9, target: 2 },
    { source: 9, target: 8 }
];

const svg = d3.select("#graph")
    .attr("width", width)
    .attr("height", height);

    
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(250))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter((svgWidth / 2)-50, svgHeight / 2))  // Center the graph in the SVG container
    .force("collision", d3.forceCollide().radius(30)); // Optional: Add collision force to prevent overlap

const link = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link");

const node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 12)
    .call(d3.drag()
        .on("start", dragstart)
        .on("drag", dragged)
        .on("end", dragend))
    .style("fill", () => {
        const colors = ["pink", "#C7F6C7", "#FFE5B4", "#cdebf9"];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }); 

node.append("title")
    .text(d => d.name);

const nodeText = svg.selectAll(".node-text")
    .data(nodes)
    .enter().append("text")
    .attr("class", "node-text")
    .attr("text-anchor", "middle")  // Centers the text horizontally
    .attr("dy", -15)  // Adjust vertical positioning (offset from center)
    .text(d => d.name);

simulation.on("tick", function () {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    nodeText
        .attr("x", d => d.x)
        .attr("y", d => d.y);  // Position text based on node's x, y position
});



function dragstart(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragend(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
