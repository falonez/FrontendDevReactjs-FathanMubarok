import {useState} from 'react'
import {toast} from '../utils/SweetAlert'

interface Restaurant {
    id: string;
    name: string;
    description: string;
    city: string;
    address: string;
    pictureId: string;
    categories: { name: string }[];
    menus: {
        foods: { name: string }[];
        drinks: { name: string }[];
    };
    rating: number;
    customerReviews: {
        name: string;
        review: string;
        date: string;
    }[];
}

interface RestaurantAll {
    id: string;
    name: string;
    description: string;
    pictureId: string;
    city: string;
    rating: number;
    status_open: string;
    price_range: string;
}

interface filterOptions{
    openNow: boolean;
    price: string;
    categories: string;
  }

interface reviewForm{
    id: string;
    name: string;
    review: string;
}
const useRestarurant = () => {
  const api = 'https://restaurant-api.dicoding.dev'
  const googleMapsApiKey = "AIzaSyCt1Ulw6Yll6xvehBMaxBElO8mTt6pXM6k"
  const [restaurant, setRestaurant] = useState<RestaurantAll[]>([])
  const [detailRestaurant, setDetailRestaurant] = useState<Restaurant>()
  
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
    }catch(err){
        console.log(err)
        throw err
    }
 }
 
 const filterCategory = async (category:string, filterOptions:filterOptions) => {
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

const addReview = async (form:reviewForm) => {
    try{
        const res = await fetch(`${api}/review`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        getDetailRestaurant(form.id)
        toast('success', 'Review Added')
        return data
    }catch{
        throw new Error('Error')
    }
}

const getCoordinate = async (address:string) => {
    try{
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleMapsApiKey}`,{
            method: 'GET',
        })
        const data = await res.json()
        return data.results[0]?.geometry?.location
    }catch(err){
        console.log(err)
        throw err
    }
}

  return{
    restaurant,
    getRestaurant,
    getDetailRestaurant,
    detailRestaurant,
    filterCategory,
    addReview,
    getCoordinate
  }
}

export default useRestarurant
