import * as React from "react";
import { regionNames } from "../../../sites-global/global";

interface type {
  line1: string,
  line2: string,
  region: string,
  postalCode: number,
  city: string,
  countryCode: string
}
interface Address1 {
  address: type;
}
const Address = (props: Address1) => {
  const { address } = props;
  return (
    <>
      <div className="address notHighlight ">
        <div className="notHighlight">{address.line1}</div>
        {address.line2 && (<div><span className="notHighlight">{address.line2}</span></div>)}
        <div ><span className="notHighlight">{address.city}, {address.region}</span> </div>
        {<div ><span className="notHighlight">{address.postalCode}, {regionNames.of(address.countryCode)}</span></div>}
      </div>
    </>
  );
}
export default Address;
