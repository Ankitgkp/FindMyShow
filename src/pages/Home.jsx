import React from 'react'
import MovieSection from '../components/MovieSection'

const Home = () => {
    const topDrama = [
        { title: 'Khauf', poster: 'https://m.media-amazon.com/images/M/MV5BZjFkYmVlNWQtODUyYS00NGRmLWE1NzEtM2JlZjA0NmQ2YjY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
        { title: 'Adolescence', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VcNJylPvSOIRA0iF7Ybmk92lRzFZrgSCuA&s' },
        { title: 'Black Mirror', poster: 'https://m.media-amazon.com/images/M/MV5BODcxMWI2NDMtYTc3NC00OTZjLWFmNmUtM2NmY2I1ODkxYzczXkEyXkFqcGc@._V1_.jpg' },
        { title: 'From', poster: 'https://m.media-amazon.com/images/M/MV5BYzM5ZWMxOGEtZjEyMC00YjQ0LThiYjEtZjVkZGEzN2NlOGEwXkEyXkFqcGc@._V1_.jpg' },
        { title: 'Attack on Titan', poster: 'https://m.media-amazon.com/images/I/61t9ie31jgL._AC_UF1000,1000_QL80_.jpg' },
        { title: 'Tangerines', poster: 'https://m.media-amazon.com/images/M/MV5BOTEyNjcyMjUtYTNlYi00ZjRjLTlhZjgtY2UwYmYyMmJiYTE4XkEyXkFqcGc@._V1_.jpg' },
        { title: 'Reacher', poster: 'https://m.media-amazon.com/images/M/MV5BMzdjYWZlMDQtYzdhNi00NmRlLTg2NzUtMTI3MWFhZDliNjBiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
    ]

    const organizedCrime = [
        { title: 'Money Heist', poster: 'https://m.media-amazon.com/images/I/81WSF164GOL._AC_UF1000,1000_QL80_.jpg' },
        { title: 'Dabba Cartel', poster: 'https://m.media-amazon.com/images/M/MV5BNjUzMDI2MGUtNDU2MS00YTQ5LTkzYjctOGE2OWVhMDQ2ODU0XkEyXkFqcGc@._V1_.jpg' },
        { title: 'Sacred Games', poster: 'https://m.media-amazon.com/images/M/MV5BYjA4NzJlOGQtZmQzMy00Mjc0LWE2YzEtZjBlY2YyOGMwYmNkXkEyXkFqcGc@._V1_.jpg' },
        { title: 'Godfather', poster: 'https://m.media-amazon.com/images/I/61k7Mx2IjzL._AC_UF894,1000_QL80_.jpg' },
        { title: 'El Chapo', poster: 'https://m.media-amazon.com/images/M/MV5BOGQ3YjlhNjktMDViMy00Y2ZjLTk4YTAtMDU5NWU3NjhhNTAzXkEyXkFqcGc@._V1_.jpg' },
        { title: 'Jamtara', poster: 'https://m.media-amazon.com/images/M/MV5BMTI5YWMxOGMtYzc0Ny00NTZkLTk3YzctOTJiNmE4NDJlYjk0XkEyXkFqcGc@._V1_.jpg' },
        { title: 'Tokyo Vice', poster: 'https://m.media-amazon.com/images/M/MV5BYjkxMjU2ODUtNzdlZi00NDg0LWEyZDgtZGE3NTVkNDYyZjIzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
    ]

    return (
        <div className="bg-[#0f1115] p-6">
            <MovieSection title="Top Drama Shows" movies={topDrama} />
            <MovieSection title="Organized Crime" movies={organizedCrime} />
        </div>
    )
}

export default Home
