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
  gap: 1.2rem;
  justify-content: center;

  .porfolio-image-box {
    position: relative;

    button {
      position: absolute;
      bottom: 0;
      right: 0px;
    }
  }

  img {
    max-width: 25rem;
    object-fit: cover;
  }
`;
