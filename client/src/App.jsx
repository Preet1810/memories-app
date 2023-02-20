import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form"
import Edit from "./components/Edit/Edit";
import Auth from "./components/Auth/Auth"

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Posts />} />
                    <Route path="/createPost" element={<Form />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;