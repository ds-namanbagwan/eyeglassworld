import * as React from "react"


export default function StickyHeader(props: any) {

    return (
        <>
            <div className="StickyNav">
                <div className="StickyNav-container">
                    <div className="StickyNav-title">
                        {props?.props?.c_head2?.header2sub}
                    </div>
                    <div className="StickyNav-list"> {props?.props?.c_head2?.header2subpart?.map((sub: any) => {
                        return (
                            <>
                                <a className="StickyNav-link" href={sub.link}>
                                    {sub.label}
                                </a>
                            </>
                        )
                    })}
                    </div>
                </div>
            </div>
        </>
    )
}
