
let graphHeight = 120;

convertThousandsToK = (item, index, array) => {
    let number = item;
    if (number > 999) {
        number = (Math.round((number / 1000) * 100) / 100).toFixed(0);
        number = number + "k";
    }
    array[index] = number;
}

separateThousands = (item, index, array) => {
    let number = item;
    number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&#8239;");
    array[index] = number;
}

createGraph = (data) => {
    let datapointY = [];
    const intervals = createSteps(data);

    // Convert data to datapointY while making it relative to graphHeight
    for (i = 0; i < data.length; i++) {
        datapointY[i] = (data[i] / Math.max(...data) * graphHeight);
    }

    console.log("The data: " + data + " The intervals: " + intervals);

    // Create intervals    
    for (i = 0; i < intervals.length; i++) {
        const backgroundLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        backgroundLine.setAttribute("x1", "0%");
        backgroundLine.setAttribute("x2", "100%");
        backgroundLine.setAttribute("y1", (graphHeight / (intervals.length - 1)) * i);
        backgroundLine.setAttribute("y2", (graphHeight / (intervals.length - 1)) * i);
        backgroundLine.setAttribute("stroke", "var(--intervalColor)");
        backgroundLine.setAttribute("stroke-width", "1");
        graphSvg.appendChild(backgroundLine);
    }

    // Create green lines
    const graphMargin = 100 / data.length;
    for (i = 0; i < datapointY.length - 1; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", (100 - graphMargin) / (data.length - 1) * i + (graphMargin / 2) + "%");
        line.setAttribute("x2", (100 - graphMargin) / (data.length - 1) * (i + 1) + (graphMargin / 2) + "%");
        line.setAttribute("y1", graphHeight - datapointY[i]);
        line.setAttribute("y2", graphHeight - datapointY[i + 1]);
        line.setAttribute("stroke", "var(--graphColor)");
        line.setAttribute("stroke-width", "2");
        graphSvg.appendChild(line);
    }

    // Create green circles
    for (i = 0; i < datapointY.length; i++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", (graphMargin / 2) + (100 - graphMargin) / (data.length - 1) * i + "%");
        circle.setAttribute("cy", graphHeight - datapointY[i]);
        circle.setAttribute("r", "3");    
        circle.setAttribute("stroke", "var(--graphColor)");
        circle.setAttribute("stroke-width", "2");
        circle.setAttribute("fill", "var(--backgroundColor)");
        graphSvg.appendChild(circle);
    }

    // Create tooltips
    for (i = 0; i < datapointY.length; i++) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", (100 - graphMargin) / (data.length - 1) * i + (graphMargin / 2) + 1 + "%");
        text.setAttribute("y", graphHeight - datapointY[i]);
        text.setAttribute("fill", "white");
        text.textContent = data[i];
        text.classList.add("tooltip");
        graphSvg.appendChild(text);
    }

    // Create xLabels 
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Oct", "Sep", "Nov", "Dec"]
    const d = new Date();
    const currentMonth = d.getMonth();
    let monthsBack = [];

    for (i = data.length - 1; i > -1; i--) {
        monthsBack[i] = currentMonth - i;
        if (monthsBack[i] < 0) {
            monthsBack[i] = currentMonth - i + 12;
        }
        const labelDiv = document.createElement("div");
        if (i == 0) { 
            labelDiv.innerHTML = "<strong>Now</>";
        } else {
            labelDiv.innerHTML = months[monthsBack[i]];
        }
        document.getElementById("xLabelsFromJs").appendChild(labelDiv);
    }

    // Count yLabel values
    intervals.forEach(separateThousands);
    // Create yLabel divs in reverse order
    for (i = intervals.length - 1; i > -1; i--) {
        var yLabel = document.createElement("div");
        yLabel.innerHTML = intervals[i];
        yLabel.classList.add("yLabel");
        document.getElementById("yLabelsFromJs").appendChild(yLabel);
    }

}


function randomize() {
   
    // Create new random data array
    data = [];
    var dataEnd = Math.floor(Math.random() * 6);
    for (i = 0; i < 4 + dataEnd; i++) {
        data[i] = Math.floor(Math.random() * 500000) + 1;
    }

    // Clear labels
    document.getElementById("xLabelsFromJs").innerHTML="";
    document.getElementById("yLabelsFromJs").innerHTML="";

    // Clear svg
    var svgToBeCleared = document.getElementById("graphSvg");
    while (svgToBeCleared.lastChild) {
        svgToBeCleared.removeChild(svgToBeCleared.lastChild);
    }

    createGraph(data);
}

randomize();