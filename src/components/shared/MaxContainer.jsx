import { cn } from "@/lib/utils";

export default function MaxContainer({ children, className }) {
  return (
    <div className={cn("container px-4 md:px-10 lg:px-16 w-full", className)}>
      {children}
    </div>
  );
}
