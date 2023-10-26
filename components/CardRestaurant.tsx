import React from 'react'
import { Link } from 'react-router-dom'


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

const CardRestaurant:React.FC = ({data}:{data:RestaurantAll}) => {
  return (
    <>
      <div className='bg-white text-black w-[15vw] h-full mt-5 p-0'>
        <div className='w-full h-[13rem]'>
            <img src={`https://restaurant-api.dicoding.dev/images/medium/${data?.pictureId}`} alt="Restaurant Image" className=' object-cover w-full h-full' />
        </div>
        <div className='flex flex-col pb-2'>
          <h3 className='font-semibold mt-2 text-lg'>{data?.name}</h3>
          <div className='flex flex-row py-2'>
          {[...Array(5)].map((i) => {
            return Math.floor(data?.rating) > i ? (
              <img src={`/star-full.svg`} key={i} alt="" className='w-4 h-5' />
            ) : (
              <img src="/star.svg" key={i} alt="" className='w-4 h-5' />
            )
          })}
        </div>
        </div>
        <div className='flex flex-row justify-between text-[0.8rem] font-semibold py-2'>
            <p className=' uppercase'>{data?.city}</p>
            {data?.status_open === 'open' ? (
              <div className='flex items-center gap-1'>
                <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                <p>OPEN NOW</p>
              </div>
            ):(
              <div className='flex items-center gap-1'>
                <div className='w-2 h-2 bg-red-600 rounded-full'></div>
                <p>CLOSED</p>
              </div>
            )}
        </div>
        <Link to={`/detail/${data?.id}`}>
          <button className='text-center w-full bg-blue-800 py-2 text-white hover:bg-blue-500'>Detail</button>
        </Link>
        
      </div>
    </>
  )
}

export default CardRestaurant
