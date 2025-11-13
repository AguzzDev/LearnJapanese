import { MinigameProvider } from "@/context/MinigameContext";

export const withMinigame = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return function withMinigameProvider(props: P) {
    return (
      <MinigameProvider>
        <WrappedComponent {...props} />
      </MinigameProvider>
    );
  };
};
