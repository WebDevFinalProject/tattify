import { H2, PortfolioContainer } from "./styles/StyledComponents";

function Portfolio({ artist }) {
    return (
        <>
            {artist ? (
                <div className="artist-portfolio-main-container">
                    <H2>Portfolio</H2>
                    <PortfolioContainer>
                        {artist.portfolio.map((imageUrl, index) => (
                            <img
                                index={index}
                                src={imageUrl}
                                alt={`Portfolio image ${index + 1}`}
                            />
                        ))}
                    </PortfolioContainer>
                </div>
            ) : (
                <p>Nothing to show here</p>
            )}
        </>
    );
}

export default Portfolio;
