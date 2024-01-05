import { useState } from "react";
import Container from "../../components/container/Container";
import ShowModal from "../../components/show-modal/ShowModal";

export default function Produk() {
  const [isModal, setIsModal] = useState(false)

  const dataArr = [
    {
      no: 1,
      id: 22,
      nama_produk: 'Sergio',
      harga: 22000,
      Qty: 200,
    },
    {
      no: 2,
      id: 23,
      nama_produk: 'Magnum',
      harga: 22000,
      Qty: 230,
    },
    {
      no: 3,
      id: 24,
      nama_produk: 'Surya',
      harga: 25000,
      Qty: 250,
    },
    {
      no: 4,
      id: 25,
      nama_produk: 'Malboro',
      harga: 22000,
      Qty: 100,
    },
  ]

  return (
    <Container>
      {isModal ? (
        <ShowModal>
          <form className="w-[50%] h-max border rounded-lg flex flex-col  overflow-hidden bg-[#f5f5f5]">
            <div className="w-[100%] h-max bg-[#278bc4] p-3">
              <h1>Input Data Produk</h1>
            </div>
            <div className="flex items-center w-[100%]  text-black p-3 justify-between  h-max">
              <div className="flex flex-col w-[45%] gap-2 ">
                <label htmlFor="">Nama Produk</label>
                <input type="text" className="bg-transparent border w-[100%] border-black outline-none p-1 rounded-md"/>
              </div>
              <div className="flex flex-col w-[45%] gap-2">
                <label htmlFor="">Harga</label>
                <input type="text" className="bg-transparent border w-[100%] border-black outline-none p-1 rounded-md"/>
              </div>
            </div>
            <div className="flex items-center w-[100%]  text-black p-2 justify-between border-b border-gray-300 h-max">
              <div className="flex flex-col w-[45%] gap-2 ">
                <label htmlFor="">Quantity</label>
                <input type="text" className="bg-transparent border w-[100%] border-black outline-none p-1 rounded-md"/>
              </div>
            </div>
            <div className="flex items-center w-[100%]  text-black p-2 justify-end border-b border-gray-300 h-max gap-3">
              <button className="border py-1 px-7 rounded-lg bg-[crimson] text-white hover:bg-[#ba3650]" onClick={() => setIsModal(false)}>Close</button>
              <button className="border py-1 px-7 rounded-lg bg-[#278bc4] text-white hover:bg-[#3685b4]" type="submit">Tambah</button>
            </div>
          </form>
        </ShowModal>
      ): null}
      <div className="w-[100%] h-[89vh] mt-[6%] p-2  flex flex-col gap-2">
        <h1 className="text-[1.2rem]">Data Produk</h1>
        <div className="w-[100%] h-[100%]  flex flex-col items-end gap-3">
          <button className="border border-black py-1 px-3 rounded-md bg-[#00a6ff] hover:bg-[#3c98ca] duration-200 transition-all" onClick={() => setIsModal(true)}>Tambah Data</button>
          <table className="border w-[100%] h-max" >
            <thead >
              <tr>
                <th className="border p-2">NO</th>
                <th className="border p-2">ID</th>
                <th className="border p-2">NAMA PRODUK</th>
                <th className="border p-2">HARGA</th>
                <th className="border p-2">QUANTITY</th>
                <th className="border p-2 w-[15px]">AKSI</th>
              </tr>
            </thead>
            {dataArr.map((item) => {
              return (
              <tbody key={item.no}>
                <tr>
                  <td className="border p-1 text-center">{item.no}</td>
                  <td className="border p-1 text-center">{item.id}</td>
                  <td className="p-2 border">{item.nama_produk}</td>
                  <td className="p-2 border text-end">{item.harga.toLocaleString()}</td>
                  <td className="p-2 border text-end">{item.Qty}</td>
                  <td className="flex items-center justify-center gap-2 border p-2">
                    <button className="bg-[#008035] py-1 px-4 rounded-sm">Edit</button>
                    <button className="bg-[crimson] py-1 px-4 rounded-sm">Hapus</button>
                  </td>
                </tr>
              </tbody>
              )
            })}
          </table>
        </div>
      </div>
    </Container>
  )
}