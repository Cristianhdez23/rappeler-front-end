import React from "react";
import { Route } from "react-router-dom";

// Components
import HomePage from "./containers/HomePage/HomePage";
import Layout from "./containers/Layout/Layout";

function App() {
    return (
        <Layout>
            <Route path="/" component={HomePage} />
        </Layout>
    );
}

export default App;
