import { useContext } from "react";
import { Context } from "../Context";
import { BsFillMoonFill } from "react-icons/bs";
const newStyle = document.createElement("style");
newStyle.textContent = `
        :root {
          --text-color: hsl(200, 15%, 8%);
          --background-color: hsl(0, 0%, 98%);
          --input-color: hsl(0, 0%, 52%);
          --element-color:  hsl(0, 0%, 100%);
        }
      `;

function Nav() {
  const { dark, setDark } = useContext(Context);
  const handleTheme = (e) => {
    e.preventDefault();
    if (dark) {
      document.head.appendChild(newStyle);
    } else {
      document.head.removeChild(newStyle);
    }
    setDark(!dark);
  };
  return (
    <nav>
      <h1>Where in the world?</h1>
      <button onClick={handleTheme}>
        {" "}
        <BsFillMoonFill /> Dark Mode
      </button>
    </nav>
  );
}

export default Nav;
