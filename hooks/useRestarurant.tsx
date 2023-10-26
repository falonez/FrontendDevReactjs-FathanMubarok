import {useState} from 'react'

const useRestarurant = () => {
  const api = 'https://restaurant-api.dicoding.dev/'
  const [restaurant, setRestaurant] = useState([])
  const [detailRestaurant, setDetailRestaurant] = useState([])
  
  function generateRandomTime() {
    const hours = Math.floor(Math.random() * 12); // Jam acak dalam format 1-12
    const minutes = Math.floor(Math.random() * 60); // Menit acak
    const amOrPm = Math.random() < 0.5 ? "AM" : "PM"; // Acak AM atau PM
  
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
  }

  function generateRandomPriceRange() {
    const priceRanges = ["Inexpensive", "Moderate", "Expensive"]; // Pilihan harga yang mungkin
    const randomIndex = Math.floor(Math.random() * priceRanges.length); // Indeks acak
  
    return priceRanges[randomIndex];
  }

  const getRestaurant = async () => {
    try{
        const res = await fetch(`${api}/list`,{
            method: 'GET',
        })
        const data = await res.json()
        const restaurantsWithRandomValues = data.restaurants.map(restaurant => {
            const openingHours = generateRandomTime();
            const closingHours = generateRandomTime();
            const priceRange = generateRandomPriceRange();
          
            return {
              ...restaurant,
              opening_hours: openingHours,
              closing_hours: closingHours,
              price_range: priceRange
            };
          });
        setRestaurant(restaurantsWithRandomValues)
    }catch(err){
        console.log(err)
        throw err
    }
 }

 const getDetailRestaurant = async (id:string) => {
    try{
        const res = await fetch(`${api}/detail/${id}`,{
            method: 'GET',
        })
        const data = await res.json()
        setDetailRestaurant(data.restaurant)
        console.log(data.restaurant)
    }catch(err){
        console.log(err)
        throw err
    }
 }

  return{
    restaurant,
    getRestaurant,
    getDetailRestaurant,
    detailRestaurant
  }
}

export default useRestarurant
