import React from "react";
import { supabase } from "../../CreateClient";
import toRupiah from "@develoka/angka-rupiah-js";

const TableBody = ({ p, deleteProduct, navigate }) => {
  function getImage(filename) {
    const { data } = supabase.storage
      .from("image_product")
      .getPublicUrl("products/" + filename);
    return data.publicUrl;
  }

  return (
    <tbody>
      {/* row 1 */}
      <tr>
        <th>{p.id}</th>
        <th>
          <img src={getImage(p?.image)} />
          {/* {getImage(p.image)} */}
        </th>
        <th>{p.product_name}</th>
        <th>{p.type_product}</th>
        <th>{p.stock_product}</th>
        <th>{toRupiah(p.price)}</th>
        <th>{p.description}</th>
        <th>
          <button
            className="btn btn-success min-h-0 h-8"
            onClick={() => {
              navigate(`/update/${p.id}`);
            }}
          >
            {" "}
            Update{" "}
          </button>
          <button
            className="btn btn-secondary min-h-0 h-8 ms-1 mt-2"
            onClick={() => {
              deleteProduct(p.id);
            }}
          >
            {" "}
            Delete{" "}
          </button>
        </th>
      </tr>
    </tbody>
  );
};

export default TableBody;
