import { CenteredWrap, StyledH2, StyledParagraph, Title } from "./styles/about";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import Photo1 from "../../assets/about-photo.png";
import Photo2 from "../../assets/about-photo-2.png";
// import "./styles/about.css";

const About = () => {
    const [titleRef, titleVisible] = useIntersectionObserver({
        threshold: 0.1,
    });
    const [missionRef, missionVisible] = useIntersectionObserver({
        threshold: 0.1,
    });
    const [paragraphRef1, paragraphVisible1] = useIntersectionObserver({
        threshold: 0.1,
    });
    const [paragraphRef2, paragraphVisible2] = useIntersectionObserver({
        threshold: 0.1,
    });
    const [paragraphRef3, paragraphVisible3] = useIntersectionObserver({
        threshold: 0.1,
    });
    const [paragraphRef4, paragraphVisible4] = useIntersectionObserver({
        threshold: 0.1,
    });
    const [paragraphRef5, paragraphVisible5] = useIntersectionObserver({
        threshold: 0.1,
    });
    const [paragraphRef6, paragraphVisible6] = useIntersectionObserver({
        threshold: 0.1,
    });
    const [teamRef, teamVisible] = useIntersectionObserver({ threshold: 0.1 });
    return (
        <>
            <CenteredWrap>
                <Title ref={titleRef} isVisible={titleVisible}>
                    About Us
                </Title>
                <img
                    src={Photo1}
                    alt=""
                    style={{ width: "45rem", border: "1rem solid white" }}
                />
                <StyledH2 ref={missionRef} isVisible={missionVisible}>
                    Our mission...
                </StyledH2>
                <StyledParagraph
                    ref={paragraphRef1}
                    isVisible={paragraphVisible1}
                >
                    We want to make the work of tattoo artists easier.
                </StyledParagraph>
                <StyledParagraph
                    ref={paragraphRef2}
                    isVisible={paragraphVisible2}
                >
                    Lots of tattooers rely on social media for finding work.
                    Nowadays social media is heavily controlled by algorithms.
                    Rules, that are often hard to understand, furthermore they
                    often don't work into your favour, even if you play by their
                    rules.
                </StyledParagraph>
                <StyledParagraph
                    ref={paragraphRef3}
                    isVisible={paragraphVisible3}
                >
                    As a result, they can end up with a lot less work. Sometimes
                    even get "shadow banned" by the algorithm - often for
                    reasons they don't know - which means their content is shown
                    to little to no people.
                </StyledParagraph>
                <StyledParagraph
                    ref={paragraphRef4}
                    isVisible={paragraphVisible4}
                >
                    We believe this can be changed.
                </StyledParagraph>
                <StyledParagraph
                    ref={paragraphRef5}
                    isVisible={paragraphVisible5}
                >
                    We believe tattoo artists should have the opportunity to
                    solely focus on creating. On letting their imagination flow
                    and putting their work out without having to play by the
                    opaque rules of algorithms.
                </StyledParagraph>
                <img
                    src={Photo2}
                    alt=""
                    style={{
                        width: "50rem",
                        margin: "2rem",
                        border: "1rem solid white",
                    }}
                />
                <StyledH2 ref={teamRef} isVisible={teamVisible}>
                    The team
                </StyledH2>
                <StyledParagraph
                    ref={paragraphRef6}
                    isVisible={paragraphVisible6}
                >
                    We are a team of developers standing at the dawn of our
                    career. This website is one of our early attempts to
                    materialize what we have learned so far.
                </StyledParagraph>
            </CenteredWrap>
        </>
    );
};

export default About;
