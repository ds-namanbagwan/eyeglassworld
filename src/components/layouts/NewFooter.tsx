import * as React from "react"


export default function NewFooter(props: any) {
    // console.log(props, "26812282428242s")

    return (
        <>
            <div className="bg-green text-white inline-block w-full">

                <div className="absolute text-4xl ml-6 mt-14">
                    {props?.prop?.c_text5}
                </div>

                <div className="flex absolute text-xl ml-8 mt-32 gap-5">
                    {props?.prop?.c_icons1?.map((img: any) => {

                        return (
                            <>
                                <div className="flex w-9">
                                    <a href="#"><img src={img?.url} alt="" /></a>
                                </div>
                            </>
                        )
                    })}

                </div>

                <div className="flex gap-20 justify-end mr-8">

                    <div className="mt-14">
                        <p className="text-xl mb-5">{props?.prop?.c_footer1?.fhead}</p>
                        {props?.prop?.c_footer1?.fsubdata?.map((res1: any) => {
                            return (
                                <>
                                    <div className="mt-2 hover:underline">
                                        <a href={res1?.link}>{res1?.label}</a>
                                    </div>
                                </>
                            )
                        })}
                    </div>

                    <div className="mt-14">
                        <p className="text-xl mb-5">{props?.prop?.c_footer2?.fhead}</p>
                        {props?.prop?.c_footer2?.fsubdata?.map((res2: any) => {
                            return (
                                <>
                                    <div className="mt-2 hover:underline">
                                        <a href={res2?.link}> {res2?.label}</a>
                                    </div>

                                </>
                            )
                        })}
                    </div>

                    <div className="mt-14">
                        <p className="text-xl mb-5">{props?.prop?.c_footert3?.fhead}</p>
                        {props?.prop?.c_footert3?.fsubdata?.map((res3: any) => {
                            return (
                                <>
                                    <div className="mt-2 hover:underline">
                                        <a href={res3?.link}> {res3?.label}</a>
                                    </div>

                                </>
                            )
                        })}
                    </div>

                </div>

                <div className="flex mt-8 justify-end gap-36 text-2xl mr-8">
                    {props?.prop?.c_footer4?.map((res4: any) => {
                        // console.log(res4, "res4")
                        return (
                            <>
                                <div className="mt-2 hover:underline">
                                    <a href={res4.link}>{res4?.label}</a>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className="text m-8 font-medium mb-9">
                    <div>{props?.prop?.c_textline1}</div>
                    <div>{props?.prop?.c_textline2}</div>
                    <div>{props?.prop?.c_textline3}</div>
                </div>
            </div>

        </>
    )
}
