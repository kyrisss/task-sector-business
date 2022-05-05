import './style.scss'
import preloader from './ball-triangle.svg'

const Preloader = () => {

    return (
        <div className='preloader' >
            <img src={preloader} alt="preloader" />
        </div>
    )
}

export default Preloader;