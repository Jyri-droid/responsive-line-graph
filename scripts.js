var data = [200, 3000, 16000, 24000, 64000, 48123];
var graphHeight = 120;
var amountOfBackgroundLines = 5;

function createGraph() {
    var dataAccumulated = [0];
    var circleY = [];
    
    // Accumulate data
    for (i = 0; i < data.length; i++) {
        if (i == 0) {
        dataAccumulated[i] = data[i];
        } else {
            dataAccumulated[i] = dataAccumulated[i - 1] + data[i];
        }
    }

    // Convert dataAccumulated to circleY while making it relative to graphHeight
    for (i = 0; i < dataAccumulated.length; i++) {
        circleY[i] = (dataAccumulated[i] / Math.max(...dataAccumulated)) * graphHeight;
    }

    // Create background lines
    for (i = 0; i < amountOfBackgroundLines; i++) {
        const backgroundLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        backgroundLine.setAttribute("x1", "0%");
        backgroundLine.setAttribute("x2", "100%");
        backgroundLine.setAttribute("y1", (graphHeight / (amountOfBackgroundLines - 1)) * i);
        backgroundLine.setAttribute("y2", (graphHeight / (amountOfBackgroundLines - 1)) * i);
        backgroundLine.setAttribute("stroke", "white");
        backgroundLine.setAttribute("stroke-width", "1");
        graphSvg.appendChild(backgroundLine);
    }

    // Create green lines
    var graphMargin = 100 / data.length;

    // Create green lines
    for (i = 0; i < circleY.length - 1; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", (100 - graphMargin) / (dataAccumulated.length - 1) * i + (graphMargin / 2) + "%");
        line.setAttribute("x2", (100 - graphMargin) / (dataAccumulated.length - 1) * (i + 1) + (graphMargin / 2) + "%");
        line.setAttribute("y1", graphHeight - circleY[i]);
        line.setAttribute("y2", graphHeight - circleY[i + 1]);
        line.setAttribute("stroke", "var(--green)");
        line.setAttribute("stroke-width", "4");
        graphSvg.appendChild(line);
    }

    // Create green circles
    for (i = 0; i < circleY.length; i++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", (graphMargin / 2) + (100 - graphMargin) / (dataAccumulated.length - 1) * i + "%");
        circle.setAttribute("cy", graphHeight - circleY[i]);
        circle.setAttribute("r", "5");    
        circle.setAttribute("stroke", "var(--green)");
        circle.setAttribute("stroke-width", "4");
        circle.setAttribute("fill", "var(--greyBackground)");
        graphSvg.appendChild(circle);
    }

    // Create xLabels 
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Oct", "Sep", "Nov", "Dec"]
    var d = new Date();
    var currentMonth = d.getMonth();
    var monthsBack = [];

    for (i = data.length - 1; i > -1; i--) {
        monthsBack[i] = currentMonth - i;
        if (monthsBack[i] < 0) {
            monthsBack[i] = currentMonth - i + 12;
        }
        var labelDiv = document.createElement("div");
        if (i == 0) { 
            labelDiv.innerHTML = "<strong>Now</>";
        } else {
            labelDiv.innerHTML = months[monthsBack[i]];
        }
        document.getElementById("xLabelsFromJs").appendChild(labelDiv);
    }

    // Count yLabel values
    var yLabels = [];

    for (i = 0; i < amountOfBackgroundLines; i++) {
        yLabels[i] = (Math.min(...dataAccumulated) + (((Math.max(...dataAccumulated) - Math.min(...dataAccumulated)) / (amountOfBackgroundLines - 1)) * i));
        if (yLabels[i] > 999) {
            yLabels[i] = (Math.round((yLabels[i] / 1000) * 100) / 100).toFixed(0);
            yLabels[i] = yLabels[i] + "k";
        }
        yLabels[i] = "$" + yLabels[i];
    }

    // Create yLabel divs in reverse order
    for (i = amountOfBackgroundLines - 1; i > -1; i--) {
        var yLabel = document.createElement("div");
        yLabel.innerHTML = yLabels[i];
        yLabel.classList.add("yLabel");
        document.getElementById("yLabelsFromJs").appendChild(yLabel);
    }

}

createGraph();

function randomize() {
   
    // Create new random data array
    data = [];
    var dataEnd = Math.floor(Math.random() * 6);
    for (i = 0; i < 4 + dataEnd; i++) {
        data[i] = Math.floor(Math.random() * 50000) + 1;
    }

    // Clear labels
    document.getElementById("xLabelsFromJs").innerHTML="";
    document.getElementById("yLabelsFromJs").innerHTML="";

    // Clear svg
    var svgToBeCleared = document.getElementById("graphSvg");
    while (svgToBeCleared.lastChild) {
        svgToBeCleared.removeChild(svgToBeCleared.lastChild);
    }

    createGraph();
}