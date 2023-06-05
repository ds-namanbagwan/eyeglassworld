import * as React from "react";
import Address from "../commons/Address";
import GetDirection from "../commons/GetDirection";
import OpenClose from "../commons/openClose"
import { Link } from "@yext/pages/components";
import { StaticData } from "../../../sites-global/staticData";

export default function Nearby(props: any) {

  const [neabyData, setnearbyData] = React.useState(props.externalApiData.response.results);
  // console.log(props.externalApiData,"location result-list-inner-355923963200068037 result markerEventBinded")
  const metersToMiles = (meters: number) => {
    const miles = meters * 0.000621371;
    return miles.toFixed(2);
  }
  return (
    <>
      {neabyData.map((location: any, index: number) => {
        let url = "";
        var name: any = location.data.name?.toLowerCase();
        var country: any = location.data.address.countryCode?.toLowerCase();
        var initialcountry: any = country.toString();
        var finalcountry: any = initialcountry.replaceAll(" ", "-");
        var region: any = location.data.address.region?.toLowerCase();
        var initialregion: any = region.toString();
        var finalregion: any = initialregion.replaceAll(" ", "-");
        var city: any = location.data.address.city?.toLowerCase();
        var initialrcity: any = city.toString();
        var finalcity: any = initialrcity.replaceAll(" ", "-");
        var string: any = name.toString();
        let result1: any = string.replaceAll(" ", "-");
        let newurl = finalcountry + "/" + finalregion + "/" + finalcity + "/" + result1 + ".html";
        if (!location.data.slug) {
          // url = `/${location.data.id}-${result1}.html`;
          url = `/${newurl}`;
          // console.log(url, "j,fgsjdhfhsfhsfhgfsdjfghdj");
        } else {
          url = `/${location.data.slug.toString()}.html`;
        }
        if (index > 0) {
          return (
            <>
              <div className="nearby-card">
                <div className="location-name-miles icon-row">
                  <h2><Link className="inline-block notHighlight" href={`${url}`}
                    data-ya-track={`${location.data.name}`}
                    eventName={`${location.data.name}`}
                    rel="noopener noreferrer">{location.data.name}</Link></h2>
                </div>
                <div className="distance mt-5 mr-5">{metersToMiles(location.distance)}
                  <span>{StaticData.miles}</span>
                </div>
                <div className="icon-row content-col">
                  <Address address={location.data.address} />
                </div>
                <div className="icon-row closeing-div">
                  {location.data.hours ?
                    <div className="flex open-now-string items-center " data-id={`main-shop-${location.data.id}`} >
                      <OpenClose timezone={location.data.timezone} hours={location.data.hours} deliveryHours={location.data.hours}></OpenClose>
                    </div> :
                    <div className="closeddot notHighlight red-dot">
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                        <circle id="Ellipse_5" data-name="Ellipse 5" cx="4" cy="4" r="4" fill="#ad1e1f" />
                      </svg>
                      <div className="hours-info text-lg font-second-main-font closeddot">
                        Closed
                      </div>
                    </div>
                  }
                </div>
                <div className="button-bx">
                  <Link className="btn" href={`${url}`}
                    data-ya-track={`viewstore-${location.data.name}`}
                    eventName={`viewstore-${location.data.name}`}
                    rel="noopener noreferrer">
                    {/* <div dangerouslySetInnerHTML={{__html: View_Store}}/> */}
                    STORE DETAILS</Link>
                  <GetDirection buttonText={props.c_getDirectionsCTAText ? props.c_getDirectionsCTAText : "Get directions"} address={location.data.address} latitude={location.data.displayCoordinate ? location.data.displayCoordinate.latitude : location.data.yextDisplayCoordinate.latitude} longitude={location.data.displayCoordinate ? location.data.displayCoordinate.longitude : location.data.yextDisplayCoordinate.longitude} />
                </div>
              </div>
            </>
          )
        }
      }
      )
      }

    </>
  )
}
