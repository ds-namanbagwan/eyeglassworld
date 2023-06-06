import * as React from "react";

export default function PhotoGallery(props: any) {

  return (
    <>
      <div className="container">
        <div className=" grid grid-cols-4 gap-24">
          {props?.props?.map((res1: any) => {
            // console.log(res1, "namanadhmfg,jfhsdfg,")
            return (
              <>
                <div className=" border-black border-2 hover:border-green hover:border-r-[5px] hover:border-b-[5px]" style={{ padding: "1%" }}>
                  <img src={res1?.image.url} alt="" />
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}