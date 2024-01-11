import PropTypes from 'prop-types';

import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

TabelProduk.propTypes = {
  dataProduk: PropTypes.arrayOf(PropTypes.object).isRequired,
  edit: PropTypes.func.isRequired,
  deleteProduk: PropTypes.func.isRequired,
};

export default function TabelProduk({ dataProduk, edit, deleteProduk }) {
  const headers = ["NO", "ID", "NAMA PRODUK", "HARGA", "STOK PRODUK", "AKSI"];
  
  return (
    <table className="border w-[100%] h-max " >
      <thead >
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="border p-2 border-gray-300 font-extrabold bg-[#1e7ea1] text-white">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      {dataProduk.length > 0 ? (
        dataProduk.map((item, i) => (
          <tbody key={i} >
            <tr>
              <td className="border p-1 text-center border-gray-300">{i + 1}</td>
              <td className="border p-1 text-center border-gray-300">{item._id}</td>
              <td className="p-2 border border-gray-300 capitalize">{item.nama_produk}</td>
              <td className="p-2 border text-end border-gray-300">{item.harga.toLocaleString()}</td>
              <td className="p-2 border text-end border-gray-300">{item.stok.toLocaleString()}</td>
              <td className="p-2 border text-end border-gray-300  ">
                <div className="flex justify-center items-center gap-3">
                  <button className="bg-[#008035] py-1 px-4 rounded-sm text-white hover:bg-[green]" onClick={() => edit(item)}>
                    <FaPencilAlt size={20}/>
                  </button>
                  <button className="bg-[crimson] py-1 px-4 rounded-sm text-white hover:bg-[#bc3752]" onClick={() => deleteProduk(item._id)}>
                    <MdDeleteForever size={20}/>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        ))
      ) : (
        <tbody>
          <tr>
            <td colSpan="6" className="text-center text-[crimson]">Data Produk Kosong</td>
          </tr>
        </tbody>
      )}
    </table>
  )
}

