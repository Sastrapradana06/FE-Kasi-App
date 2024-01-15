import { fetchKeluarFromDatabase, fetchMasukFromDatabase } from "./api";

export async function prepareChartData() {
  const riwayatKeluar = await fetchKeluarFromDatabase();
  const riwayatMasuk = await fetchMasukFromDatabase();

  console.log({riwayatKeluar, riwayatMasuk});

  const labels = riwayatKeluar.map(entry => entry.tgl_transaksi);
  console.log({labels});

  const groupedData = {};

  labels.forEach((day) => {
    groupedData[day] = {
      transaksiKeluar: [],
      transaksiMasuk: [],
    };
  });

  riwayatKeluar.forEach((entry) => {
    groupedData[entry.
      tgl_transaksi].transaksiKeluar.push(entry.
        total_harga);
  });

  riwayatMasuk.forEach((entry) => {
    groupedData[entry.
      tgl_transaksi].transaksiMasuk.push(entry.
        total_harga);
  });

  console.log({groupedData});



  const data = {
    labels,
    datasets: [
      {
        label: 'Transaksi Masuk',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        data: labels.map((day) => groupedData[day].transaksiMasuk.reduce((acc, curr) => acc + curr, 0)),
      },
      {
        label: 'Transaksi Keluar',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        data: labels.map((day) => groupedData[day].transaksiKeluar.reduce((acc, curr) => acc + curr, 0)),
      },
    ],
  };

  return data;
}