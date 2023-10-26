import {useState} from 'react'

const useRestarurant = () => {
  const api = 'https://restaurant-api.dicoding.dev/'
  const [restaurant, setRestaurant] = useState([])
  const [detailRestaurant, setDetailRestaurant] = useState([])
  
  function randomOpenOrClosed() {
    return Math.random() < 0.5 ? "open" : "closed";
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
            const open = randomOpenOrClosed();
            const priceRange = generateRandomPriceRange();
          
            return {
              ...restaurant,
              status_open: open,
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
 
 const filterCategory = async (category:string, filterOptions:any) => {
    try{
        const res = await fetch(`${api}/search?q=${category}`,{
            method: 'GET',
        })
        const data = await res.json()
        const restaurantsWithRandomValues = data.restaurants.map(restaurant => {
            const open = randomOpenOrClosed();
            const priceRange = generateRandomPriceRange();
          
            return {
              ...restaurant,
              status_open: open,
              price_range: priceRange
            };
          });
        
        if(filterOptions?.openNow || filterOptions?.price){
            const filtered = restaurantsWithRandomValues?.filter((item)=>item?.status_open === 'open' || item?.price_range === filterOptions?.price)
            setRestaurant(filtered)
            return filtered
        }else{
            setRestaurant(restaurantsWithRandomValues)
            return restaurantsWithRandomValues
        }
    } catch(err){
        console.log(err)
        throw err
    }
}


  return{
    restaurant,
    getRestaurant,
    getDetailRestaurant,
    detailRestaurant,
    filterCategory
  }
}

export default useRestarurant
