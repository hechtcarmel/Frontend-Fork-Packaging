
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

export default function NavigationBar(){
    return(
       <>
           <nav className="navbar sticky-top navbar-light bg-light">
               <div className="container-fluid">
                   <a className="navbar-brand">dAppstore</a>
                   <form className="d-flex input-group w-auto">
                       <input
                           type="search"
                           className="form-control rounded"
                           placeholder="Search"
                           aria-label="Search"
                           aria-describedby="search-addon"
                       />
                       <span className="input-group-text border-0" id="search-addon">
                            <i className="fas fa-search"></i>
                        </span>
                   </form>
               </div>
           </nav>
       </>
    )
}

