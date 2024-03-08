import React, { useState, useEffect } from "react";
import { supabase } from "../CreateClient";
import { useNavigate } from "react-router-dom";
import TableBody from "../components/TableComponets/TableBody";
import LoadingBar from "../components/LoadingBar";
import Short from "../components/Truncate";

const Admin = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoadig] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);
  // useEffect(() => {
  //   if (product) {
  //     getImage(product.image);
  //   }
  // }, [product]);
  async function fetchProduct() {
    const { data } = await supabase.from("product").select("*");
    setProduct(data);
    setIsLoadig(false);
    console.log(data);
  }

  async function deleteProduct(productId) {
    // const { data, } = await supabase
    //   .from("product")
    //   .delete()
    //   .eq("id", productId);
    // fetchProduct();
    // if (error) {
    //   console.log(error);
    // }
    // if (data) {
    //   console.log(data);
    // }
    const { data: getImageById } = await supabase
      .from("product")
      .select("image")
      .eq("id", productId);

    const { data: getImage } = await supabase.storage
      .from("image_product")
      .remove([`products/${getImageById[0].image}`]);

    const { error } = await supabase
      .from("product")
      .delete()
      .eq("id", productId);
    if (!error && getImage) {
      alert("Berhasil hapus product");
      window.location.reload();
    }
  }
  console.log(imageUrl);
  return (
    <>
      <h1 className="text-center mt-8 text-xl font-black text-white">
        SHOESSIN
      </h1>

      <div className="flex w-full lg:flex  lg:w-full  mt-5 gap-3 ms-6">
        <button
          className="btn hover:bg-neutral-500 text-white mb-3 py-3 px-6 lg:py-3 lg:px-6 btn-outline border-white"
          onClick={() => navigate("/add")}
        >
          + Add Product
        </button>

        <button
          className="btn hover:bg-neutral-500 text-white  py-3 px-6 btn-outline border-white"
          onClick={() => navigate("/pesanan")}
        >
          Pesanan Customer
        </button>
      </div>

      <div className="overflow-x-auto px-5 pt-5 w-full flex flex-col justify-center items-center">
        <table className="table border flex-col flex justify-center items-center">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th className="p-3 md:p-5 border-b-2 text-white">No</th>
              <th className="w-20 md:w-24 border-b-2 text-white">
                Image Product
              </th>
              <th className="border-b-2 text-white">Name Product</th>
              <th className="border-b-2 text-white">Type Product</th>
              <th className="border-b-2 text-white">Stock Product</th>
              <th className="border-b-2 text-white">Price</th>
              <th className="border-b-2 text-white">Description</th>
              <th className="border-b-2 text-white">Action</th>
            </tr>
          </thead>
          {isLoading ? (
            <LoadingBar />
          ) : (
            <>
              {product.map((p) => (
                <TableBody
                  key={p.id}
                  deleteProduct={deleteProduct}
                  navigate={navigate}
                  p={p}
                />
              ))}
            </>
          )}
        </table>
      </div>
    </>
  );
};

export default Admin;
