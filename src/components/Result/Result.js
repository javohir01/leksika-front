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
    // now say it like you mean it:
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
        // Only process if we're in English-Uzbek mode
        if (props.lang === "English-Uzbek") {
          // Extract words from the description
          const description = props.data.description;
          
          // Create a temporary element to parse HTML
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = description;
          
          // Get text content
          const textContent = tempDiv.textContent || tempDiv.innerText;
          
          // Extract words (simple regex to match words)
          const wordRegex = /\b([a-zA-Z]+)\b/g;
          const words = textContent.match(wordRegex) || [];
          
          // Remove duplicates
          const uniqueWords = [...new Set(words)];
          
          // Create a map to store word existence results
          const wordExistsMap = {};
          
          // Check each word against the API (in batches to avoid too many requests)
          const batchSize = 5;
          for (let i = 0; i < uniqueWords.length; i += batchSize) {
            const batch = uniqueWords.slice(i, i + batchSize);
            const promises = batch.map(word => checkWordExists(word));
            const results = await Promise.all(promises);
            
            batch.forEach((word, index) => {
              wordExistsMap[word] = results[index];
            });
          }
          
          // Replace words in the HTML with links if they exist in the API
          let processedHTML = description;
          
          // Sort words by length (descending) to avoid replacing parts of longer words
          const sortedWords = uniqueWords.sort((a, b) => b.length - a.length);
          
          for (const word of sortedWords) {
            if (wordExistsMap[word]) {
              // Create a regex that matches the word as a whole word
              const regex = new RegExp(`\\b${word}\\b`, 'g');
              
              // Replace with link
              processedHTML = processedHTML.replace(
                regex, 
                `<a href="http://localhost:3000/en-uz?s=${word}&lang=Uzbek-English" target="_blank">${word}</a>`
              );
            }
          }
          
          setProcessedDescription(processedHTML);
        } else {
          // If not English-Uzbek, just use the original description
          setProcessedDescription(props.data.description);
        }
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
      const response = await axios.get(`https://back.leksika.uz/words/uz-en?s=${word.toLowerCase()}`);
      // Check if the response has data and the description is not empty
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