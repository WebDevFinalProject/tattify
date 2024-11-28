import React from "react";
import "./styles/journey.css";

import ImageSnake from "../../assets/images/snake.jpeg";
function Journey() {
  return (
    <div className="journey-container">
      <div className="image-container">
        <img src={ImageSnake} alt="Snake" />
      </div>
      <div className="content">
        <div>
          <h2>Search for a location</h2>
          <p>
            Look for artists in your current location or places you will travel.
          </p>
        </div>
        <div>
          <h2>Narrow down the results with filters</h2>
          <p>Tailor the results of your search to your needs.</p>
        </div>
        <div>
          <h2>Connect with an artist.</h2>
          <p>
            Once you've found someone you resonate with, connect with them
            through chat so you can discuss the details.
          </p>
        </div>
        <div>
          <h2>Get tattooed.</h2>
          <p>Once you've agreed on everything, it's time to get tattooed!</p>
        </div>
        <div>
          <h2>Repeat!</h2>
          <p>One does not simply stop at one tattoo.</p>
        </div>
      </div>
    </div>
  );
}

export default Journey;
