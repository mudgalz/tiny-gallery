import { cn } from "@/lib/utils";
interface Props {
  className?: string;
}
export default function ({ className }: Props) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0",
        className
      )}
      style={{
        background:
          "linear-gradient(180deg,rgba(0,0,0,.25),transparent 35%,transparent 65%,rgba(0,0,0,.25))",
      }}
    />
  );
}
