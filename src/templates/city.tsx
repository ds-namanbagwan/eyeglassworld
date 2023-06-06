/* eslint-disable react/prop-types */
import * as React from "react";
import GetDirection from "../components/commons/GetDirection";
import constant from "../constant";
import "../index.css";
import {
  Template,
  GetPath, 
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import { StaticData } from "../../sites-global/staticData";
import { favicon,stagingBaseurl } from "../../sites-global/global";
import { JsonLd } from "react-schemaorg";
import Address from "../components/commons/Address";
import OpenClose from "../components/commons/openClose";
import { Link } from "@yext/pages/components";
import NewHeader from "../components/layouts/NewHeader";
import NewFooter from "../components/layouts/NewFooter";

export const config: TemplateConfig = {
  stream: {
    $id: "city",
    filter: {
      entityTypes: ["ce_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.id",
      //   "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.address",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.yextDisplayCoordinate"
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url= ""
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document?.dm_directoryParents?.map((i: any) => {
    if (i.meta.entityType.id == 'ce_country') {
      url = `${i.slug}`
    }
    else if (i.meta.entityType.id == 'ce_region') {
      url = `${url}/${i.slug}/${document.slug.toString()}.html`
    }
  })
  return url;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  let canonical = "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document?.dm_directoryChildren?.map((entity: any) => {
    canonical = entity.address.countryCode.toLowerCase().replaceAll(" ", "-") + '/' + entity.address.region.toLowerCase().replaceAll(" ", "-");
  })

  return {
    title: `${document.c_meta_title ? document.c_meta_title : `Stores in ${document.name} | Find a Local Store`}`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
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
          name: "description",
          content: `${document.c_meta_description ? document.c_meta_description : `Use this page to find your nearest store in ${document.name} and discover the location details you need to visit us today.`}`,
        },
      },
      //   {
      //     type: "meta",
      //     attributes: {
      //       name: "title",
      //       content: `${document.c_metaTitle}`,
      //     },
      //   },
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
          name: "keywords",
          content: document.name,
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
          rel: "canonical",
          href: `${stagingBaseurl
            ? stagingBaseurl + canonical + "/" + document.slug + ".html"
            : "/" + document.slug + ".html"
            }`,
        },
      },
      //og tags
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${stagingBaseurl
            ? stagingBaseurl + canonical + "/" + document.slug + ".html"
            : "/" + document.slug + ".html"
            }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${document.c_meta_description ? document.c_meta_description : `Find Store in ${document.name}.`}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${document.name}`,
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
          name: "twitter:url",
          content: `/${document.slug ? document.slug : `${document.name.toLowerCase()}`}.html`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${document.c_meta_description ? document.c_meta_description : `Find Store in ${document.name}.`}`
        },
      },
    ],
  };
};

