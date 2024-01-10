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