import * as React from "react"

interface StickyHeaderProps {
    props: {
        c_head2: {
            header2sub: string;
            header2subpart: {
                link: string;
                label: string;
            }[];
        };
    };
}

export default function StickyHeader(props: StickyHeaderProps) {

    return (
        <>
            <div className="StickyNav">
                <div className="StickyNav-container">
                    <div className="StickyNav-title">
                        {props?.props?.c_head2?.header2sub}
                    </div>
                    <div className="StickyNav-list"> {props?.props?.c_head2?.header2subpart?.map((sub) => {
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
