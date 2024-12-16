import { useState } from "react";
import  api from "../../components/api.js"

const useSubmitReview=()=>{
    const [loading,setloading] = useState(false);
    const [error, setError] = useState(null);
    const[success, setSuccess] = useState(false);


    const submitReview = async ( rating, comment)=>{
        setloading(true);
        setError(null);
        setSuccess(false);

      try{
        const response = await api.post(
          "/api/submit-review",
          { artistId,rating,comment},
          { withCredentials: true })
        setSuccess(true);
        return response.data;
      }catch(err){
        setError(err.response?.data?.message || "Failed to submit review")
      }finally{
        setloading(false)
      }
    };
    return {submitReview, loading,error, success}
}


export default useSubmitReview;