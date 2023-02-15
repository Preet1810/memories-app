import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form"

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Posts />} />
                    <Route path="/createPost" element={<Form />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;