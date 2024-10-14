interface Props {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, name, value, onChange }: Props) => {
  return (
    <div className="flex flex-col">
      <span>{label}</span>
      <input className="border" name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default InputField;
