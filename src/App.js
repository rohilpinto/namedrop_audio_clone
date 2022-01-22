import logo from "./assets/namedroplogowhite.png";
import bgImage from "./assets/bg.jpg";

function App() {
  return (
    <div className="App">
      <div style={{ height: "100vh", backgroundImage: `url(${bgImage})`, backgroundSize: "cover", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ padding: 5, position: "absolute", top: "5px", left: "10px" }}>
          {/* logo */}

          <img src={logo} alt="sd" />
        </div>
        {/* card */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}></div>
      </div>
    </div>
  );
}

export default App;
