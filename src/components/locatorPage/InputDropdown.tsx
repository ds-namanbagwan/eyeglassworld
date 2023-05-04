import classNames from "classnames";
import React, {
  useReducer,
  KeyboardEvent,
  useRef,
  useEffect,
  useState,
  useMemo,
  FocusEvent,
  Children,
} from "react";
import DropdownSection, { DropdownSectionProps } from "./DropdownSection";
import recursivelyMapChildren from "./utils/recursivelyMapChildren";
import { v4 as uuid } from "uuid";
import { Matcher, SelectableFilter, useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  breadcrumbhome,
  center_latitude,
  center_longitude,
  googleApikey,
  search_icn,
  UseMylocationsvg,
} from "../../../sites-global/global";
import useFetchResults from "../../hooks/useFetchResults";
import { AnswerExperienceConfig } from "../../config/answersHeadlessConfig";

export interface InputDropdownCssClasses {
  inputDropdownContainer?: string;
  inputDropdownContainer___active?: string;
  dropdownContainer?: string;
  inputElement?: string;
  inputContainer?: string;
  divider?: string;
  logoContainer?: string;
  searchButtonContainer?: string;
  // filterSearchContainer?:string;
}

interface Props {
  inputValue?: string;
  placeholder?: string;
  screenReaderInstructions: string;
  screenReaderText: string;
  onlyAllowDropdownOptionSubmissions?: boolean;
  forceHideDropdown?: boolean;
  onSubmit?: (value: string) => void;
  renderSearchButton?: () => JSX.Element | null;
  renderLogo?: () => JSX.Element | null;
  onInputChange: (value: string) => void;
  onInputFocus: (value: string) => void;
  onDropdownLeave?: (value: string) => void;
  cssClasses?: InputDropdownCssClasses;
  handleSetUserShareLocation: (value: string, userShareStatus: boolean) => void;
  handleInputValue: () => void;
}

interface State {
  focusedSectionIndex?: number;
  dropdownHidden: boolean;
}

type Action =
  | { type: "HideSections" }
  | { type: "ShowSections" }
  | { type: "FocusSection"; newIndex?: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HideSections":
      // alert('HideSections');
      return { focusedSectionIndex: undefined, dropdownHidden: true };
    case "ShowSections":
      // alert('ShowSections');
      return { focusedSectionIndex: undefined, dropdownHidden: false };
    case "FocusSection":
      return { focusedSectionIndex: action.newIndex, dropdownHidden: false };
  }
}

/**
 * A controlled input component with an attached dropdown.
 */

