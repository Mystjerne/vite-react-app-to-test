import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [user_info, setUserInfo] = useState({
    email: null,
    password: null,
    confirmpassword: null,
  });

  const [confirmpassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (toString(user_info.password) !== toString(confirmpassword)) {
      setErrorMessage("Passwords do not match, please try again.");
      return;
    }

    if (user_info.password.length <= 5) {
      setErrorMessage("Password is less than 5 characters, please try again.");
      return;
    }

    if (!user_info.email.includes("@")) {
      setErrorMessage("Email is not valid, please try again.");
      return;
    }

    alert("Account created successfully!");
    setLoggedIn(true);
  };

  const handleFieldChange = (e) => {
    setErrorMessage("");
    const changing_field_name = e.target.name;

    setUserInfo((prevState) => ({
      ...prevState,
      [changing_field_name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(user_info);
  }, [user_info]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  useEffect(() => {
    const fetchPokemonData = async () => {
      const randomId = getRandomInt(1, 1000);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      console.log(response.data.name);
      setPokemonData(response.data.sprites.front_default);
    };

    fetchPokemonData();
  }, [loggedIn]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <form onSubmit={handleSubmit}>
        <p>Email</p>
        <input name="email" onChange={handleFieldChange}></input>
        {/* <p>Password</p> */}
        <label htmlFor="password"> Password </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleFieldChange}
        ></input>
        <p>Confirm Password</p>
        <input
          name="confirmpassword"
          type="password"
          onChange={handleFieldChange}
        ></input>
        <hr />
        <button type="submit">Submit</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>

      {loggedIn ? (
        <>
          {" "}
          <p>A random pokemon has been selected for you!</p>
          {<img src={pokemonData}></img>}
        </>
      ) : (
        <p>Log in to receive a random pokemon!</p>
      )}
    </>
  );
}

export default App;
