import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import './style.scss'

interface PropType {
    total: number
    currentPage: number
    itemsOnPage: number
    SET_CURRENT_PAGE: (page: number) => void
}


const Paginator: React.FC<PropType> = ({ total, currentPage, itemsOnPage, SET_CURRENT_PAGE }) => {

    const pages = []
    const lastPage = Math.ceil(total / itemsOnPage)
    for (let i = 1; i <= lastPage; i++) {
        pages.push(i)
    }
    const pageHandler = (page: number) => {
        SET_CURRENT_PAGE(page)
    }

    const buttonPrevHandler = () => {
        if (currentPage == 1) {
            return
        }
        SET_CURRENT_PAGE(currentPage - 1)
    }

    const buttonNextHandler = () => {
        if (currentPage == lastPage) {
            return
        }
        SET_CURRENT_PAGE(currentPage + 1)
    }

    const mapPages = pages.map(page => {
        return <NavLink to={"/posts/" + page}
            key={page}
            className={page == currentPage ? "pages__page pages__page_active" : "pages__page"}
            onClick={() => pageHandler(page)}
        >{page}</NavLink>
    })

    return (
        <div className="paginator">
            <button className={currentPage == 1 ? "paginator__button paginator__button_disabled" : "paginator__button"} onClick={buttonPrevHandler}>Назад</button>
            <div className="paginator__pages pages">
                {mapPages}
            </div>
            <button className={currentPage == lastPage ? "paginator__button paginator__button_disabled" : "paginator__button"} onClick={buttonNextHandler}>Далее</button>
        </div>
    )
}


export default Paginator