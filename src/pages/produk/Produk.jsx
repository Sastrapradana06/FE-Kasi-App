import { useEffect, useState  } from "react";
import Container from "../../components/container/Container";
import ShowModal from "../../components/show-modal/ShowModal";
import { MdOutlineContentPasteSearch } from "react-icons/md";

import { useShallow } from 'zustand/react/shallow'
import useKasirStore from "../../store/store";
import { deleteProductsApi, getProductsApi } from "../../utils/api";
import TabelProduk from "./TabelProduk";

export default function Produk() {
  const [isModal, setIsModal] = useState(false)
  const [messages, setMessages] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const [namaProduk, setNamaProduk] = useState('')
  const [hargaProduk, setHargaProduk] = useState('')
  const [quantityProduk, setQuantityProduk] = useState('')
  const [idProduk, setIdProduk] = useState(undefined)
  const [cariProduk, setCariProduk] = useState('')


  const [products, updateProducts, getProducts] = useKasirStore(
    useShallow((state) => [state.products, state.updateProducts, state.getProducts])
  )

  useEffect(() => {
    if (products.length == 0) {
      getProducts()
    }
  }, [])

  const handleDataProduk = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const dataInput = {
      nama_produk: namaProduk.toLowerCase(),
      harga: parseFloat(hargaProduk),
      stok: parseFloat(quantityProduk),
      idProduk
    }

    try {
      const {message, products} = await getProductsApi(dataInput)

      if(products.length !== 0) {
        updateProducts(products)
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

  const handleDeleteProduk = async (id) => {
    try {
      const newProduk = await deleteProductsApi(id)

      if(newProduk) {
        updateProducts(newProduk)
      }
      
    } catch (error) {
      console.log({error});
    }
  }

  const handleEditProduk = async (data) => {
    const {_id, nama_produk, harga, stok} = data
    showModal()
    setNamaProduk(nama_produk)
    setHargaProduk(harga)
    setQuantityProduk(stok)
    setIdProduk(_id)
  }

  const showModal = () => {
    setMessages(undefined)
    setNamaProduk('')
    setHargaProduk('')
    setQuantityProduk('')
    setIdProduk(undefined)
    setIsModal(true)
    setIsLoading(false)
  }

  const handleBtnCari = () => {
    if(cariProduk !== '') {
      const cariProdukName = products.filter((data) => {
        return data.nama_produk === cariProduk
      })
      updateProducts(cariProdukName)
    }
  }

  return (
    <Container>
      {isModal ? (
        <ShowModal>
          <form className="w-[50%] h-max border rounded-lg flex flex-col  overflow-hidden bg-[#f5f5f5]" onSubmit={handleDataProduk}>
            <div className="w-[100%] h-max bg-[#278bc4] p-3">
              <h1>Input Data Produk</h1>
            </div>
            <div className="flex items-center w-[100%]  text-black p-3 justify-between  h-max">
              <div className="flex flex-col w-[45%] gap-2 ">
                <label htmlFor="">Nama Produk</label>
                <input 
                  type="text" 
                  className="bg-transparent border w-[100%] p-1 outline-blue-400" 
                  name="nama_produk" 
                  value={namaProduk} 
                  onChange={(e) => setNamaProduk(e.target.value)}
                  required 
                />
              </div>
              <div className="flex flex-col w-[45%] gap-2">
                <label htmlFor="">Harga</label>
                <div className="flex items-center gap-2 justify-between  relative ">
                  <div className="absolute cursor-pointer left-1">
                    <p>Rp.</p>
                  </div>
                  <input 
                    type='text' 
                    name='harga' 
                    className='border bg-transparent px-2 py-1 w-[100%] pl-8  outline-blue-400' 
                    value={hargaProduk} 
                    onChange={(e) => setHargaProduk(e.target.value)}
                    required 
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center w-[100%]  text-black p-2 justify-between border-b border-gray-300 h-max">
              <div className="flex flex-col w-[45%] gap-2 ">
                <label htmlFor="">Stok Produk</label>
                <input 
                  type="text" 
                  className="bg-transparent border w-[100%]  p-1 outline-blue-400" 
                  name="quantity" 
                  value={quantityProduk} 
                  onChange={(e) => setQuantityProduk(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="flex items-center w-[100%]  text-black p-2 justify-between border-b border-gray-300 h-max gap-3">
              {messages ? <p className=' text-[crimson]'>{messages}</p> : <p></p>}
              <div className="">
                <button className="border py-1 px-7 rounded-lg bg-[crimson] text-white hover:bg-[#ba3650]" onClick={() => setIsModal(false)}>Close</button>
                {!idProduk ? (
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
        <h1 className="text-[1.2rem]">Data Produk</h1>
        <div className="w-[100%] h-[100%]  flex flex-col items-end gap-3">
          <div className="w-[100%] flex items-center justify-between">
            <div className="flex items-center justify-center gap-5">
              <input 
                type="text" 
                value={cariProduk}
                onChange={(e) => setCariProduk(e.target.value)}
                name="search_produk" 
                placeholder="Cari Produk" 
                className="py-1 px-3 w-[300px] bg-transparent border outline-sky-500 border-gray-400"
              />
              <button onClick={handleBtnCari}>
                <MdOutlineContentPasteSearch size={27} color="green"/>
              </button>
            </div>
            <button className="border border-transparent py-1 px-3 rounded-md bg-[#00a6ff] hover:bg-[#3c98ca] duration-200 transition-all text-white" onClick={showModal}>Tambah Data</button>
          </div>
          <TabelProduk  dataProduk={products} edit={handleEditProduk} deleteProduk={handleDeleteProduk}/>
        </div>
      </div>
    </Container>
  )
}