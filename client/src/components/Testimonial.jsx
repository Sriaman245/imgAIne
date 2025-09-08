import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import {motion} from 'framer-motion'

const Testimonial = () => {
  return (
    <motion.div
    //  initial={{ opacity: 0, y: 50 }}   // starting state (hidden + below)
    //   animate={{ opacity: 1, y: 0 }}    // end state (visible + normal position)
    //   whileInView={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.8, ease: "easeOut" }}  
    initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    className='flex flex-col items-center justify-center my-20 py-6'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customer Testimonials</h1>
      <p className='text-gray-500 mb-12'>What Our Users Are Saying</p>
      <div className='flex flex-wrap gap-6'>
        {
            testimonialsData.map((item,index)=>(
              // bg-white/20 means white with 20% opacity
                <div key={index} className='bg-white/20 p-12 rounded-lg shadow-md w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all duration-400'>
                    <div className='flex flex-col items-center'>
                        <img className='rounded-full w-14' src={item.image} alt="" />
                        <h2 className='text-xl font-semibold mt-3'>{item.name}</h2>
                        <p className='text-gray-500 mb-4'>{item.role}</p>
                        <div className='flex mb-4'>
                            {
                              Array(item.stars).fill().map((stars,index)=>(
                                <img src={assets.rating_star} alt=''></img>
                              ))  
                            }
                        </div>
                        <p className='text-center text-sm text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus dignissimos pariatur quas architecto veritatis vel aliquam, quos placeat! Facilis similique dolorem dicta numquam error placeat harum cumque, omnis quibusdam adipisci.</p>
                    </div>
                </div>
            ))
        }
      </div>
    </motion.div>
  )
}

export default Testimonial
