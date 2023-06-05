import * as React from "react";
import "../index.css";
import { GetHeadConfig, GetPath, HeadConfig, Template, TemplateConfig, TemplateProps, TemplateRenderProps } from "@yext/pages";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import SearchLayout from "../components/locatorPage/SearchLayout";
import { stagingBaseurl, favicon, AnalyticsEnableDebugging, AnalyticsEnableTrackingCookie } from "../../sites-global/global"
import { JsonLd } from "react-schemaorg";
import { StaticData } from "../../sites-global/staticData";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import { AnswerExperienceConfig } from "../config/answersHeadlessConfig";
import NewHeader from "../components/layouts/NewHeader";
import NewFooter from "../components/layouts/NewFooter";

// export const config: TemplateConfig = {
//   stream: {
//     $id: "Locator",
//     // Specifies the exact data that each generated document will contain. This data is passed in
//     // directly as props to the default exported function.
//     fields: [
//       "name",
//     ],
//     // Defines the scope of entities that qualify for this stream.
//     filter: {
//       entityIds: ["global-data"]
//     },
//     // The entity language profiles that documents will be generated for.
//     localization: {
//       locales: ["en_GB"],
//       primary: false,
//     },
//   },

export const getPath: GetPath<TemplateProps> = () => {
  return `/index.html`;
};
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: `${document.c_meta_title ? document.c_meta_title : `Near Me - Find Store Branch Locator Here.`}`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${document.c_meta_description ? document.c_meta_description : `View Eye Glass Stores near you today. We supply high-quality,of glass.`}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "author",
          content: StaticData.Brandname,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "robots",
          content: "noindex, nofollow",
        },
      },
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${document.c_meta_description ? document.c_meta_description : `View Store Near You Today.`}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${document.c_meta_title ? document.c_meta_title : `Near Me - Find Store Branch Locator Here.`}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${document.c_meta_description ? document.c_meta_description : `View Eye Glass Stores near you today. We supply high-quality,of glass.`}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:title",
          content: `${document.c_meta_title ? document.c_meta_title : `Near Me - Find Branch Locator Here.`}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content: favicon
        },
      },
    ],
  };
};

const Locator: Template<TemplateRenderProps> = ({
  document,
  __meta,
}) => {
  const {
    _site
  } = document;

  let templateData = { document: document, __meta: __meta };

  return (
    <>
      <JsonLd<locator>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "",
          url: stagingBaseurl,
          logo: favicon,
        }}
      />
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>

          <NewHeader prop={_site} />

          <SearchHeadlessProvider
            experienceKey={AnswerExperienceConfig.experienceKey}
            locale={AnswerExperienceConfig.locale}
            apiKey={AnswerExperienceConfig.apiKey}
            verticalKey={AnswerExperienceConfig.verticalKey}
            experienceVersion="STAGING"
            sessionTrackingEnabled={true}
            endpoints={AnswerExperienceConfig.endpoints}>

            <SearchLayout _site={_site} />

          </SearchHeadlessProvider>

          <NewFooter prop={_site} />

        </AnalyticsScopeProvider>

      </AnalyticsProvider>
    </>
  );
};

export default Locator;