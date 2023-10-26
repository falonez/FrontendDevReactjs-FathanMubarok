import React from 'react'
import { Link } from 'react-router-dom'

const CardRestaurant:React.FC = ({data}) => {

  // const navigate = useNavigate();

  // const handleDetail = () => {
  //   navigate.push(`/DetailRestaurant/${data?.id}`)
  // }
  return (
    <>
      <div className='bg-white text-black w-[15vw] h-full mt-5 p-0'>
        <div className='w-full h-[13rem]'>
            <img src={`https://restaurant-api.dicoding.dev/images/medium/${data?.pictureId}`} alt="Restaurant Image" className=' object-cover w-full h-full' />
        </div>
        <div className='flex flex-col pb-2'>
          <h3 className='font-semibold'>{data?.name}</h3>
          <p>{data?.rating}</p>
        </div>
        <div className='flex flex-row justify-between text-[0.8rem] font-semibold py-2'>
            <p>{data?.city}</p>
            <p>OPEN NOW</p>
        </div>
        <Link to={`/DetailRestaurant/${data?.id}`}>
          <button className='text-center w-full bg-blue-800 py-2 text-white'>Detail</button>
        </Link>
        
      </div>
    </>
  )
}

export default CardRestaurant
