import React from "react";
import data from "./../data"

function HomeScreen(props){
    return (
        
        <div>
            <div class="banner">
                <img src="program_A_Coder.jpg" className="banner-img" />
            </div>
            <ul className="products">
                {data.products.map(product => 
                    <li>
                        <div className="product">
                            <img src="product.jpg"></img>
                            <div className="product-name">{product.name}</div>
                            <div className="product-brand">{product.brand}</div>
                            <div className="product-price">{product.price}</div>
                            <div className="product-review"></div>
                        </div> 
                    </li>
                    )
                }
            </ul>
        </div>
    )
}

export default HomeScreen;