import React, { Component } from "react";
import data from "./../data";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import Banner from "./../components/Banner";
import Header from "./../components/Header";
import Sidebar from "./../components/Sidebar";

class HomeScreen extends Component{
    render () {
    return (
        <div>
            <Header />
            <Sidebar />
            <Banner />
            <br></br>
            <br/>
            <h1>Category 1</h1>
            <div className="row">
                {data.products.map((product,index) => 
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                        <div className="container" style={{textAlign : "center",marginTop : "20px",marginBottom : "15px"}} >
                            <img src="product.png" alt="" className="img-fluid"></img>
                            <h1>{product.name}</h1>
                            <div className="">{product.brand}</div>
                            <div className="">{product.price}</div>
                            <div className=""></div>
                        </div> 
                    </div>
                    )
                }
            </div>
            <h1 style={{marginTop : "20px"}}>Category 1</h1>
            <div className="row addscrollbar flex-row flex-nowrap scrollbar-warning">
                {data.products.map((product,index) => 
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                        <div className="container" style={{textAlign : "center",marginTop : "20px",marginBottom : "15px"}} >
                            <img src="product.png" alt="" className="img-fluid"></img>
                            <h1>{product.name}</h1>
                            <div className="">{product.brand}</div>
                            <div className="">{product.price}</div>
                            <div className=""></div>
                        </div> 
                    </div>
                    )
                }
            </div>
        </div>
    )}
}

HomeScreen.propTypes = {
    auth : PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
    auth : state.auth
})

export default connect(mapStatetoProps)(HomeScreen);