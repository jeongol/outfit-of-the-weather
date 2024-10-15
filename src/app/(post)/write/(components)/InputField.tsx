import { weatherOptions } from "@/constants/weather";

interface Props {
  type: string;
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const InputField = ({ type, label, name, value, onChange }: Props) => {
  return type === "input" ? (
    <div className="flex flex-col">
      <span>{label}</span>
      <input className="border" name={name} value={value} onChange={onChange} />
    </div>
  ) : type === "number" ? (
    <div className="flex flex-col">
      <input
        className="border border-gray-300 rounded p-2"
        name={name}
        value={value}
        onChange={onChange}
        type="number"
        min="-50"
        max="50"
      />
      <input type="range" min="-50" max="50" name={name} value={value} onChange={onChange} />
    </div>
  ) : type === "select" ? (
    <div>
      <label>{label}</label>
      <select className="flex flex-col border p-[2px]" name={name} value={value} onChange={onChange}>
        {weatherOptions.map((option) => (
          <option key={crypto.randomUUID()} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <div className="flex flex-col">
      <span>{label}</span>
      <textarea className="border" name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default InputField;
