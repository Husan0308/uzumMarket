import './Search.css';


export default function Search({search, value}) {

    return (
        <form onSubmit={(e)=> e.preventDefault()} className='header_form'>
            <button className='header_categories_btn'>Katalog</button>
            <label>
                <input value={value} onChange={(e)=> search(e)} className="header_input" type="text" placeholder="Maxsulot qidirish bo`limi" />
            </label>
            <button className="search-button">Search</button>
        </form>
    )
}