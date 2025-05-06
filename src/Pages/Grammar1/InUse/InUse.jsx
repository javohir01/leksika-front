import React, { useEffect, useState } from "react";
import "../styles/InUse.css";
import "./style.css";
import QuizTest from "../Quiz.js";
import YouTubePlayer from "../YouTubePlayer.js";
import { findFile } from "../../../lib/fetchData";

const GrammarInUse = () => {
  // Get ID from URL
  var query = window.location.href;
  var parts = query.split("/");
  var id = parts?.[parts.length - 1];
  const [videoId, setVideoId] = useState('SbkuRmVaiT4');

  return (
    <div className="grammarItem">
      <div className="grammarContainer">
        <Unit id={id} setVideoId={setVideoId} />
        <YouTubePlayer 
          videoId={videoId}
        />
        <div className="quiz">
          <QuizTest quizID={id} />
        </div>
      </div>
    </div>
  );
};

function Unit({ id, setVideoId }) {
  var query = window.location.href;
  var parts = query.split("/");
  var id = parts[parts.length - 1];
  const video =''
  const [html, setHtml] = useState("");
  useEffect(() => {
    async function getFile() {
      const data = await findFile(id);
      setHtml(await data.body);
      if (data.video) {
        setVideoId(data.video);
      }    }
    getFile();
  }, [id, setVideoId]);

  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}
export default GrammarInUse;
