import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/TableComponets/Header";
import { supabase } from "../CreateClient";
import Footer from "../components/Footer";
import toRupiah from "@develoka/angka-rupiah-js";
import { useAuth } from "../Auth/AuthProvider";
import LoadingBar from "../components/LoadingBar";

const HomePage = () => {
  const [getProduct, setGetProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

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
    async function fetchProduct() {
      const { data } = await supabase.from("product").select("*");
      setGetProduct(data);
      setIsLoading(false);
      console.log(data);
    }
    fetchProduct();
  }, []);

  return (
    <>
      <Header />

      <section className="bg-home-image h-screen bg-no-repeat bg-cover bg-center">
        <div className="backdrop-brightness-50 w-full h-full flex items-center justify-center text-center">
          <h2 className="text-white text-6xl font-black max-sm:text-4xl">
            WELCOME <br /> TO OUR <br /> STORE
          </h2>
        </div>
      </section>

      {isLoading ? (
        <>
          <LoadingBar />
        </>
      ) : (
        <>
          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-black text-white mt-10">
              Our Product
            </h2>
            <label className="input input-bordered flex items-center gap-2 mt-5">
              <input
                type="text"
                className="grow bg-transparent"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <div className="flex gap-7 mt-10 w-full h-full px-10 flex-wrap justify-center">
              {getProduct.map((g) => (
                <div className="card w-72 glass">
                  <Link to={`/detail/${g.id}`}>
                    <figure>
                      <img
                        className="object-cover w-full h-64 rounded-t-xl"
                        src={getImage(g.image)}
                      />
                    </figure>
                    <div className="card-body">
                      <h1 className="card-title font-extrabold">
                        {g.product_name}
                      </h1>
                      <h2 className="card-title text-sm">
                        {toRupiah(g.price)}
                      </h2>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <Footer />
    </>
  );
};

export default HomePage;
