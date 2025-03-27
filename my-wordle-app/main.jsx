import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App.jsx";
import "./src/components/Wordle.css";
import "./src/components/Board.css";
import "./src/components/Tile.css";
//import 'bootstrap/dist/css/bootstrap.css';


const root = createRoot(document.getElementById("root"));
root.render(<App />);
