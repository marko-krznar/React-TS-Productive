import { useState } from "react";
import TimeEntry from "./containers/TimeEntry/TimeEntry";

const App: React.FC = () => {
  const [theme, setTheme] = useState(false);

  return (
    <div className={theme ? "content dark-theme" : "content"}>
      <h1>Productive time tracker</h1>
      <button
        className="btn btn--toggle-theme"
        onClick={() => setTheme(!theme)}
      >
        <span className="material-symbols-outlined">
          {theme ? "light_mode" : "nightlight"}
        </span>
      </button>
      <TimeEntry />
    </div>
  );
};

export default App;
