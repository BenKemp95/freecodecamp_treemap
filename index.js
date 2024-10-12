const gameBtn = document.getElementById("game");
const movieBtn = document.getElementById("movie");
const kickstarterBtn = document.getElementById("kickstarter");
let gameURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";
let movieURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
let kickstarterURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
const title = document.getElementById("title");
const description = document.getElementById("description");

let canvas = d3.select("body")
    .append("svg")
    .attr("id", "canvas")
let legend = d3.select("body")
    .append("svg")
    .attr("id", "legend")

let tooltipArray = [];
const addToolTip = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("background-color", "rgb(171, 190, 217)")
    .style("border-radius", "5px")
    .style("visibility", "hidden")

const mapTree = (input) => {
    let hierarchy = d3.hierarchy(input, (node) => {
        return node["children"];
    }).sum((node) => {
        return node["value"]
    }).sort((node1, node2) => {
        return node2["value"] - node1["value"];
    })

    let mapValues = d3.treemap()
        .size([1000,600])

    mapValues(hierarchy);

    console.log(hierarchy.leaves());

    d3.selectAll("g").remove();

    let group = canvas.selectAll("g")
        .data(hierarchy.leaves())
        .enter()
        .append("g")
        .attr("class", "group")
        .attr("transform", (d)=>{
            return "translate(" + d["x0"] + ", " + d["y0"] + ")";
        })
        .attr("stroke", "black")
        .attr("stroke-width", ".2px")
        .on("mouseover", (e , d ) => {
            tooltipArray = [`Name: ${d["data"]["name"]}`, `Category: ${d["data"]["category"]}`, `Value: ${d["data"]["value"]}`];
            addToolTip.style('visibility', 'visible')
                .style("opacity", 1)
                .style("position", 'absolute')
                .attr("data-value", d["data"]["value"])
                .style("top", `${e.clientY}px`)
                .style("left", `${e.clientX}px`)
                .selectAll("h1")
                .data(tooltipArray)
                .join("h1")
                .style("font-size", "10px")
                .text((text) => text)
                .style("visibility", "visible")
        })
        .on("mouseout", function () {
            addToolTip.style("visibility", "hidden")
                .style("opacity", 0)
        })

    group.append("rect")
        .attr("class", "tile")
        .attr("fill", (item) => {
            let category = item["data"]["category"];
            if(category === "Wii" || category === "Action" || category === "Product Design") {
                return "red"
            } else if(category === "DS" || category === "Drama" || category === "Technology") {
                return "green"
            } else if (category === "PS2" || category === "Biography" || category === "Gaming Hardware") {
                return "blue"
            }   else if (category === "PS3" || category === "Adventure" || category === "Television") {
                return "yellow"
            } else if (category === "PS4" || category === "Animation" || category === "Food") {
                return "purple"
            } else if (category === "3DS" || category === "Comedy" || category === "Apparel") {
                return "cyan"
            } else if (category === "PS" || category === "Family" || category === "Tabletop Games") {
                return "teal"
            } else if (category === "SNES" || category === "Hardware") {
                return "gray"
            } else if (category === "XB" || category === "Narrative Film") {
                return "pink"
            } else if(category === "XOne" || category === "Web") {
                return "lightblue"
            } else if(category === "NES" || category === "Games") {
                return "lightgreen"
            } else if(category === "GB" || category === "Art") {
                return "lime"
            } else if(category === "PC" || category === "Video Games") {
                return "peachpuff"
            } else if(category === "X360" || category === "Sound") {
                return "orange"
            } else if(category === "N64" || category === "3D Printing") {
                return "brown"
            } else if(category === "GBA" || category === "Wearables") {
                return "khaki"
            } else if(category === "2600" || category === "Sculpture") {
                return "coral"
            } else if(category === "PSP" || category === "Gadgets") {
                return "tan"
            } else if(category === "Drinks") {
                return "gold"
            }
        })
        .attr("data-name", (d) => d["data"]["name"])
        .attr("data-category", (d) => d["data"]["category"])
        .attr("data-value", (d) => d["data"]["value"])
        .attr("width", (d)=> d["x1"] - d["x0"])
        .attr("height", (d)=> d["y1"] - d["y0"])

    group.append("text")
        .selectAll('tspan')
        .data(function (d) {
            return d.data.name.split(/(?=[A-Z][^A-Z])/g);
        })
        .enter()
        .append('tspan')
        .attr('x', 3)
        .attr('y', function (d, i) {
            return 11 + i * 10;
        })
        .text(function (d) {
            return d;
        })
        .attr("font-size", "11px")


    let colorArr = ["red", "green", "blue", "yellow", "purple", "cyan","teal", "gray",
        "pink", "lightblue", "lightgreen","lime", "peachpuff", "orange", "brown", "khaki", "coral", "tan", "gold"];


    console.log(nameArr);
    let legendFinal= legend.selectAll("g")
        .data(colorArr)
        .enter()
        .append("g")
        .attr("transform", (d, i)=>{
            if(i<=5){
                return "translate(" + (30) + ", " + (i*30) + ")";
            } else if(i<=11 && i>5) {
                return "translate(" + (220) + ", " + ((i-6)*30) + ")";
            } else if(i<=17 && i>11) {
                return "translate(" + (420) + ", " + ((i-12)*30) + ")";
            } else if (i>17) {
                return "translate(" + (620) + ", " + ((i-18)*30) + ")";
            }

        })

    legendFinal.append("rect")
        .attr("fill", (d,i)=>{
            let isName = nameArr[i];
            if(!isName) {
                return "white"
            } else {
                return d
            }
        })
        .attr("class", "legend-item")
        .attr("width", 30)
        .attr("height", 30)

    legendFinal.append("text")
        .data(nameArr)
        .text(d => d)
        .attr("x", 35)
        .attr("y", 20)

}
let nameArr = ["Wii", "DS", "PS2", "PS3", "PS4", "3DS", "PS", "SNES", "XB", "XOne", "NES", "GB", "PC", "X360", "N64", "GBA", "2600", "PSP"]
gameBtn.addEventListener("click", ()=> {
    nameArr= ["Wii", "DS", "PS2", "PS3", "PS4", "3DS", "PS", "SNES", "XB", "XOne", "NES", "GB", "PC", "X360", "N64", "GBA", "2600", "PSP"];
    title.textContent = "Video Game Sales";
    description.textContent = "Top 100 Most Sold Video Games Grouped by Platform";
   callData(gameURL);
});
movieBtn.addEventListener("click", ()=> {
    nameArr= ["Action", "Drama", "Biography", "Adventure", "Animation", "Comedy", "Family"];
    title.textContent = "Movie Sales";
    description.textContent = "Top 100 Highest Grossing Movies Grouped By Genre";
   callData(movieURL);
});
kickstarterBtn.addEventListener("click", ()=> {
    nameArr= ["Product Design", "Technology", "Gaming Hardware", "Television", "Food", "Apparel", "Tabletop Games", "Hardware", "Narrative Film",
        "Web", "Games", "Art", "Video Games", "Sound", "3D Printing", "Wearables", "Sculpture", "Gadgets", "Drinks"];
    title.textContent = "Kickstarter Pledges";
    description.textContent = "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category";
    callData(kickstarterURL);
});

const callData = (dataCall) => {
        d3.json(dataCall)
            .then((data, error) => {
                if(error) {
                    console.log(error)
                } else {
                    renderData = data
                    console.log(renderData);
                    mapTree(renderData);
                }
            })
}
callData(gameURL);
