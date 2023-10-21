import { cn } from "@/utils/ui";

export type ChipProps = {
  className?: string;
};

const Chip = ({ className, children }: React.PropsWithChildren<ChipProps>) => {
  return (
    <span className={cn("border rounded-full px-2.5 py-1 bg-muted border-input", className)}>
      {children}
    </span>
  );
};

export default Chip;
