import React from "react";
import "./TattooConsideration.css";
import considerationsImage from "../../../assets/consideration-article/considerationsImage.jpg";
function TatooConsiderations() {
  return (
    <section className="consideration-section">
      <div className="tattoo-considerations">
        <h1>🌟 Things to Consider Before Getting a Tattoo</h1>
        <img
          src={considerationsImage}
          alt="Tattoo preparation"
          className="considerations-image"
        />
        <p className="intro">
          Thinking of getting inked? A tattoo is a lifelong work of art and a
          powerful form of self-expression. But before diving in, make sure you
          have all the details to make your tattoo journey a memorable and
          positive experience.
        </p>

        <div className="highlight-box">
          <h3>✨ Quick Tip:</h3>
          <p>
            Trust your instincts. If something feels off about a studio or
            artist, don't hesitate to explore other options!
          </p>
        </div>

        <h2>1. 🎨 Choose the Right Design</h2>
        <p>
          Your tattoo is a reflection of your personality. Spend time exploring
          different designs, tattoo styles, and their meanings. Whether it's a
          symbolic quote, a vibrant piece of art, or a simple minimalist design,
          ensure it resonates with you again.
        </p>
        <ul>
          <li>
            Browse tattoo portfolios on Instagram or Pinterest for inspiration.
          </li>
          <li>
            Discuss your ideas with your tattoo artist for a personalized touch.
          </li>
          <li>
            Think long-term: Will this design hold meaning years from now?
          </li>
        </ul>

        <h2>2. 🏢 Research the Studio and Artist</h2>
        <p>
          A clean, professional studio and an experienced artist are key to a
          safe tattoo experience. Check reviews, visit the studio, and ask
          questions.
        </p>
        <blockquote>
          "A good tattoo isn't cheap, and a cheap tattoo isn't good."
        </blockquote>

        <h2>3. 📍 Consider the Placement</h2>
        <p>
          Tattoos hurt more on certain body parts like ribs, feet, or hands.
          Additionally, consider how visible you want your tattoo to be. Will it
          align with your lifestyle or profession?
        </p>
        <div className="placement-guide">
          <h3>💡 Placement Sensitivity Chart:</h3>
          <p>High Pain: Ribs, feet, hands</p>
          <p>Moderate Pain: Arms, thighs, back</p>
          <p>Low Pain: Shoulders, calves</p>
        </div>

        <h2>4. 🕰️ Understand the Commitment</h2>
        <p>
          Tattoos are a lifelong decision. While removal options exist, they can
          be costly and painful. Be 100% sure before committing.
        </p>

        <h2>5. 💧 Prepare for Aftercare</h2>
        <p>
          Aftercare is essential for keeping your tattoo vibrant and
          infection-free. Follow these steps:
        </p>
        <ul>
          <li>Wash your tattoo gently with antibacterial soap.</li>
          <li>Apply a thin layer of fragrance-free moisturizer.</li>
          <li>Avoid direct sunlight and swimming until fully healed.</li>
        </ul>

        <div className="final-note">
          <h3>🎉 Final Note:</h3>
          <p>
            A tattoo is an investment in your personal story. Choose wisely,
            prepare thoroughly, and wear your ink with pride!
          </p>
        </div>
      </div>
    </section>
  );
}

export default TatooConsiderations;
