
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import './CSS/NavigationBar.css'
import { AiOutlineSearch } from 'react-icons/ai';
export default function NavigationBar(){
    return(
       <>
           <nav className="navbar sticky-top navbar-light bg-light">
               <div className="container-fluid">
                   <a className="navbar-brand">dAppstore</a>
                   <form className="searchArea d-flex input-group w-auto">
                       <input
                           type="search"
                           className="form-control rounded"
                           placeholder="Search"
                           aria-label="Search"
                           aria-describedby="search-addon"
                       />
                       <button type="submit"><AiOutlineSearch /><i className="fa fa-search"></i></button>

                   </form>
               </div>
           </nav>
       </>
    )
}

