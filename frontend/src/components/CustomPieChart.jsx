import React from "react";
import styled from "styled-components";

const CustomPieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <NoDataMessage>No data available</NoDataMessage>;
  }

  const total = data.reduce((sum, { value }) => sum + value, 0);
  const radius = 100;
  const centerX = radius;
  const centerY = radius;

  return (
    <ChartContainer>
      <ChartSVG width={radius * 2} height={radius * 2}>
        {data.map(({ name, value }, index) => {
          const startAngle =
            index === 0
              ? 0
              : data
                  .slice(0, index)
                  .reduce((sum, { value }) => sum + (value / total) * 360, 0);
          const endAngle = startAngle + (value / total) * 360;
          const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
          const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
          const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
          const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

          return (
            <g key={name}>
              <Path
                d={`M${centerX},${centerY} L${x1},${y1} A${radius},${radius} 0 ${
                  endAngle - startAngle > 180 ? 1 : 0
                },1 ${x2},${y2} Z`}
                fill={COLORS[index % COLORS.length]}
              />
              <ChartText
                x={
                  centerX +
                  radius *
                    0.7 *
                    Math.cos((((startAngle + endAngle) / 2) * Math.PI) / 180)
                }
                y={
                  centerY +
                  radius *
                    0.7 *
                    Math.sin((((startAngle + endAngle) / 2) * Math.PI) / 180)
                }
              >
                {`${((value / total) * 100).toFixed(0)}%`}
              </ChartText>
            </g>
          );
        })}
      </ChartSVG>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  // padding: 1rem;
  // margin: 1rem 0;
  // border: 1px solid #ccc;
  // border-radius: 8px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  // transition: box-shadow 0.3s ease-in-out;

  &:hover {
    // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ChartSVG = styled.svg`
  display: block;
`;

const Path = styled.path`
  transition: fill 0.3s ease-in-out;

  &:hover {
    fill: #ffa500; /* Adjust hover color */
  }
`;

const ChartText = styled.text`
  font-size: 14px;
  fill: white;
`;

const NoDataMessage = styled.div`
  padding: 1rem;
`;

const COLORS = ["#2ecc71", "#e74c3c"]; // Adjust color scheme

export default CustomPieChart;
