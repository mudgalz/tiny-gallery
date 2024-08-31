import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
type Props = {
  content: JSX.Element | string;
  children: JSX.Element;
  triggerClassName?: string;
  contentClassName?: string;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
};
export default function ({
  children,
  content,
  triggerClassName,
  ...props
}: Props) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger className={triggerClassName} asChild>
          {children}
        </TooltipTrigger>
        {content && (
          <TooltipContent
            // className={props.contentClassName}
            {...props}>
            {content}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
