import { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import ShowModal from "../../components/show-modal/ShowModal";

import { MdPersonSearch } from "react-icons/md";
import { RxReset } from "react-icons/rx";


import { useShallow } from 'zustand/react/shallow'
import useKasirStore from "../../store/store";
import {deleteKaryawanApi, getKaryawanApi } from "../../utils/api";
import TabelKaryawan from "./TabelKaryawan";

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


  const [karyawan, updateKaryawan, getKaryawan] = useKasirStore(
    useShallow((state) => [state.karyawan, state.updateKaryawan, state.getKaryawan])
  )

  useEffect(() => {
    if (karyawan.length == 0 ) {
      getKaryawan()
    }
  }, [])

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

  const resetCariKaryawan = () => {
    getKaryawan()
    setCariKaryawan('')
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
              {cariKaryawan !== '' && (
                <button onClick={resetCariKaryawan}>
                  <RxReset size={27} color="crimson"/>
                </button>
              )}
            </div>
            <button className="border border-transparent py-1 px-3 rounded-md bg-[#00a6ff] hover:bg-[#3c98ca] duration-200 transition-all text-white" onClick={showModal}>Tambah Data</button>
          </div>
          <TabelKaryawan dataKaryawan={karyawan} edit={handleEditkaryawan} deleteKaryawan={handleDeleteKaryawan}/>
        </div>
      </div>
    </Container>
  )
}