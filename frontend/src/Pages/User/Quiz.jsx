import { useGetQuiz } from '@/hooks/quiz.hook'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Quiz = () => {
    const {id} = useParams()
    const {data} = useGetQuiz(id)
   

    // pehla hook banayenge jo yeh batayega ki konsia selected answr hai 
    // then dusra hook humara result show karega 
    // teesra hook hum score dega

    const [selecteAnswer, setSelectedAnswer] = useState({})
    const [showResult, setshowResult] = useState(false)
    const [score, setscore] = useState(0)

    const navigate = useNavigate()

    const handleSelectAnswer = (questionId, selectedOption)=>{
        setSelectedAnswer(prev=>({
            ...prev,
            [questionId]:selectedOption
        }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        let correctCount = 0

        data.quiz.questions.forEach(question=>{
            if(selecteAnswer[question._id]===question.correctOption
){
                correctCount++
            }
        })

        setscore(correctCount)
        setshowResult(true)
    }

    const question  = data?.quiz?.questions||[]
    const totalQuestion = question.length
    const answerCount = Object.keys(selecteAnswer).length
    console.log(question)
  return (
    <div>


        {
            showResult?
            
            <>
            <div className='bg-white rounded-lg shadow-lg p-8 text-center'>
                <h1 onClick={()=>navigate(-1)} className='font-bold'>Back</h1>
                <h2 className='text-4xl font-bold mb-4'>
                    Your Score {score}/{totalQuestion}
                </h2>

                <p className=' text-xl mb-6'>
                    {score === totalQuestion
                    ?"Perfect Score"
                    :score >= totalQuestion*0.7
                    ?"Great Job"
                    :score >= totalQuestion*0.5
                    ?"Good effort"
                    :"Keep learning"
                    }
                </p>
                {/* show answer breakDown */}

                <div className='mt-8 text-left space-y-6'>
                    <h3 className='text-2xl font-semibold mb-4'>
                       Review Answer
                    </h3>
                    {
                        question.map((question,index)=>{
                            const userAnswer = selecteAnswer[question._id]
                            const isCorrect= userAnswer === question.correctOption
                            return(
                                <div key={index}
                                className={`p-4 rounded-lg border-2 ${
                                    isCorrect?'border-green-500 bg-green-50':' border-red-500 bg-red-50'
                                    }`}
                                >

                                    <div className='flex items-start gap-2 mb-2'>
                                        <span>Q{index+1}</span>
                                        <p className='font-medium'>{question.content}</p>



                                    </div>

                                    <div className=' ml-6 text-sm space-y-1'>
                                        <p>
                                            <span className='font-semibold'>Your Answer</span>

                                        <span className={`${isCorrect?"text-green-500":"text-red-500"}`}>{userAnswer}</span>
                                        </p>

                                        {!isCorrect &&(
                                            <p>
                                                <span className='font-semibold'>Corect Answer</span>
                                                <span className='text-green-600'>{question.correctOption}</span>
                                            </p>
                                        )}

                                        {question.explanation &&(
                                            <p className='text-gray-700'>
                                                <span className='font-semibold'>explanation </span>${question.explanation}
                                            </p>
                                        )}


                                        


                                    </div>
                                    

                                </div>
                            )
                        })
                    }

                </div>

                <button
                                        className='mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700'
                                        onClick={()=>{
                                            setshowResult(false)
                                            setSelectedAnswer({})
                                            setscore(0)
                                        }}
                                        >
                                            Retake Quiz
                                        </button>

            </div>
            </>
            :
            <>
            {/* yaha par quiz show honge */}
            <form onSubmit={handleSubmit} action="">
                {
                    question.map((question,index)=>{
                       return(
                         <div key={index} className='bg-white rounded-lg shadow-md p-6'>
                            {/* Question */}
                            <div className='mb-4'>
                                <h3 className='text-lg font-semibold'>
                                    Question {index+1} of {totalQuestion} 

                                </h3>
                                <p className='mt-3 text-gray-800'>{question.content}</p>

                            </div>

                            {/* Options */}
                            <div className='space-y-3'>
                                {question.options.map((option,index)=>{
                                    return(
                                        <label key={index} htmlFor=""
                                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer
                                        ${
                                        selecteAnswer[question._id] ===option ? 'border-blue-500 bg-blue-50':
                                        'border-gray-200 hover:border-blue-300'
                                        }
                                        
                                        `}
                                    >

                                        <input type="radio" 
                                        name={`question=${question._id}`}
                                        value={option}
                                        checked={selecteAnswer[question._id]===option}
                                        onChange={()=>handleSelectAnswer(question._id, option)}

                                        className='mt-1 w-4 h-4 text-blue-600'
                                        />
                                    <span>{option}</span>
                                    </label>
                                    )
                                })}

                            </div>

                        </div>
                       )
                    })
                }

                {/* submit button */}
                <div className='flex justify-center'>
                    <button
                    type='submit'
                    disabled={answerCount< totalQuestion}
                    className={`
                        px-8 py-3 rounded-lg font-semibold text-white transition 
                        ${answerCount<totalQuestion ? 'bg-gray-400 cursor-not-allowed': 'bg-green-600 hover:bg-green-700'}
                        `}
                    >


                        {
                            answerCount<totalQuestion?`Answer all Question (${answerCount}/ ${totalQuestion})`:'Submit'
                        }
                    </button>

                </div>
            </form>

            </>
        }
    </div>
  )
}

export default Quiz