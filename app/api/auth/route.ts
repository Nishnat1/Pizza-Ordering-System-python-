import { NextRequest, NextResponse } from "next/server";

 export async function GET(req:NextRequest){

  const response = NextResponse.json({
    message:"hello world"
  })

  return response
 }