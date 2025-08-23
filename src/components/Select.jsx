import ReactSelect from "react-select";

const styles = {
  container: (base) => ({
    ...base,
    flex: 1,
    minWidth: 0,
  }),
  control: (base, state) => ({
    ...base,
    minHeight: 40,
    height: 40,
    borderRadius: 14,
    borderColor: "#767676",
    boxShadow: "none",
    "&:hover": { borderColor: "#767676" },
    backgroundColor: "#fff",
  }),
  valueContainer: (base) => ({
    ...base,
    padding:  "0 15px 0 15px",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    paddingRight: 4,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 2
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: 12,
    color: "#000",
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: 12,
    color: "#AEAEAE",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 10,
    boxShadow: "0 6px 18px rgba(0,0,0,.08)",
  }),
  menuList: (base) => ({
    ...base,
    paddingTop: 4,
    paddingBottom: 4,
    maxHeight: 180,
  }),
  option: (base, state) => ({
    ...base,
    fontSize: 13,
    lineHeight: 1.3,
    padding: "6px 10px",
    backgroundColor: state.isFocused ? "#F5F7FA" : "#fff",
    color: "#111",
  }),
};


export default function Select(props) {
  return (
    <ReactSelect
      {...props}
      isClearable={false}
      components={{ IndicatorSeparator: () => null }}
      styles={styles}
    />
  );
}