type DropdownMenuProps = {
  children: React.ReactNode;
};

export function DropdownMenu({ children }: DropdownMenuProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        background: 'white',
        border: '1px solid #ccc',
        padding: '8px',
        zIndex: 1000,
        minWidth: '150px',
      }}
    >
      {children}
    </div>
  );
}
