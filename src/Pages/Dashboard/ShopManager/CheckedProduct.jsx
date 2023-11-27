import useAxiosPublic from "../../../Hook/useAxiosPublic";
import useCheckout from "../../../Hook/useCheckout";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";


const CheckedProduct = () => {
  const axiosPublic = useAxiosPublic();
  const [checkedProducts, refetch] = useCheckout();
  const navigate = useNavigate()

  const soldTime = new Date();

  const jsPdfGenerator = (product)=>{
    const doc = new jsPDF("p", 'pt')
    doc.setFontSize(14)
    doc.text(`Money Receipt:`, 20, 20);
    doc.text(`-------------------------------------------`, 20, 30);
    doc.text(`Shop Name: ${product.shopName}`, 20, 40);
    doc.text(`Product Model: ${product.productName}`, 20, 60);
    doc.text(`Product ID: ${product.productId}`, 20, 80);
    doc.text(`Product Serial: ${product._id}`, 20, 100);
    doc.text(`Release Date: ${product.productAddedDate}`, 20, 120);
    doc.text(`Product Location: ${product.productLocation}`, 20, 140);
    doc.text(`Product Details: ${product.productDescription}`, 20, 160);
    doc.text(`Purchase Date: ${soldTime}`, 20, 180);
    doc.text(`Product Discount: ${product.productDiscount}%`, 20, 200);
    doc.text(`-------------------------------------------`, 20, 220);
    doc.text(`Product Price: ${product.productPrice}`, 20, 240);
    // doc.save(`${product.productName}.pdf`);
  }

  const handleSoldProduct = (product) => {
 const soldProduct = {
productId:product.productId,
shopName:product.shopName,
shopId:product.shopId,
email:product.email,
productAddedDate:product.productAddedDate,
productName:product.productName,
productImage:product.productImage,
productQuantity:product.productQuantity,
productLocation:product.productLocation,
profitMargin:product.profitMargin,
makingCost:product.makingCost,
productPrice:product.productPrice,
productDiscount:product.productDiscount,
productDescription:product.productDescription,
saleCount:product.saleCount,
    soldTime,  };
    axiosPublic.post("/sold-product", soldProduct).then((res) => {
      if (res.data.insertedId) {
        axiosPublic.get(`/singleProduct/${product.productId}`).then((res) => {
          const saleCount = res.data.saleCount + 1;
          const productQuantity = parseInt(res.data.productQuantity) - 1;
          const newQuantity = { saleCount, productQuantity };

          axiosPublic
            .patch(`/product/${product.productId}`, newQuantity)
            .then((res) => {
              if (res.data.modifiedCount) {
                axiosPublic
                  .delete(`/sold-product-delete/${product._id}`)
                  .then((res) => {
                    if (res.data.deletedCount) {
                      refetch();
                      jsPdfGenerator(product)
                      navigate('/dashboard/products')
                      toast.success("product sold");
                    }
                  });
              }
            });
        });
      }
    });
  };
  return (
    <div className="">
      <h2 className="text-5xl font-medium text-center pt-10 p-3 mb-10 border-b-4 border-[#7cb518] w-fit  mx-auto ">
        Check Out Page
      </h2>

      <div className=" p-10 m-10 rounded-lg bg-[#7bb51865] shadow-xl">
        <div className=" rounded-lg">
          <table className="table">
            {/* head */}
            <thead className="bg-[#b2ee4a] text-center">
              <tr>
                <th> #</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Product Location</th>
                <th> Product Description</th>
                <th>Get Paid</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* row 1 */}
              {checkedProducts?.map((product, index) => (
                <tr key={product._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={product.productImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{product.productName}</td>
                  <td className="text-zinc-600">{product.productLocation}</td>
                  <td className="text-zinc-600">{product.productDescription}</td>
                  <td>
                    <button
                      onClick={() => handleSoldProduct(product)}
                      className="text-zinc-600 font-medium py-1 px-2 rounded bg-[#b2ee4a] shadow-md shadow-green-400"
                    >
                      Get Paid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default CheckedProduct;
