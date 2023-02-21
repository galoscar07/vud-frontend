import Select, { components } from "react-select";
import { useState } from "react";
import "./Dropdown.scss";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'bannana', label: 'Bannana' },
]

const styles = {

    multiValue: ({
        background: "#17616C",
        borderRadius: "8rem",
        color: "white",
        display: "flex",
        alignItems: "center",
        padding: "0.5rem 1rem"
    }),
    multiValueLabel: ({
        color: "white",
    }),
    singleValue: ({
        color: "red",
        backgroundColor: "#F5F9F9",
        padding: ".5rem 3rem .5rem .5rem",
        cursor: "pointer",
        textAlign: "start"
    }),
};


const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};


const OptionsOutsideSelect = (props) => {
    const { onChange } = props;
    const handleRemoveValue = (e) => {
        if (!onChange) return;
        const { name: buttonName } = e.currentTarget;
        const removedValue = value.find((val) => val.value === buttonName);
        if (!removedValue) return;
        onChange(
            value.filter((val) => val.value !== buttonName),
            { buttonName, action: "remove-value", removedValue }
        );
    };

    const { isMulti, value } = props;

    return (
        <div>
            <Select {...props} controlShouldRenderValue={!isMulti} styles={styles} classNamePrefix='filter' />
            <div className="selected-container">
                <div className="selected-wrapper">
                    {isMulti ? value.map((val) =>
                        <div className="selected-option" key={val.value}><span>{val.label}</span>
                            <button name={val.value} onClick={handleRemoveValue}>
                                X
                            </button>
                        </div>)
                        : null}
                </div>
                {value.length > 0 && <div className="counter">+{value.length}</div>}
            </div>
        </div>
    );
};


function Dropdown() {
    const [selected, setSelected] = useState([]);
    const handleSelectChange = (values) => {
        setSelected(values);
    };

    return (
        <OptionsOutsideSelect
            options={options}
            value={selected}
            isMulti
            onChange={handleSelectChange}
            components={{ Option }}
            allowSelectAll={true}
            hideSelectedOptions={false}
        ></OptionsOutsideSelect>
    )
}

export default Dropdown;
