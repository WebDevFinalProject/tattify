import styled from "styled-components";

// media queries
const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

export const Wrapper = styled.section`
  padding: 0rem 4rem;
  background: linear-gradient(
    180deg,
    rgb(229, 209, 188) 0%,
    rgba(0, 0, 0, 0) 18%
  );

  @media ${device.tablet} {
    padding: 0rem 8%;
    background: linear-gradient(
      180deg,
      rgb(229, 209, 188) 0%,
      rgba(0, 0, 0, 0) 30%
    );
    display: grid;
    gap: 4rem;
    grid-template-columns: 25% 75%;
    grid-template-rows: auto;
    grid-template-areas: "main main";

    > div:nth-child(1) {
      grid-area: main;
      justify-self: start;
      display: flex;
      flex-direction: row;
      padding-left: 3rem;
      div {
        display: flex;
        align-items: start;
        padding-top: 14rem;
        padding-left: 1rem;
      }
    }
  }
`;

// used for the artist profile
export const H2 = styled.h2`
  font-family: "Lato", sans-serif;
  padding-left: 0.5rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  width: 100%;
  border-bottom: 1px solid black;
  padding-bottom: 1rem;
`;

export const PortfolioContainer = styled.div`
  margin-bottom: 4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  .portfolio-image-box {
    position: relative;
    flex: 1 1 calc(33.333% - 1.2rem); /* Default: 3 items per row */
    max-width: calc(33.333% - 2rem);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover .delete-button {
      opacity: 1;
    }

    .delete-button {
      position: absolute;
      bottom: 0;
      right: 0px;
      width: 3rem;
      height: 3rem;
      border: none;
      border-radius: 0.3rem;
      background-color: rgba(0, 0, 0, 0.43);
      color: white;
      opacity: 0;
      transition: 0.7s ease;
      font-size: 2rem;

      svg {
        transform: scale(1.3);
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.95);
        color: grey;
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 481px) and (max-width: 1024px) {
    .portfolio-image-box {
      flex: 1 1 calc(50% - 1.2rem); /* 2 items per row on medium screens */
      max-width: calc(50% - 1.2rem);
    }
  }

  @media (max-width: 480px) {
    .portfolio-image-box {
      flex: 1 1 100%; /* 1 item per row on small screens */
      max-width: 80%;
      margin: auto;
    }
  }

  .modal {
    position: fixed;
    top: 100px;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.93);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  #close-button-swiper {
    position: absolute;
    top: 5%;
    right: 50px;
    border-radius: 10px;
    background-color: transparent;
    border: none;
    font-size: 4rem;
    cursor: pointer;
    z-index: 1100;

    &:hover {
      color: gray;
    }
  }

  .swiper-portfolio {
    width: 100%;
    height: 80%;
    padding: 0 10px;
  }

  .swiper-portfolio img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
  #porfolio-swipe {
    height: 85%;
    width: 100%;
    border-radius: 10px;
    object-fit: contain;
    padding-top: 6rem;
  }
`;


export const PortfolioPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 10px; 

 .portfolio-pagination-button {
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    font-size: 18px;
    
 

    &:disabled {
      cursor: not-allowed;
      color: #aaa; 
    }
  }

  span {
    font-size: 14px; 
    color: #555; 
  }
`;



