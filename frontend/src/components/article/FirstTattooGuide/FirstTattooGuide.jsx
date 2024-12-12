import React from "react";
import "./FirstTattooGuide.css";
import CircleNavigation from "../../navigation-circle/CircleNavigation.jsx";

const FirstTattooGuide = () => {
  return (
    <>
      <div className="tattooGuideContainer">
        <CircleNavigation />
        <div className="tattooGuideHeader">
          <div>
            <h1>Preparing for Your First Tattoo: A Beginner's Guide</h1>
            <p>
              Getting your first tattoo is a thrilling experience, but it`s
              natural to feel a bit nervous. With the right preparation, you can
              turn this into an exciting and enjoyable milestone. Here's
              everything you need to know to make your first tattoo session a
              smooth and memorable one.
            </p>
          </div>

          <iframe
            className="first-tattoo-video"
            allowFullScreen
            width="640"
            height="360"
            src="https://www.youtube.com/embed/Qqmnw6u-YDk"
            title="YOUR FIRST TATTOO: a Complete Guide"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
          ></iframe>
        </div>
        <div className="research">
          <div className="rsearch-point">
            <h2>1. Do Your Research</h2>

            <h3>Find the Right Artist</h3>
            <p>
              The tattoo artist you choose can make or break your experience.
              Each artist has a unique style, whether it`s realism, line work,
              or traditional tattoos. Spend time browsing portfolios on
              Instagram or the studio´s website to find someone whose work
              aligns with your vision.
            </p>

            <p>
              Don’t be afraid to ask questions, either. A good tattoo artist can
              answer all of them – or the majority of them. For most of them,
              it’s not just about making money but also looking for people who
              will carry their art around. Among the many other questions you
              can – and should ask – an artist, include whether they guarantee
              their work. Many offer a free touch-up appointment if small spots
              of ink or other minor blemishes occur during the tattoo process.
            </p>

            <h3>Learn About the Process</h3>
            <p>
              Understanding how tattoos are created can ease your nerves.
              Typically, the process begins with a stencil of your chosen
              design, followed by the actual inking. Many artists are happy to
              walk you through the steps during a consultation.
            </p>
          </div>
          <div className="rsearch-point">
            <h2>2. Choose a Meaningful Design</h2>
            <p>
              Your tattoo is a lifelong piece of art, so take time to select a
              design that resonates with you. Think about:
            </p>
            <ul>
              <li>
                <strong>Symbolism:</strong> What does the tattoo represent for
                you?
              </li>
              <li>
                <strong>Size and Placement:</strong> Consider where it will be
                most visible and how large you want it.
              </li>
            </ul>
            <p>
              If you’re unsure, your artist can help refine the design and make
              suggestions based on your ideas.
            </p>
          </div>

          <div className="rsearch-point">
            <h2>3. Prepare Your Body</h2>

            <h3>Hydrate and Rest</h3>
            <p>
              In the days leading up to your appointment, drink plenty of water
              and get a good night’s sleep. A well-rested body heals faster and
              manages discomfort better.
            </p>

            <h3>Avoid Alcohol and Blood Thinners</h3>
            <p>
              Skip alcohol and medications like aspirin 24 hours before your
              appointment. These can thin your blood, making the tattooing
              process more difficult.
            </p>

            <h3>Eat Well</h3>
            <p>
              Eat a hearty meal before your session. Having stable energy levels
              will help you feel comfortable, especially for longer tattoos.
            </p>
          </div>

          <div className="rsearch-point">
            <h2>4. What to Bring</h2>
            <ul>
              <li>
                <strong>Identification:</strong> Most studios require proof of
                age.
              </li>
              <li>
                <strong>Snacks and Water:</strong> For extended sessions, these
                are essential.
              </li>
              <li>
                <strong>Comfortable Clothing:</strong> Wear clothes that allow
                easy access to the area being tattooed.
              </li>
            </ul>
          </div>

          <div className="rsearch-point">
            <h2>5. The Tattoo Session</h2>

            <h3>Relax</h3>
            <p>
              It’s natural to feel anxious, but trust your artist’s expertise.
              Many people find the buzzing sound of the tattoo machine more
              intimidating than the actual process.
            </p>

            <h3>Communicate</h3>
            <p>
              If you need a break or feel uncomfortable, let your artist know.
              They’re there to make the experience as pleasant as possible.
            </p>
          </div>
          <div className="rsearch-point">
            <h2>6. Aftercare is Key</h2>
            <p>
              Proper aftercare ensures your tattoo heals beautifully and stays
              vibrant. Follow these basic steps:
            </p>
            <ul>
              <li>
                <strong>Clean Gently:</strong> Wash the tattoo with mild soap
                and lukewarm water.
              </li>
              <li>
                <strong>Moisturize:</strong> Apply the recommended ointment or
                lotion.
              </li>
              <li>
                <strong>Avoid Exposure:</strong> Stay out of direct sunlight and
                avoid swimming until it’s fully healed.
              </li>
            </ul>
            <p>
              Your artist will provide specific instructions based on their
              preferred practices.
            </p>
          </div>

          <div className="rsearch-point">
            <h2>7. Manage Expectations</h2>

            <h3>Pain Level</h3>
            <p>
              Tattoo pain varies depending on the location and your tolerance.
              Most people describe it as a mild scratching or burning sensation.
            </p>

            <h3>Healing Process</h3>
            <p>
              Your tattoo will go through different healing phases, including
              scabbing and peeling. Don’t pick at it—let it heal naturally.
            </p>
          </div>
          <div className="rsearch-point">
            <h2>Final Thoughts</h2>
            <p>
              Your first tattoo is a meaningful experience that can symbolize
              personal growth, commemorate an important memory, or simply be a
              piece of art you love. By doing your research and preparing well,
              you’ll set yourself up for an unforgettable first tattoo journey.
            </p>
            <p>
              Getting your first tattoo is a memorable experience that should be
              cherished. By taking the time to thoroughly prepare and choosing
              the right artist, you ensure that your first ink will be something
              you’re proud to show off. Remember, a tattoo is not just an art,
              it’s a testament to a story that is uniquely yours.
            </p>
          </div>
        </div>
      </div>
      <footer className="footer-first-tattoo">
        <p>© 2024 Tattify. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default FirstTattooGuide;
