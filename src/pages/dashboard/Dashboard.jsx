import Container from "../../components/container/Container";

import { BsCartCheckFill } from "react-icons/bs";
import { FaClipboardUser, FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";

import Chart from "./Chart";
import { useShallow } from 'zustand/react/shallow'
import useKasirStore from "../../store/store";
import { useState } from "react";

export default function Dashboard() {
  const [transaksiMasuk, setTransaksiMasuk] = useState(0)
  const [transaksiKeluar, setTransaksiKeluar] = useState(0)
  const [totalProfit, setTotalProfit] = useState(0)

  const [products, karyawan, riwayatMasuk, riwayatKeluar] = useKasirStore(
    useShallow((state) => [state.products, state.karyawan, state.riwayatMasuk, state.riwayatKeluar])
  )

  // console.log({products, karyawan, riwayatMasuk, riwayatKeluar});

  useState(() => {
    const totalHargaMasuk = riwayatMasuk.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total_harga;
    }, 0);
    // console.log({totalHargaMasuk});
    setTransaksiMasuk(totalHargaMasuk)

    const totalHargaKeluar = riwayatKeluar.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total_harga;
    }, 0);
    setTransaksiKeluar(totalHargaKeluar)

    const totalProfitAll = totalHargaKeluar - totalHargaMasuk
    setTotalProfit(totalProfitAll)

  }, [])

  return (
    <Container>
      <div className="w-[100%] h-[89vh] mt-[6%] p-2">
        <div className="w-[100%] h-[100px] flex items-center justify-between mt-3">
          <div className="w-[230px] h-[100%] border border-[salmon] rounded-lg flex items-center bg-[#fa807230]">
            <div className="w-[30%] h-[100%] flex justify-center items-center">
              <div className=" py-3 px-2 bg-[salmon] rounded-md">
                <BsCartCheckFill size={35} fill="white"/>
              </div>
            </div>
            <div className="w-[70%] h-[100%] flex items-center">
              <div className=" rounded-md flex flex-col ">
                <p className="font-extrabold text-[1.2rem]">Produk</p>
                <p className="text-[.8rem]">
                  {products.length != 0 ? `${products.length} +` : 0}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[230px] h-[100%] border border-green-300 rounded-lg flex items-center bg-[#44ff443c]">
            <div className="w-[30%] h-[100%] flex justify-center items-center">
              <div className=" py-3 px-2 bg-green-600 rounded-md">
                <FaClipboardUser size={35} fill="white"/>
              </div>
            </div>
            <div className="w-[70%] h-[100%] flex items-center">
              <div className=" rounded-md flex flex-col ">
                <p className="font-extrabold text-[1.2rem]">Karyawan</p>
                <p className="text-[.8rem]">
                  {karyawan.length != 0 ? `${karyawan.length} +` : 0}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[230px] h-[100%] border border-teal-300 rounded-lg flex items-center bg-[#00808037]">
            <div className="w-[30%] h-[100%] flex justify-center items-center">
              <div className=" py-3 px-2 bg-teal-600 rounded-md">
                <FaArrowTrendDown size={35} fill="white"/>
              </div>
            </div>
            <div className="w-[70%] h-[100%] flex items-center">
              <div className=" rounded-md flex flex-col ">
                <p className="font-extrabold text-[1.2rem]">Transaksi Masuk</p>
                <p className="text-[.8rem]">
                  {transaksiMasuk.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[230px] h-[100%] border border-red-300 rounded-lg flex items-center bg-[#dc143c45]">
            <div className="w-[30%] h-[100%] flex justify-center items-center">
              <div className=" py-3 px-2 bg-[crimson] rounded-md">
                <FaArrowTrendUp size={35} fill="white"/>
              </div>
            </div>
            <div className="w-[70%] h-[100%] flex items-center">
              <div className=" rounded-md flex flex-col ">
                <p className="font-extrabold text-[1.2rem]">Transaksi Keluar</p>
                <p className="text-[.8rem]">
                  {transaksiKeluar.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[230px] h-[100%] border border-sky-300 rounded-lg flex items-center bg-[#1e7ea13c]">
            <div className="w-[30%] h-[100%] flex justify-center items-center">
              <div className=" py-3 px-2 bg-sky-700 rounded-md">
                <GiReceiveMoney size={35} fill="white"/>
              </div>
            </div>
            <div className="w-[70%] h-[100%] flex items-center">
              <div className=" rounded-md flex flex-col ">
                <p className="font-extrabold text-[1.2rem]">Profit</p>
                <p className="text-[.8rem]">
                  {totalProfit.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[450px] mt-10 flex gap-2">
          <div className="w-[100%] h-[450px] flex justify-center">
            <Chart />
          </div>
        </div>
      </div>
    </Container>
  )
}