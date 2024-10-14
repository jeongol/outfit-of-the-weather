interface Props {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<Props> = ({ label, name, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <span>{label}</span>
      <input className="border" name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default InputField;