const City: Template<TemplateRenderProps> = ({
  // eslint-disable-next-line react/prop-types
  relativePrefixToRoot,
  document,
}) => {
  const {
    name,
    dm_directoryParents,
    dm_directoryChildren,

    _site,
  } = document;
  let address;
  // const sortedChildren = dm_directoryChildren.sort(function (a:any, b:any) {
  //   let a = a.name;
  //   let b = b.name;
  //   return a < b ? -1 : a > b ? 1 : 0;
  // });

  let slugString = "";
  document.dm_directoryParents.forEach((e: any) => {
    slugString += e.slug + "/";
  });

  const childrenDivs = dm_directoryChildren?.map((entity: any) => {
    // console.log(entity)
    let origin: any = null;
    if (entity.address.city) {
      origin = entity.address.city;
    } else if (entity.address.region) {
      origin = entity.address.region;
    } else {
      origin = entity.address.country;
    }
    // let key: any = Object.keys(entity.hours)[0];
    let url = "";
    const name: string = entity.name.toLowerCase();
    // const region: string = entity.address.region.toLowerCase();
    // const initialregion: string = region.toString();
    // const finalregion: string = initialregion.replaceAll(" ", "-");
    // const city: string = entity.address.city.toLowerCase();
    // const initialrcity: string = city.toString();
    // const finalcity: string = initialrcity.replaceAll(" ", "-");
    const string: string = name.toString();
    const result: string = string.replaceAll(" ", "-");
    // let newlink: any = 
    if (!entity.slug) {
      url = document.slug + "/" + `${result}.html`;
    } else {
      url = `/${entity.slug.toString()}.html`;
    }

    return (

      // eslint-disable-next-line react/jsx-key
      <div className="nearby-card">
        <div className="location-name-miles icon-row">
          <h2><Link className="inline-block notHighlight" href={url}
            data-ya-track={`viewstore-${entity.name}`}
            eventName={`viewstore-${entity.name}`}
            rel="noopener noreferrer"
          >{entity.name}</Link></h2>
        </div>
        <div className="icon-row">
          <Address address={entity.address} />
        </div>
        {entity.mainPhone ?
          <div className="icon-row">
            <div className="content-col">
              <a href={`tel:${entity.mainPhone}`}>{entity.mainPhone}</a>
            </div>
          </div> : ''}

        <div className="icon-row">
          <div className="content-col open-now-string">

            {typeof entity.hours?.reopenDate != "undefined" ?
              <h6>{StaticData.tempClosed}</h6>
              : <OpenClose timezone={entity.timezone} hours={entity.hours} />}

          </div>
        </div>

        <div className="button-bx">
          <Link className="btn" href={url}
            data-ya-track={`viewstore-${entity.name}`}
            eventName={`viewstore-${entity.name}`}
            rel="noopener noreferrer"
          >
            {StaticData.StoreDetailbtn}</Link>
          <GetDirection buttonText={StaticData.getDirection} address={entity.address} latitude={entity.yextDisplayCoordinate.latitude} longitude={entity.yextDisplayCoordinate.longitude} />
        </div>
      </div>
    );
  });
  // function getDirectionUrl(entitiy: any) {
  //   var origin: any = null;
  //   if (entitiy.address.city) {
  //     origin = entitiy.address.city;
  //   } else if (entitiy.address.region) {
  //     origin = entitiy.address.region;
  //   } else {
  //     origin = entitiy.address.country;
  //   }
  //   if (navigator.geoentity) {
  //     const error = (error: any) => {
  //       const message_string =
  //         "Unable to determine your entity. please share your entity";

  //       const getDirectionUrl =
  //         "https://www.google.com/maps/dir/?api=1&destination=" +
  //         entitiy.yextDisplayCoordinate.latitude +
  //         "," +
  //         entitiy.yextDisplayCoordinate.longitude +
  //         "&origin=" +
  //         origin;

  //       window.open(getDirectionUrl, "_blank");
  //     };
  //     navigator.geoentity.getCurrentPosition(
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       function (position: any) {
  //         const currentLatitude = position.coords.latitude;
  //         const currentLongitude = position.coords.longitude;
  //         const getDirectionUrl =
  //           "https://www.google.com/maps/dir/?api=1&destination=" +
  //           entitiy.yextDisplayCoordinate.latitude +
  //           "," +
  //           entitiy.yextDisplayCoordinate.longitude +
  //           "&origin=" +
  //           currentLatitude +
  //           "," +
  //           currentLongitude;
  //         window.open(getDirectionUrl, "_blank");
  //       },
  //       error,
  //       {
  //         timeout: 10000,
  //       }
  //     );
  //   }
  // }

  let url= ""

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document.dm_directoryParents.map((i: any) => {
    if (i.meta.entityType.id == 'ce_country') {
      url = `${i.slug}`
    }
    else if (i.meta.entityType.id == 'ce_region') {
      url = `${url}/${i.slug}/${document.slug.toString()}.html`
    }
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const breadcrumbScheme: any = [];
  let currentIndex = 0;
  dm_directoryParents &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dm_directoryParents?.map((i: any, index: number) => {
      currentIndex = index;
      if (index != 0) {
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id": `${constant.stagingBaseurl}${i.slug}`,
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: currentIndex + 1,
    item: {
      "@id": `${constant.stagingBaseurl}/${document.slug.toString()}.html`,
      name: document.name,
    },
  });
  return (
    <>
      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: "EyeGlassWorld",
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
        }}
      />
      <NewHeader prop={_site} />
      <BreadCrumbs
        name={name}
        address={address}
        parents={dm_directoryParents}
        baseUrl={relativePrefixToRoot}
      ></BreadCrumbs>

      <div className="content-list city-page">
        <div className="container mx-auto">
          <div className="sec-title">
            <h2>
              Eye Glass World Stores in {name}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-start -mx-2.5 lg:-mx-[.9375rem]">
            {childrenDivs}
          </div>
        </div>
      </div>
      <NewFooter prop={_site} />
    </>
  );
};
export default City;