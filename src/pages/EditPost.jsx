import React from 'react'

function EditPost() {
  return (
    <div className='flex items-center justify-center mt-20'>
      <div>
        <h1 className='text-3xl font-semibold text-center'>Edit Post</h1>
        <div className='flex flex-col gap-2 w-[50vw] bg-gray-200 p-[10%] mt-5'>
          <span>Title</span>
          <input className='flex-1 inputt'  type="text" placeholder='Todo Title' />
          <span>Description</span>
          <textarea  className='outline-none p-4' name="" id="" cols="30" rows="10"></textarea>
          <button className='bg-pink-600 py-3 text-white mt-3 hover:bg-blue-600 transition'>Edit</button>
        </div>
      </div>
    </div>
  )
}

export default EditPost