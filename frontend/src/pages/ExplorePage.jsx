import { useState } from 'react';
import toast from 'react-hot-toast';
import { Repos } from '../components/Repos';
import { Spinner } from '../components/Spinner';


export const ExplorePage = () => {
	const [loading, setLoading] = useState(false);
	const [repos, setRepos] = useState([]);
	const [language, setLanguage] = useState();

	const exploreRepos = async (language)=>{

		setLoading(true);
		setRepos([]);

		try{
			const res = await fetch(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&per_page=10`,
			{
				headers: {
					authorization: `token ${import.meta.env.VITE_GITHUB_API_TOKEN}`
				}
			}
			);
			const data = await res.json();
			setRepos(data.items);
		}
		catch(err){
			toast.error(err.message);
			
		}
		finally{
			setLanguage(language);
			setLoading(false);
		}

	}

	return (
		<div className='px-4'>
			<div className='bg-glass max-w-2xl mx-auto rounded-md p-4'>
				<h1 className='text-xl font-bold text-center'>Explore Popular Repositories</h1>
				<div className='flex flex-wrap gap-2 my-2 justify-center'>
					<img src='/javascript.svg' alt='JavaScript' className='h-11 sm:h-20 cursor-pointer' 
					onClick={()=>{exploreRepos('javascript')}} 
					/>
					<img src='/typescript.svg' alt='TypeScript logo' className='h-11 sm:h-20 cursor-pointer' 
					onClick={()=>{exploreRepos('typescript')}} 
					/>
					<img src='/c++.svg' alt='C++ logo' className='h-11 sm:h-20 cursor-pointer'
					onClick={()=>{exploreRepos('c++')}}
					/>
					<img src='/python.svg' alt='Python logo' className='h-11 sm:h-20 cursor-pointer' 
					onClick={()=>{exploreRepos('python')}}
					/>
					<img src='/java.svg' alt='Java logo' className='h-11 sm:h-20 cursor-pointer' 
					onClick={()=>{exploreRepos('java')}}
					/>
				</div>
				{repos.length > 0 && (
					<h2 className='text-lg font-semibold text-center my-4'>
						<span 
						className='
						bg-gradient-to-r from-cyan-600 to-blue-600 font-medium text-white px-4 py-2 cursor-pointer rounded-full'
						>
							{language.toUpperCase()} Repositories
						</span>

					</h2>
				)}
				{repos.length === 0 && !loading && (<p className='text-center text-gray-500'>Click on a language to explore popular repositories</p>)}
				{repos.length > 0 && <Repos repos={repos} alwaysFullWidth/>}
				{ loading && <Spinner/>}
			</div>
		</div>
	);
};