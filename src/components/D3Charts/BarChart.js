import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTheme } from '@mui/material';

function BarChart(props) {
    const theme = useTheme();
    const svgRef = useRef(null);
    const { data, xValues, width, height, yAxisSpacing } = props;
    const borderRadius = 2;
    const barWidth = 10;

    useEffect(() => {
        const margin = window.outerWidth < 992 ?
            { top: 40, right: 40, bottom: 50, left: 20 } :
            { top: 40, right: 40, bottom: 50, left: 40 }

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        // clear old data
        svg.selectAll("rect").remove();

        // Create a scale for the x-axis
        const xScale = d3.scaleBand()
            .domain(xValues)
            .range([margin.left, width - margin.right])
            .paddingInner(1);

        // Create a scale for the y-axis (y-values are not used in this example)
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([height - margin.bottom - 10, margin.top + yAxisSpacing]);

        // Append the bars to the SVG with border radius
        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d, i) => xScale(xValues[i]))
            .attr('y', d => yScale(Math.max(0, d)))
            .attr('width', barWidth)
            .attr('height', d => Math.abs(yScale(0) - yScale(d)))
            .attr('rx', borderRadius) // Horizontal border radius
            .attr('ry', borderRadius) // Vertical border radius
            .attr('fill', theme.palette.primary.main); // Bar color

        const xAxis = d3.axisBottom(xScale);
        svg.append('g')
            .attr('transform', `translate(${5}, ${height - margin.bottom + 3})`)
            .call(xAxis)
            .attr('stroke-width', 0)
            .style('text-anchor', 'middle')
            .attr('class', 'x-axis')

        // Remove y-axis line (no y-axis)
        svg.select('.domain').remove();
    }, [xValues, data, width, height, yAxisSpacing, theme.palette.primary.main]);

    return <svg className='bar-chart' ref={svgRef}></svg>;
}

export default BarChart;
