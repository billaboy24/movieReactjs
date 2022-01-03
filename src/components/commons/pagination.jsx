/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({itemsCount,pageSize,onPageChanges,currentPage}) => {
    
    console.log(currentPage);
    const pagesCount = Math.ceil( itemsCount/pageSize);
    if(pagesCount ===1) return null;
    const pages=_.range(1,pagesCount+1);
    
    
        return ( <nav>
            <ul className="pagination">
                {pages.map(page =>(
                <li key={page} className={page ===currentPage ? "page-item active" : "page-item"}>
                <a  className="page-link" onClick={()=>onPageChanges(page)}>{page}</a></li>))}
                
            </ul>
        </nav>
     );
    }
Pagination.propTypes={
itemsCount:PropTypes.number.isRequired,
currentPage:PropTypes.number.isRequired,
pageSize:PropTypes.number.isRequired,
onPageChanges:PropTypes.func.isRequired



};
    
     
   


        
        
    

    

    
     
 
export default Pagination;