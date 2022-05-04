import spinner from './spinner.svg'
import './style.scss'

const Spinner = (props) => {
    return (
        <div className='spinner'>
            <img src={spinner} alt="spinner" />
        </div>
    )
}

export default Spinner