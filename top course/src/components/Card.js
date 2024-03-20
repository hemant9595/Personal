import React, {useState} from "react";
import {FcLike, FcLikePlaceholder} from "react-icons/fc";
import { toast } from "react-toastify";

const Card = (props) => {

    let course = props.course;

    // description
    const [readMore,setReadMore] =useState(false);

    const description = readMore ? course.description : `${course.description.substring(0,100)}....`;

    function readMoreHandler(){
        setReadMore(!readMore);
    }

    // liked courses

    let likedCourse = props.likedCourse;
    let setLikedCourse = props.setLikedCourse;

   
    function clickHandler(){

        if(likedCourse.includes(course.id)){
            setLikedCourse((prev) => prev.filter((item)=> item !== course.id));

            toast.warning("Like Removed");
        }
        else{
            if(likedCourse.length === 0){
                setLikedCourse([course.id]);
            }
            else{
                setLikedCourse((prev)=> [...prev, course.id]);
            }

            toast.success("Liked Successfully")
        }
        
    }


    return(
        <div className="w-[300px] bg-bgDark 
         bg-opacity-80 rounded-md overflo-hidden">
            <div className="relative">
                <img src={course.image.url}></img>
                <div className="absolute w-[45px] h-[45px] bg-white rounded-full right-1 bottom-[-20px] grid place-items-center">
                    <button onClick={clickHandler}>
                        {
                            !likedCourse.includes(course.id)?(<FcLikePlaceholder fontSize="2rem"/>):(<FcLike fontSize="2rem"/>)
                        }
                        
                    </button>
                </div>
            </div>

            <div className="p-4">
                <p className=" text-white text-semibold text-2xl leading-6">{course.title}</p>
                <p className="mt-2 text-white  text">
                    {description}
                    <span className="read-more cursor-pointer text-[#87ceeb]" onClick={readMoreHandler}>
                        {readMore ? `show less `:`read more`}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Card;