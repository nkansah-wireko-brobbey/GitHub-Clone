import { Repo } from "./Repo";

export const Repos = ({repos, alwaysFullWidth}) => {
	const className = alwaysFullWidth ? 'w-full' : 'lg:w-2/3 w-full';
	return (
		<div className={`${className} bg-glass rounded-lg px-8 py-6`}>
			<ol className='relative border-s border-gray-200'>
				{repos.map(repo=>( 
					<Repo key={repo.id} repo={repo} />
				))}
				{
					repos.length === 0 && (
						<p className='text-center text-gray-500'>No repositories found</p>
					)
				}
				
			</ol>
		</div>
	);
};