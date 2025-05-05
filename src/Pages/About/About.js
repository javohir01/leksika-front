import React, { useState } from "react";
import "./About.css";
import { AiOutlineClose } from "react-icons/ai";

import Designer from "../../static/Lola_Arslanova.jpg";
import Dev2 from "../../static/Kamol_Dev.jpg";
import Dev from "../../static/dev.jpeg";
export const About = () => {
  const [showModal, setShowModal] = useState({
    open: false,
    title: "",
    text: "",
  });

  return (
    <div className="about" style={{ background: "#f2f2f2" }}>
      <div className="about-container">
        <div className="about-desc">
          <p style={{ lineHeight: "32px" }}>
            Remember the days when you couldn't find the proper translation of an English word to Uzbek? We also know the feeling of not having any general use dictionaries, let alone specialized ones. And without online resources in Uzbek, knowing Russian was a prerequisite for indirect translation (EN  RU  UZ and vice versa).
          </p>
        </div>
        <hr className="about-line" />

        <div className="about-card">
          <h3>Book edition</h3>
          <div className="about-card-content">
            <p>
              To reverse the situation, it was decided to compile a large
              English-Uzbek-English dictionary and the work started back in
              2003. 2 years later, the{" "}
              <a href="https://www.worldcat.org/title/70168096">
                first edition
              </a>{" "}
              of the bilingual dictionary was published in G’afur G’ulom
              publishing house; it is still{" "}
              <a href="https://asaxiy.uz/product/akbar-kholmurodov-ravshan-azizov-english-uzbek-uzbek-english-dictionary-tamaddun-nashriyot">
                available
              </a>
              for sale online. Much attention was directed to the Uzbek-English part, and even now, it is the most comprehensive and complete Uzbek-English dictionary available.
            </p>

            <p>
              A{" "}
              <a href="https://play.google.com/store/apps/details?id=com.hy.enguzb.dictionary&hl=en&gl=US">
                mobile app
              </a>{" "}
              for Android devices was launched based on the dictionary with
              major update of the lexical database.
            </p>
          </div>
        </div>

        <div className="about-card">
          <h3>Website dictionary </h3>
          <div className="about-card-content">
            <p>
              However, we still desperately needed a high-quality online dictionary for the English-Uzbek language pair that could cover both everyday and area-specific vocabulary. In September 2022, on the 31st anniversary of Uzbekistan's independence, Leksika.uz was successfully launched. As of September 2023, the database contains over 250,000 entries with real-life example sentences of word usage.
            </p>

            <p>
              <i>Leksika.uz</i> has been designed to give English learners of any level the help they need to read, speak and write English more effectively. It is also intended to assist translators and localization specialists by providing useful tips and rules of thumb; these can be found in the Articles section.
            </p>
          </div>
        </div>

        <div className="about-card">
          <h3>What has already been added:</h3>
          <div className="about-card-content">
            <ul style={{ lineHeight: "25px", fontFamily: "Roboto" }}>
              <li>
                Russian-Uzbek-Russian dictionary section with largest database
                on the web;
              </li>
              <li>
                
                Articles with content for:
             <ul>
              <li>useful tips and motivational articles for freelancers;</li>
              <li>
                articles for localizers to Uzbek language, including intricacies
                of Uzbek grammar;
              </li>
                <li>easier learning of English, including grammar, writing tips, and learning new words.</li>
                </ul>
              </li>
              
            </ul>
          </div>
        </div>

        <hr className="about-line" />
        {/* // Our Team */}
        <div className="about-card">
          <h3>Our team</h3>
          <div className="team">
            <section className="team-box">
              <div>
                <img className="team-box-img" src={Dev} />
                <button
                  className="team-img-btn"
                  onClick={() => {
                    setShowModal({
                      open: true,
                      title: "Asqar Arslonov",
                      text: "Having started his IT-education at the age of 12, Asqarjon has reached the level of full-stack developer just 2 years later. Taking several online courses (Technical Support Fundamentals, Computer Networking) was followed by successful completion of Front-End Development and Back-End Development courses at the Open Web Academy education center in Qarshi city. Being an eighth-grader, he is fully responsible for the technical support of Leksika.uz",
                    });
                  }}
                >
                  Read more
                </button>
              </div>

              <h4>Asqar Arslonov</h4>
              <hr />
              <p>Full-Stack (MERN) Developer</p>
              <button
                className="team-btn"
                onClick={() => {
                  setShowModal({
                    open: true,
                    title: "Asqar Arslonov",
                    text: "Having started his IT-education at the age of 12, Asqarjon has reached the level of full-stack developer just 2 years later. Taking several online courses (Technical Support Fundamentals, Computer Networking) was followed by successful completion of Front-End Development and Back-End Development courses at the Open Web Academy education center in Qarshi city. Being an eighth-grader, he is fully responsible for the technical support of Leksika.uz",
                  });
                }}
              >
                More info
              </button>
            </section>
            <section className="team-box">
              <div>
                <img className="team-box-img" src={Designer} />
                <button
                  className="team-img-btn"
                  onClick={() => {
                    setShowModal({
                      open: true,
                      title: "Lola Arslanova",
                      text: "Lola has been crazy about web design since her first self-study classes on YouTube. As you have guessed, her hobby is drawing. Being now a student at the University of World Economy and Diplomacy, Lola is sure she will be able to make economics more beautiful through art.",
                    });
                  }}
                >
                  Read more
                </button>
              </div>

              <h4>Lola Arslanova</h4>
              <hr />
              <p>UI/UX Designer</p>
            </section>
            <section className="team-box">
              <div>
                <img className="team-box-img" src={Dev2} />
                <button
                  className="team-img-btn"
                  onClick={() => {
                    setShowModal({
                      open: true,
                      title: "Kamollidin Nuriddinov",
                      text: "Kamoliddin started taking his front-end cources when he was 11. Since then he has developed some simple projects, joining later our Leksika team. He has helped a lot with the front-end part of the project and become a critical part of the team.",
                    });
                  }}
                >
                  Read more
                </button>
              </div>

              <h4>Kamoliddin Nuriddinov</h4>
              <hr />
              <p>Front-end developer</p>
            </section>
          </div>
          {showModal.open && (
            <div className="about-modal">
              <div className="about-modal-title">
                <h2>{showModal.title}</h2>
                <AiOutlineClose
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowModal({ open: false });
                  }}
                />
              </div>
              <p>{showModal.text}</p>
            </div>
          )}
        </div>
        
      </div>
      {showModal.open && <div className="overlay"></div>}
    </div>
  );
};