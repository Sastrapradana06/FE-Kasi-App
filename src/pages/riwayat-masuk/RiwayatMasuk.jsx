import { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import ShowModal from "../../components/show-modal/ShowModal";
// import { MdPersonSearch } from "react-icons/md";


import { useShallow } from 'zustand/react/shallow'
import useKasirStore from "../../store/store";
import { getRiwayatMasukApi, deleteRiwayatMasukApi } from "../../utils/api";
import TabelRiwayatMasuk from "./TabelRiwayatMasuk";

export default function RiwayatMasuk() {
  const [isModal, setIsModal] = useState(false)
  const [messages, setMessages] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const [namaProduk, setNamaProduk] = useState('')
  const [quantity, setQuantity] = useState('')
  const [totalHarga, setTotalHarga] = useState('')
  const [tanggalTransaksi, setTanggalTransaksi] = useState('')
  const [keterangan, setKeterangan] = useState('')


  const [idTransaksiMasuk, setIdTransaksiMasuk] = useState(undefined);
  const [cariKaryawan, setCariKaryawan] = useState('')

  const [isDisabled, setIsDisabled] = useState(false)



  const [products, getProducts, riwayatMasuk, updateRiwayatMasuk, getRiwayatMasuk] = useKasirStore(
    useShallow((state) => [state.products, state.getProducts, state.riwayatMasuk, state.updateRiwayatMasuk, state.getRiwayatMasuk])
  )

  useEffect(() => {
    if (products.length == 0) {
      getProducts()
    }

    if (riwayatMasuk.length == 0) {
      getRiwayatMasuk()
    }
  }, [])


  const handleDataKaryawan = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const dataInput = {
      nama_produk: (namaProduk == '' ? products[0].nama_produk.toLowerCase() : namaProduk.toLowerCase()),
      quantity: parseFloat(quantity),
      totalHarga: parseFloat(totalHarga),
      tanggalTransaksi,
      keterangan,
      idTransaksiMasuk
    }


    try {
      const { message, riwayatMasuk } = await getRiwayatMasukApi(dataInput)

      if (riwayatMasuk.length !== 0) {
        updateRiwayatMasuk(riwayatMasuk)
        setMessages(message)
        getProducts()
        setIsModal(false)
      } else {
        setMessages(message)
      }

    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  }

  const handleDeleteRiwayat = async (id) => {
    console.log({ id });
    try {
      const newRiwayatMasuk = await deleteRiwayatMasukApi(id)

      if (newRiwayatMasuk) {
        updateRiwayatMasuk(newRiwayatMasuk)
      }

    } catch (error) {
      console.log({ error });
    }
  }


  const handleEditRiwayat = async (data) => {
    const { _id, nama_produk, quantity, total_harga, tgl_transaksi, keterangan } = data
    showModal()
    setNamaProduk(nama_produk)
    setQuantity(quantity)
    setTotalHarga(total_harga)
    setTanggalTransaksi(tgl_transaksi)
    setKeterangan(keterangan)
    setIdTransaksiMasuk(_id)
    setIsDisabled(true)
  }


  const showModal = () => {
    setMessages(undefined)
    setNamaProduk('')
    setQuantity('')
    setTotalHarga('')
    setKeterangan('')
    setIdTransaksiMasuk(undefined)
    setIsModal(true)
    setIsLoading(false)
    setTanggalTransaksi('')
    setIsDisabled(false)

  }

  // const handleBtnCari = () => {
  //   if (cariKaryawan !== '') {
  //     const cariKaryawanName = karyawan.filter((data) => {
  //       return data.nama === cariKaryawan
  //     })
  //     updateKaryawan(cariKaryawanName)
  //   }
  // }


  return (
    <Container>
      {isModal ? (
        <ShowModal>
          <form className="w-[50%] h-max border rounded-lg flex flex-col  overflow-hidden bg-[#f5f5f5]" onSubmit={handleDataKaryawan}>
            <div className="w-[100%] h-max bg-[#278bc4] p-3">
              <h1>Input Transaksi Masuk</h1>
            </div>
            <div className="flex items-center w-[100%]  text-black p-3 justify-between  h-max">
              <div className="flex flex-col w-[45%] gap-2 ">
                <label htmlFor="nama_produk">Nama Produk</label>
                <select id="pilihan" name="nama_produk" className="bg-transparent border w-[100%]  p-1 outline-blue-400" value={namaProduk} onChange={(e) => setNamaProduk(e.target.value)} required disabled={isDisabled}>
                  {products.length > 0 &&
                    products.map((item) => (
                      <option value={item.nama_produk} key={item._id}>
                        {item.nama_produk}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col w-[45%] gap-2 ">
                <label htmlFor="">Quantity</label>
                <input
                  type="text"
                  className="bg-transparent border w-[100%]  p-1 outline-blue-400"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center w-[100%]  text-black p-2 justify-between h-max">
              <div className="flex flex-col w-[45%] gap-2">
                <label htmlFor="">Total Harga</label>
                <div className="flex items-center gap-2 justify-between  relative ">
                  <div className="absolute cursor-pointer left-1">
                    <p>Rp.</p>
                  </div>
                  <input
                    type='text'
                    name='harga'
                    className='border bg-transparent px-2 py-1 w-[100%] pl-8  outline-blue-400'
                    value={totalHarga}
                    onChange={(e) => setTotalHarga(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col w-[45%] gap-2 ">
                <label htmlFor="">Tanggal Transaksi</label>
                <input
                  type="date"
                  className="bg-transparent border w-[100%]  p-1 outline-blue-400"
                  name="notel"
                  value={tanggalTransaksi}
                  onChange={(e) => setTanggalTransaksi(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center w-[100%]  text-black p-2 justify-between  h-max">
              <div className="flex flex-col w-[100%] gap-2 ">
                <label htmlFor="">Keterangan</label>
                <textarea
                  type="text"
                  className="bg-transparent border w-[100%]  p-1 outline-blue-400"
                  name="keterangan"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  rows="3"
                  placeholder="Tulis Keterangan Anda..."
                ></textarea>
              </div>
            </div>
            <div className="flex items-center w-[100%]  text-black p-2 justify-between border border-gray-300 h-max gap-3">
              {messages ? <p className=' text-[crimson]'>{messages}</p> : <p></p>}
              <div className="">
                <button className="border py-1 px-7 rounded-lg bg-[crimson] text-white hover:bg-[#ba3650]" onClick={() => setIsModal(false)}>Close</button>
                {!idTransaksiMasuk ? (
                  <button className="border py-1 px-7 rounded-lg bg-[#278bc4] text-white hover:bg-[#3685b4]" type="submit" disabled={isLoading}>{isLoading ? 'Loading' : 'Tambah'}</button>
                ) : (
                  <button className="border py-1 px-7 rounded-lg bg-[#278bc4] text-white hover:bg-[#3685b4]" type="submit" disabled={isLoading}>{isLoading ? 'Loading' : 'Ubah'}</button>
                )}
              </div>
            </div>
          </form>
        </ShowModal>
      ) : null}
      <div className="w-[100%] h-[89vh] mt-[6%] p-2  flex flex-col gap-4">
        <h1 className="text-[1.2rem]">Data Riwayat Masuk</h1>
        <div className="w-[100%] h-[100%]  flex flex-col items-end gap-3">
          <div className="w-[100%] flex items-center justify-between">
            <div className="flex items-center justify-center gap-5">
              <input
                type="text"
                value={cariKaryawan}
                onChange={(e) => setCariKaryawan(e.target.value)}
                name="search_karyawan"
                placeholder="Cari Nama Karyawan"
                className="py-1 px-3 w-[300px] bg-transparent border border-gray-400 outline-sky-500"
              />
              {/* <button onClick={handleBtnCari} className="font-extrabold">
                <MdPersonSearch size={27} color="green" />
              </button> */}
            </div>
            <button className="border border-transparent py-1 px-3 rounded-md bg-[#00a6ff] hover:bg-[#3c98ca] duration-200 transition-all text-white" onClick={showModal}>Tambah Data</button>
          </div>
          <TabelRiwayatMasuk data={riwayatMasuk} edit={handleEditRiwayat} deleteRiwayat={handleDeleteRiwayat} />
        </div>
      </div>
    </Container>
  )
}