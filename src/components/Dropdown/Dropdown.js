import Select, { components } from "react-select";
import { useEffect, useState } from "react";
import "./Dropdown.scss";

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
        const removedValue = value.find((val) => val.value.toString() === buttonName.toString());
        if (!removedValue) return;
        onChange(
            value.filter((val) => val.value.toString() !== buttonName.toString()),
            { buttonName, action: "remove-value", removedValue }
        );
    };

    const { isMulti, value } = props;
    return (
        <div>
            <Select {...props} controlShouldRenderValue={!isMulti} styles={styles} classNamePrefix='filter' />
            <div className="selected-container">
                <div className="selected-wrapper">
                    {isMulti && value.length !==0 ? value.map((val) =>
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


function Dropdown(props) {
    const [selected, setSelected] = useState(props.selected || []);

    useEffect(() => {
        setSelected(props.selected || []);
    }, [props.selected])

    const handleSelectChange = (values) => {
        setSelected(values);
        props.onSelect(values)
    };

    const options = props?.options

    return (
        <div className="dropdown">
            <div className="dropdown-title">{props.title}</div>
            <OptionsOutsideSelect
                options={options}
                value={selected}
                isMulti
                onChange={handleSelectChange}
                components={{ Option }}
                allowSelectAll={true}
                hideSelectedOptions={false}
            ></OptionsOutsideSelect>
        </div>
    )
}

export default Dropdown;
