import {useEffect, useState} from 'react'
import CardRestaurant from '../components/CardRestaurant'
import useRestarurant from '../hooks/useRestarurant'

const Home : React.FC = () => {

  const {getRestaurant, restaurant,filterCategory} = useRestarurant()
  const [loadMore, setLoadMore] = useState(1)
  
  useEffect(() => {
    getRestaurant()
  }, [])

  const handleLoadMore = () => {
    setLoadMore(loadMore+1)
  }

  const [filterOptions, setFilterOptions] = useState({
    openNow: false,
    price: "",
    categories: ""
  });

  useEffect(()=>{
    setFilteredRestaurants(restaurant)
  },[restaurant])

  const [filteredRestaurants, setFilteredRestaurants] = useState();
  useEffect(()=>{    
    if(filterOptions?.categories){
      filterCategory(filterOptions?.categories, filterOptions)
    }
  },[filterOptions?.categories])
  
  useEffect(()=>{
      let filtered = []
      if(filterOptions?.openNow){
        setFilteredRestaurants(filtered = filteredRestaurants?.filter((item)=>item?.status_open === 'open'))
      }else{
        setFilteredRestaurants(restaurant)
      }
  },[filterOptions?.openNow])

  useEffect(()=>{
      const filtered = filteredRestaurants?.filter((item)=>item?.price_range === filterOptions?.price)
      if(filtered?.length === 0){
        setFilteredRestaurants(restaurant)
      }else{ 
        setFilteredRestaurants(filtered)
      }
  },[filterOptions?.price])

  const clearAllFilter = () => {
    setFilterOptions({
      openNow: false,
      price: "",
      categories: ""
    })
    getRestaurant()
  }

  return (
    <>
      <div className='mx-[12%] flex flex-col mb-10'>
        <h1 className='text-4xl font-bold mt-10'>TuangKeun Kuy</h1>
        <p className='py-5 text-lg fontsemi'>"Tuangkeun Kuy" adalah platform inovatif yang memungkinkan para pecinta kuliner untuk menjelajahi dan menemukan beragam restoran di seluruh Indonesia. Dengan koleksi yang komprehensif dari restoran-restoran terbaik di berbagai kota, Tuangkeun Euy menjadi teman setia bagi mereka yang ingin menggali pengalaman kuliner yang tak terlupakan di seluruh negeri.</p>
        <hr />
        <div className='flex flex-row justify-between py-3'>
          <div className='flex gap-4 items-center'>
            <p>Filter By:</p>
            <div className='flex items-center justify-center'>
              <input type="checkbox" id="open-now" onChange={()=>setFilterOptions({...filterOptions, openNow: !filterOptions?.openNow})}/>
              <label htmlFor="open-now" className='ml-2'>Open Now</label>
            </div>
            <select name="price" id="" className='p-2' onChange={(e)=>setFilterOptions({...filterOptions, price:e.target.value})}>
              <option value="" className='p-2'>Price</option>
              <option value="Inexpensive" className='p-2'>Inexpensive</option>
              <option value="Moderate" className='p-2'>Moderate</option>
              <option value="Expensive" className='p-2'>Expensive</option>
            </select>
            <select name="categories" id="" onChange={(e)=>setFilterOptions({...filterOptions, categories:e.target.value})}>
              <option value="">Categories</option>
              <option value="Modern">Modern</option>
              <option value="Italia">Italia</option>
              <option value="Spanyol">Spanyol</option>
              <option value="Bali">Bali</option>
            </select>
          </div>
          <div className='border-2 py-2 px-6 rounded-sm cursor-pointer hover:bg-blue-800 hover:text-white' onClick={clearAllFilter}>CLEAR ALL</div>
        </div>
        <hr />
        <h1 className='py-5 text-2xl'>All Restaurant</h1>
        <div className='grid grid-cols-[1fr_1fr_1fr_1fr] gap-20'>
          {filteredRestaurants?.slice(0,8*loadMore).map((item,index)=>{
            return(
              <CardRestaurant key={index} data={item}/>
            )
          })}
        </div>
        {filteredRestaurants?.length === 0 && <div className='text-center text-2xl mt-20'>No Restaurant Found</div>}
        {filteredRestaurants?.length > 8*loadMore && <div className=' self-center w-auto border-2 border-blue-800 text-blue-800 text-center mt-20 py-4 px-12 hover:bg-blue-800 hover:text-white cursor-pointer' onClick={handleLoadMore}>LOAD MORE</div>}
      </div>
    </>
  )
}

export default Home
