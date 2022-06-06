import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const Header = () => {
  const [user, login, logout] = useContext(UserContext);
  const emailInput = useRef<HTMLInputElement>(null);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (emailInput.current?.value)
      login(emailInput.current.value);
  }

  const loginForm = (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" ref={emailInput} />
        <input type="submit" value="Zaloguj się" />
      </form>
    </div>
  );

  const loginControls =
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'baseline', gap: '1rem' }}>
      <span>{user?.email || 'Gość'}</span>
      {user ? <button onClick={logout}>Wyloguj się</button> : loginForm}
      <div id="firebaseui-auth-container"></div>
    </div>

  return (
    <div>
      <div>
        {loginControls}
      </div>
      <div>
        <h1>Student (debil)</h1>
        <nav>
          <Link to="/">Studenci</Link>
          <Link to="/groups">Grupy</Link>
          <Link to="/students/add">Dodaj studenta</Link>
          <Link to="/groups/add">Dodaj grupę</Link>
        </nav>
      </div>
    </div >
  );
};

export default Header;
