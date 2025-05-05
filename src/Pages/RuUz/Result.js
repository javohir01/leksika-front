import React from "react";
import classes from "../../components/Result/Result.module.css";
import notFound from "../../components/Result/notFoundRus.png";
import Ellipse from "../../static/Ellipse.svg";

export function NotFoundRu() {
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

function Result(props) {
  return (
    <div className={classes.result}>
      <div
        className={classes.description}
        style={{ lineHeight: 1.5 }}
        dangerouslySetInnerHTML={{ __html: props.res }}
      ></div>
    </div>
  );
}

export default Result;
