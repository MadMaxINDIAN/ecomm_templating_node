import React from "react";

function Sidebar(props){
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
      }
    return (
        <aside className="sidebar">
            <h3>Shopping categories</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            <ul>
                <li>
                    <a href="pants">Pants</a>
                </li>
                <li>
                    
                    <a href="shirts">Shirts</a>
                </li>
            </ul>
        </aside>
        
    )
}

export default Sidebar;