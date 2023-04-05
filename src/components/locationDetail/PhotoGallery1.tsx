import * as React from "react";
import { StaticData } from "../../../sites-global/staticData";
import { Link } from "@yext/pages/components";

export default function PhotoGallery1(props: any) {
    console.log(props.c_photogallary1CTA.label, "sdfjgj")
    return (
        <>

            <div className="container">
                <div className="flex w-full gap-60">
                    {props.c_photogallary1?.map((res: any) => {
                        return (
                            <>
                                <div className="">
                                    {res.photo11?.map((del1: any) => {
                                        return (
                                            <>
                                                <img src={del1.url} alt="" className="h-48" />
                                            </>
                                        )
                                    })}
                                    <div className="text-center text-green text-2xl mt-3">{res.label1.label}</div>
                                </div>

                            </>
                        )
                    })}
                </div>
                <div className="button-bx2">
                    <Link type="button" href={props?.c_photogallary1CTA?.link} className="btn notHighlight1">
                        {props?.c_photogallary1CTA?.label}
                    </Link>
                </div>
            </div>
        </>
    )
}


