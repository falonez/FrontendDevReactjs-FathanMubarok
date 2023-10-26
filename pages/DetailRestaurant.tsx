import {useEffect, useState} from 'react'
import useRestarurant from '../hooks/useRestarurant'
import {Link, useParams} from 'react-router-dom'

const DetailRestaurant : React.FC = () => {
  const {getDetailRestaurant, detailRestaurant} = useRestarurant()
  const {id} = useParams()
  const [review, setReview] = useState('')

  useEffect(() => {
    getDetailRestaurant(String(id))
  },[])

  return (
    <>
      <div className='w-full h-[20rem]'>
        <img src={`https://restaurant-api.dicoding.dev/images/large/${detailRestaurant?.pictureId}`} alt="" className=' object-cover w-full h-full' />
      </div>
      <div className='mx-[12%] flex flex-col mb-10 pt-10'>
        <div className='flex flex-row justify-between items-start'>
        <h1 className='text-5xl font-semibold'>{detailRestaurant?.name}</h1>
        <Link to='/'>
            <button className='text-center w-20 bg-blue-800 py-2 text-white hover:bg-blue-500 mt-10 rounded-full'>Back</button>
        </Link>
        </div>
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
        <div className='mt-10 justify-start flex'>
          <div className='w-full h-full flex flex-col'>
            <div className='w-full h-full'>
              {detailRestaurant?.customerReviews.map((item,index)=>{
                return(
                  <div key={index} className='h-auto p-4 text-black ring-2 ring-blue-600 mb-4 rounded-lg flex flex-col gap-2'>
                    <p className=' font-semibold'>{item.name}</p>
                    <p>{item.review}</p>
                    <p className='text-xs'>{item.date}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {/* <div className='flex justify-end'>
          <Link to='/'>
            <button className='text-center w-20 bg-blue-800 py-2 text-white hover:bg-blue-500 mt-10'>Back</button>
          </Link>
        </div> */}
      </div>
    </>
  )
}

export default DetailRestaurant
