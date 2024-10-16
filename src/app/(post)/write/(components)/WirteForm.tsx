// FormLayout.tsx

interface FormLayoutProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const FormLayout = ({ onSubmit, children }: FormLayoutProps) => {
  return (
    <div className="m-0 p-3 bg-white">
      <h1 className="p-3 font-bold">글 작성</h1>
      <form className="flex flex-row gap-5 p-3" onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export default FormLayout;
