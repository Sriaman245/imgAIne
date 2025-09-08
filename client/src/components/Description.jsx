import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'framer-motion'

const Description = () => {
  return (
    <motion.div 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>
      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg' />
        <div
        >
            <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing AI-Powered Text to Image Generator</h2>
            <p className='text-gray-600 mb-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem, facilis nesciunt nemo soluta quibusdam unde asperiores, dicta provident quas recusandae explicabo quos eligendi, harum consequuntur commodi ratione! Enim, culpa. Expedita, possimus dolores odit fugiat laborum incidunt, perferendis deleniti ut repellendus, placeat tenetur porro minus in esse a officiis quae et.</p>
                <p className='text-gray-600 mb-4'>Odio exercitationem, tempore enim laboriosam consequatur eos inventore placeat est porro debitis vitae soluta obcaecati fugiat rem doloremque quam dolore ipsa nam eius laborum. Obcaecati repellendus fugit eum facere omnis explicabo tenetur quidem exercitationem labore molestiae, sunt ducimus tempore, quia optio? Repudiandae deleniti quam ducimus dolores neque tempora doloremque, officia harum iure voluptatibus reprehenderit explicabo error ipsa tempore debitis! Minima voluptatibus debitis accusamus. Obcaecati unde itaque saepe voluptates minus, laborum quae quod et.</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Description
