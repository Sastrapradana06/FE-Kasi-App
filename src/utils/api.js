export async function getProductsApi(data) {
  const response = await fetch('http://localhost:3000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const { message, products } = await response.json()
  return {message, products}
}

export async function deleteProductsApi(id) {
  const response = await fetch('http://localhost:3000/api/delete-products', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
  })

  const { data } = await response.json()
  return data
}

export async function getKaryawanApi(data) {
  const response = await fetch('http://localhost:3000/api/karyawan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const { message, karyawan } = await response.json()
  return {message, karyawan}
}

export async function deleteKaryawanApi(id) {
  const response = await fetch('http://localhost:3000/api/delete-karyawan', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
  })

  const { data } = await response.json()
  return data
}

export async function getRiwayatMasukApi(data) {
  const response = await fetch('http://localhost:3000/api/riwayat-masuk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const { message, riwayatMasuk } = await response.json()
  return {message, riwayatMasuk}
}

export async function deleteRiwayatMasukApi(id) {
  const response = await fetch('http://localhost:3000/api/delete-riwayat-masuk', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
  })

  const { data } = await response.json()
  return data
}


export async function getRiwayatKeluarApi(data) {
  const response = await fetch('http://localhost:3000/api/riwayat-keluar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const { message, riwayatKeluar } = await response.json()
  return {message, riwayatKeluar}
}

export async function deleteRiwayatKeluarApi(id) {
  const response = await fetch('http://localhost:3000/api/delete-riwayat-keluar', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
  })

  const { data } = await response.json()
  return data
}