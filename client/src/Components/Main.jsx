import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../Pages/Auth";
import Dashboard from "../Pages/Dashboard";
import CategoryEntries from "../Pages/AllEntriesFromCategory";
import IndividualEntry from "../Pages/IndividualEntry";
import CreateEntry from "../Pages/CreateEntry";
import ProfilePage from "../Pages/ProfilePage";

import * as authService from "../Services/authService";
import * as profileService from "../Services/profileService";
import * as categoryService from "../Services/categoryService";
import ExternalUser from "../Pages/ExternalUser";

const Main = () => {
  const [user, setUser] = useState(authService.getUser());
  const [userProfile, setUserProfile] = useState(profileService.show());
  const [allProfiles, setAllProfiles] = useState([]);
  const [allExceptSelf, setAllExceptSelf] = useState([]);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    async function displayAllProfiles() {
      const profiles = await profileService.getAllProfiles();
      setAllProfiles(profiles);
    }
    displayAllProfiles();
  }, [user]);

  useEffect(() => {
    const fetchCategories = async () => {
      const category = await categoryService.getCategories();
      setCategories(category);
    };
    fetchCategories();
  }, []);

  console.log("userInfo", userProfile)

  return (
    <main className="">
      <Routes>
        <Route path="/dashboard" element={<Dashboard categoryList={categories}/>} />
        <Route path="/" element={<Auth />} />
        <Route path="/entry/:id" element={<CategoryEntries />} />
        <Route path="/create-entry/:id" element={<CreateEntry />} />
        <Route path="/single-entry/:id" element={<IndividualEntry />} />
        <Route
          path="/profile"
          element={
            <ProfilePage userInfo={userProfile} allExceptSelf={allExceptSelf} />
          }
        />
        <Route path="/external-user/:id" element={<ExternalUser categoryList={categories} />} />
      </Routes>
    </main>
  );
};

export default Main;
