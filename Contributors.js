import React from "react";
import NavBar from "../navbar/NavBar.js";
import "./contributors.css";

const Contributors = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="maincard">
        <div className="titlecard">
          <img
            className="person-image"
            src="assets/zainab.jpg"
            alt="Zainab Hana"
          />
          <div className="content">
            <h2>Zainab Hana</h2>
            <a href="https://github.com/zainabhana123">
              Click to visit
              <img
                className="github-image"
                src="assets/github.png"
                alt="GitHub"
              />
            </a>
          </div>
        </div>
        <div className="titlecard">
          <img className="person-image" src="assets/person1.png" alt="Pawan" />
          <div className="content">
            <h2>Pawan P</h2>
            <a href="#">
              Click to visit
              <img
                className="github-image"
                src="assets/github.png"
                alt="GitHub"
              />
            </a>
          </div>
        </div>
        <div className="titlecard">
          <img
            className="person-image"
            src="assets/rishith.jpg"
            alt="Rishith"
          />
          <div className="content">
            <h2>Rishith R Rai</h2>
            <a href="https://github.com/Rishith807">
              Click to visit
              <img
                className="github-image"
                src="assets/github.png"
                alt="GitHub"
              />
            </a>
          </div>
        </div>
        <div className="titlecard">
          <img
            className="person-image"
            src="assets/rakshitha.jpg"
            alt="Rakshitha"
          />
          <div className="content">
            <h2>Rakshitha S</h2>
            <a href="https://github.com/Rakshitha2117">
              Click to visit
              <img
                className="github-image"
                src="assets/github.png"
                alt="GitHub"
              />
            </a>
          </div>
        </div>
        <div className="titlecard">
          <img
            className="person-image"
            src="assets/ganashree.jpg"
            alt="Ganashree"
          />
          <div className="content">
            <h2>Ganashree P</h2>
            <a href="https://github.com/gana1603">
              Click to visit
              <img
                className="github-image"
                src="assets/github.png"
                alt="GitHub"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contributors;
