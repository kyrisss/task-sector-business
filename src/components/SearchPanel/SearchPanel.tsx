import { connect } from 'react-redux'
import { SET_SEARCH } from '../redux/postsReducer'
import search from './search.svg'
import './style.scss'

interface PropsType{
    SET_SEARCH: (search:string) => void
}

const SearchPanel: React.FC<PropsType> = (props) => {


    const onChangeInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
        props.SET_SEARCH(e.target.value)
    }

    return(
        <div className="search">
            <input className="search__input" type="text" placeholder="Поиск" onChange={onChangeInput}/>
            <img className="search__icon" src={search} alt="search" />
        </div>
    )
}

export default connect(null,{SET_SEARCH})(SearchPanel)