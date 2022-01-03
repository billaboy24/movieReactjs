import React from 'react';

const  ListGroup = ({items ,textProperty,valueProperty,onSelectItem,selectedItem}) => {
    

    return ( <ul className="list-group clickable">
     {items.map(item =>(<li onClick={()=>onSelectItem(item)}
      key={item[valueProperty]} 
     className={item ===selectedItem ? "list-group-item active" :"list-group-item"}>{item[textProperty]}
     
     </li>))}
    </ul> 
    );
};
ListGroup.defaultProps={
    textProperty:"name",
    valueProperty:"_id"
};

 
export default ListGroup ;