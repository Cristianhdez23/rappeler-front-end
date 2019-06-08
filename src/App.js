import React from "react";

import Layout from "./containers/Layout/Layout";
import Header from "./components/Header/Header";
import "./App.css";
import HomePage from "./containers/HomePage/HomePage";

function App() {
  return (
    <Layout>
      <Header />
      <HomePage />
    </Layout>
  );
}

export default App;
