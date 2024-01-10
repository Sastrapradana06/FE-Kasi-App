import { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import ShowModal from "../../components/show-modal/ShowModal";
import { MdPersonSearch } from "react-icons/md";

import { useShallow } from 'zustand/react/shallow'
import useKasirStore from "../../store/store";
import {deleteKaryawanApi, getKaryawanApi } from "../../utils/api";

export default function Karyawan() {
  const [isModal, setIsModal] = useState(false)
  const [messages, setMessages] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const [namaKaryawan, setNamaKaryawan] = useState('')
  const [email, setEmail] = useState('')
  const [notel, setNotel] = useState('')
  const [jabatan, setJabatan] = useState('')
  const [alamat, setAlamat] = useState('')
  const [fotoUrl, setFotoUrl] = useState(null);


  const [idKaryawan, setIdKaryawan] = useState(undefined)
  const [cariKaryawan, setCariKaryawan] = useState('')


  const headers = ["NO", "ID", "NAMA", "EMAIL", "NOTEL", "JABATAN", "FOTO", "AKSI"];

  const [karyawan, updateKaryawan, getKaryawan] = useKasirStore(
    useShallow((state) => [state.karyawan, state.updateKaryawan, state.getKaryawan])
  )

  useEffect(() => {
    if (karyawan.length == 0 || cariKaryawan == '') {
      getKaryawan()
    }
  }, [karyawan, getKaryawan, cariKaryawan])

  const handleDataKaryawan = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const dataInput = {
      nama: namaKaryawan.toLowerCase(),
      email,
      notel,
      jabatan ,
      foto: fotoUrl,
      alamat,
      idKaryawan,
    }

    try {
      const { message, karyawan } = await getKaryawanApi(dataInput)

      if (karyawan.length !== 0) {
        updateKaryawan(karyawan)
        setMessages(message)
        setIsModal(false)
      } else {
        setMessages(message)
      }

      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteKaryawan = async (id) => {
    try {
      const newKaryawan = await deleteKaryawanApi(id)

      if (newKaryawan) {
        updateKaryawan(newKaryawan)
      }

    } catch (error) {
      console.log({ error });
    }
  }


  const handleEditkaryawan = async (data) => {
    const {_id, nama, email, notel, jabatan, foto, alamat} = data
    showModal()
    setNamaKaryawan(nama)
    setEmail(email)
    setNotel(notel)
    setJabatan(jabatan)
    setFotoUrl(foto)
    setAlamat(alamat)
    setIdKaryawan(_id)
  }

  const showModal = () => {
    setMessages(undefined)
    setNamaKaryawan('')
    setEmail('')
    setNotel('')
    setAlamat('')
    setIdKaryawan(undefined)
    setIsModal(true)
    setIsLoading(false)
    setJabatan('')
  }

  const handleBtnCari = () => {
    if (cariKaryawan !== '') {
      const cariKaryawanName = karyawan.filter((data) => {
        return data.nama === cariKaryawan
      })
      updateKaryawan(cariKaryawanName)
    }
  }

  const handleFileFoto = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFotoUrl(imageUrl);
    }
  };


  return (
    <Container>
      {isModal ? (
        <ShowModal>
          <form className="w-[50%] h-max border rounded-lg flex flex-col  overflow-hidden bg-[#f5f5f5]" onSubmit={handleDataKaryawan}>
            <div className="w-[100%] h-max bg-[#278bc4] p-3">
              <h1>Input Data Karyawan</h1>
            </div>
            <div className="flex items-center w-[100%]  text-black p-3 justify-between  h-max">
              <div className="flex flex-col w-[100%] gap-2 ">
                <label htmlFor="nama_karyawan">Nama Karyawan</label>
                <input
                  type="text"
                  className="bg-transparent border w-[100%] p-1 outline-blue-400"
                  name="nama_karyawan"
                  value={namaKaryawan}
                  onChange={(e) => setNamaKaryawan(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center w-[100%]  text-black p-2 justify-between h-max">
              <div className="flex flex-col w-[45%] gap-2 ">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className="bg-transparent border w-[100%]  p-1 outline-blue-400"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-[45%] gap-2 ">
                <label htmlFor="">No Telepon</label>
                <input
                  type="text"
                  className="bg-transparent border w-[100%]  p-1 outline-blue-400"
                  name="notel"
                  value={notel}
                  onChange={(e) => setNotel(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center w-[100%]  text-black p-2 justify-between  h-max">
              <div className="flex flex-col w-[45%] gap-2 ">
                <label htmlFor="">Jabatan</label>
                <input
                  type="text"
                  className="bg-transparent border w-[100%]  p-1 outline-blue-400"
                  name="jabatan"
                  value={jabatan}
                  onChange={(e) => setJabatan(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-[45%] gap-2 ">
                <label htmlFor="">Foto</label>
                <input
                  id="fotoInput"
                  type="file"
                  className="bg-transparent border w-[100%]  p-1 outline-blue-400"
                  name="foto"
                  onChange={handleFileFoto}
                />
              </div>
            </div>
            <div className="flex items-center w-[100%]  text-black p-2 justify-between  h-max">
              <div className="flex flex-col w-[100%] gap-2 ">
                <label htmlFor="">Alamat</label>
                <textarea
                  className="bg-transparent border w-[100%] p-1 outline-blue-400"
                  name="alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center w-[100%]  text-black p-2 justify-between border border-gray-300 h-max gap-3">
              {messages ? <p className=' text-[crimson]'>{messages}</p> : <p></p>}
              <div className="">
                <button className="border py-1 px-7 rounded-lg bg-[crimson] text-white hover:bg-[#ba3650]" onClick={() => setIsModal(false)}>Close</button>
                {!idKaryawan ? (
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
        <h1 className="text-[1.2rem]">Data Karyawan</h1>
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
              <button onClick={handleBtnCari} className="font-extrabold">
                <MdPersonSearch size={27} color="green" />
              </button>
            </div>
            <button className="border border-transparent py-1 px-3 rounded-md bg-[#00a6ff] hover:bg-[#3c98ca] duration-200 transition-all text-white" onClick={showModal}>Tambah Data</button>
          </div>
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
            {karyawan.length > 0 ? (
              karyawan.map((item, i) => (
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
                        <img src={item.foto} alt={item.nama} className="w-[50px] h-[50px] object-cover rounded-[100%] m-auto cursor-pointer"/>
                      </button>
                    </td>
                    <td className="p-2 border text-end border-gray-300  ">
                      <div className="flex justify-center items-center gap-3">
                        <button className="bg-[#008035] py-1 px-4 rounded-sm text-white" onClick={() => handleEditkaryawan(item)}>Edit</button>
                        <button className="bg-[crimson] py-1 px-4 rounded-sm text-white hover:bg-[#bc3752]" onClick={() => handleDeleteKaryawan(item._id)}>Hapus</button>      
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center text-[crimson]">Data Karyawan Kosong</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </Container>
  )
}