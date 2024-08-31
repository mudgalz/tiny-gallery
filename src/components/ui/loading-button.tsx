import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { Loader } from "../loader";

type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean;
  children: React.ReactNode;
};

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ isLoading, children, ...props }, ref) => {
    return (
      <Button ref={ref} disabled={isLoading} {...props}>
        {isLoading && <Loader className="size-4 absolute border" />}
        <span className={isLoading ? "invisible" : "visible"}>{children}</span>
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;
