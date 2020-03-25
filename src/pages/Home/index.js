import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { Jumbotron } from '../../components/Jumbotron';
import { Footer } from '../../components/Footer';
import { Container } from '../../components/Container';
import { SectionHeader } from '../../components/SectionHeader';
import { StarshipCard } from '../../components/StarshipsCard';
import { CharacterCard } from '../../components/CharactersCard';
import { ViewMoreButton } from '../../components/ViewButton';
import { Slider } from '../../components/Carousel';

import './home.css';

export default function Home() {
	const [starships, setStarships] = useState([]);
	const [characters, setCharacters] = useState([]);
	const [planets, setPlanets] = useState([]);

	useEffect(() => {
		async function getStarships() {
			const starships = await Axios.get('/starships/')
				.then((res) => res.data.results)
				.catch((err) => console.error(err));

			setStarships(starships);
		}

		async function getCharacters() {
			const characters = await Axios.get('/people/')
				.then((res) => res.data.results)
				.catch((err) => console.error(err));

			setCharacters(characters);
		}

		async function getPlanets() {
			const planets = await Axios.get('/planets/')
				.then((res) => res.data.results)
				.catch((err) => console.error(err));

			setPlanets(planets);
		}

		getStarships();
		getCharacters();
		getPlanets();
	}, []);

	return (
		<>
			<section className="home">
				<Jumbotron />
				<Container>
					<SectionHeader title="popular starships" />
					<section className="starship-grid">
						{starships.slice(0, 6).map((item) => {
							return <StarshipCard data={item} key={item.name} />;
						})}
					</section>
					<ViewMoreButton />
					<SectionHeader title="popular planets" />
					<section className="carousel-grid">
						<Slider data={planets} />
					</section>
					<ViewMoreButton />
					<SectionHeader title="popular characters" />
					<section className="character-grid">
						{characters.slice(0, 4).map((item) => {
							return <CharacterCard data={item} key={item.name} />;
						})}
					</section>
					<ViewMoreButton />
				</Container>
			</section>
			<Footer />
		</>
	);
}
