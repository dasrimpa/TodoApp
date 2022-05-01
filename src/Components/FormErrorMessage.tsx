import { ReactNode } from "react";

export default function FormErrorMessage({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <>
      {children ? (
        <div className="text-red-400 text-base pt-3">{children} </div>
      ) : (
        <></>
      )}
    </>
  );
}
