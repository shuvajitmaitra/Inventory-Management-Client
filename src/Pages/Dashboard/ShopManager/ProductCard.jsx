import { PropTypes } from "prop-types";

const ProductCard = ({ product }) => {
  const {
    productDescription,
    productImage,
    productLocation,
    productAddedDate,
    productName,
    productPrice,
    productQuantity,
    saleCount,
  } = product;

  return (
    <div className="border rounded p-4 bg-white">
      <img src={productImage} className="h-36 w-28 block right-0 left-0 mx-auto" />
      <h3>{productName}</h3>
     <h3>{productLocation}</h3>
      <div className="flex justify-between items-center">
      <h3>Price: ${productPrice}</h3>
      <h3>Quantity: {productQuantity}</h3>
      </div>
      <div className="flex justify-between items-center">
      <h3>Launch Date: <br /> {productAddedDate}</h3>
      <h3>Sale Count: {saleCount}</h3>
      </div>
      <h3>Description: <br />{productDescription}</h3>
    </div>
  );
};
ProductCard.propTypes={
    product: PropTypes.object
}
export default ProductCard;
