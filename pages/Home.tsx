import {useEffect, useState} from 'react'
import CardRestaurant from '../components/CardRestaurant'
import useRestarurant from '../hooks/useRestarurant'

const Home : React.FC = () => {

  const {getRestaurant, restaurant} = useRestarurant()
  const [loadMore, setLoadMore] = useState(1)
  
  useEffect(() => {
    getRestaurant()
  }, [])

  const handleLoadMore = () => {
    setLoadMore(loadMore+1)
  }
  console.log(restaurant)
  return (
    <>
      <div className='mx-[12%] flex flex-col mb-10'>
        <h1 className='text-3xl font-bold'>TuangKeun Kuy</h1>
        <p className='py-5 text-lg fontsemi'>"Tuangkeun Kuy" adalah platform inovatif yang memungkinkan para pecinta kuliner untuk menjelajahi dan menemukan beragam restoran di seluruh Indonesia. Dengan koleksi yang komprehensif dari restoran-restoran terbaik di berbagai kota, Tuangkeun Euy menjadi teman setia bagi mereka yang ingin menggali pengalaman kuliner yang tak terlupakan di seluruh negeri.</p>
        <hr />
        <div className='flex flex-row justify-between py-3'>
          <div className='flex gap-4 items-center'>
            <p>Filter By:</p>
            <div>
              <input type="checkbox" id="open-now"/>
              <label htmlFor="open-now" className='ml-2'>Open Now</label>
            </div>
            <select name="price" id="" className='p-2'>
              <option value="" className='p-2'>Price</option>
              <option value="" className='p-2'>$$</option>
              <option value="" className='p-2'>$$$</option>
              <option value="" className='p-2'>$$$$</option>
            </select>
            <select name="categories" id="">
              <option value="">Categories</option>
              <option value="">Fast Food</option>
              <option value="">Restaurant</option>
              <option value="">Cafe</option>
            </select>
          </div>
          <div className='border-2 py-2 px-6 rounded-sm cursor-pointer hover:bg-blue-800 hover:text-white'>CLEAR ALL</div>
        </div>
        <hr />
        <h1 className='py-5 text-2xl'>All Restaurant</h1>
        <div className='grid grid-cols-[1fr_1fr_1fr_1fr] gap-20'>
          {restaurant?.slice(0,8*loadMore).map((item,index)=>{
            return(
              <CardRestaurant key={index} data={item}/>
            )
          })}
        </div>
        <div className=' self-center w-auto border-2 border-blue-800 text-blue-800 text-center mt-20 py-4 px-12 hover:bg-blue-800 hover:text-white cursor-pointer' onClick={handleLoadMore}>LOAD MORE</div>
      </div>
    </>
  )
}

export default Home
