import * as React from "react";
import { useState} from "react";
import AccordionItem from "./AccordianItem";
import { StaticData } from "../../../sites-global/staticData";

export default function Faq(props: any) {
 
  const [activeIndex, setActiveIndex] = useState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let preExpandedarr = [];

  if (props?.c_faqs?.length > 0) {
    props?.c_faqs?.map((e: any, i: number) => {
      if (i == 0) {
        preExpandedarr = [e];
      }
    });
  }
  
  const renderedQuestionsAnswers = props?.c_faqs?.map((item: any, index: number) => {
    // {console.log(renderedQuestionsAnswers,"renderedQuestionsAnswers")}
    const showDescription = index === activeIndex ? "current" : "hidden";
    const background = index === activeIndex ? "active" : "";
    const fontWeightBold = index === activeIndex ? "font-weight-bold  py-0 mt-2" : "";
    const ariaExpanded = index === activeIndex ? "true" : "false";
   
    return (
      // eslint-disable-next-line react/jsx-key
      <AccordionItem
        showDescription={showDescription}
        fontWeightBold={fontWeightBold}
        ariaExpanded={ariaExpanded}
        background={background}
        item={item}
        index={index}
        onClick={() => {
          // isShowContent(1);
          setActiveIndex(index);
        }}
      />
    );
  });
  // console.log(renderedQuestionsAnswers,"renderedQuestionsAnswers")
  return (
    <>
      <div className="container grid grid-cols-2 mt-20">
        <div>
          <h2 className="faq-head">
            {props.c_fAQsHeading ? props.c_fAQsHeading : StaticData.FAQheading}
          </h2>
          <h2 className="faq-head2">
            {props.c_fAQsHeading ? props.c_fAQsHeading : StaticData.FAQheading2}
          </h2></div>
        <div className="faq-tabs border-r-4 border-b-4 border-green" style={{ textAlign: "right" }}>
          {renderedQuestionsAnswers}
        </div>
      </div>
    </>
  );
}



