import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, passwordGenerator]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-xl rounded-xl p-6 mt-12 bg-gray-900 text-white bg-pattern">
      <h1 className="text-3xl font-bold text-center mb-6">Password Generator</h1>
      <div className="flex shadow-lg rounded-lg overflow-hidden mb-6 bg-gray-800 border border-gray-700">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-3 px-4 text-gray-300 bg-transparent"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard} className="bg-teal-500 text-white px-4 py-2 hover:bg-teal-600 transition">
          Copy
        </button>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="length" className="text-sm font-medium">
            Length: {length}
          </label>
          <input type="range" min={6} max={100} value={length} id="length" className="w-full ml-4" onChange={(e) => setLength(e.target.value)} />
        </div>
        <div className="flex items-center justify-between">
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={() => setNumberAllowed((prev) => !prev)} />
          <label htmlFor="numberInput" className="text-sm font-medium">
            Include Numbers
          </label>
        </div>
        <div className="flex items-center justify-between">
          <input type="checkbox" defaultChecked={charAllowed} id="characterInput" onChange={() => setCharAllowed((prev) => !prev)} />
          <label htmlFor="characterInput" className="text-sm font-medium">
            Include Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
