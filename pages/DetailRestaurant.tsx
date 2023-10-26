import {useEffect} from 'react'
import useRestarurant from '../hooks/useRestarurant'
import {Link, useParams} from 'react-router-dom'

const DetailRestaurant : React.FC = () => {
  const {getDetailRestaurant, detailRestaurant} = useRestarurant()
  const {id} = useParams()
  console.log(id)
  useEffect(() => {
    getDetailRestaurant(String(id))
  },[])
  console.log(detailRestaurant)
  return (
    <>
      <div className='w-full h-[20rem]'>
        <img src={`https://restaurant-api.dicoding.dev/images/large/${detailRestaurant?.pictureId}`} alt="" className=' object-cover w-full h-full' />
      </div>
      <div className='mx-[12%] flex flex-col mb-10 pt-10'>
        <h1 className='text-5xl font-semibold'>{detailRestaurant?.name}</h1>
        <div className='flex flex-row py-3'>
          {[1,2,3,4,5].map((i) => {
            return Math.floor(detailRestaurant?.rating) > i ? (
              <img src="/star-full.svg" key={i} alt="" className='w-6 h-6' />
            ) : (
              <img src="/star.svg" key={i} alt="" className='w-6 h-6' />
            )
          })}
        </div>
        <p className='mb-10 text-lg'>{detailRestaurant?.city}, {detailRestaurant?.address}</p>
        <p className=' text-lg'>{detailRestaurant?.description}</p>
        <div className='flex justify-end'>
          <Link to='/'>
            <button className='text-center w-20 bg-blue-800 py-2 text-white hover:bg-blue-500 mt-10'>Back</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default DetailRestaurant
