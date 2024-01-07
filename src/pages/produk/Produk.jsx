import { useEffect, useState  } from "react";
import Container from "../../components/container/Container";
import ShowModal from "../../components/show-modal/ShowModal";

import { useShallow } from 'zustand/react/shallow'
import useKasirStore from "../../store/store";

export default function Produk() {
  const [isModal, setIsModal] = useState(false)
  const [messages, setMessages] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const [namaProduk, setNamaProduk] = useState('')
  const [hargaProduk, setHargaProduk] = useState()
  const [quantityProduk, setQuantityProduk] = useState()
  const [idProduk, setIdProduk] = useState(undefined)


  const headers = ["NO", "ID", "NAMA PRODUK", "HARGA", "QUANTITY", "AKSI"];

  const [products, updateProducts, getProducts] = useKasirStore(
    useShallow((state) => [state.products, state.updateProducts, state.getProducts])
  )

  useEffect(() => {
    if (products.length == 0) {
      getProducts()
    }
  }, [products, getProducts])

  const handleDataProduk = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const dataInput = {
      nama_produk: namaProduk.toLowerCase(),
      harga: parseFloat(hargaProduk),
      quantity: parseFloat(quantityProduk),
      idProduk
    }

    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataInput)
      })

      const { message, products } = await response.json()
      if(response.ok) {
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
      const response = await fetch('http://localhost:3000/api/delete-products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      })

      if(response.ok) {
        const { data } = await response.json()
        updateProducts(data)
      }
      
    } catch (error) {
      console.log({error});
    }
  }

  const handleEditProduk = async (data) => {
    const {_id, nama_produk, harga, quantity} = data
    showModal()
    setNamaProduk(nama_produk)
    setHargaProduk(harga)
    setQuantityProduk(quantity)
    setIdProduk(_id)

  }

  const showModal = () => {
    setMessages(undefined)
    setNamaProduk('')
    setHargaProduk()
    setQuantityProduk()
    setIdProduk(undefined)
    setIsModal(true)
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
                  className="bg-transparent border w-[100%] p-1 " 
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
                    className='border bg-transparent px-2 py-1 w-[100%] pl-8 ' 
                    value={hargaProduk} 
                    onChange={(e) => setHargaProduk(e.target.value)}
                    required 
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center w-[100%]  text-black p-2 justify-between border-b border-gray-300 h-max">
              <div className="flex flex-col w-[45%] gap-2 ">
                <label htmlFor="">Quantity</label>
                <input 
                  type="text" 
                  className="bg-transparent border w-[100%]  p-1 " 
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
      <div className="w-[100%] h-[89vh] mt-[6%] p-2  flex flex-col gap-2">
        <h1 className="text-[1.2rem]">Data Produk</h1>
        <div className="w-[100%] h-[100%]  flex flex-col items-end gap-3">
          <button className="border border-transparent py-1 px-3 rounded-md bg-[#00a6ff] hover:bg-[#3c98ca] duration-200 transition-all text-white" onClick={showModal}>Tambah Data</button>
          <table className="border w-[100%] h-max " >
            <thead >
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="border p-2 border-gray-300">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            {products.length > 0 ? (
              products.map((item, i) => (
                <tbody key={i} >
                  <tr>
                    <td className="border p-1 text-center border-gray-300">{i + 1}</td>
                    <td className="border p-1 text-center border-gray-300">{item._id}</td>
                    <td className="p-2 border border-gray-300 capitalize">{item.nama_produk}</td>
                    <td className="p-2 border text-end border-gray-300">{item.harga.toLocaleString()}</td>
                    <td className="p-2 border text-end border-gray-300">{item.quantity.toLocaleString()}</td>
                    <td className="flex items-center justify-center gap-2 border p-2 border-gray-300">
                      <button className="bg-[#008035] py-1 px-4 rounded-sm text-white" onClick={() => handleEditProduk(item)}>Edit</button>
                      <button className="bg-[crimson] py-1 px-4 rounded-sm text-white hover:bg-[#bc3752]" onClick={() => handleDeleteProduk(item._id)}>Hapus</button>
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
        </div>
      </div>
    </Container>
  )
}