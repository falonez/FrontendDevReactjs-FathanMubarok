import React from 'react'
import CardRestaurant from '../components/CardRestaurant'

const Home : React.FC = () => {
  return (
    <>
      <div className='mx-[12%] flex flex-col'>
        <h1 className='text-3xl font-bold'>TuangKeun Kuy</h1>
        <p className='py-5'>"Tuangkeun Kuy" adalah platform inovatif yang memungkinkan para pecinta kuliner untuk menjelajahi dan menemukan beragam restoran di seluruh Indonesia. Dengan koleksi yang komprehensif dari restoran-restoran terbaik di berbagai kota, Tuangkeun Euy menjadi teman setia bagi mereka yang ingin menggali pengalaman kuliner yang tak terlupakan di seluruh negeri.</p>
        <hr />
        <div className='flex flex-row justify-between py-3'>
          <div className='flex gap-4 items-center'>
            <p>Filter By:</p>
            <div>
              <input type="checkbox" />
              <label htmlFor="">Open Now</label>
            </div>
            <select name="price" id="">
              <option value="">Price</option>
              <option value="">$$</option>
              <option value="">$$$</option>
              <option value="">$$$$</option>
            </select>
            <select name="categories" id="">
              <option value="">Categories</option>
              <option value="">Fast Food</option>
              <option value="">Restaurant</option>
              <option value="">Cafe</option>
            </select>
          </div>
          <div className='border-2 py-2 px-6 rounded-sm'>CLEAR ALL</div>
        </div>
        <hr />
        <h1 className='py-5 text-2xl'>All Restaurant</h1>
        <div className='grid grid-cols-[1fr_1fr_1fr_1fr] gap-20'>
          <CardRestaurant />
          <CardRestaurant />
          <CardRestaurant />
          <CardRestaurant />
          <CardRestaurant />
          <CardRestaurant />
          <CardRestaurant />
          <CardRestaurant />
        </div>
        <div className=' self-center w-auto border-2 border-blue-800 text-blue-800 text-center mt-20 py-4 px-12'>LOAD MORE</div>
      </div>
    </>
  )
}

export default Home
