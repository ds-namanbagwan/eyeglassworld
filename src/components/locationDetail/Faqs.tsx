// import * as React from "react";
// import { useState } from "react";
// import AccordionItem from "./AccordianItem";
// import { StaticData } from "../../../sites-global/staticData";

// export default function Faq(props: any) {
//   console.log(props,"5721242");

//   const [activeIndex, setActiveIndex] = useState();
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   let preExpandedarr = [];

//   if (props?.c_faqs?.length > 0) {
//     props?.c_faqs?.map((e: any, i: number) => {
//       if (i == 0) {
//         preExpandedarr = [e];
//       }
//     });
//   }

//   const renderedQuestionsAnswers = props?.c_faqs?.map((item: any, index: number) => {
//     // {console.log(renderedQuestionsAnswers,"renderedQuestionsAnswers")}
//     const showDescription = index === activeIndex ? "current" : "hidden";
//     const background = index === activeIndex ? "active" : "";
//     const fontWeightBold = index === activeIndex ? "font-weight-bold  py-0 mt-2" : "";
//     const ariaExpanded = index === activeIndex ? "true" : "false";

//     return (
//       // eslint-disable-next-line react/jsx-key
//       <AccordionItem
//         showDescription={showDescription}
//         fontWeightBold={fontWeightBold}
//         ariaExpanded={ariaExpanded}
//         background={background}
//         item={item}
//         index={index}
//         onClick={() => {
//           // isShowContent(1);
//           setActiveIndex(index);
//         }}
//       />
//     );
//   });
//   console.log(renderedQuestionsAnswers,"renderedQuestionsAnswers");   
//   return (
//     <>
//       <div className="container grid grid-cols-2 mt-20">
//         <div>
//           <h2 className="faq-head">
//             {props.c_fAQsHeading ? props.c_fAQsHeading : StaticData.FAQheading}
//           </h2>
//           <h2 className="faq-head2">
//             {props.c_fAQsHeading ? props.c_fAQsHeading : StaticData.FAQheading2}
//           </h2></div>
//         <div className="faq-tabs border-r-4 border-b-4 border-green" style={{ textAlign: "right" }}>
//           {renderedQuestionsAnswers}
//         </div>
//       </div>
//     </>
//   );
// }


import * as React from "react";
import { useEffect, useState } from "react";

type Faq = {
  prop: any;
  // c_fAQsCta:any;
};

const Faq = (faqData: Faq) => {
  const [faq_Data, setFaq_Data] = useState([]);
  const [faqClass, setFaqClass] = useState("");
  const [leftFaqLen, setLeftFaqLen] = useState(0);
  const [rightFaqLen, setRightFaqLen] = useState(0);
  const [selected, setselected] = useState(null);

  const isShowContent = (e: any, index: any) => {
    setselected(index);
    let parent = e.target.parentNode;
    let parent2 = e.target.parentNode.parentNode;

    if (
      parent.classList.contains("opened") ||
      parent2.classList.contains("opened")
    ) {
      setFaqClass("");
    } else {
      var acc = document.getElementsByClassName("faq-block");
      for (let s = 0; s < -1; s++) {
        acc[s].classList.remove("opened");
      }
      setFaqClass("opened");
    }
  };

  useEffect(() => {
    setFaq_Data(faqData.prop);
    let left = Math.round(faqData.prop.length / 2);
    let right = faqData.prop.length - left;
    setLeftFaqLen(left);
    setRightFaqLen(right);
  });
// console.log(faqData.c_fAQsCta,"hellollo")
  return (
    <>
      <div className="faq-sec bg-light">
        <div className="container mx-auto">

          <div className="faq-blocks">
            <div className="left-faq">
              {faq_Data.map((i: any, index: any) => {
                  return (
                    <div
                      id={index}
                      className={
                        selected == index
                          ? `faq-block ${faqClass}`
                          : "faq-block"
                      }
                      key={index}
                    >
                      <h4
                        className="faq-title"
                        onClick={(e) => isShowContent(e, index)}
                      >
                        {i.question} <span className="faq-icon"></span>
                      </h4>
                      <>
                        <div className="faq-content">
                          <p>{i.answer}</p>
                        </div>
                      </>
                    </div>
                   );
                  
                   })}
                 </div>
                 {/* {faqData.c_fAQsCta && faqData.c_fAQsCta &&<div className="mt-12 px-96 mx-16"><Link href={faqData.c_fAQsCta} eventName={faqData.c_fAQsCta} className="bg-[#FF0000] p-2 text-white">{faqData.c_fAQsCta}</Link></div>} */}
                 
          </div>
        </div>
      </div>
    </>
  );
};
export default Faq;


