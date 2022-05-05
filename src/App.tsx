
import './App.scss';
import PostsContainer from './components/Posts/PostsContainer';
import SearchPanel from './components/SearchPanel/SearchPanel';

function App() {
  return (
    <main className="wrapper">
      <SearchPanel></SearchPanel>
      <PostsContainer></PostsContainer>
    </main>
  );
}

export default App;
