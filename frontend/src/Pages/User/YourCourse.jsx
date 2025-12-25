import { useGetAllPurchaseCourse } from '@/hooks/course.hook'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const YourCourse = () => {

    const {data} = useGetAllPurchaseCourse()

    const navigate = useNavigate()
    // console.log(data?.purchasedCourse)
    const navigateSinglePurchaseCourse = (id)=>{
        navigate(id)
    }

  return (
    <div>
        <div className='m-8 flex flex-wrap'>
            {
            data?.purchasedCourse.map((item,index)=>{
                return(
                    <div onClick={()=>navigateSinglePurchaseCourse(item._id)} key={index}>
                        <div className='h-28 cursor-pointer w-28 border border-zinc-800'>
                            <img className='h-full w-full object-contain' src={item.thumbnail} alt="" />

                        </div>
                        <h1>{item.title}</h1>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default YourCourse