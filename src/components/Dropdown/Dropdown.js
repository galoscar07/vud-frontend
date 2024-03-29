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
};


const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <div className={'grid-checkbox'} >
                    <input
                        type="checkbox"
                        className="checkbox fixed-heiwi"
                        checked={props.isSelected}
                        onChange={() => null}
                    />
                    <div>
                        {props.label}
                    </div>
                </div>
            </components.Option>
        </div>
    );
};

const OptionsOutsideSelect = (props) => {

    const { onChange, isLess3Condition, callbackLess3Condition } = props;
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

    const onInputChange = (e) => {
        setInput(e)
        if (isLess3Condition) {
            callbackLess3Condition(e)
        }
    }

    const { isMulti, value } = props;
    const [input, setInput] = useState("")

    return (
        <div>
            <Select
                inputValue={input} onInputChange={onInputChange}
                {...props}
                controlShouldRenderValue={!isMulti} styles={styles} classNamePrefix='filter'
                placeholder={props.placeholder || "Selectează"}
                noOptionsMessage={() => "Nu există opțiuni"}
            />
            <div className="selected-container">
                <div className="selected-wrapper">
                    {isMulti && value?.length !== 0 ? value?.map((val) =>
                        <div className="selected-option" key={val.value}><span>{val.label}</span>
                            <button name={val.value} onClick={handleRemoveValue}>
                                X
                            </button>
                        </div>)
                        : null}
                </div>
                {/*{!props.noNumber && value.length > 0 && <div className="counter">+{value.length}</div>}*/}
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
            <div className={`dropdown-title ${props.hasError ? 'err':''}`}>{props.title}</div>
            <OptionsOutsideSelect
                noNumber={props?.noNumber}
                options={options}
                value={selected}
                isMulti={props?.isMulti}
                onChange={handleSelectChange}
                components={{ Option }}
                allowSelectAll={true}
                hideSelectedOptions={false}
                isLess3Condition={props?.isLess3Condition}
                callbackLess3Condition={props?.callbackLess3Condition}
                placeholder={props.placeholder}
            ></OptionsOutsideSelect>
        </div>
    )
}

export default Dropdown;
