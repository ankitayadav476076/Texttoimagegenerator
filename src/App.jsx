import React from "react";
import "./App.css";
import TextImageGenerator from "./components/TextImageGenerator";
import "@fontsource/poppins";

function App() {
  return (
    <div className="App bg-gray-900 min-h-screen flex flex-col">
      
      {/* Header */}
      <header className="text-white w-full font-semibold">
        <h1
          className="p-4 text-3xl text-center m-0"
          style={{ 
            fontFamily: "Poppins, sans-serif",
            background: "linear-gradient(to right, #818cf8, #c7d2fe, #0ea5e9, #f472b6, #0ea5e9, #c7d2fe, #818cf8)"
          }}
        >
          BeArt
        </h1>
      </header>

      {/* Main */}
      <main className="flex-grow">
        <TextImageGenerator />
      </main>

      {/* Footer */}
      <footer
        className="bg-gray-800 p-4 text-white text-center"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <p className="text-gray-500 text-lg">
          © 2026 AI Art Generator - 
           
          <span className="text-blue-500 font-bold text-xl font-poppins">
            Ankita Yadav
          </span>
        </p>
      </footer>
    </div>
  );
}

export default App;