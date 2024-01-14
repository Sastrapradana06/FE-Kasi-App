import PropTypes from 'prop-types';

import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

TabelRiwayatMasuk.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  edit: PropTypes.func.isRequired,
  deleteRiwayat: PropTypes.func.isRequired,
};

export default function TabelRiwayatMasuk({ data, edit, deleteRiwayat }) {
  const headers = ["NO", "ID", "NAMA", "QUNTITY", "TOTAL HARGA", "TANGGAL", "KET", "AKSI"];
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
      {data.length > 0 ? (
        data.map((item, i) => (
          <tbody key={i} >
            <tr>
              <td className="border p-1 text-center border-gray-300">{i + 1}</td>
              <td className="border p-1 text-center border-gray-300">{item._id}</td>
              <td className="p-2 border border-gray-300 capitalize text-center">{item.nama_produk}</td>
              <td className="p-2 border text-end border-gray-300">{item.quantity.toLocaleString()}</td>
              <td className="p-2 border text-end border-gray-300">{item.total_harga.toLocaleString()}</td>
              <td className="p-2 border text-center border-gray-300">{item.tgl_transaksi}</td>
              <td className="p-2 border border-gray-300">{item.keterangan}</td>
              <td className="p-2 border text-end border-gray-300  ">
                <div className="flex justify-center items-center gap-3">
                  <button className="bg-[#008035] py-1 px-4 rounded-sm text-white hover:bg-[green]" onClick={() => edit(item)}>
                    <FaPencilAlt size={20}/>
                  </button>
                  <button className="bg-[crimson] py-1 px-4 rounded-sm text-white hover:bg-[#bc3752]" onClick={() => deleteRiwayat(item._id)}>
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
            <td colSpan={8}  className=" text-[crimson] p-1 text-center border-gray-300">Data Riwayat Masuk Kosong</td>
          </tr>
        </tbody>
      )}
    </table>
  )
}