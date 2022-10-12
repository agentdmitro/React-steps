import React from "react";
import { getPagesArray } from "../../utils/pages";


function Pagination({totalPages, page, changePage}) {
    let pagesArray = getPagesArray(totalPages);
    return (
        <div className="pag-container">
            {pagesArray.map(p => 
                <span key={p} onClick={(e) => changePage(p)} className={page === p ? 'pag-item pag-item-current' : 'pag-item'}>{p}</span>
            )}
        </div>
    )
}
export default Pagination;