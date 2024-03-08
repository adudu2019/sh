import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../CreateClient";
import { v4 as uuidv4 } from "uuid";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [updateImagePreview, setUpdateImagePreview] = useState("");
  const [imageUpload, setImageUpload] = useState([]);
  // console.log(data);
  const [updates, setUpdates] = useState({
    id: "",
    nameProduct: "",
    typeProduct: "",
    stockProduct: "",
    price: "",
    description: "",
    image: "",
  });
  useEffect(() => {
    const getData = async (idNumber) => {
      const { data } = await supabase
        .from("product")
        .select("*")
        .eq("id", idNumber);
      setData(data[0]);
    };
    getData(id);
  }, [id]);
  useEffect(() => {
    setUpdates({
      nameProduct: data.product_name,
      typeProduct: data.type_product,
      stockProduct: data.stock_product,
      price: data.price,
      description: data.description,
      image: data.image,
    });
  }, [data]);

  async function updateProduct(e, productId) {
    e.preventDefault();
    const filename = `${uuidv4(imageUpload.name)}`;
    if (imageUpload.length === 0) {
      const { error } = await supabase
        .from("product")
        .update({
          product_name: updates.nameProduct,
          type_product: updates.typeProduct,
          stock_product: updates.stockProduct,
          price: updates.price,
          description: updates.description,
          image: updates.image,
        })
        .eq("id", id);
      if (!error) {
        alert("berhasil update produk");
        navigate("/admin");
      }
    } else {
      const { data: deleteImage } = await supabase.storage
        .from("image_product")
        .remove([`products/${updates.image}`]);

      if (deleteImage) {
        const { data: updateImage } = await supabase.storage
          .from("image_product")
          .upload(`products/${filename}`, imageUpload, {
            cacheControl: "3600",
            upsert: true,
          });

        if (updateImage) {
          const { error } = await supabase
            .from("product")
            .update({
              product_name: updates.nameProduct,
              type_product: updates.typeProduct,
              stock_product: updates.stockProduct,
              price: updates.price,
              description: updates.description,
              image: filename,
            })
            .eq("id", id);
          if (!error) {
            alert("berhasil update produk");
            navigate("/admin");
          }
        }
      }
    }
  }

  console.log(updates);
  // console.log(data.product_name);

  function handleChange(event) {
    setUpdates((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageUpload(file);
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdateImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h1 className="text-center mt-8 text-xl font-black text-white">
        Update Your Product Here!
      </h1>

      <form
        className="flex flex-col gap-4 m-10"
        onSubmit={(e) => updateProduct(e, data.id)}
      >
        <input
          className="p-2 rounded-lg bg-transparent border"
          onChange={handleChange}
          type="text"
          name="nameProduct"
          defaultValue={updates.nameProduct}
        />
        <input
          className="p-2 rounded-lg bg-transparent border"
          onChange={handleChange}
          type="text"
          name="typeProduct"
          defaultValue={updates.typeProduct}
        />
        <input
          className="p-2 rounded-lg bg-transparent border"
          onChange={handleChange}
          type="text"
          name="stockProduct"
          defaultValue={updates.stockProduct}
        />
        <input
          className="p-2 rounded-lg bg-transparent border"
          onChange={handleChange}
          type="number"
          name="price"
          defaultValue={updates.price}
        />
        <textarea
          className="p-2 rounded-lg bg-transparent border resize-none"
          onChange={handleChange}
          type="text"
          placeholder="description"
          name="description"
          defaultValue={updates.description}
        />
        <input
          className="p-2 file-input file-input-bordered w-full cursor-pointer"
          type="file"
          onChange={handleImage}
          placeholder="image product"
          name="imageProduct"
        />

        {updateImagePreview ? (
          <img
            src={updateImagePreview}
            alt="Uploaded"
            className="w-24 object-cover"
          />
        ) : (
          <>
            <img
              src={`https://hyifcbxonxhtxeeqrtgg.supabase.co/storage/v1/object/public/image_product/products/${updates.image}`}
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
          Update{" "}
        </button>
      </form>
    </>
  );
};

export default UpdateProduct;
