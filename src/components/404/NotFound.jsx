import React from "react";
import style from "./NotFound.module.css";
import classes from "../Result/Result.module.css";
import image from "../Result/notFoundRus.png";
import Ellipse from "../../static/Ellipse.svg";
import NotFoundImg from "./NotFoundImg.png";
function NotFound() {
  return (
    <div className={style.container}>
      <img src={NotFoundImg} alt="" />
      <h3>Sorry, we found this page :{"("} </h3>
    </div>
  );
}

function RuUzNotFound(props) {
  return (
    <div className={classes.result404}>
      <img src={image} alt="Shakespear" style={{ textAlign: "center" }} />
      <div
        className={classes.con}
        style={{ display: "flex", alignItems: "center" }}
      >
        <h2 style={{ textAlign: "center" }}> Oops, no such word found!</h2>
        <div
          className={classes.description}
          style={{ backgroundImage: `url(${Ellipse})` }}
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

export { NotFound, RuUzNotFound };