export default function InputDropdown({
  inputValue = "",
  placeholder,
  screenReaderInstructions,
  screenReaderText,
  onlyAllowDropdownOptionSubmissions,
  forceHideDropdown,
  children,
  onSubmit = () => { },
  renderSearchButton = () => null,
  renderLogo = () => null,
  onInputChange,
  onInputFocus,
  onDropdownLeave,
  cssClasses = {},
  handleSetUserShareLocation,
  handleInputValue,
  params,
  displaymsg,
  setDisplaymsg,
  setSearchInputValue,
}: React.PropsWithChildren<Props>): JSX.Element | null {
  const initialSearchvalue: any = "";
  const [{ focusedSectionIndex, dropdownHidden }, dispatch] = useReducer(
    reducer,
    {
      focusedSectionIndex: undefined,
      dropdownHidden: true,
    }
  );



  const shouldDisplayDropdown = !dropdownHidden && !forceHideDropdown;

  const [focusedOptionId, setFocusedOptionId] = useState<string | undefined>(
    undefined
  );
  const [latestUserInput, setLatestUserInput] = useState(inputValue);
  const [childrenKey, setChildrenKey] = useState(0);
  const [norecord, setNorecord] = useState(true);

  const [keyUpStatus, setKeyUpStatus] = useState(true);

  const screenReaderInstructionsId = useMemo(() => uuid(), []);
  const loading = useSearchState((s) => s.searchStatus.isLoading);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputDropdownRef = useRef<HTMLDivElement>(null);
  const locationResults = useSearchState((s) => s.vertical.results) || [];
  const allResultsForVertical = useSearchState(state => state.vertical?.noResults?.allResultsForVertical.results?.length) || 0;
  const searchActions = useSearchActions();
  const staticfilter = useSearchState((s) => s.filters.static?.length) || 0;
  let numSections = 0;
  const childrenWithProps = recursivelyMapChildren(children, (child) => {

    if (!(React.isValidElement(child) && child.type === DropdownSection)) {
      return child;
    }
    const currentSectionIndex = numSections;
    numSections++;

    const childProps = child.props as DropdownSectionProps;
    const modifiedOptions = childProps.options.map((option) => {
      // console.log(option,"children")
      const modifiedOnSelect = () => {
        setSearchInputValue("");
        setLatestUserInput(option.value);
        searchActions.setQuery(option.value);
        searchActions.setUserLocation(params);
        dispatch({ type: "HideSections" });
        option.onSelect?.();
      };
      return { ...option, onSelect: modifiedOnSelect };
    });

    const modifiedOnFocusChange = (value: string, focusedOptionId: string) => {
      child.props.onFocusChange?.(value, focusedOptionId);
      setFocusedOptionId(focusedOptionId);
    };

    if (focusedSectionIndex === currentSectionIndex) {
      // console.log(focusedSectionIndex, currentSectionIndex);
      return React.cloneElement(child, {
        onLeaveSectionFocus,
        options: modifiedOptions,
        isFocused: true,
        key: `${currentSectionIndex}-${childrenKey}`,
        onFocusChange: modifiedOnFocusChange,
      });
    } else {
      return React.cloneElement(child, {
        onLeaveSectionFocus,
        options: modifiedOptions,
        isFocused: false,
        key: `${currentSectionIndex}-${childrenKey}`,
      });
    }
  });

  /**
   * Handles changing which section should become focused when focus leaves the currently-focused section.
   * @param pastSectionEnd Whether the section focus left from the end or the beginning of the section.
   */
  function onLeaveSectionFocus(pastSectionEnd: boolean) {
    if (focusedSectionIndex === undefined && pastSectionEnd) {
      dispatch({ type: "FocusSection", newIndex: 0 });
    } else if (focusedSectionIndex !== undefined) {
      let newSectionIndex: number | undefined = pastSectionEnd
        ? focusedSectionIndex + 1
        : focusedSectionIndex - 1;
      if (newSectionIndex < 0) {
        newSectionIndex = undefined;
        onInputChange(latestUserInput);
        onDropdownLeave?.(latestUserInput);
      } else if (newSectionIndex > numSections - 1) {
        newSectionIndex = numSections - 1;
      }
      dispatch({ type: "FocusSection", newIndex: newSectionIndex });
    }
  }

  function handleDocumentClick(evt: MouseEvent) {
    const target = evt.target as HTMLElement;
    if (
      !(
        target.isSameNode(inputRef.current) ||
        dropdownRef.current?.contains(target)
      )
    ) {
      dispatch({ type: "HideSections" });
      getCoordinates(inputRef.current?.value);
    }


  }

  function handleDocumentKeydown(evt: globalThis.KeyboardEvent) {
    if (["ArrowDown", "ArrowUp"].includes(evt.key)) {
      evt.preventDefault();
    }

    if (evt.key === "Escape") {
      dispatch({ type: "HideSections" });
    } else if (
      evt.key === "ArrowDown" &&
      numSections > 0 &&
      focusedSectionIndex === undefined
    ) {
      dispatch({ type: "FocusSection", newIndex: 0 });
    }
  }

  function handleDocumentKeyUp(evt: KeyboardEvent<HTMLInputElement>) {
    if (

      evt.key == "Enter" &&
      latestUserInput != "" &&
      locationResults.length == 0
    ) {
      // alert('1')
      setNorecord(true);

      dispatch({ type: "HideSections" });
      // document.querySelector('.z-10')?.classList.add('hidden');

      getCoordinates(latestUserInput);
    }
    if (
      evt.key == "Enter" &&
      latestUserInput != "" &&
      locationResults.length > 0
    ) {
      // alert('2')
      const locationFilter: SelectableFilter = {
        selected: true,
        fieldId: "builtin.location",
        value: {
          lat: params.latitude,
          lng: params.longitude,
          radius: 5,
        },
        matcher: Matcher.Near,
      };
      // searchActions.setOffset(0);
      searchActions.setStaticFilters([locationFilter]);
      dispatch({ type: "HideSections" });
      document.querySelector('.z-10')?.classList.add('hidden');

      getCoordinates(latestUserInput);
    }

    handleInputValue();
    if (evt.key === "Backspace" || evt.key === "x" || evt.key === "Delete") {
      if (inputValue == "") {
        setNorecord(false);
        setDisplaymsg(false);
        setLatestUserInput("");
        if (keyUpStatus) {
          // searchActions.setVertical("");///for result stop
          searchActions.setQuery("");
          searchActions.setOffset(0);
          searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
          searchActions.executeVerticalQuery();
          setKeyUpStatus(false);
        }
      }
    }


    // if (document.querySelector(".z-10") != null) {
    //   document.querySelector(".z-10")?.classList.remove("hidden");
    // }
  }
  useEffect(() => {
    if (inputValue != "") {
      setKeyUpStatus(true);
    }
    if (!keyUpStatus) {
      // searchActions.resetFacets();
      // setKeyUpStatus(false);
      // searchActions.setVertical("locations");
    }
  }, [inputValue])

  useEffect(() => {
    if (shouldDisplayDropdown) {
      document.addEventListener("click", handleDocumentClick);
      document.addEventListener("keydown", handleDocumentKeydown);
      return () => {
        document.removeEventListener("click", handleDocumentClick);
        document.removeEventListener("keydown", handleDocumentKeydown);
      };
    }

    if (latestUserInput === "") {
      setNorecord(false);
      setDisplaymsg(false);
    } else if (!loading && locationResults.length === 0) {
      setDisplaymsg(true);
    }
  },);

  const meterstoMiles = (miles: number) => {
    const meters = miles * 1609.344;
    return meters;
  }

  const radius = 200;
  const miles1 = meterstoMiles(radius);
  console.log(miles1, "ashsjfgsdj,fysd");

  const options = [
    { value: "50", label: "50 mile" },
    { value: "100", label: "100 mile" },
    { value: "200", label: "200 mile" },
    { value: "300", label: "300 mile" },
    { value: "400", label: "400 mile" },
    { value: "500", label: "500 mile" },
  ];
  ////start///////
  /////bound result at user marker 200 miles//////// 
  function getGoogleLatLng(address: any) {
    let coordinates = {
      latitude: center_latitude,
      longitude: center_longitude
    }
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address},US&key=${googleApikey}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "ZERO_RESULTS") {
          searchActions.setQuery("gkhvfdjgbdbg");
          searchActions.setUserLocation(coordinates);
          searchActions.setOffset(0);
          searchActions.setVerticalLimit(AnswerExperienceConfig.limit)
          searchActions.executeVerticalQuery();
        } else if (json.results) {
          var status = false;
          json.results.map((components: any) => {
            for (let i = 0; i < components.address_components.length; i++) {
              const type = components.address_components[i].types[0];
              params = {
                latitude: components.geometry.location.lat,
                longitude: components.geometry.location.lng,
              };
              if (components.address_components[i].types.includes("country")) {
                if (components.address_components[i].short_name != "US") {
                  status = true;
                }
              }
            }
          });

          if (status) {
            searchActions.setQuery(address);
            searchActions.setUserLocation(coordinates);
            searchActions.setOffset(0);
            searchActions.setVerticalLimit(AnswerExperienceConfig.limit)
            searchActions.executeVerticalQuery();
          } else {
            // const handleChange = (e: any) => {  
            // let mileToMeter = e.target.value * 1609.344;
            const locationFilter: SelectableFilter = {
              selected: true,
              fieldId: "builtin.location",
              value: {
                lat: params.latitude,
                lng: params.longitude,
                radius: miles1//radius 200 miles

              },
              matcher: Matcher.Near,
            };
            console.log(locationFilter.value, "naman")

            searchActions.setUserLocation(params);
            searchActions.setQuery("");
            searchActions.setStaticFilters([locationFilter])
            searchActions.setVerticalLimit(AnswerExperienceConfig.limit)
            searchActions.executeVerticalQuery();
          }
        }

      })
      .catch(() => { });
    /////end////////
  }

  function getCoordinates(address: string) {
    getGoogleLatLng(address);
    // searchActions.setQuery(address);
    // searchActions.setUserLocation(params);
    // searchActions.setOffset(0);
    // searchActions.executeVerticalQuery();
  }

  function handleInputElementKeydown(evt: KeyboardEvent<HTMLInputElement>) {
    if (["ArrowDown", "ArrowUp"].includes(evt.key)) {
      evt.preventDefault();
    }

    if (
      evt.key === "Enter" &&
      focusedSectionIndex === undefined &&
      !onlyAllowDropdownOptionSubmissions
    ) {
      setLatestUserInput(inputValue);
      onSubmit(inputValue);
      // dispatch({ type: 'HideSections' });
    }
    if (staticfilter > 0) {
      searchActions.setStaticFilters([]);
    }

  }

  function handleBlur(evt: FocusEvent<HTMLDivElement>) {
    if (
      !evt.relatedTarget ||
      !(evt.relatedTarget instanceof HTMLElement) ||
      !inputDropdownRef.current
    ) {
      return;
    }
    if (!inputDropdownRef.current.contains(evt.relatedTarget)) {
      dispatch({ type: "HideSections" });
    }
  }

  const inputDropdownContainerCssClasses = classNames(
    cssClasses.inputDropdownContainer,
    {
      [cssClasses.inputDropdownContainer___active ?? ""]: shouldDisplayDropdown,
    }
  );

  let optionsHtml = options && options.map((option: any, i: Number) => {
    return (
      <>
        <option value={option.value} >{option.label}</option>
      </>
    );
  });

  return (
    <>
      <div
        className={inputDropdownContainerCssClasses}
        ref={inputDropdownRef}
        onBlur={handleBlur}>
        <div className={cssClasses?.inputContainer}>
          <div className={cssClasses.logoContainer}>{renderLogo()}</div>
          <input
            className={cssClasses.inputElement}
            placeholder={placeholder}
            onChange={(evt) => {
              const value = evt.target.value;

              setNorecord(false);
              setDisplaymsg(false);
              setLatestUserInput(value);
              onInputChange(value);
              onInputFocus(value);
              setChildrenKey(childrenKey + 1);
              dispatch({ type: "ShowSections" });
            }}
            onClick={() => {
              onInputFocus(inputValue);
              setChildrenKey(childrenKey + 1);
              dispatch({ type: "ShowSections" });
            }}
            onKeyDown={handleInputElementKeydown}
            onKeyUp={handleDocumentKeyUp}
            value={inputValue}
            ref={inputRef}
            aria-describedby={screenReaderInstructionsId}
            aria-activedescendant={focusedOptionId}
          />
          <div className={cssClasses.searchButtonContainer}>
            {renderSearchButton()}
          </div>
        </div>

        {(locationResults.length === 0 && allResultsForVertical > 0) || (locationResults.length === 0 && displaymsg && !loading) ? (
          <h4 className="font-bold">
            Sorry No result found
          </h4>
        ) : (
          ""
        )}
        {shouldDisplayDropdown && Children.count(children) !== 0 && (
          <>
            <div className={cssClasses.divider}></div>
            <div className={cssClasses.dropdownContainer} ref={dropdownRef}>
              {childrenWithProps}
            </div>
          </>
        )}

      </div>
      {/* dropdown start */}
      <div className="filter-by-services">
        <h3>Filter by Miles</h3>
        <select>
          {optionsHtml}
        </select>
      </div>
      {/* dropdown end */}
    </>
  );
}


