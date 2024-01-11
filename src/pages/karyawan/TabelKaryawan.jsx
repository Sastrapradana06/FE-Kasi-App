import PropTypes from 'prop-types';

import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

TabelKaryawan.propTypes = {
  dataKaryawan: PropTypes.arrayOf(PropTypes.object).isRequired,
  edit: PropTypes.func.isRequired,
  deleteKaryawan: PropTypes.func.isRequired,
};

export default function TabelKaryawan({ dataKaryawan, edit, deleteKaryawan }) {
  const headers = ["NO", "ID", "NAMA", "EMAIL", "NOTEL", "JABATAN", "FOTO", "AKSI"];

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
      {dataKaryawan.length > 0 ? (
        dataKaryawan.map((item, i) => (
          <tbody key={i} >
            <tr>
              <td className="border p-1 text-center border-gray-300">{i + 1}</td>
              <td className="border p-1 text-center border-gray-300">{item._id}</td>
              <td className="p-2 border border-gray-300 capitalize text-center">{item.nama}</td>
              <td className="p-2 border text-start border-gray-300">{item.email}</td>
              <td className="p-2 border text-end border-gray-300">{item.notel}</td>
              <td className="p-2 border text-center border-gray-300">{item.jabatan}</td>
              <td className="p-2 border text-end border-gray-300">
                <button className="m-auto block">
                  <img src={item.foto} alt={item.nama} className="w-[50px] h-[50px] object-cover rounded-[100%] m-auto cursor-pointer" />
                </button>
              </td>
              <td className="p-2 border text-end border-gray-300  ">
                <div className="flex justify-center items-center gap-3">
                  <button className="bg-[#008035] py-1 px-4 rounded-sm text-white hover:bg-[green]" onClick={() => edit(item)}>
                    <FaPencilAlt size={20}/>
                  </button>
                  <button className="bg-[crimson] py-1 px-4 rounded-sm text-white hover:bg-[#bc3752]" onClick={() => deleteKaryawan(item._id)}>
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