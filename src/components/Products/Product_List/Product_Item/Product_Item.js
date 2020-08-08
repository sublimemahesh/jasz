import React from 'react';
import { PostData } from '../../../../services/PostData';

const Product_Item = ({ feedData, alert, addToCart, categories, subcategories, brands }) => {
    // console.log("categories", subcategories);
    let category = categories.filter(item => item.id == feedData.category);
    let subcategory = subcategories.filter(item1 => item1.id == feedData.sub_category);
    let brand = brands.filter(item2 => item2.id == feedData.brand);
    // console.log("subcategory123", subcategory[0].name);
    return (

        <div className="item col-md-3 col-sm-4">
            <div className="item-product">
                <div className="product-thumb">
                    <a className="product-thumb-link" href={`/product-view/${feedData.id}`}>
                        <img className="first-thumb" alt="" src={`upload/product/${feedData.image_name}`} />
                        <img className="second-thumb" alt="" src={`upload/product/${feedData.image_name2}`} />
                    </a>
                    <div className="product-info-cart">
                        <a className="addcart-link" onClick={() => addToCart(feedData.id)}><i className="fa fa-shopping-cart"></i> Add to Cart</a>
                        {alert}
                    </div>
                </div>
                
                <div className="product-info">
                    <h3 className="title-product"><a href={`/product-view/${feedData.id}`}>{feedData.name}</a></h3>
                    {/* <span className="item-category"><b>Category</b>: {category[0].name}</span> */}
                    {/* <span><b>Sub Category</b>: {subcategory[0].name}</span> */}
                    {/* <span><b>Brand</b>: {brand[0].name}</span> */}
                    <div class="info-price">
                        <span>{feedData.discount != 0 && feedData.discount != '' ? "Rs. " + (new Intl.NumberFormat().format(feedData.price - (feedData.price * feedData.discount / 100))) : "Rs. " + new Intl.NumberFormat().format((feedData.price))}</span>
                        <del>{feedData.discount != 0 && feedData.discount != '' && "Rs. " + (new Intl.NumberFormat().format(feedData.price))}</del>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Product_Item;
