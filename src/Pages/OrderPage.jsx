import React, { useEffect, useState } from "react";
import { supabase } from "../CreateClient";
import toRupiah from "@develoka/angka-rupiah-js";
import { useAuth } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import LoadingBar from "../components/LoadingBar";

const OrderPage = () => {
  const [getCart, setGetCart] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const hapusSemuaKeranjang = async () => {
    try {
      await supabase.from("keranjang").delete().eq("id_user", user.id);
      console.log("Keranjang berhasil dihapus setelah checkout");
    } catch (error) {
      console.error("Error saat menghapus keranjang:", error.message);
    }
  };

  const handlePesanan = async (e) => {
    e.preventDefault();

    const { data: getName } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id);

    let getNamaProduk = getCart.map((produk) => produk.name_product);

    const { data } = await supabase
      .from("pesanan")
      .insert({
        id_pemesan: user.id,
        nama_pemesan: getName[0].full_name,
        nama_produk: getNamaProduk,
        total_harga: totalPrice,
      })
      .select();

    if (data) {
      alert("Pesanan segera diproses");
      await hapusSemuaKeranjang(); // Panggil fungsi untuk menghapus keranjang
      navigate("/");
    }
  };

  async function fetchCart() {
    const { data } = await supabase
      .from("keranjang")
      .select("*")
      .eq("id_user", user.id);
    setGetCart(data);
  }

  async function calculateTotalPrice() {
    let total = 0;

    getCart.forEach((cart) => {
      total += cart.price;
    });
    setTotalPrice(total);
  }

  const image = (filename) => {
    console.log(filename);
    try {
      const { data, error } = supabase.storage
        .from("image_product")
        .getPublicUrl("products/" + filename);
      if (error) {
        throw error;
      }
      return data.publicUrl;
    } catch (error) {
      console.error("Error getting image URL:", error.message);
    }
  };

  const tombolTambah = async (cartId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    const { data, error } = await supabase
      .from("pesanan")
      .update({ jumlah_pesanan: newQuantity })
      .eq("id", cartId);

    fetchCart();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  const tombolKurang = async (cartId, currentQuantity) => {
    const newQuantity = currentQuantity - 1;
    const { data, error } = await supabase
      .from("pesanan")
      .update({ jumlah_pesanan: newQuantity })
      .eq("id", cartId);

    fetchCart();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  async function deleteCart(cartId) {
    const { data, error } = await supabase
      .from("keranjang")
      .delete()
      .eq("id", cartId);

    fetchCart();

    if (!error) {
      alert("Berhasil Delete");
    }
  }

  // useEffect(() => {
  //   fetchCart();
  // }, []);

  const { user } = useAuth();

  const getAllKeranjang = async () => {
    const { data } = await supabase
      .from("keranjang")
      .select("*")
      .eq("id_user", user.id);

    console.log(data);
  };

  // const handlePesanan = async (e) => {
  //   e.preventDefault();

  //   // const { error } = await supabase
  //   //   .from("profiles")
  //   //   .select("*")
  //   //   .eq("id", user.id);

  //   const { data: getName } = await supabase
  //     .from("profiles")
  //     .select("full_name")
  //     .eq("id", user.id);

  //   let getNamaProduk = getCart.map((produk) => produk.name_product);

  //   const { data } = await supabase
  //     .from("pesanan")
  //     .insert({
  //       id_pemesan: user.id,
  //       nama_pemesan: getName[0].full_name,
  //       nama_produk: getNamaProduk,
  //       total_harga: totalPrice,
  //     })
  //     .select();

  //   if (data) {
  //     alert("Pesanan segera di proses");
  //     navigate("/");
  //   }
  // };

  if (isLoading) {
    <LoadingBar />;
  }

  useEffect(() => {
    calculateTotalPrice();
    getAllKeranjang();
    fetchCart();
  }, [getCart]);

  return (
    <>
      <h1 className="text-center mt-8 text-xl font-black text-white">
        Check Out your product now!
      </h1>
      <div className="flex flex-col gap-2 mt-10 w-full h-full flex-wrap text-center">
        {getCart.map((g) => (
          <div
            key={g.id}
            className="card py-3 border-y rounded-none flex flex-col md:flex-row w-full h-full items-center"
          >
            <input type="checkbox" className="checkbox mx-3 " />
            <div className="flex items-center">
              <img
                className="object-cover h-32 w-42 m-3"
                src={image(g.image)}
                alt={g.name_product}
              />
            </div>
            <div className="flex flex-col md:flex-row">
              <h1 className="mt-3 md:mt-0 ms-0 md:ms-10 md:w-20 text-white">
                {g.name_product}
              </h1>
              <h1 className="mt-3 md:mt-7 ms-0 md:ms-20 md:w-20 text-white">
                Size : 42
              </h1>
              <s className="mt-3 md:mt-7 ms-0 md:ms-20 text-white">
                IDR 1.500.000.00
              </s>
              <h2 className="mt-3 md:mt-7 ms-3 md:ms-5 text-white">
                IDR {toRupiah(g.price)}
              </h2>
            </div>
            <div className="flex items-center md:ms-20">
              <div className="flex justify-between gap-2 mt-3 md:mt-0  md:ms-0">
                <button className="btn btn-outline ">-</button>
                <input
                  type="text"
                  className="w-14 rounded-lg border text-center bg-transparent"
                />
                <button className="btn btn-outline ">+</button>
              </div>
            </div>
            <h1
              className="mt-3 md:mt-0 ms-0 md:ms-10 text-white hover:text-red-500"
              onClick={() => deleteCart(g.id)}
            >
              Hapus
            </h1>
          </div>
        ))}
      </div>

      <div className="card border-t rounded-none flex md:flex md:flex-row justify-between items-center  w-full h-5 mt-10 p-5">
        <div className="flex items-center mt-4">
          <input type="checkbox" className="checkbox mx-3 " />
          <h2 className=" text-white">Pilih Semua Produk()</h2>
        </div>
        <h2 className=" text-white mt-4">
          Total(7 produk) : {toRupiah(totalPrice)}
        </h2>
        <form onSubmit={handlePesanan} className="">
          <button
            className="btn mt-5 hover:bg-neutral-500 border border-white px-5 py-2 text-white"
            type="submit"
          >
            Checkout
          </button>
        </form>
      </div>
    </>
  );
};

export default OrderPage;
