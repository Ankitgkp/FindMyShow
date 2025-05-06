import React, { useState, useEffect } from "react";
import MovieSection from "../components/MovieSection";

const Home = () => {
    const [topDrama, setTopDrama] = useState([]);
    const [organizedCrime, setOrganizedCrime] = useState([]);
    const [top10inToday, setTop10inToday] = useState([]);

    useEffect(() => {
        fetch('https://mocki.io/v1/d547627e-62c2-412b-9b71-f42dc0155d17')
            .then(res => res.json())
            .then(data => {
                setTopDrama(data.topDrama);
                setOrganizedCrime(data.organizedCrime);
                setTop10inToday(data.top10inToday);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="bg-[#0f1115] p-6">
            <MovieSection title="Top Drama" movies={topDrama} />
            <MovieSection title="Organized Crime" movies={organizedCrime} />
            <MovieSection title="Top 10 in India Today" movies={top10inToday} />
        </div>
    );
};

export default Home;
