import "./app.css";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;

// Global code
// import '../styles/app.scss';
import flamethrower from "flamethrower-router";
import { GAPageView } from "./util/firebase";

window.addEventListener("flamethrower:router:end", (_e) => {
  console.log("loaded flamethrower");
  GAPageView();
});

// Router
export const router = flamethrower({ prefetch: "hover", log: false });
