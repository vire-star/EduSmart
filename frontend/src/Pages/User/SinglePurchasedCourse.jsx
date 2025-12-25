import { useGetPurchaseCourse } from '@/hooks/course.hook'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useModuleStores } from '@/Store/module.store'
import { useGetComment } from '@/hooks/module.hook'
import { useForm } from 'react-hook-form'
import { useCreateComment } from '@/hooks/comment.hook'
import { checkQuizApi } from '@/Api/quiz.api'
import { useCheckQuiz, useCreateQuiz, useGetQuiz } from '@/hooks/quiz.hook'

const SinglePurchasedCourse = () => {
    const {register, handleSubmit, reset} = useForm()
    const navigate = useNavigate()

    const {setModule, module} = useModuleStores()
    const {id}  = useParams()
    const {data} =  useGetPurchaseCourse(id)
    
    const {data:getCommentsData} = useGetComment(module?._id)

    
    const {data:CheckQuiz} = useCheckQuiz(module?._id)

    
    

//   const {data:getQuiz} = useGetQuiz(module?._id)
//   console.log(getQuiz)

const getQuizHandler=(id)=>{
    navigate(`/quiz/${id}`)
}

const {mutate:createQuiz} = useCreateQuiz()
    const createQuizHandler=(data)=>{
        // console.log(data._id)
        createQuiz({
            moduleId:data._id,
            content:data.title
        })
    }
    const videoHandler= (data)=>{
        setModule(data)
    }

    const {mutate} = useCreateComment()

    const commentHandler = (data)=>{
        mutate({
            id:module?._id,
            payload:data
        },
    {
        onSuccess:()=>{
            reset()
        }
    })
    }
  return (
    <div className='flex '>
        <div className='left h-screen w-[50%] bg-yellow-700'>
            <div className='h-[45%] w-full border-b-2 border-zinc-500'>
                
                <video className='h-full w-full object-contain' src={module?.video}></video>
            </div>
            <div>
                <h1>Comments</h1>
                <h1>
                    {
                        getCommentsData?.map((item,index)=>{
                            return(
                                <div key={index}>
                                    <h1>{item.comment}</h1>
                                </div>
                            )
                        })
                    }
                </h1>
                <form onSubmit={handleSubmit(commentHandler)} action="">
                    <input type="text" placeholder='Enter your comment' className='border border-zinc-700' {...register('comment')} />
                    <button type='submit'>Comment</button>
                </form>
            </div>
            <div></div>
        </div>
        <div className='right h-screen w-[50%]  flex items-start justify-center py-9'>
           <div className='w-[70%] h-fit'>
             {
                data?.modules.map((item,index)=>{
                    return(
                        <div onClick={()=>videoHandler(item)} key={index}>
                            <Accordion type="single" collapsible>
  <AccordionItem className='bg-zinc-500' value="item-1">
    <AccordionTrigger>{item.title}</AccordionTrigger>
    <AccordionContent className='bg-zinc-400'>
     <h1 onClick={()=>createQuizHandler(item)}>Create Quiz</h1>
     {item.quiz? <><h1 onClick={()=>getQuizHandler(item.quiz)}>Get Quiz</h1></>:<><h1>NO Quiz</h1></>}
    </AccordionContent>
  </AccordionItem>
</Accordion>
                        </div>
                    )
                })
             }

           </div>

        </div>
    </div>
  )
}

export default SinglePurchasedCourse