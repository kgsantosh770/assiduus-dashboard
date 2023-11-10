import { useRef, useEffect } from 'react'
import * as d3 from 'd3';
import { useTheme } from '@mui/material';

const LinearChart = (props) => {
    const theme = useTheme();
    const svgRef = useRef(null);
    const { data, width, height } = props;
    useEffect(() => {
        const margin = window.outerWidth < 992 ?
            { top: 40, right: 30, bottom: 50, left: 20 } :
            { top: 40, right: 40, bottom: 50, left: 40 }


        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        // clear old data
        svg.selectAll("path").remove();

        // Create a scale for the x-axis
        const xScale = d3.scaleLinear()
            .domain([9, 9 + data.length - 1]) // X-axis range based on data length
            .range([margin.left, width - margin.right]);

        // Create a scale for the y-axis
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data)]) // Y-axis range based on data values
            .range([height - margin.bottom, margin.top]);

        // Create a line generator
        const line = d3.line()
            .x((d, i) => xScale(9 + i))
            .y(d => yScale(d))
            .curve(d3.curveBasis);

        // Append the line to the SVG
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', theme.palette.primary.main) // Line color
            .attr('stroke-width', 2) // Line width
            .attr('d', line);

        // Create the x-axis
        const xAxis = d3.axisBottom(xScale);
        svg.append('g')
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .call(xAxis)
            .attr('stroke-width', 0)
            .attr('class', 'x-axis');

        // Remove y-axis line (no y-axis)
        svg.select('.domain').remove();
    }, [data, width, height, theme.palette.primary.main]);
    return <svg className='line-chart' ref={svgRef}></svg>
}

export default LinearChart