import React, { useState } from "react";
import "../skin-care-blog/skin_care.css";
import aftercare from "../../../assets/blogs-images/aftercare.jpg";
import { HiArrowLeft, HiHome } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/blogs-images/Pink_Elegant_Logo.png";
import CustomSlider from "./CustomSlider";

const SkinCare = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const backToPageHandler = () => {
    navigate(-1);
  };
  return (
    <div className="skin-care-blog">
      <div className="blog-skin-container">
        <div className="skin-care-logo-container">
          <div className="nav-skin-care">
            <NavLink className="back-to-homepage" to="/">
              <HiHome size={18} className="home-logo" /> Home Page
            </NavLink>
          </div>
          <img className="skin-care-logo" src={logo} alt="skin-care logo" />
        </div>
        <div className="header">
          <h2>
            The Ultimate Guide to Tattoo Aftercare:
            <br />
            <span>Keep Your Ink Fresh and Vibrant</span>
          </h2>

          <img src={aftercare} alt="" />
        </div>
        <div className="back-icon" onClick={backToPageHandler}>
          <HiArrowLeft />
          Back
        </div>
        <p className="update-skin-care">
          Updated : <span>30 November 2024</span>
        </p>
        <div className="article">
          <div className="section-1">
            <h3>Immediate Aftercare: The First 24-48 Hours</h3>
            <p>
              Your tattoo artist will typically cover your new ink with a
              sterile bandage or plastic wrap. This protects the area from
              bacteria and minimizes irritation. Follow these steps during the
              crucial first couple of days:
            </p>
            <ul>
              <li>
                <strong>Leave the covering on:</strong>Keep the bandage on for
                the time specified by your artist, usually 2–4 hours.
              </li>
              <li>
                <strong>Wash gently: </strong>After removing the covering, clean
                the tattoo with lukewarm water and a fragrance-free,
                antibacterial soap. Use your fingertips, not a washcloth, to
                avoid irritation.
              </li>
              <li>
                <strong>Pat dry: </strong>Gently pat the area dry with a clean,
                soft towel or let it air dry. Avoid rubbing, which can damage
                the skin.
              </li>
              <li>
                <strong>Apply moisturizer:</strong>Use a thin layer of a
                recommended tattoo aftercare product, such as unscented lotion
                or specialized tattoo ointments. Avoid petroleum-based products
                unless specifically advised by your artist.
              </li>
            </ul>
          </div>
          <div className="section-2">
            <h3> The Healing Process: Days 3–14</h3>
            <p>
              During this phase, your tattoo will begin to scab and peel. This
              is entirely normal but requires careful attention.
            </p>
            <ul>
              <li>
                <strong>Moisturize regularly: </strong> Keep the tattoo hydrated
                by applying a thin layer of lotion 2–3 times daily. Don’t overdo
                it; too much moisture can lead to issues like clogged pores.
              </li>
              <li>
                <strong>Avoid picking and scratching: </strong>Itching is
                common, but resist the urge to scratch or pick at scabs. This
                can lead to scarring or uneven healing.
              </li>
              <li>
                <strong>Stay clean:</strong>Continue washing the tattoo daily,
                but be gentle to avoid disturbing the healing skin.
              </li>
              <li>
                <strong>Wear loose clothing:</strong>Tight clothing can rub
                against the tattoo, causing irritation and potentially pulling
                off scabs prematurely.
              </li>
            </ul>
          </div>
          <div className="section-3">
            <h3>Long-Term Tattoo Care</h3>
            <p>
              Once your tattoo has fully healed (usually after 4–6 weeks), you
              can shift to long-term maintenance to keep it looking fresh and
              vibrant.
            </p>
            <div className="sec-3-guide">
              <ul>
                <li>
                  <strong>Moisturize daily:</strong> Hydrated skin helps
                  maintain the brightness of your tattoo. Use a high-quality,
                  unscented lotion regularly.
                </li>
                <li>
                  <strong>Use sunscreen:</strong>UV rays are a tattoo’s worst
                  enemy. Always apply a broad-spectrum sunscreen with at least
                  SPF 30 when your tattoo will be exposed to the sun.
                </li>
                <li>
                  <strong>Avoid abrasive products: </strong>Harsh exfoliants and
                  scrubs can wear down your tattoo over time. Stick to gentle
                  skincare products.
                </li>
              </ul>
              <div className="youtube-skin-care">
                <iframe
                  allowFullScreen
                  width="360"
                  height="215"
                  src="https://www.youtube.com/embed/Xg9Dv7X6ck0?si=QtkC6-93-YHfO9D2"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
                ></iframe>
                <div className="source">
                  Source :{" "}
                  <a className="youtube-source"
                    href="https://www.youtube.com/watch?v=Xg9Dv7X6ck0&t=22s"
                    target="_blank"
                  >
                    Link
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="section-4">
            <h3>What to Avoid During Healing</h3>
            <p>
              To ensure your tattoo heals perfectly, steer clear of the
              following:
            </p>

            <ul>
              <li>
                <strong>Swimming and soaking: </strong>Avoid pools, hot tubs,
                and baths for at least 2–3 weeks. Showering is fine, but
                prolonged soaking can soften the scabs and increase the risk of
                infection.
              </li>
              <li>
                <strong>Direct sunlight: </strong>Sun exposure can fade the ink
                and irritate the healing skin. Cover your tattoo or stay in the
                shade.
              </li>
              <li>
                <strong>Heavy exercise: </strong>Activities that cause excessive
                sweating or friction on the tattooed area should be avoided
                during the healing process.
              </li>
            </ul>
          </div>

          <div className="section-5">
            <h3>Signs of Trouble: When to Seek Help</h3>
            <p>
              While most tattoos heal without issues, it’s important to
              recognize signs of infection or complications:
            </p>

            <ul>
              <li>
                <strong>Excessive redness or swelling</strong>
              </li>
              <li>
                <strong>Severe pain or tenderness</strong>
              </li>
              <li>
                <strong>Oozing pus or unusual discharge</strong>
              </li>
              <li>
                <strong>Foul odor from the tattooed area</strong>
              </li>
            </ul>
            <p>
              If you notice any of these symptoms, consult your artist or a
              healthcare professional immediately.
            </p>
          </div>
          <div className="section-6">
            <div className="sec-6-conclusion">
              <h3>Conclusion </h3>
              <span onClick={clickHandler}>{isOpen ? "-" : "+"}</span>
            </div>
            {isOpen && (
              <>
                <p>
                  Proper tattoo aftercare is key to preserving your ink and
                  avoiding complications. By following your artist’s
                  instructions and maintaining a consistent aftercare routine,
                  you can ensure your tattoo heals beautifully and stays vibrant
                  for years to come.
                </p>
                <p>
                  Whether it’s your first tattoo or your tenth, remember that
                  your skin is a canvas worth taking care of. Treat it well, and
                  your tattoo will be a piece of art you’ll proudly show off for
                  a lifetime.
                </p>
              </>
            )}
          </div>
        </div>
        <div className="cube">
          <CustomSlider />
        </div>
      </div>
      <footer className="footer-skin-care">
        <p>© 2024 Tattify. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default SkinCare;
