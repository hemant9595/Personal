import React, { useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { apiUrl,filterData } from "./data";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";


const App = () => {

  const [courses,setCourse] = useState(null);
  const [loading,setLoading] = useState(true);
  const [category,setCategory] = useState(filterData[0].title);



  async function fetchData(){
    setLoading(true);
    try{
      let res = await fetch(apiUrl);
      let output = await res.json();

      setCourse(output.data);
    }
    catch(error){
      toast.error("Something Went Wrong");
    }
    setLoading(false);
  } 


  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <Navbar />

      <div>
        
        <Filter filterData = {filterData}
        category={category}
        setCategory={setCategory}/>

        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
        {
          loading ? (<Spinner/>):(<Cards courses={courses} category={category}/>)
        }
        </div>
      </div> 
    
    </div>
  )
};

export default App;
