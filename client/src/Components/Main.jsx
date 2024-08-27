import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../Pages/Auth";
import Dashboard from "../Pages/Dashboard";
import AllEntriesFromCategory from "../Pages/AllEntriesFromCategory";
import IndividualEntry from "../Pages/IndividualEntry";
import CreateEntry from "../Pages/CreateEntry";
import ProfilePage from "../Pages/ProfilePage";

import * as authService from "../Services/authService";
import * as profileService from "../Services/profileService";
import * as entryService from "../Services/categoryService";
import * as categoryService from "../Services/categoryService";

const Main = () => {
  const [user, setUser] = useState(authService.getUser());
  const [userProfile, setUserProfile] = useState(profileService.show());
  const [allProfiles, setAllProfiles] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function displayAllProfiles() {
      const profiles = await profileService.getAllProfiles();
      setAllProfiles(profiles);
    }
    displayAllProfiles();
  }, [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const profileData = await profileService.show(user.profile);
        setUserProfile(profileData);
      }
    };
    fetchProfile();
  }, [user]);

  useEffect(() => {
    const fetchCategories = async () => {
      const category = await categoryService.getCategories();
      console.log(category)
      setCategories(category);
    };
    fetchCategories();
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/dashboard" element={<Dashboard categoryList={categories}/>} />
        <Route path="/" element={<Auth />} />
        <Route path="/entry/:id" element={<AllEntriesFromCategory />} />
        <Route path="/create-entry/:id" element={<CreateEntry />} />
        <Route path="/single-entry/:id" element={<IndividualEntry />} />
        <Route
          path="/profile"
          element={
            <ProfilePage userInfo={userProfile} allProfiles={allProfiles} />
          }
        />
      </Routes>
    </main>
  );
};

export default Main;
