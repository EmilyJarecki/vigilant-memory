import * as tokenService from "./tokenService";

const getIndividualEntryById = async (id) => {
    console.log(id)
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:4000/entry/individual/${id}`, requestOptions);
      const entry = await response.json();
      console.log(entry);
      return entry
    } catch (error) {
      console.error(error);
    }
  };

  const createEntry = async (raw) => {
    console.log(raw)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(raw),
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:4000/entry`, requestOptions);
      const result = await response.json();
      return result
    } catch (error) {
      console.error(error);
    }
  };

  const updateEntry = async (raw, id) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(raw),
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:4000/entry/${id}`, requestOptions);
      const result = await response.json();
      return result
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEntry = async (id) => {
    console.log(id)
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:4000/entry/${id}`, requestOptions);
      const deleted = await response.json();
      return deleted
    } catch (error) {
      console.error(error);
    }
  };

  const entriesByCategory = async (id) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:4000/entry/${id}`, requestOptions);
      const entries = await response.json();
      return entries
    } catch (error) {
      console.error(error);
    }
  }

  const giveEntryLike = async (id) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:4000/entry/like/${id}`, requestOptions);
      console.log("give entry like")
       console.log(response)
       const liked = await response.json();
       console.log("liked entry: ", liked)
      return liked
    } catch (error) {
      console.error(error);
    }
  }

  const removeEntryLike = async (id) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:4000/entry/unlike/${id}`, requestOptions);
      console.log("remove entry like")
       console.log(response)
       const removed = await response.json();
       console.log("unliked entry: ", removed)
      return removed
    } catch (error) {
      console.error(error);
    }
  }

  const getCommentsForEachEntry = async (entryid) => {
    console.log(entryid)
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:4000/comment/${entryid}/all`, requestOptions);
      const entry = await response.json();
      console.log(entry);
      return entry
    } catch (error) {
      console.error(error);
    }
  };
export { getIndividualEntryById, createEntry, updateEntry, deleteEntry, entriesByCategory, giveEntryLike, removeEntryLike, getCommentsForEachEntry };
