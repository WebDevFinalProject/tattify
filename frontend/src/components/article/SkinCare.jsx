import React from "react";
import "./blogcard.css";
import aftercare from "../../assets/blogs-images/aftercare.jpg";
import { HiArrowLeft } from "react-icons/hi";

const SkinCare = () => {
  return (
    <div className="skin-care-blog">
      <div className="blog-skin-container">
        <div className="header">
          <h2>
            The Ultimate Guide to Tattoo Aftercare: <br /> Keep Your Ink Fresh
            and Vibrant
          </h2>
          <img src={aftercare} alt="" />
        </div>
        <div>
          <HiArrowLeft />
          Back
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default SkinCare;
