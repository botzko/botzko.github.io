// --- Configuration ---
        const MIN_VALUE = 0;
        const MAX_VALUE = 100;
        const LOCAL_STORAGE_KEY = 'rangeBarChartData';

        // Base chart dimensions for the inline view
        const CHART_WIDTH = 800; // Restored fixed width
        const CHART_HEIGHT = 500; // Increased height

        // Default data (used if localStorage is empty)
        const defaultData = [
            { name: 'Име на продукт едно', start: 20, end: 75, label: 'текст 1' },
            { name: 'Име на продукт две', start: 10, end: 45, label: 'текст 2' },
            { name: 'Име на продукт три', start: 40, end: 95, label: 'текст 3' },
            { name: 'Име на продукт четири', start: 30, end: 45, label: 'текст 4' },
            { name: 'Име на продукт пет', start: 15, end: 35, label: 'текст 5' }
        ];

        // --- Data Handling ---
        function getChartData() {
            const data = [];
            const tableBody = d3.select('#tableBody');

            tableBody.selectAll('tr').each(function() {
                const cells = d3.select(this).selectAll('td').nodes();
                
                if (cells.length >= 4) {
                    const startVal = +cells[1].innerText.trim() || 0;
                    const endVal = +cells[2].innerText.trim() || 0;
                    
                    data.push({
                        name: cells[0].innerText.trim(),
                        start: Math.max(MIN_VALUE, Math.min(MAX_VALUE, startVal)), 
                        end: Math.max(MIN_VALUE, Math.min(MAX_VALUE, endVal)),   
                        label: cells[3].innerText.trim()
                    });
                }
            });
            return data;
        }

        function saveData() {
            const data = getChartData();
            try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
                console.log("Data saved to localStorage.");
            } catch (e) {
                console.error("Could not save data to localStorage:", e);
            }
        }

        function loadData() {
            let dataToLoad;
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            
            if (savedData) {
                try {
                    dataToLoad = JSON.parse(savedData);
                } catch (e) {
                    console.error("Error parsing stored data. Using default data.", e);
                    dataToLoad = defaultData;
                }
            } else {
                dataToLoad = defaultData;
            }
            
            populateTable(dataToLoad);
        }
        
        function populateTable(data) {
            const tableBody = document.getElementById('tableBody');
            
            if (!tableBody) { 
                console.error("Element with ID 'tableBody' not found.");
                return;
            }
            
            tableBody.innerHTML = ''; 

            data.forEach((item, index) => {
                const row = tableBody.insertRow();
                row.setAttribute('data-product', index + 1);

                let cell = row.insertCell();
                cell.contentEditable = true;
                cell.textContent = item.name;

                cell = row.insertCell();
                cell.contentEditable = true;
                cell.textContent = item.start;

                cell = row.insertCell();
                cell.contentEditable = true;
                cell.textContent = item.end;

                cell = row.insertCell();
                cell.contentEditable = true;
                cell.textContent = item.label;
            });
        }
        
        function addRow() {
            const tableBody = document.getElementById('tableBody');
            const newIndex = tableBody.rows.length + 1;
            
            const newRowData = {
                name: `Нов продукт ${newIndex}`,
                start: 5,
                end: 25,
                label: `нов текст ${newIndex}`
            };
            
            populateTable([...getChartData(), newRowData]); 
            saveData(); 
            drawChart();
        }

        function removeRow() {
            const tableBody = document.getElementById('tableBody');
            if (tableBody && tableBody.rows.length > 0) {
                tableBody.deleteRow(tableBody.rows.length - 1);
                saveData(); 
                drawChart(); 
            } else {
                alert("Не може да се премахне ред: таблицата е празна или не е намерена."); // Translated
            }
        }

        // --- Text Wrapping Function ---
        function wrap(text, width) {
            text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.2, // ems
                    x = text.attr("x"),
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")) || 0,
                    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", x).attr("dy", lineHeight + "em").text(word);
                    }
                }
            });
        }

        // --- Core Chart Drawing Function ---

        function renderChart(targetId, width, height, margin) {
            const data = getChartData();
            
            // Adjust margins for headlines
            const chartHeadline = document.getElementById('chart-headline').value;
            const xAxisHeadline = document.getElementById('x-axis-headline').value;
            
            // Create a local copy of margin to avoid modifying the original object directly
            const currentMargin = { ...margin };

            if (chartHeadline) currentMargin.top += 20;
            if (xAxisHeadline) currentMargin.bottom += 20;
            
            const innerWidth = width - currentMargin.left - currentMargin.right;
            const innerHeight = height - currentMargin.top - currentMargin.bottom;

            d3.select(targetId).html('');

            if (data.length === 0 || innerWidth <= 0 || innerHeight <= 0) {
                 d3.select(targetId).append('p').text('Няма налични данни за чертане на графиката.'); // Translated
                 return;
            }

            const svgContainer = d3.select(targetId)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', `0 0 ${width} ${height}`);

            const svg = svgContainer.append('g')
                .attr('transform', `translate(${currentMargin.left},${currentMargin.top})`);

            // Add Chart Headline
            if (chartHeadline) {
                svgContainer.append("text")
                    .attr("class", "chart-title")
                    .attr("x", (width / 2))             
                    .attr("y", currentMargin.top / 2 + 10) // Adjust position
                    .attr("text-anchor", "middle")  
                    .text(chartHeadline);
            }
            
            // Add X-Axis Headline
            if (xAxisHeadline) {
                svg.append("text")
                    .attr("class", "x-axis-title")
                    .attr("transform", `translate(${innerWidth/2}, ${innerHeight + currentMargin.bottom - 10})`) // Adjust position
                    .style("text-anchor", "middle")
                    .text(xAxisHeadline);
            }

            const xScale = d3.scaleLinear()
                .domain([MIN_VALUE, MAX_VALUE])
                .range([0, innerWidth]);

            const yScale = d3.scaleBand()
                .domain(data.map(d => d.name))
                .range([0, innerHeight])
                .padding(0.3);

            // Draw X-axis
            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', `translate(0, ${innerHeight})`)
                .call(d3.axisBottom(xScale).ticks(10));
                
            // Draw Y-axis
            svg.append('g')
                .attr('class', 'y axis')
                .call(d3.axisLeft(yScale))
                .selectAll(".tick text")
                .call(wrap, currentMargin.left - 10);

            // Draw vertical grid lines
            svg.append("g")			
                .attr("class", "grid")
                .selectAll("line")
                .data(xScale.ticks(10))
                .enter().append("line")
                .attr("x1", d => xScale(d))
                .attr("x2", d => xScale(d))
                .attr("y1", 0)
                .attr("y2", innerHeight)
                .attr("stroke", "#e0e0e0")
                .attr("stroke-opacity", 1);

            // Draw Bars (Rectangles)
            const bars = svg.selectAll('.bar-group')
                .data(data)
                .enter()
                .append('g')
                .attr('class', 'bar-group');

            bars.append('rect')
                .attr('class', 'bar')
                .attr('rx', 4) 
                .attr('x', d => xScale(Math.min(d.start, d.end)))
                .attr('y', d => yScale(d.name))
                .attr('height', yScale.bandwidth())
                .attr('width', d => xScale(Math.max(d.start, d.end)) - xScale(Math.min(d.start, d.end)));

            // Draw Bar Labels
            bars.append('text')
                .attr('class', d => {
                    const barWidth = xScale(Math.max(d.start, d.end)) - xScale(Math.min(d.start, d.end));
                    return barWidth < 30 ? 'bar-label outside' : 'bar-label';
                })
                .attr('x', d => {
                    const barStart = xScale(Math.min(d.start, d.end));
                    const barEnd = xScale(Math.max(d.start, d.end));
                    const barWidth = barEnd - barStart;
                    if (barWidth < 30) {
                        return barEnd + 5;
                    }
                    return barStart + barWidth / 2;
                })
                .attr('y', d => yScale(d.name) + yScale.bandwidth() / 2)
                .attr('dy', '0.35em') 
                .attr('text-anchor', d => {
                    const barWidth = xScale(Math.max(d.start, d.end)) - xScale(Math.min(d.start, d.end));
                    return barWidth < 30 ? 'start' : 'middle';
                })
                .attr('fill', d => {
                    const barWidth = xScale(Math.max(d.start, d.end)) - xScale(Math.min(d.start, d.end));
                    return barWidth < 30 ? 'var(--text-color)' : 'var(--bar-label-color)';
                })
                .text(d => d.label)
                .each(function(d) {
                    const barWidth = xScale(Math.max(d.start, d.end)) - xScale(Math.min(d.start, d.end));
                    if (barWidth > 30) {
                        d3.select(this).call(wrap, barWidth - 10);
                    }
                })
                .on('dblclick', function(event, d, i) {
                    const currentText = d3.select(this);
                    const bbox = currentText.node().getBBox();
                    const g = d3.select(this.parentNode);

                    g.selectAll('foreignObject').remove();

                    const foreignObject = g.append('foreignObject')
                        .attr('x', bbox.x)
                        .attr('y', bbox.y)
                        .attr('width', bbox.width)
                        .attr('height', bbox.height)
                        .append('xhtml:div')
                        .style('font', '12px sans-serif')
                        .html(`<textarea style="width: 100%; height: 100%; border: 1px solid #ccc; padding: 0 5px; resize: none;"></textarea>`);

                    const textarea = foreignObject.select('textarea');
                    textarea.node().value = d.label;
                    textarea.node().focus();
                    textarea.node().select();

                    const finishEdit = () => {
                        const newLabel = textarea.node().value;
                        if (newLabel !== d.label) {
                            const dataIndex = data.findIndex(item => item.name === d.name && item.start === d.start && item.end === d.end);
                            if (dataIndex !== -1) {
                                data[dataIndex].label = newLabel;
                                const tableRow = d3.select('#tableBody').selectAll('tr').filter((_, j) => j === dataIndex);
                                if (!tableRow.empty()) {
                                    tableRow.selectAll('td').filter((_, j) => j === 3).text(newLabel);
                                }
                                saveData();
                                drawChart();
                            }
                        }
                        foreignObject.remove();
                    };

                    textarea.on('blur', finishEdit);
                    textarea.on('keydown', function(e) {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            finishEdit();
                        }
                    });
                });
        }

        // Main function to draw the inline chart
        function drawChart() {
            // Create a fresh margin object each time to avoid cumulative changes
            const margin = { top: 20, right: 30, bottom: 40, left: 120 }; 
            renderChart('#chart', CHART_WIDTH, CHART_HEIGHT, margin);
        }

        // --- Download Functions ---

        function downloadPNG() {
            const downloadButton = document.getElementById('download-png-link');
            // Temporarily hide the download button
            downloadButton.style.display = 'none';

            const node = document.getElementById('chart-container');
            htmlToImage.toPng(node)
                .then(function (dataUrl) {
                    const downloadLink = document.createElement("a");
                    downloadLink.href = dataUrl;
                    downloadLink.download = "chart.png";
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                    alert('Неуспешно изтегляне на PNG. Моля, опитайте отново.');
                })
                .finally(() => {
                    // Make the download button visible again
                    downloadButton.style.display = ''; 
                });
        }

        // --- Initialization on Page Load ---
        document.addEventListener('DOMContentLoaded', () => {
            loadData();
            drawChart();

            document.getElementById('download-png-link').addEventListener('click', function(e) {
                e.preventDefault();
                downloadPNG();
            });
        });