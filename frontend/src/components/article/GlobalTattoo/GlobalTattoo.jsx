import React from "react";
import "./GlobalTattoo.css";
import { Link } from "react-router-dom";

import MaoriTatoo1 from "../../../assets/global-tattoo/maori-tattoo1.jpg";
import MaoriTattoo2 from "../../../assets/global-tattoo/maori.jpg";
import JapaneseTattoo from "../../../assets/global-tattoo/japanese.avif";
import JapaneseTattoo2 from "../../../assets/global-tattoo/Japanese-tattoo.webp";
import PolinesianTattoo1 from "../../../assets/global-tattoo/polynesianTattoo.jpeg";
import PolinesianTattoo2 from "../../../assets/global-tattoo/Poli3.webp";
import Mini1 from "../../../assets/global-tattoo/minimalistTattoo.jpg";
import Mini2 from "../../../assets/global-tattoo/Mini.jpg";
function GlobalTattoo() {
  return (
    <div className="global-article">
      <div className="global-header">
        <h1>The Art of Tattoos: Connecting Cultures Globally</h1>
        <p>
          Explore the rich history, growing popularity, and cultural
          significance of tattoos around the world.
        </p>
      </div>

      <section className="global-section">
        <h2>A World of Tattoos</h2>
        <p>
          From the ancient <strong>Maori tattoos of New Zealand</strong> to the
          intricate <strong>henna art of India</strong>, tattoos reflect the
          diversity of human culture. Each design carries meaning—some tell a
          story of lineage, others mark milestones, and some serve purely as
          personal adornment.
        </p>
        <ul>
          <li>
            <strong>Maori Ta Moko:</strong> Represents ancestry and identity,
            deeply tied to the wearer’s heritage.
          </li>
          <img className="global-images" src={MaoriTatoo1} alt="MaoriTatoo1" />
          <img className="global-images" src={MaoriTattoo2} alt="MaoriTatoo1" />
          <li>
            <strong>Japanese Irezumi:</strong> Showcases elaborate imagery such
            as koi fish, dragons, and cherry blossoms.
          </li>
          <img
            className="global-images"
            src={JapaneseTattoo}
            alt="JapaneseTattoo"
          />
          <img
            className="global-images"
            src={JapaneseTattoo2}
            alt="JapaneseTattoo2"
          />
          <li>
            <strong>Polynesian Tattoos:</strong> Celebrate the connection
            between humans, nature, and spirituality through geometric patterns.
          </li>
          <img className="global-images" src={PolinesianTattoo1} alt="tattoo" />
          <img className="global-images" src={PolinesianTattoo2} alt="tattoo" />
          <li>
            <strong>Modern Minimalist Tattoos:</strong> Clean lines, subtle
            shapes, and personalized meaning.
          </li>
          <img className="global-images" src={Mini1} alt="tattoo" />
          <img className="global-images" src={Mini2} alt="tattoo" />
        </ul>
      </section>

      <section className="global-section">
        <h2>The Growing Popularity</h2>
        <p>
          Today, tattoos are more accessible than ever. Over{" "}
          <strong>38% of young adults worldwide</strong> have at least one
          tattoo, making it a global phenomenon.
        </p>
      </section>

      <section className="global-section highlight">
        <h2>Why Choose Tattify?</h2>
        <p>
          Your dream tattoo deserves the perfect artist. Let us help you find
          the right one:
        </p>
        <ul>
          <li>
            <strong>Global Artist Directory:</strong> Find specialists in every
            style near you or worldwide.
          </li>
          <li>
            <strong>Verified Reviews and Ratings:</strong> Real client feedback
            to ensure you choose with confidence.
          </li>
          <li>
            <strong>Curated Portfolios:</strong> View high-quality galleries of
            artists' work.
          </li>
          <li>
            <strong>Seamless Booking Experience:</strong> Effortlessly book or
            contact your artist.
          </li>
        </ul>
        <Link to="/artists" className="global-button">
          Browse Artists Now
        </Link>
      </section>

      <section className="global-section">
        <h2>Tattoo Trends to Watch</h2>
        <p>
          Looking for inspiration? Here are some of the hottest tattoo trends
          this year:
        </p>
        <ul>
          <li>
            <strong>Fine Line Tattoos:</strong> Delicate and detailed designs.
          </li>
          <li>
            <strong>Abstract Art:</strong> Unique shapes and patterns.
          </li>
          <li>
            <strong>UV Tattoos:</strong> Invisible during the day, glowing at
            night.
          </li>
          <li>
            <strong>Nature-Inspired Tattoos:</strong> Celebrate the beauty of
            the natural world.
          </li>
        </ul>
      </section>

      <footer className="global-footer">
        <p>
          Tattoos are more than just body art—they’re a universal language of
          creativity and tradition.{" "}
          <strong>
            Discover the perfect artist for your next tattoo on Tattify.
          </strong>
        </p>
      </footer>
    </div>
  );
}

export default GlobalTattoo;
