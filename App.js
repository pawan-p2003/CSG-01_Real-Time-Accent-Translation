import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home.js";
import TryTranslate from "../TryTranslate/TryTranslate.js";
import Contributors from "../Contributors/Contributors.js";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/trytranslate" element={<TryTranslate />}></Route>
      <Route path="/contributors" element={<Contributors />}></Route>
    </Routes>
  );
};

export default App;
