import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import target from "../assets/target.png";

const QuestionAnalysisChart = ({ correct, total }) => {
  const chartRef = useRef();

  useEffect(() => {
    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2.5;

    const data = [correct, total - correct];

    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(["#4F46E5", "#E5E7EB"]);

    const pie = d3.pie();
    const arc = d3.arc().innerRadius(50).outerRadius(radius);

    svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));

    svg
      .append("image")
      .attr("xlink:href", target)
      .attr("x", -24) // Adjust to center the image
      .attr("y", -24) // Adjust to center the image
      .attr("width", 48)
      .attr("height", 48);
  }, [correct, total]);

  return (
    <div>
      <p className="text-gray-700 mb-4">
        <strong>
          You scored {correct} question correct out of {total}
        </strong>
        . However it still needs some improvements.
      </p>
      <div className="flex justify-center" ref={chartRef}></div>
    </div>
  );
};

export default QuestionAnalysisChart;
