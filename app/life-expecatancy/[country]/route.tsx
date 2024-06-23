import { NextResponse } from "next/server"
import data from "../data.json"

type Params = {
    country: string
  }
   
  export async function GET(request: Request, context: { params: Params }) {
      
      const searchTerm = context.params.country.toLowerCase()

      if(searchTerm === "all"){
        const resp = data.map((row) => ({code:row.rank,name:row.name}))
        return NextResponse.json({ data: resp }, { status: 200 })
      }

      const countryData = data.find((row) => row.name.toLowerCase() === searchTerm)    
 
      if(countryData){
        return NextResponse.json({ data: countryData }, { status: 200 })
    }else{
        return NextResponse.json({ error: 'Country Not Found' }, { status: 404 })
    }
  }
   