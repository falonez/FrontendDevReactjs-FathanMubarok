import React from 'react'

const CardRestaurant:React.FC = () => {
  return (
    <>
      <div className='bg-white text-black w-[15vw] h-auto mt-5 p-0'>
        <div className='w-full h-auto'>
            <img src="https://via.placeholder.com/150" alt="Restaurant Image" className=' object-cover w-full' />
        </div>
        <div className='flex flex-col pb-2'>
          <h3 className='font-semibold'>Restaurant Name</h3>
          <p>Rating</p>
        </div>
        <div className='flex flex-row justify-between text-[0.6rem] font-semibold py-2'>
            <p>THAI && JAPANESE</p>
            <p>OPEN NOW</p>
        </div>
        <button className='text-center w-full bg-blue-800 py-2 text-white'>LEARN MORE</button>
      </div>
    </>
  )
}

export default CardRestaurant
