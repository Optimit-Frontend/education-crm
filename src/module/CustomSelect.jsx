import { Select } from "antd";

const { Option } = Select;

function CustomSelect({
  selectData,
  DValue,
  onChange,
  backValue = "id",
  placeholder = "Tanlang",
  disabled = false,
  className = "",
}) {
  const options = selectData?.map((item) => {
    return (
      <Option value={backValue === "id" ? item.id : item.name} key={item.id}>
        {item.name}
      </Option>
    );
  });
  return (
    <Select
      className={className}
      showSearch
      allowClear
      placeholder={placeholder}
      optionFilterProp="children"
      style={{ width: "100%" }}
      defaultValue={DValue}
      onChange={(e) => { return onChange(e); }}
      key="id"
      filterOption={(input, option) => { return option.children.toLowerCase().includes(input.toLowerCase()); }}
      disabled={disabled}
    >
      {options}
    </Select>
  );
}

export default CustomSelect;
