import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  placeholder?: string;
  items: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
  defaultValue?: string;
};

const Dropdown = ({ placeholder, items, onChange, defaultValue }: Props) => {
  return (
    <Select
      onValueChange={(value) => {
        onChange(value);
      }}
      defaultValue={defaultValue}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder ?? "Select"} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => {
          return <SelectItem value={item.value}>{item.label}</SelectItem>;
        })}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
