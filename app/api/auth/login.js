import axios from "axios"
import { NextResponse } from "next/server"

export default async function POST(req,res){
    const {userEmail,userPassword}=req.body
try {

    if(userEmail&&userPassword){
        const res = await axios.post('http://localhost:5000/login',{userEmail,userPassword})
        

    }
    
} catch (error) {
    
}
}