import "../tattoo-history/history.css";
import historyLogo from "../../../assets/tattoo-history-images/history-logo.png";
import landingImg from "../../../assets/tattoo-history-images/landing-img.jpeg";
import iceman from "../../../assets/tattoo-history-images/iceman.jpeg";
import irezume from "../../../assets/tattoo-history-images/irezumi.jpeg";
import maori from "../../../assets/tattoo-history-images/maori.jpeg";
import polynesian from "../../../assets/tattoo-history-images/polynesian.jpeg";
import robotic from "../../../assets/tattoo-history-images/robotic.jpeg";
import future from "../../../assets/tattoo-history-images/the future.jpeg";
import styles1 from "../../../assets/tattoo-history-images/various_styles.jpeg";
import styles2 from "../../../assets/tattoo-history-images/various_styles2.jpeg";
import styles3 from "../../../assets/tattoo-history-images/various_styles3.jpeg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import CircleNavigation from "../../navigation-circle/CircleNavigation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards, Keyboard, Mousewheel } from "swiper/modules";

const TattooHistory = () => {
  return (
    <div className="tattoo-history-page">
      <CircleNavigation />
      <div className="history-header">
        <img src={historyLogo} alt="" />
      </div>

      <div className="history-content">
        <div className="history-landing-page">
          <img className="history-landing-image" src={landingImg} alt="" />
          <div className="history-blog-container">
            <div className="heading-intro">
              <h1>
                The Rich History of Tattoos: From Ancient Rituals to Modern
                Artistry
              </h1>
              <p>
                Tattoos have been a part of human culture for millennia,
                evolving from sacred rituals and markers of identity to modern
                expressions of individuality and creativity. Across continents
                and centuries, the art of tattooing has taken countless forms,
                each infused with cultural significance, spirituality, and
                personal meaning. Let’s embark on a journey through the
                fascinating history of tattoos, enriched by the stories of
                civilizations that have made their mark—literally and
                figuratively.
              </p>
            </div>

            <div className="sec-history">
              <div className="sec-1-history">
                <div className="history-body">
                  <div className="iceman">
                    <h3> 1. Ancient Origins: The Earliest Tattoos</h3>
                    <p>
                      The oldest known evidence of tattooing dates back over
                      5,000 years. In 1991, archaeologists discovered Ötzi the
                      Iceman, a naturally mummified man frozen in the Alps. His
                      body bore 61 tattoos—simple lines and crosses etched into
                      his skin. Many researchers believe these marks served
                      therapeutic purposes, targeting areas of pain and illness.
                    </p>
                  </div>
                  <img src={iceman} alt="Ötzi the Iceman" />
                </div>
              </div>

              <div className="sec-2-history">
                <h3>2. Tattoos in Early Civilizations</h3>
                <div className="history-body">
                  <img src={maori} alt="Māori" />
                  <div className="civilization">
                    <div className="civilizations-content">
                      <h5>Egyptian and Nubian Tattoos</h5>
                      <p>
                        In ancient Egypt, tattoos were often associated with
                        women, serving as symbols of fertility, protection, and
                        devotion to deities like Hathor. Archaeological findings
                        reveal tattoos on mummified bodies, including patterns
                        of dots and geometric shapes.
                      </p>
                      <p>
                        In neighboring Nubia, tattooing was a revered art form.
                        One famous example is the 3,000-year-old mummy of
                        Amunet, a priestess whose tattoos likely signified her
                        religious role and connection to the divine.
                      </p>
                    </div>
                    <div className="civilizations-content">
                      <h5>Polynesian and Māori Traditions</h5>
                      <p>
                        The Polynesians developed some of the most intricate
                        tattoo traditions. Tattoos, known as tatau, were a rite
                        of passage and a mark of social status, lineage, and
                        achievements. The Māori of New Zealand created the
                        sacred moko, facial tattoos that conveyed identity and
                        ancestry.
                      </p>
                      <p>
                        The process of creating these tattoos was elaborate,
                        involving tools made of bone and ink derived from
                        natural substances. The result was a deeply spiritual
                        and highly personal work of art.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sec-3-history">
                <div className="history-body">
                  <div className="asia-tattoo">
                    <div className="history-asia">
                      <h3> 3. Sacred Art in Asia</h3>
                      <p>
                        Tattooing has held a sacred place in many Asian cultures
                        for centuries.
                      </p>
                      <h5>Greek and Roman Stigma</h5>
                      <p>
                        In ancient Greece and Rome, tattoos were often
                        associated with punishment and slavery. Criminals and
                        prisoners of war were marked with tattoos to signify
                        their status, creating a lasting stigma in Western
                        culture.
                      </p>

                      <h5>Tattoos and Sailors</h5>
                      <p>
                        The Western fascination with tattoos rekindled during
                        the Age of Exploration. European sailors encountered
                        indigenous tattoo traditions in Polynesia and the
                        Americas, inspiring them to adopt tattoos as symbols of
                        their travels, achievements, and protection at sea.
                      </p>
                      <p>
                        Captain James Cook’s voyages to Polynesia in the 18th
                        century popularized the word "tattoo" (derived from the
                        Tahitian tatau). By the 19th century, tattoos became
                        fashionable among European nobility, including British
                        royalty.
                      </p>
                    </div>
                  </div>
                  <img src={irezume} alt="Monk" />
                </div>
              </div>

              <div className="sec-4-history">
                <div className="history-body">
                  <div className="western-history">
                    <div className="western-world">
                      <h3>4. Tattoos in the Western World</h3>
                      <h5>Greek and Roman Stigma</h5>
                      <p>
                        In ancient Greece and Rome, tattoos were often
                        associated with punishment and slavery. Criminals and
                        prisoners of war were marked with tattoos to signify
                        their status, creating a lasting stigma in Western
                        culture.
                      </p>
                      <h5>Tattoos and Sailors</h5>
                      <p>
                        The Western fascination with tattoos rekindled during
                        the Age of Exploration. European sailors encountered
                        indigenous tattoo traditions in Polynesia and the
                        Americas, inspiring them to adopt tattoos as symbols of
                        their travels, achievements, and protection at sea.
                      </p>
                      <p>
                        Captain James Cook’s voyages to Polynesia in the 18th
                        century popularized the word "tattoo" (derived from the
                        Tahitian <i>tatau</i>). By the 19th century, tattoos
                        became fashionable among European nobility, including
                        British royalty.
                      </p>
                    </div>
                  </div>
                  <img src={polynesian} alt="Polynesian" />
                </div>
              </div>

              <div className="sec-5-history">
                <h3>
                  5. The Tattoo Renaissance: From Subculture to Mainstream
                </h3>
                <div className="history-body">
                  <div className="styles-images">
                    <img src={styles1} alt="Various Styles of Tattoo!" />
                    <img src={styles2} alt="Various Styles of Tattoo!" />
                    <img src={styles3} alt="Various Styles of Tattoo!" />
                  </div>
                  <div className="renaissance">
                    <p>
                      By the 20th century, tattoos became synonymous with
                      rebellion, embraced by subcultures such as bikers, punks,
                      and rock stars. However, the perception of tattoos began
                      to shift during the late 20th century.
                    </p>
                    <p>
                      With the rise of professional tattoo studios and improved
                      technology, tattooing emerged as a respected art form.
                      Shows like Miami Ink and the explosion of social media
                      have brought tattoo culture into the mainstream,
                      celebrating its diversity and creativity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="sec-6-history">
                <div className="history-body">
                  <div className="evolution-history">
                    <h3>6. Cultural Resurgence and Global Influence</h3>
                    <p>
                      Today, tattoos blend ancient traditions with modern
                      innovation. Many people use tattoos to honor their
                      heritage, memorialize loved ones, or express personal
                      milestones. Tattoo conventions, art exhibitions, and
                      global competitions highlight the artistry and cultural
                      significance of tattooing in the modern era.
                    </p>
                  </div>
                </div>
              </div>
              <hr />

              <div className="sec-7-history">
                <h3>7. The Future of Tattoos</h3>
                <p>
                  The future of tattoos is as dynamic as its past. Innovations
                  like 3D tattooing, UV-reactive inks, and augmented reality
                  designs are pushing the boundaries of what tattoos can
                  achieve. Meanwhile, advancements in biodegradable inks and
                  laser removal technology make tattoos more adaptable to
                  changing tastes.
                </p>

                <p>
                  What remains constant is the universal appeal of tattoos as a
                  form of self-expression. They connect us to our ancestors, our
                  communities, and ourselves in ways that words often cannot.
                </p>
                {/* SWIPER */}
                <div className="robot-slide">
                  <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards, Keyboard, Mousewheel]}
                    className="mySwiper"
                    keyboard={true}
                    mousewheel={true}
                  >
                    <SwiperSlide>
                      <img src={future} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={robotic} alt="" />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer-skin-care history-footer">
        <p>© 2024 Tattify. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default TattooHistory;
