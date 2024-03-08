import React, { useState } from "react";
import { supabase } from "../CreateClient";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddProduct = () => {
  const [imageUpload, setImageUpload] = useState([]);

  const [addImagePreview, setAddImagePreview] = useState("");

  const navigate = useNavigate();
  const [products, setProducts] = useState({
    nameProduct: "",
    typeProduct: "",
    stockProduct: "",
    price: "",
    description: "",
  });

  // console.log(products);

  function handleChange(event) {
    setProducts((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function createProduct(e) {
    e.preventDefault();
    const filename = `${uuidv4(imageUpload.name)}`;
    const { error } = await supabase.from("product").insert({
      product_name: products.nameProduct,
      type_product: products.typeProduct,
      stock_product: products.stockProduct,
      price: products.price,
      description: products.description,
      image: filename,
    });
    if (!error) {
      navigate("/admin");
    } else {
      alert("data lo ga masuk!");
    }

    try {
      const { data } = await supabase.storage
        .from("image_product")
        .upload(`products/${filename}`, imageUpload, {
          cacheControl: "3600",
          upsert: true,
        });
      if (data) {
        console.log(" gambar lo udh masuk bro!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleImage = (e) => {
    const file = e.target.file[0];
    setImageUpload(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAddImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h1 className="text-center mt-8 text-xl font-black text-white">
        Input Your Product Here!
      </h1>
      <div className="flex justify-center mt-4">
        <div className="card card-compact w-96 bg-base-100 shadow-xl border">
          <form className="flex flex-col gap-4 m-10" onSubmit={createProduct}>
            <input
              className="p-2 rounded-lg mt-3 bg-transparent border"
              onChange={handleChange}
              type="text"
              placeholder="name product"
              name="nameProduct"
            />
            <input
              className="p-2 rounded-lg bg-transparent border"
              onChange={handleChange}
              type="text"
              placeholder="type product"
              name="typeProduct"
            />
            <input
              className="p-2 rounded-lg bg-transparent border"
              onChange={handleChange}
              type="text"
              placeholder="stock product"
              name="stockProduct"
            />
            <input
              className="p-2 rounded-lg bg-transparent border"
              onChange={handleChange}
              type="number"
              placeholder="price"
              name="price"
            />
            <textarea
              className="p-2 rounded-lg bg-transparent border resize-none"
              onChange={handleChange}
              type="text"
              placeholder="description"
              name="description"
            />
            <input
              className="p-2 file-input file-input-bordered w-full cursor-pointer"
              onChange={handleImage}
              type="file"
              placeholder="image product"
              name="imageProduct"
            />

            {addImagePreview ? (
              <img
                src={addImagePreview}
                alt="Uploaded"
                className="w-24 object-cover"
              />
            ) : (
              <>
                <img
                  src={`https://hyifcbxonxhtxeeqrtgg.supabase.co/storage/v1/object/public/image_product/products/`}
                  alt=""
                  className="w-24 object-cover"
                />
              </>
            )}

            <button
              type="submit"
              className="bg-slate-200 mx-16 p-2 rounded-lg text-black"
            >
              {" "}
              Input{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
