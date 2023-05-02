// import { SearchBar } from "@yext/search-ui-react"
import * as React from "react"
import SearchBar from "../locationDetail/search"
import { Link } from "@yext/pages/components"


export default function NewHeader(props: any) {
    console.log(props.prop.c_scheduleTest.label, "26812282428242s")

    return (
        <>
            <div className="Header-containerWrapper Header-containerWrapper---middle">
                <div className="Header-container">
                    <div className="Header-wrapper Header-wrapper--middle">
                        <div className="Header-logoWrapper">
                            <a className="Header-logoLink" href="#" data-ya-track="logo" id="brand-logo">
                                <img className="Header-logo" src={props?.prop?.c_photo?.url} alt="" />
                            </a>
                        </div>
                        <div className="Header-searchBarAndCtasWrapper">
                            <div className="Header-searchBarWrapper">
                                {/* <a className="Header-searchLabelText" href="search"><img className="location-logo" src={props?._site?.c_middleHeader.icon.url} alt="" /></a> */}
                                <form method="get" id="HeaderSearchForm" className="search Header-form" action="">
                                    <div className="Header-searchBar">
                                        <input placeholder="Search by City, State, or ZIP code" className="search-input Header-input" type="text" name="inputStoreValue" id="HeaderSearchInput" required />
                                        <button type="submit" className="search-button Header-submit" data-ya-track="search">
                                            <span className="Header-submitLabel">GO</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="Header-links Header-links--ctas">
                                <div className="Header-linkWrapper Header-linkWrapper--ctas">
                                    <a className="Header-link Header-link--ctas" href="#" data-ya-track="cta1">
                                        <span className="Header-linktext"><a href={props?.prop?.c_scheduleTest?.link}>{props?.prop?.c_scheduleTest?.label}</a></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-green text-2xl text-white">

                <div className="flex gap-24 ml-6" style={{ paddingBottom: "10px" }}>

                    {props?.prop?.c_headdata2?.map((res: any) => {

                        return (
                            <>
                                <div className="mt-2 hover:underline">
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
