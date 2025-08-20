import * as React from "react";

export type CalendarProps = React.HTMLAttributes<HTMLDivElement>;

export function Calendar({ className, ...props }: CalendarProps) {
  return <div className={className} {...props} />;
}

