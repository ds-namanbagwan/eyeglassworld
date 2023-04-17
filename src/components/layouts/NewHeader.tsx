// import { SearchBar } from "@yext/search-ui-react"
import * as React from "react"
import SearchBar from "../locationDetail/search"
import { Link } from "@yext/pages/components"


export default function NewHeader(props: any) {
    // console.log(props.prop.c_scheduleTest.label, "26812282428242s")

    return (
        <>
            <div className=" flex w-80 ml-4"><img src={props?.prop?.c_photo?.url} alt="" />

                <div className="mt-12 ml-[150%]">
                    <SearchBar />
                </div>

                <div className="button-bx1">
                    <a type="button" href={props?.prop?.c_scheduleTest?.link} className="btn notHighlight1">
                        {props?.prop?.c_scheduleTest?.label}
                    </a>
                </div>

            </div>
            <div className="bg-green text-2xl text-white">

                <div className="flex gap-24 ml-6" style={{ paddingBottom: "10px" }}>

                    {props?.prop?.c_headdata2?.map((res: any) => {

                        return (
                            <>
                                <div className="mt-2">
                                    <a href={res?.link}>{res?.label}</a>
                                </div>
                            </>
                        )
                    })}

                </div>
            </div>


        </>
    )
}
