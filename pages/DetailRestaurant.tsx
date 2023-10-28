import {useCallback, useEffect, useState} from 'react'
import useRestarurant from '../hooks/useRestarurant'
import {Link, useParams} from 'react-router-dom'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const DetailRestaurant : React.FC = () => {
  const {getDetailRestaurant, detailRestaurant, addReview, getCoordinate} = useRestarurant()
  const {id} = useParams()
  const [reviewState, setReview] = useState({
    id: String(id),
    name: '',
    review: ''
  })
  const [reviewReverse, setReviewReverse] = useState([])
  
  useEffect(()=>{
    setReviewReverse(detailRestaurant?.customerReviews?.reverse())
  },[detailRestaurant?.customerReviews])

  useEffect(() => {
    getDetailRestaurant(String(id))
  },[])

  const handleAddReview = () => {
    addReview(reviewState).then((res)=>{
      console.log(res)
    })
  }
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCt1Ulw6Yll6xvehBMaxBElO8mTt6pXM6k"
  })
  
  const containerStyle = {
    width: "100%",
    height: '50vh'
  };
  
  const defaultCenter = {
    lat: -3.745,
    lng: -38.523
  };

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(defaultCenter);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  

  useEffect(() => {
    getCoordinate(detailRestaurant?.address + detailRestaurant?.city).then((res)=>{
      setMap(res)
    })
  },[detailRestaurant?.address])
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
            <div className='flex flex-row justify-between gap-10'>
            <div className='w-1/2 flex flex-col gap-2'>
              <h1 className='font-semibold text-xl'>{detailRestaurant?.address}</h1>
              {isLoaded &&  <GoogleMap
                mapContainerStyle={containerStyle}
                center={map}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                { /* Child components, such as markers, info windows, etc. */ }
                <Marker
                  position={map}
                />
                
                <></>
              </GoogleMap>}
            </div>
              <div className='w-1/2 flex flex-col gap-2'>
                <h1 className='font-semibold text-xl'>Give Your Review !!</h1>
                <input type="text" placeholder='Name' className='h-10 p-4 text-black ring-2 ring-blue-600 mb-4 rounded-lg' onChange={(e)=>setReview({...reviewState, name:e.target.value})}/>
                <textarea placeholder='Please Give your Review' className='h-[5rem] p-4 text-black ring-2 ring-blue-600 mb-4 rounded-lg' onChange={(e)=>setReview({...reviewState, review:e.target.value})}/>
                <div className='flex justify-end mb-10'>
                  <button className='text-center w-20 bg-blue-800 py-2 text-white hover:bg-blue-500' onClick={handleAddReview}>Send</button>
                </div>
              </div>
            </div>
           
            <h1 className='text-xl font-semibold mb-4 mt-20'>Reviews</h1>
            <div className='w-full h-full'>
              {reviewReverse?.map((item,index)=>{
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
