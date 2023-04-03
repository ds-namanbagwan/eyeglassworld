import * as React from "react";
import { StaticData } from "../../../sites-global/staticData";

export default function PhotoGallery1(props: any) {
    console.log(props, "sdfjgj")
    return (
        <>

            <div className="container">
                <div className="flex gap-8">
                    {props.c_photogallary1?.map((res: any) => {
                        return (
                            <>
                                <div className="">
                                    {res.photo11?.map((del1: any) => {
                                        return (
                                            <>
                                                <img src={del1.url} alt="" className="text h-48" />
                                            </>
                                        )
                                    })}
                                    <div>{res.label1.label}</div>
                                </div>

                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}


