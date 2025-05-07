import React, { useState } from "react";
import "./About.css";
import { AiOutlineClose } from "react-icons/ai";

import Autor from "../../static/autor.jpg";
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
            Remember the days when finding a proper English-to-Uzbek translation felt nearly impossible? We do too. For years, general-use bilingual dictionaries—let alone specialized ones—were hard to come by. And with so few online resources available in Uzbek, many had no choice but to rely on Russian as a bridge language, translating indirectly (English → Russian → Uzbek, and vice versa).
          </p>
        </div>
        <hr className="about-line" />

        <div className="about-card">
          <h3>The Print Edition</h3>
          <div className="about-card-content">
            <p>
              To change this, work on a comprehensive English–Uzbek–English dictionary began in 2003. Just two years later, the {" "}
              <a href="https://search.worldcat.org/title/70168096">
                first edition 
              </a>{" "}
              was published by{" "}<i>Gʻafur Gʻulom Publishing House</i>, and it's still{" "} 
              <a href="https://asaxiy.uz/product/akbar-kholmurodov-ravshan-azizov-english-uzbek-uzbek-english-dictionary-tamaddun-nashriyot">
                available 
              </a>{" "}for purchase online.<br />
              Special effort was put into the Uzbek–English section, which remains the most complete and reliable resource of its kind to this day.<br />
            </p>
            <p>
              Later, a mobile app for Android was released, based on the same dictionary, with major updates to the lexical database.
            </p>
          </div>
        </div>

        <div className="about-card">
          <h3>Leksika.uz — The Online Dictionary</h3>
          <div className="about-card-content">
            <p>
              Despite these milestones, there was still a strong need for a {" "}<b>high-quality online dictionary</b>{" "} <br />
              covering both everyday and specialized vocabulary. That vision became a reality in {" "}<b>September 2022,{" "}</b>
               on the 31st anniversary of Uzbekistan’s independence, with the launch of {" "}<b>Leksika.uz</b>{" "}.   
            </p>

            <p>
              As of {" "}<b>September 2023</b>, our dictionary contains over {" "}<b>250,000 entries</b>, 
              including real-life example sentences to show words in context.            
            </p>
            <p>
              Leksika.uz is designed to help {" "}<b>learners of all levels</b>{" "} improve their English reading,
              writing, and speaking skills. It’s also an essential tool for {" "}<b>translators and 
              localization specialists,</b> with tips and best practices available in the {" "}<b>Articles</b>{" "} section.
            </p>
            
          </div>
        </div>

        <div className="about-card">
          <h3>What You'll Find on Leksika.uz</h3>
          <div className="about-card-content">
            <ul style={{ lineHeight: "25px", fontFamily: "Roboto" }}>
              <li>The {" "}<b>largest English–Uzbek–English dictionary</b>{" "} available online</li>
              <li>A {" "}<b>Russian–Uzbek–Russian section</b>{" "} with the most extensive database on the web</li>
              <li>A {" "}<b>Grammar section</b>{" "} with 136 detailed lessons, each paired with video explanations</li>
              <li>Articles with {" "}<b>English learning tips, freelancing advice,</b> and {" "}<b>motivational content</b></li>
              <li>A dedicated {" "}<b>
              <a href="https://play.google.com/store/apps/details?id=uz.leksika.app">
                Android app
              </a></b>{" "} to access the dictionary on the go</li>
            </ul>
          </div>
        </div>
        <div className="about-card">
          <h3>Support Our Mission</h3>
          <div className="about-card-content">
            <p><b>Leksika.uz is a non-profit project.</b></p>
            <p>Your support helps us grow and improve. Every contribution makes a difference.</p>
            <p><b>You can help us {" "}
            <a href="https://my.click.uz/clickp2p/DD2B79E46658AE8F842AD72B13A5BC791B024B5760CB7D6743F63D44A46122A8">
              here.
            </a></b></p>
          </div>
        </div>

        <hr className="about-line" />
        {/* // Our Team */}
        <div className="about-card">
          <h3>Our team</h3>
          <div className="team">
            <section className="team-box">
              <div>
                <img className="team-box-img" src={Dev} alt=""/>
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
                <img className="team-box-img" src={Autor} alt=""/>
                <button
                  className="team-img-btn"
                  onClick={() => {
                    setShowModal({
                      open: true,
                      title: "Akbar Xolmuradov",
                      text: "Lola has been crazy about web design since her first self-study classes on YouTube. As you have guessed, her hobby is drawing. Being now a student at the University of World Economy and Diplomacy, Lola is sure she will be able to make economics more beautiful through art.",
                    });
                  }}
                >
                  Read more
                </button>
              </div>

              <h4>Akbar Xolmuradov</h4>
              <hr />
              <p>Localization and translation expert</p>
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