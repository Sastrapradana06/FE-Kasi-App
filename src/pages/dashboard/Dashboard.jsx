import Container from "../../components/container/Container";
import { BsCartCheckFill } from "react-icons/bs";
import { FaClipboardUser, FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import Chart from "./Chart";

export default function Dashboard() {
  return (
    <Container>
      <div className="w-[100%] h-[89vh] mt-[6%] p-2">
        <div className="w-[100%] h-[100px] flex items-center justify-around mt-3">
          <div className="w-[250px] h-[100%] border border-sky-300 rounded-lg flex items-center bg-[#1e7ea13c]">
            <div className="w-[30%] h-[100%] flex justify-center items-center">
              <div className=" py-3 px-2 bg-sky-700 rounded-md">
                <BsCartCheckFill size={35} fill="white"/>
              </div>
            </div>
            <div className="w-[70%] h-[100%] flex items-center">
              <div className=" rounded-md flex flex-col ">
                <p className="font-extrabold text-[1.2rem]">Produk</p>
                <p className="text-[.8rem]">50+</p>
              </div>
            </div>
          </div>
          <div className="w-[250px] h-[100%] border border-green-300 rounded-lg flex items-center bg-[#36c22e3c]">
            <div className="w-[30%] h-[100%] flex justify-center items-center">
              <div className=" py-3 px-2 bg-green-600 rounded-md">
                <FaClipboardUser size={35} fill="white"/>
              </div>
            </div>
            <div className="w-[70%] h-[100%] flex items-center">
              <div className=" rounded-md flex flex-col ">
                <p className="font-extrabold text-[1.2rem]">Karyawan</p>
                <p className="text-[.8rem]">30+</p>
              </div>
            </div>
          </div>
          <div className="w-[250px] h-[100%] border border-teal-300 rounded-lg flex items-center bg-[#00808037]">
            <div className="w-[30%] h-[100%] flex justify-center items-center">
              <div className=" py-3 px-2 bg-teal-600 rounded-md">
                <FaArrowTrendDown size={35} fill="white"/>
              </div>
            </div>
            <div className="w-[70%] h-[100%] flex items-center">
              <div className=" rounded-md flex flex-col ">
                <p className="font-extrabold text-[1.2rem]">Transaksi Masuk</p>
                <p className="text-[.8rem]">Rp. 400.000.000</p>
              </div>
            </div>
          </div>
          <div className="w-[250px] h-[100%] border border-red-300 rounded-lg flex items-center bg-[#dc143c45]">
            <div className="w-[30%] h-[100%] flex justify-center items-center">
              <div className=" py-3 px-2 bg-[crimson] rounded-md">
                <FaArrowTrendUp size={35} fill="white"/>
              </div>
            </div>
            <div className="w-[70%] h-[100%] flex items-center">
              <div className=" rounded-md flex flex-col ">
                <p className="font-extrabold text-[1.2rem]">Transaksi Keluar</p>
                <p className="text-[.8rem]">Rp. 600.000.000</p>
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