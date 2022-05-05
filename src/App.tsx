
import './App.scss';
import PostsContainer from './components/Posts/PostsContainer';
import SearchPanel from './components/SearchPanel/SearchPanel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { appStateType } from './components/redux/redux-store';
import Preloader from './components/Preloader/Preloader';

interface PropType {
  isFetching: boolean
}

const App: React.FC<PropType> = ({ isFetching }) => {
  return (
    <>
      {isFetching ? <Preloader></Preloader> : null}
      <main className="wrapper">
        <SearchPanel></SearchPanel>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<PostsContainer />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

const mapStateToProps = (state: appStateType) => {
  return {
    isFetching: state.posts.isFetching
  }
}

export default connect(mapStateToProps, {})(App);
