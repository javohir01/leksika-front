import React, { useEffect, useState } from "react";
import classes from "./Result.module.css";
import { HiOutlineVolumeUp } from "react-icons/hi";
import { findEngUzb, findUzbEng } from "../../lib/fetchData.js";
import notFound from "./notFound.png";
import notFoundUzb from "./notFoundUzb.png";
import Ellipse from "../../static/Ellipse.svg";
import Example from "../Example/Example";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  setAuthModal,
  setEnUzEditModal,
  setEnUzEditStackModal,
  setUzEnEditModal,
  setUzEnEditStackModal,
} from "../../redux/modalSlice";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

// Cache for word existence checks to avoid redundant API calls
const wordExistenceCache = {};

function Result(props) {
  const [none, setNone] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchAlgo(lang, word) {
      if (lang === "English-Uzbek") {
        var data = await (await findEngUzb(word)).json();
        setNone(false);
      } else {
        var data = await (await findUzbEng(word)).json();
        setNone(true);
      }
      const notFound = {
        word: 404,
        desc: 404,
        trnasc: 404,
      };
      if (data.data == null) {
        setData(notFound);
      } else {
        setData(data.data);
      }
      console.log(data, word);
    }
    fetchAlgo(props.lang, props.search);
  }, [props.search, props.lang]);

  if (data.word === 404 && props.lang === "English-Uzbek") {
    return <NotFoundEngUzb />;
  } else if (data.word !== 404 && props.lang === "English-Uzbek") {
    return <ResulComponent lang={props.lang} data={data} none={none} />;
  }
  if (data.word === 404 && props.lang === "Uzbek-English") {
    return <NotFoundUzbEng />;
  } else if (data.word !== 404 && props.lang === "Uzbek-English") {
    return <ResulComponent lang={props.lang} data={data} none={none} />;
  }
}

function ResulComponent(props) {
  const auth = useAuthUser()();
  const dispatch = useDispatch();
  const [processedDescription, setProcessedDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(true);

  const start = () => {
    var msg = new SpeechSynthesisUtterance(props.data.word);
    msg.voice = speechSynthesis.getVoices().filter(function (voice) {
      return voice.lang === "en-US";
    })[0];
    speechSynthesis.speak(msg);
  };

  useEffect(() => {
    // Process description text to add links to words
    async function processDescriptionText() {
      if (!props.data.description) {
        setProcessedDescription("");
        setIsProcessing(false);
        return;
      }

      try {
        const description = props.data.description;
        
        // Extract words after numbered points and comma-separated lists
        const numberedPointsRegex = /(\d+\))\s*([a-zA-Z]+(?:,\s*[a-zA-Z]+)*)/g;
        const matches = [...description.matchAll(numberedPointsRegex)];
        
        if (matches.length === 0) {
          // No numbered points found, return original description
          setProcessedDescription(description);
          setIsProcessing(false);
          return;
        }
        
        // Extract all words to check
        const wordsToCheck = [];
        matches.forEach(match => {
          const wordList = match[2].split(/,\s*/); // Split by comma and optional whitespace
          wordList.forEach(word => {
            if (word.trim().length > 1) {
              wordsToCheck.push(word.trim());
            }
          });
        });
        
        // Remove duplicates
        const uniqueWords = [...new Set(wordsToCheck)];
        
        // Check which words exist in the API
        const wordExistsMap = {};
        for (const word of uniqueWords) {
          // Check if word is already in cache
          const cacheKey = `${props.lang}-${word.toLowerCase()}`;
          if (wordExistenceCache[cacheKey] !== undefined) {
            wordExistsMap[word] = wordExistenceCache[cacheKey];
          } else {
            // Check API and cache result
            const exists = await checkWordExists(word);
            wordExistenceCache[cacheKey] = exists;
            wordExistsMap[word] = exists;
          }
        }
        
        // Process the HTML to add links
        let processedHTML = description;
        
        // Sort words by length (descending) to avoid replacing parts of longer words
        const sortedWords = uniqueWords.sort((a, b) => b.length - a.length);
        
        for (const word of sortedWords) {
          if (wordExistsMap[word]) {
            // Create a regex that matches the word as a whole word
            const regex = new RegExp(`\\b${word}\\b`, 'g');
            
            // Determine target language for the link
            const targetLang = props.lang === "English-Uzbek" ? "Uzbek-English" : "English-Uzbek";
            
            // Replace with link
            processedHTML = processedHTML.replace(
              regex, 
              `<a href="/en-uz?s=${word}&lang=${targetLang}" target="_blank">${word}</a>`
            );
          }
        }
        
        setProcessedDescription(processedHTML);
      } catch (error) {
        console.error("Error processing description:", error);
        setProcessedDescription(props.data.description);
      } finally {
        setIsProcessing(false);
      }
    }
    
    processDescriptionText();
  }, [props.data.description, props.lang]);

  // Function to check if a word exists in the API
  async function checkWordExists(word) {
    if (!word || word.length < 2) return false;
    
    try {
      let response = null;
      if (props.lang === "English-Uzbek") {
        response = await axios.get(`https://back.leksika.uz/words/uz-en?s=${word.toLowerCase()}`);
      } else {
        response = await axios.get(`https://back.leksika.uz/words/en-uz?s=${word.toLowerCase()}`);
      }
      return response.data && 
             response.data.data && 
             response.data.data.description && 
             response.data.data.description.trim() !== '';
    } catch (error) {
      console.error(`Error checking word "${word}":`, error);
      return false;
    }
  }

  return (
    <div className={classes.result}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h2>{props.data.word}</h2>
        <button
          onClick={() => {
            if (!auth) return dispatch(setAuthModal());
            props.lang === "Uzbek-English"
              ? dispatch(setUzEnEditStackModal({ ...props.data, type: "POST" }))
              : dispatch(
                  setEnUzEditStackModal({ ...props.data, type: "POST" })
                );
          }}
          className={classes.search_btn_search}
        >
          <EditOutlined />
        </button>
      </div>
      {props.data.transc && (
        <div className={classes.resultSound}>
          <HiOutlineVolumeUp
            style={{ cursor: "pointer" }}
            onClick={() => start()}
          />
          <p>/{props.data.transc}/</p>
        </div>
      )}
      <div
        className={classes.description}
        style={{ lineHeight: 1.8 }}
        dangerouslySetInnerHTML={{ __html: isProcessing ? props.data.description : processedDescription }}
      ></div>

      <Example word={props.data.word} />
    </div>
  );
}

