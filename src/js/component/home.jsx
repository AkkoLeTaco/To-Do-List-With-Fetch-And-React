import React, { useEffect, useState } from "react";
import "../../styles/index.css";
//create your first component
const Home = () => {
	const [item, setItem] = useState("");
	const [list, setList] = useState([]);

	const cross = (index) => {
		let crossOut = [...list];
		crossOut[index].done = !crossOut[index].done;
		setList(crossOut);
	};
	const sent = (del) => {
		const dele = list.filter((lists, index) => index !== del);
		setList(dele);
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/liciagaangelo",
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(dele),
				redirect: "follow",
			}
		)
			.then((response) => {
				response.status === 200 ? setList(dele) : "";
			})
			.catch((error) => console.log("error", error));
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
			})
			.catch((error) => console.log("error", error));
	}, []);
	return (
		<>
			<div>
				<h1>Data</h1>
			</div>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="What's next?"
					onChange={(e) => setItem(e.target.value)}
					value={item}
				/>
				<a
					onClick={() => {
						if (item !== "") {
							addItem(item);
							setItem(" ");
						}
					}}
					type="button"
					className="btn btn-primary"
					id="basic-addon1">
					Button
				</a>
			</div>
			<ul>
				{list &&
					list.map((lists, index) => {
						return (
							<li key={index}>
								<span
									className={
										lists.done ? "crossed-line" : ""
									}>
									{lists.label}
								</span>
								<button
									type="button"
									onClick={() => cross(index)}>
									done
								</button>
								<button
									type="button"
									className="btn btn-danger"
									onClick={() => {
										sent(index);
									}}>
									X
								</button>
							</li>
						);
					})}
			</ul>
		</>
	);
};

export default Home;
