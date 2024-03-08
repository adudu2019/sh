import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../CreateClient";
import toRupiah from "@develoka/angka-rupiah-js";
import { useAuth } from "../Auth/AuthProvider";
import LoadingBar from "../components/LoadingBar";

const DetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(data.product_name);

  const { user } = useAuth();

  function getImage(filename) {
    const { data } = supabase.storage
      .from("image_product")
      .getPublicUrl("products/" + filename);
    return data.publicUrl;
  }

  const addCart = async (id) => {
    const { data } = await supabase.from("product").select("*").eq("id", id);

    try {
      if (data) {
        const { error } = await supabase
          .from("keranjang")
          .insert([
            {
              id_user: user.id,
              id_product: data[0].id,
              name_product: data[0].product_name,
              price: data[0].price,
              image: data[0].image,
            },
          ])
          .select();

        if (!error) {
          alert("produk di tambah ke keranjang");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getDetail = async (idNumber) => {
      const { data } = await supabase
        .from("product")
        .select("*")
        .eq("id", idNumber);
      setData(data[0]);
      setLoading(false);
    };
    getDetail(id);
  }, [id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <img
          src={getImage(data.image)}
          className="object-cover m-5 md:h-96 shadow-2xl h-96 md:m-14"
        />
        <div className="md:w-1/2 p-5">
          <h2 className="text-white mt-4 md:mt-28 text-2xl font-black">
            {data.product_name}
          </h2>
          <div className="flex flex-wrap">
            <s className="mt-3 text-1xl font-semibold">IDR 1.500.000.00</s>
            <h2 className=" md:ms-3 text-white mt-3 text-2xl font-semibold">
              IDR {toRupiah(data.price)}
            </h2>
          </div>
          <div className="flex flex-wrap">
            <h2 className="mt-3 text-white text-1xl font-semibold">
              1,2RB Terjual
            </h2>
            <h2 className="mt-3 ms-4 text-white text-1xl font-semibold">
              1,5RB Penilaian
            </h2>
            <h2 className="mt-3 ms-4 text-white text-1xl font-semibold">
              Stock {data.stock_product}
            </h2>
          </div>
          <h2 className="mt-3 text-1xl font-semibold">Size</h2>
          <div className="gap-1 flex flex-wrap mt-3">
            <div className="text-white text-xs p-1 rounded-md border">40</div>
            <div className="text-white text-xs p-1 rounded-md border">41</div>
            <div className="text-white text-xs p-1 rounded-md border">42</div>
            <div className="text-white text-xs p-1 rounded-md border">43</div>
            <div className="text-white text-xs p-1 rounded-md border">44</div>
            <div className="text-white text-xs p-1 rounded-md border">45</div>
          </div>

          <button className="border mt-6 p-2 text-white hover:bg-slate-500">
            Beli Sekarang
          </button>

          <button
            onClick={() => addCart(data.id)}
            className="ms-3 border mt-6 p-2 text-white hover:bg-slate-500"
          >
            Masukkan ke keranjang
          </button>
        </div>
      </div>
      <h1 className="text-white mt-5 text-xl font-black text-center">
        Description Product
      </h1>
      <p className="mx-16 mt-6 text-justify">{data.description}</p>
    </>
  );
};

export default DetailPage;
