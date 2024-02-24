import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useCallback } from "react";

import { Search } from "../components/Search"
import { SortRepos } from "../components/SortRepos"
import { ProfileInfo } from "../components/ProfileInfo"
import { Repos } from "../components/Repos"
import { Spinner } from "../components/Spinner"

export const HomePage = () => {

  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortType, setSortType] = useState('recent');

  const getUserProfileAndProfile = useCallback(
    async (username="nkansah-wireko-brobbey") => {
      try{
        setLoading(true);
  
        const userRes = await fetch(`https://api.github.com/users/${username}`,
        {
          headers: {
            authorization: `token ${import.meta.env.VITE_GITHUB_API_TOKEN}`
          }
        });
  
        const userProfile = await userRes.json();
  
        setUserProfile(userProfile);
  
        const repoRes = await fetch(userProfile.repos_url);
        const repos = await repoRes.json();
        setRepos(repos);
        setSortType('recent');
        
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

    getUserProfileAndProfile();

  },[getUserProfileAndProfile])



  const onSearch = async (e, username)=>{
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);

     await getUserProfileAndProfile(username);

  //  setUserProfile(userProfile);
  //   setRepos(repos);
    setLoading(false);
  }

  const onSort = (type)=>{
    
    if(type == "recent"){
      repos.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
    }else if(type == "forks"){
      repos.sort((a,b)=> b.forks_count - a.forks_count)
    }else if(type == "stars"){
      repos.sort((a,b)=> b.stargazers_count - a.stargazers_count)
    }

    setRepos([...repos]);
    setSortType(type);

  }    


  return (

    <div className="m-4">
      <Search onSearch={onSearch}/> 
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType}/>}
      <div className="flex gap-4 lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile}/>}

        {repos.length > 0 && !loading && <Repos repos={repos}/>}

        {loading && <Spinner/>}
      </div>
    </div>

    )
}
