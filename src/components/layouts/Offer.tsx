import * as React from "react"
import { StaticData } from "../../../sites-global/staticData"


export default function offer(props: any) {
    // console.log(props, "naman12")

    return (
        <>
            
            <div className="container">
                <div className="grid grid-cols-2 gap-7">
                    {props?.props?.map((res: any) => {
                        return (
                            <>
                                <div className="text border-r-4 border-b-4 border-green">
                                    <div className=" text-2xl font-bold ml-5">{res?.offer1}</div>
                                    <div className="text mt-8 ml-5">{res?.offer2}</div>
                                    <div className="ml-5">{res?.offer3}</div>
                                    <div className="text-green font-bold mt-5 mb-10 ml-5">
                                        <a href={res.offerbutton.link}>{res.offerbutton.label}</a>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>

        </>
    )
}