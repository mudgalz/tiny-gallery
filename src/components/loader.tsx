import { cn } from "@/lib/utils";
type ClassNameProp = { className?: string };
interface WrapperProps extends ClassNameProp {
  children: React.ReactNode;
}
function Loading() {
  return (
    <AbsoluteCenteredWrapper>
      <Loader />
    </AbsoluteCenteredWrapper>
  );
}

const Loader = ({ className }: ClassNameProp) => {
  return (
    <div
      className={cn(
        "animate-spin inline-block size-10 border-2 border-current border-t-transparent rounded-full",
        className
      )}
      role="status"
      aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const AbsoluteCenteredWrapper = ({ children, className }: WrapperProps) => {
  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        className
      )}>
      {children}
    </div>
  );
};

export { Loader, Loading, AbsoluteCenteredWrapper };
