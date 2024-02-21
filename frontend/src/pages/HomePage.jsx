import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useCallback } from "react";

import { Search } from "../components/Search"
import { SortRepos } from "../components/SortRepos"
import { ProfileInfo } from "../components/ProfileInfo"
import { Repos } from "../components/Repos"

export const HomePage = () => {

  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortType, setSortType] = useState('forks');

  const getUserProfileAndProfile = useCallback(
    async (username) => {
      try{
        setLoading(true);
  
        const userRes = await fetch(`https://api.github.com/users/${username}`);
  
        const userProfile = await userRes.json();
  
        setUserProfile(userProfile);
  
        const repoRes = await fetch(userProfile.repos_url);
        const repos = await repoRes.json();
        setRepos(repos);
        
        console.log("User profile: ", userProfile);
        console.log("Repos: ", repos);
  
      }catch(err){
        
        toast.error(err.message)
      }finally{
        setLoading(false);
      }
    }
  ,[]) 

  useEffect(()=>{
    console.log("useEffect called");

    getUserProfileAndProfile('nkansah-wireko-brobbey');

  },[getUserProfileAndProfile])


  return (

    <div className="m-4">
      <Search/>
      <SortRepos/>
      <div className="flex gap-4 lg:flex-row justify-center items-start">
        <ProfileInfo userProfile={userProfile}/>
        <Repos/> 
      </div>
    </div>

    )
}
