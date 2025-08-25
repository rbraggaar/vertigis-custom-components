import type { LayoutElementProperties } from "@vertigis/web/components";
import { LayoutElement } from "@vertigis/web/components";
import { UIContext } from "@vertigis/web/ui";
import FormControl from "@vertigis/web/ui/FormControl";
// import FormControlLabel from "@vertigis/web/ui/FormControlLabel";
// import FormHelperText from "@vertigis/web/ui/FormHelperText";
import Input from "@vertigis/web/ui/Input";
import MenuItem from "@vertigis/web/ui/MenuItem";
import type { SelectChangeEvent } from "@vertigis/web/ui/Select";
import Select from "@vertigis/web/ui/Select";
import { useWatchAndRerender } from "@vertigis/web/ui/hooks";
import { useContext } from "react";
import {
    useState,
    type ReactElement,
    type ChangeEvent,
    // useEffect,
} from "react";

import type CustomSearchModel from "./CustomSearchModel";
import "./CustomSearch.css";

const CustomSearch = (
    props: LayoutElementProperties<CustomSearchModel>
): ReactElement => {
    const { model } = props;

    const [searchInput, setSearchInput] = useState("");
    const [searchSource, setSearchSource] = useState("Adres, postcode of plaats");

    useWatchAndRerender(model, "searchLayer1");
    /**
     * Access the commands from the UI context
     * This allows you to use commands like zoomToInitialViewpoint
     */
    const { operations } = useContext(UIContext);

    const handleSearchSourceChange = (event: SelectChangeEvent<unknown>) => {
        setSearchSource(event.target.value as string);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput((event.target as HTMLInputElement).value);
    };

    const getData = async (searchInput: string): Promise<void> => {
        if (searchInput && searchSource) {

            try {
                if (searchSource === "Adres, postcode of plaats") {
                    const result = await operations.geocode.geocode.execute(
                        {
                            address: searchInput, 
                            options: {
                                maxResults: 5,
                            }
                        }
                    );

                    console.log(JSON.stringify(result));
                } else {
                    console.log("Search source not recognized:", searchSource);
                }
            }
            // console.debug("Geocode results:", results);
            // Handle results as needed, e.g., update state or display results
            catch (error) {
                console.error("Geocode error:", error);
            }
        }
    }

    const handleSearchSubmit = (event) => {
        console.log("Search submitted:", searchInput);

        event.preventDefault();
        // Handle the search submission here

        getData(searchInput).catch((error) => {
            console.error("Error in getData:", error);
        });
    }

    // useEffect(() => {

    //     getData(searchInput).catch((error) => {
    //         console.error("Error in getData:", error);
    //     });

    // }, [searchSource, searchInput, operations.geocode.geocode]);

    return (
        <LayoutElement {...props} className="search-container">
            <div className="title-container">
                <form
                    onSubmit={handleSearchSubmit}
                    className="title-container"
                    style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                >
                    <FormControl>
                        <Input
                            type="text"
                            id="input-controlled"
                            placeholder={"Zoeken"}
                            value={searchInput}
                            onChange={handleChange}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    handleSearchSubmit(e);
                                }
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <Select
                            labelId="search-source-label"
                            id="search-source"
                            value={searchSource}
                            onChange={handleSearchSourceChange}
                        >
                            <MenuItem value={"Adres, postcode of plaats"}>{"Adres, postcode of plaats"}</MenuItem>
                            <MenuItem value={model.searchLayer1}>{model.searchLayer1}</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </div>
            {/* <img onClick={async () => {
                // zoom to initial viewpoint on clicking Dommel logo
                await commands.map.zoomToInitialViewpoint.execute({});
            }} src={logo} alt="Dommel Logo" className="logo" width={75} /> */}
        </LayoutElement>
    );
};

export default CustomSearch;
