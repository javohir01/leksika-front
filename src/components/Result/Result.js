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
  const start = () => {
    var msg = new SpeechSynthesisUtterance(props.data.word);
    msg.voice = speechSynthesis.getVoices().filter(function (voice) {
      return voice.lang === "en-US";
    })[0];
    // now say it like you mean it:
    speechSynthesis.speak(msg);
  };
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
        dangerouslySetInnerHTML={{ __html: props.data.description }}
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
      <img src={notFound} alt="Shakespear" style={{ textAlign: "center" }} />
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
          <a href="https://t.me/+998907163366">Telegram</a> or
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
      <img src={notFound} alt="Shakespear" style={{ textAlign: "center" }} />
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
          <a href="https://t.me/+998907163366">Telegram</a> or
          <a href="mailto:akbarbankir@gmail.com">Gmail</a> and we will add it
          asap!
        </div>
      </div>
    </div>
  );
}

export default Result;
