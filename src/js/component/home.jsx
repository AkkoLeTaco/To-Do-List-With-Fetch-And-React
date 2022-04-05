import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [item, setItem] = useState("");
	const [list, setList] = useState([]);
	const sent = (del) => {
		const dele = list.filter((lists, index) => index !== del);
		setList(dele);
	};

	const addItem = (secitem) => {
		let seclist = [...list, { label: secitem, done: false }];
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/liciagaangelo",
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(seclist),
				redirect: "follow",
			}
		)
			.then((response) => {
				response.status === 200 ? setList(seclist) : "";
			})
			.catch((error) => console.log("error", error));
	};
	useEffect(() => {
		let requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/liciagaangelo",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				setList(result);
				console.log(list);
			})
			.catch((error) => console.log("error", error));
	}, []);
	console.log(list);
	return (
		<>
			<div>
				<h1>Data</h1>
			</div>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder=" "
					onChange={(e) => setItem(e.target.value)}
					value={item}
				/>
				<a
					onClick={() => addItem(list)}
					type="button"
					className="btn btn-primary"
					id="basic-addon1">
					Button
				</a>
			</div>
			<ul>
				{list &&
					list.map((lists, index) => {
						return <li key={index}>{lists.label}</li>;
					})}
			</ul>
		</>
	);
};

export default Home;
