import styled, { css } from "styled-components";
import Photo1 from "../../../assets/about-photo.png";

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

// Shared animation styles
const fadeIn = css`
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s ease-in, transform 0.6s ease-in;
`;

const fadeOut = css`
    opacity: 0;
    transform: translateY(20px);
`;

export const CenteredWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: justify;
    padding: 5rem 2rem;
    background-color: var(--background2-color);
    img {
        width: 30rem;
        margin: 2rem;
        border: 1rem solid white;
    }
    @media ${device.tablet} {
        /* background-color: lightblue; */
        padding: 5 15rem;
        img {
            width: 45rem;
            margin: 2rem;
            border: 1rem solid white;
        }
    }

    @media ${device.laptop} {
        /* background-color: lightcoral; */
        padding: 5rem 20rem;
    }

    @media ${device.laptopL} {
        /* background-color: lightgreen; */
        padding: 5rem 55rem;
    }
`;

export const Title = styled.h1`
    font-family: var(--font-title);
    font-size: 5rem;
    /* font-size: clamp(4.5rem, 5vw, 6.6rem); */
    border-bottom: 1px solid black;
    padding: 0 7rem 2rem 7rem;
    margin-bottom: 5rem;
    ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)}
    @media ${device.mobileS} {
        padding: 0 3rem 2rem 3rem;
    }
    @media ${device.laptop} {
        font-size: 6rem;
    }
`;

export const StyledH2 = styled.i`
    font-family: "Lora", serif;
    color: grey;
    font-size: 2.7rem;
    font-weight: 400;
    margin: 5rem 0;
    ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)}
`;

export const StyledParagraph = styled.p`
    font-family: "Lato", sans-serif;
    font-size: 2rem;
    padding: 0 2.5rem 2rem 2.5rem;
    @media ${device.tablet} {
        margin-bottom: 5rem;
    }
    ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)}
`;
