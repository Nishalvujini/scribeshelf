import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description: string;
  primaryActionLabel: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
};

export function EmptyState({
  title,
  description,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction
}: EmptyStateProps) {
  const handlePrimary = React.useCallback(() => {
    onPrimaryAction?.();
  }, [onPrimaryAction]);

  const handleSecondary = React.useCallback(() => {
    onSecondaryAction?.();
  }, [onSecondaryAction]);

  return (
    <Card className="shadow-subtle">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-600">
          <p className="font-medium text-slate-700">{title}</p>
          <p className="mt-1 text-slate-600">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center gap-3 justify-between">
        <p className="text-xs text-slate-500">
          Actions are placeholders for now.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={handlePrimary}>
            {primaryActionLabel}
          </Button>
          {secondaryActionLabel ? (
            <Button
              size="sm"
              variant="outline"
              onClick={handleSecondary}
            >
              {secondaryActionLabel}
            </Button>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
}

