import { useState } from 'react';
import { Header } from '../../components/Header';
import Imgbackground from '../../assets/github-white.svg';
import "./styles.css";
import ItemList from '../../components/itemList';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name) {
      const {login, avatar_url, name, bio} = newUser;
      setCurrentUser({login, avatar_url, name, bio});
    }

    const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
    const newRepos = await reposData.json();
    
    if (newRepos.length) {
      setRepos(newRepos);
    }
  };



  return (
    <div className="App">
      <Header />
      <div className="content">
        <img src={Imgbackground} className="backgroundImg" alt="background img app "/>
        <div className="info">  
          <div> 
            <input name="user" value={user} onChange={event => setUser(event.target.value)} placeholder="@username" />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          
          {currentUser?.name ? ( <> 
            <div className='profile'>
            <img src={currentUser.avatar_url} className='profileImg' alt='Profile' />
            <div>
              <h3>{currentUser.name}</h3>
              <span>@{currentUser.login}</span>
              <p>{currentUser.bio}</p>
            </div>
          </div>
          <hr />
         
          <div>
            <h4 className='repository'>Repositórios</h4>
            {repos.map(repo => (
            <ItemList title={repo.name} description={repo.description} />
          ))}
          </div>
          </>
          ):null}
        
        </div>
      </div>
    </div>
  );
}

export default App;
