export async function getProductsApi(data) {
  const response = await fetch('http://localhost:3000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  
  
  if(response.ok) {
    const {products } = await response.json()
    return products
  } else {
    return []
  }
}