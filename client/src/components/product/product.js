import React, { Component } from "react";
import Header from "../Header";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { addProduct } from "./../../actions/productActions";
import { Link } from "react-router-dom";

class Product extends Component {

    constructor (){
        super();
        this.state = {
            title : "",
            progress : 0,
            subtitle : "",
            description : "",
            category : "",
            price : "",
            productimages : [],
            imageURL : [],
            highlight : [],
            errors : {}
        }
        this.onImageUpload = this.onImageUpload.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addHighlight = this.addHighlight.bind(this);
        this.addImage = this.addImage.bind(this);
    }

    
    componentDidMount (){
        if (!this.props.auth.isAuthenticated || !localStorage.managerJwtToken ) {
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
        if (nextProps.product) {
            this.setState({progress : nextProps.product.progress})
        }
    }
    
    onChange(e){
        if (["key","value"].includes(e.target.className)){
            let highlight = [...this.state.highlight]
            highlight[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({highlight},() => console.log(this.state.highlight))
        } else if (["image"].includes(e.target.className)){
            let productImages = [...this.state.productimages]
            let index = e.target.dataset.id
            productImages[index][e.target.className] = e.target.files[0]
            this.setState({productImages},() => console.log(this.state.productimages))
        } 
        else {
        this.setState({ [e.target.name] : e.target.value });
        }
        console.log(this.state)
    }
    
    onImageUpload (e) {
        console.log(e.target.files);
        this.setState({
            [e.target.name]: URL.createObjectURL(e.target.files[0])
          });
    }

    addHighlight (e) {
        this.setState((preState) => ({
            highlight : [...preState.highlight,{key:"",value:""}]
        }))
    }

    addImage (e) {
        this.setState((preState) => ({
            productimages : [...preState.productimages,{}]
        }))
    }

    onSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        if (this.state.highlight.length == 0){
            this.setState((preState) => ({
                highlight : [...preState.highlight,{key:"",value:""}]
            }));
        }else {
            for (var i = 0;i < this.state.highlight.length;i++){
                formData.append("highlights",JSON.stringify(this.state.highlight[i]))
            }
            formData.append("title", this.state.title)
            formData.append("subtitle", this.state.subtitle)
            formData.append("description", this.state.description)
            formData.append("category", this.state.category)
            formData.append("price", this.state.price)
            for (var i = 0; i < this.state.productimages.length; i++){
                formData.append("image",this.state.productimages[i].image,this.state.productimages[i].image.filename)
            }
            this.props.addProduct(formData,this.props.history);
        }
        console.log(this.state);
    }

    render (){
        const { errors , highlight , productimages } = this.state;
    return (
        <div className="product">
            <Header />
            <div className="header-margin">
                <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                        <div className="row">
                            <div className="col-12">
                        <div className="container">
                            <div className="card" style={{marginTop: "10px",marginRight: "-50px"}}>
                                <div className="container" >
                                <h1 style={{paddingLeft : "10px", paddingTop : "10px"}}>Product Details</h1><br />
                                <div className="form-group">
                                    <input 
                                        name="title" 
                                        placeholder="Title" 
                                        className={classnames("form-control", {
                                        "is-invalid" : errors.title
                                        })}
                                        onChange={this.onChange}
                                        value = {this.state.title}
                                        type="text">
                                    </input>
                                    {errors.title && (<div className="invalid-feedback">{errors.title}</div>)}
                                </div>
                                <div className="form-group">
                                    <input 
                                        name="subtitle" 
                                        placeholder="Sub Title" 
                                        className={classnames("form-control", {
                                        "is-invalid" : errors.subtitle
                                        })}
                                        onChange={this.onChange}
                                        value = {this.state.subtitle}
                                        type="text">
                                    </input>
                                    {errors.subtitle && (<div className="invalid-feedback">{errors.subtitle}</div>)}
                                </div>
                                <div className="form-group">
                                    <input 
                                        name="description" 
                                        placeholder="Description" 
                                        className={classnames("form-control", {
                                        "is-invalid" : errors.description
                                        })}
                                        onChange={this.onChange}
                                        value = {this.state.description}
                                        type="text">
                                    </input>
                                    {errors.description && (<div className="invalid-feedback">{errors.description}</div>)}
                                </div>
                                <div className="form-group">
                                    <input 
                                        name="category" 
                                        placeholder="Category" 
                                        className={classnames("form-control", {
                                        "is-invalid" : errors.category
                                        })}
                                        onChange={this.onChange}
                                        value = {this.state.category}
                                        type="text">
                                    </input>
                                    {errors.category && (<div className="invalid-feedback">{errors.category}</div>)}
                                </div>
                                <div className="form-group">
                                    <input 
                                        name="price" 
                                        placeholder="Price" 
                                        className={classnames("form-control", {
                                        "is-invalid" : errors.price
                                        })}
                                        onChange={this.onChange}
                                        value = {this.state.price}
                                        type="number">
                                    </input>
                                    {errors.price && (<div className="invalid-feedback">{errors.price}</div>)}
                                </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="container" >
                                <div className="card" style={{marginTop: "10px",marginRight: "-50px"}}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-10"><h1 style={{paddingLeft : "10px", paddingTop : "10px"}}>Product Highlights</h1></div>
                                            {errors.noHighlight && (<div className="invalid-feedback">{errors.noHighlight}</div>)}
                                            <div className="col-2">
                                                <div className="btn btn-primary btn-block" onClick={this.addHighlight} style={{marginRight : "10px", marginTop : "10px"}}>Add</div>
                                            </div>
                                        </div>
                                        {highlight.map((val,index) => {
                                            let keyId = 'key-${index}', value = 'value-${index}'
                                            return (
                                                <div className="row" id={index} key={index}>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <input 
                                                        name={keyId}
                                                        id={keyId} 
                                                        placeholder="Key" 
                                                        data-id={index}
                                                        className={classnames("key", {
                                                        "is-invalid" : errors.key
                                                        })}
                                                        onChange={this.onChange}
                                                        value = {highlight[index].key}
                                                        style = {{
                                                            display : "block",
                                                            width : "100%",
                                                            padding : ".375rem .75rem",
                                                            fontSize : "1rem",
                                                            lineHeight : "1.5",
                                                            backgroundColor: "#fff",
                                                            backgroundClip : "padding-box",
                                                            border : "1px solid #ced4da",
                                                            borderRadius : ".25rem",
                                                            transition : "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                                                            color:"#495057"}}
                                                            type="text">
                                                    </input>
                                                    {errors.key && (<div className="invalid-feedback">{errors.key}</div>)}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <input 
                                                        name={value}
                                                        placeholder="Value" 
                                                        id = {value}
                                                        data-id={index}
                                                        style = {{
                                                            display : "block",
                                                            width : "100%",
                                                            padding : ".375rem .75rem",
                                                            fontSize : "1rem",
                                                            lineHeight : "1.5",
                                                            backgroundColor: "#fff",
                                                            backgroundClip : "padding-box",
                                                            border : "1px solid #ced4da",
                                                            borderRadius : ".25rem",
                                                            transition : "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                                                            color:"#495057"}}
                                                        className={classnames("value", {
                                                        "is-invalid" : errors.value
                                                        })}
                                                        onChange={this.onChange}
                                                        value = {highlight[index].value}
                                                        type="text">
                                                    </input>
                                                    {errors.value && (<div className="invalid-feedback">{errors.value}</div>)}
                                                </div>
                                            </div>
                                        </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                    <div className="container">
                            <div className="card" style={{marginTop: "10px"}}>
                                <div className="container" >
                                    <div className="row">
                                        <div className="col-12">
                                            <h1 style={{paddingLeft : "10px", paddingTop : "10px"}}>Product Images  </h1>
                                        </div>
                                        <div className="col-12">
                                            <div className="btn btn-primary btn-block" onClick={this.addImage} style={{marginRight : "10px", marginTop : "10px", marginBottom: "10px"}}>Add</div>
                                        </div>
                                    </div>
                                    { productimages.map((val,index) => {
                                        let imageID = 'image-$(index)';
                                        return (
                                        <div className="form-group" key={index}>
                                            <label>Product Image {index + 1}</label>
                                            <input 
                                                        name={imageID}
                                                        placeholder="Value" 
                                                        id = {imageID}
                                                        data-id={index}
                                                        style = {{
                                                            display : "block",
                                                            width : "100%",
                                                            padding : ".375rem .75rem",
                                                            fontSize : "1rem",
                                                            lineHeight : "1.5",
                                                            backgroundColor: "#fff",
                                                            backgroundClip : "padding-box",
                                                            border : "1px solid #ced4da",
                                                            borderRadius : ".25rem",
                                                            transition : "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                                                            color:"#495057"}}
                                                        className={classnames("image", {
                                                        "is-invalid" : errors.image
                                                        })}
                                                        onChange={this.onChange}
                                                        value = {productimages[index].value}
                                                        type="file">
                                                    </input>
                                                    <img src={this.state.imageURL[index]} />
                                            {errors.image && (<div className="invalid-feedback">{errors.image}</div>)}
                                            </div>
                                        )
                                    }) }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="container"  style={{marginTop : "20px",marginBottom : "20px"}}>
                            <div className="card">
                                <button className="btn btn-primary btn-block">Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="container"  style={{marginTop : "20px",marginBottom : "20px"}}>
                            <div className="progress">
                                <div className="progress-bar" style={{width : this.state.progress + "%",textAlign : "center"}}></div>
                            </div>
                        </div>
                    </div>
                    {(this.state.progress === 100) ? (
                    <div className="col-12">
                        <div className="container">
                            <div className="card">
                                <div className="">
                                    <Link to="/manager/dashboard" className="btn btn-primary btn-lg btn-block" >Dashboard</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    ) : ""}
                </div>
                </form>
            </div>
        </div>
    )}
}
Product.propTypes = {
    errors : PropTypes.object.isRequired,
    addProduct : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    product : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors : state.errors,
    auth : state.auth,
    product : state.product
})
export default connect(mapStateToProps , { addProduct })(Product);