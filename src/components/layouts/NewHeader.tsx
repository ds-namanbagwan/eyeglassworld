// import { SearchBar } from "@yext/search-ui-react"
import * as React from "react"
import SearchBar from "../locationDetail/search"


export default function NewHeader(props: any) {
    // console.log(props, "26812282428242s")

    return (
        <>
            <div className=" flex w-80 ml-4"><img src={props?.prop?.c_photo?.url} alt="" />
                 
                <div className="mt-12 ml-[150%]"><SearchBar/></div>
            
                </div>
         
            <div className="bg-green text-2xl text-white">
                <div className="flex gap-24 ml-6" style={{paddingBottom:"10px"}}>
            {props?.prop?.c_headdata2?.map((res: any) => {
                            return (
                                <>
                                    <div className="mt-2">
                                        {res?.label}
                                    </div>

                                </>
                            )
                        })}
                        </div>
            </div>
            

        </>
    )
}
