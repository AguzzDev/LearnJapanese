import { ShowProvider } from "@/context/ShowContext";

export const withTable = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return function WithTableProvider(props: P) {
    return (
      <ShowProvider>
        <WrappedComponent {...props} />
      </ShowProvider>
    );
  };
};
