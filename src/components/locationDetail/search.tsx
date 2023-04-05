import * as React from "react";
const SearchBar = () => (
<div className="cover">
  <form method="get"  className="searchfrom">
    <div className="tb">
      <div className="td flex"><input type="text" placeholder="Search entire store here..." name="text" required style={{border:"solid",width:"250px",padding:"15px",borderWidth:"1px", borderRadius:"1px"}}/>
      <div><button className="bg-green border-solid w-16" style={{padding:"16px",borderWidth:"1px",borderRadius:"1px"}}>GO</button></div>
      </div>
      
      <div className="td" id="s-cover">
        <button  type="submit" className="buttonsearch">
          {/* <div className="s-circle"></div> */}
          <span></span>
        </button>
      </div>
    </div>
  </form>
</div>
);

export default SearchBar;