const styleClass = {
  lineHeight: "50px",
  fontSize: "20px",
  marginLeft: "50px",
  marginTop: "24px",
  fontStyle: "italic",
};

function NotFoundEngUzb() {
  return (
    <div className={classes.result404}>
      <img src={notFound || "/placeholder.svg"} alt="Shakespear" style={{ textAlign: "center" }} />
      <div
        className={classes.con}
        style={{ display: "flex", alignItems: "center" }}
      >
        <h2 style={{ textAlign: "center" }}> Oops, no such word found!</h2>
        <div
          className={classes.description}
          style={{
            backgroundImage: `url(${Ellipse})`,
            padding: "35px 0",
            textAlign: "center",
          }}
        >
          If you believe there is such a word in the language of <br />
          Shakespeare, please take a few seconds to report it via <br />
          <a href="https://t.me/+998507533366">Telegram</a> or
          <a href="mailto:akbarbankir@gmail.com">Gmail</a> and we will add it
          asap!
        </div>
      </div>
    </div>
  );
}

function NotFoundUzbEng() {
  return (
    <div className={classes.result404}>
      <img src={notFound || "/placeholder.svg"} alt="Shakespear" style={{ textAlign: "center" }} />
      <div
        className={classes.con}
        style={{ display: "flex", alignItems: "center" }}
      >
        <h2 style={{ textAlign: "center" }}> Oops, no such word found!</h2>
        <div
          className={classes.description}
          style={{
            backgroundImage: `url(${Ellipse})`,
            padding: "35px 0",
            textAlign: "center",
          }}
        >
          If you believe there is such a word in the language of <br />
          Shakespeare, please take a few seconds to report it via <br />
          <a href="https://t.me/+998507533366">Telegram</a> or
          <a href="mailto:akbarbankir@gmail.com">Gmail</a> and we will add it
          asap!
        </div>
      </div>
    </div>
  );
}

export default Result;