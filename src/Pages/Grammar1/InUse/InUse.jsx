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
  const link = parts?.[parts.length - 2];

  return (
    <div className="grammarItem">
      <div className="grammarContainer">
        <Unit id={id} />
        <YouTubePlayer 
          videoId={link??'SbkuRmVaiT4'}
        />
        <div>
          <iframe 
            src="https://www.youtube.com/embed/SbkuRmVaiT4" 
            title="YouTube video player"
            className="video"
            width="100%"
            height="auto"
            style={{ maxWidth: "100%", height: "600px", borderRadius: "18px" }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="quiz">
          <QuizTest quizID={id} />
        </div>
      </div>
    </div>
  );
};

function Unit() {
  var query = window.location.href;
  var parts = query.split("/");
  var id = parts[parts.length - 1];
  const [html, setHtml] = useState("");
  useEffect(() => {
    async function getFile() {
      const data = await findFile(id);
      setHtml(await data.body);
    }
    getFile();
  }, [id]);

  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}
export default GrammarInUse;
