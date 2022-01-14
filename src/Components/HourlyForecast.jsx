import React, { useContext } from "react";
import { weatherContext } from "../App";
import styled from "styled-components";

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: repeat(12, auto);
  grid-auto-flow: column;
  gap: 0 35px;
  padding-left: 45px;
`;
const StyledListItem = styled.li`
  display: flex;
  position: relative;
  color: grey;
  list-style: none;
  margin: 3px 0;
  &::before {
    content: "${(props) => props.id}";
    position: absolute;
    left: -25px;
    color: grey;
  }
  &.forecast,
  &.forecast::before {
    color: white;
  }
  p {
    margin: 0;
  }
  .smallIcon {
    height: 20px;
    width: 20px;
  }
`;

export default function HourlyForecast() {
  const { weatherData } = useContext(weatherContext);

  const currentDate = new Date(weatherData.current.dt * 1000);
  const weatherText = weatherData.hourly[0].weather[0].main;
  const hourList = [];

  /* To-do
    1. Add weather icons in list
    2. Add old data of default greyish data for the hours past*/
    let hourToCome = 0; 
  for (let i = 0; i < 24; i++) {
    if (i >= currentDate.getHours()) {
      hourList.push(
        <StyledListItem key={i} id={i} className="forecast">
          <p>{weatherText}</p>
          <img
            className="smallIcon"
            src={`http://openweathermap.org/img/wn/${weatherData.hourly[hourToCome].weather[0].icon}@2x.png`}
          />
        </StyledListItem>
      );
      hourToCome++;
    } else {
      hourList.push(
        <StyledListItem key={i} id={i}>
          <br />
        </StyledListItem>
      );
    }
  }
  return <StyledList>{hourList}</StyledList>;
}
