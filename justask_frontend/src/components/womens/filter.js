import { useState } from "react";
import "./filter.css";

function Filter(props) {

    const filtersToRender = props.filterData?.filters || [];

    console.log('filterData', filtersToRender);

    const [openFilters, setOpenFilters] = useState(() => {
        const initialOpen = new Set();
        if (filtersToRender.length > 0) {
            initialOpen.add(filtersToRender[0].type);
        }
        if (filtersToRender.length > 1) {
            initialOpen.add(filtersToRender[1].type);
        }
        return initialOpen;
    });

    const [selectedValues, setSelectedValues] = useState(() => {
        const initialSelected = {};
        filtersToRender.forEach(filter => {
            initialSelected[filter.type] = filter.selected || (filter.displayType === 'checkbox' ? [] : null);
        });
        return initialSelected;
    });

    const toggleFilterSection = (type) => {
        setOpenFilters(prevOpenFilters => {
            const newOpenFilters = new Set(prevOpenFilters);
            if (newOpenFilters.has(type)) {
                newOpenFilters.delete(type);
            } else {
                newOpenFilters.add(type);
            }
            return newOpenFilters;
        });
    };

    const handleOptionChange = (filterType, optionValue) => {
        setSelectedValues(prevSelectedValues => {
            const currentSelected = prevSelectedValues[filterType];
            let newSelected;

            if (Array.isArray(currentSelected)) {
                if (currentSelected.includes(optionValue)) {
                    newSelected = currentSelected.filter(val => val !== optionValue);
                } else {
                    newSelected = [...currentSelected, optionValue];
                }
            } else {
                newSelected = currentSelected === optionValue ? null : optionValue;
            }

            console.log(`Filter ${filterType} changed to:`, newSelected);

            return {
                ...prevSelectedValues,
                [filterType]: newSelected
            };
        });
    };


    return (
        <div className="sidebar col-md-3 px-0">
            <div className="sidebar__inner">
                <div className="filter-body">
                    <div>
                        <h2 className="border-bottom filter-title">Filter</h2>

                        {filtersToRender.map((filterGroup) => (
                            <div key={filterGroup.type} className="filter-group-container">
                                <h2
                                    className="font-xbold body-font border-bottom filter-title"
                                    onClick={() => toggleFilterSection(filterGroup.type)} // Click to toggle
                                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    {filterGroup.label || filterGroup.type.charAt(0).toUpperCase() + filterGroup.type.slice(1)}
                                    <span>{openFilters.has(filterGroup.type) ? '−' : '+'}</span>
                                </h2>

                                {/* Collapsible content */}
                                {openFilters.has(filterGroup.type) && (
                                    <div className="mb-3 filter-options">
                                        {/* Render options based on displayType */}
                                        {filterGroup.displayType === 'checkbox' && (
                                            filterGroup.options.map((option, index) => {
                                                // Handle options that might be objects (like price) or strings
                                                const optionLabel = typeof option === 'object' ? option.label : option;
                                                const optionValue = typeof option === 'object' ? option.value || option.label : option; // Use value if present, else label/option

                                                return (
                                                    <div className="custom-control custom-checkbox mb-3" key={`${filterGroup.type}-${optionValue}`}>
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id={`${filterGroup.type}-${optionValue.replace(/\s+/g, '-')}`}
                                                            checked={Array.isArray(selectedValues[filterGroup.type]) ?
                                                                selectedValues[filterGroup.type].includes(optionValue) :
                                                                selectedValues[filterGroup.type] === optionValue
                                                            }
                                                            onChange={() => handleOptionChange(filterGroup.type, optionValue)}
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor={`${filterGroup.type}-${optionValue.replace(/\s+/g, '-')}`}
                                                        >
                                                            {optionLabel}
                                                        </label>
                                                    </div>
                                                );
                                            })
                                        )}

                                        {/* Placeholder for range slider if displayType is 'range-slider' */}
                                        {filterGroup.type === 'price' && filterGroup.displayType === 'range-slider' && (
                                            <div>
                                                <p>Price Range Slider Goes Here</p>
                                                <div className="mb-3 theme-clr xs2-font d-flex justify-content-between">
                                                    <span id="slider-range-value1">$100</span>
                                                    <span id="slider-range-value2">$10,000</span>
                                                </div>
                                                <div className="mb-30 filter-options">
                                                    <form>
                                                        <div className="form-group">
                                                            <input type="range" className="form-control-range" />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                        {/* You can add more conditions for other displayTypes here (e.g., 'radio', 'color-swatch') */}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;