import { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Experinces from "./components/Experinces";
import Skills from "./components/Skills";
import Project from "./components/Project";
import Education from "./components/Education";
import Contact from "./components/Contact";

const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "5rem",
  borderColor: "red",
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex h-screen justify-center items-center bg-[#00040f]">
          <HashLoader
            color="#0891b2"
            loading={loading}
            cssOverride={override}
            size={90}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          <NavBar />
          <Home />
          <About />
          <Experinces />
          <Skills />
          <Project />
          <Education />
          <Contact />
        </div>
      )}
    </>
  );
};

export default App;
