
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import './CSS/NavigationBar.css'
import { AiOutlineSearch } from 'react-icons/ai';
import {ChangeEvent, FormEvent, useState} from "react";
import {useLocation} from "react-router-dom";
import {PagePaths} from "../../ReactConstants";


export default function NavigationBar(){
    const location = useLocation()

    const [searchQuery, setSearchQuery] = useState<string>('')
    const handleSearchSubmit = (event: FormEvent) => {
        event.preventDefault() //Otherwise refreshes the page
        setSearchQuery('')
    }

    const renderSearchbar = () => {
        if(location.pathname === PagePaths.AppsPagePath){
            return (
                <form className="searchArea d-flex input-group w-auto" onSubmit={handleSearchSubmit} >
                    <input
                        type="search"
                        className="form-control rounded"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                        value={searchQuery}
                        onChange={(e)=> setSearchQuery(e.target.value)}
                    />
                    <button type="submit"><AiOutlineSearch /><i className="fa fa-search"></i></button>
                </form>
            )
        }
        else{
            return <></>
        }
    }



    return(
       <>
           <nav className="navbar sticky-top navbar-light bg-light">
               <div className="container-fluid">
                   <a className="navbar-brand">dAppstore</a>
                   {renderSearchbar()}
               </div>
           </nav>
       </>
    )
}

