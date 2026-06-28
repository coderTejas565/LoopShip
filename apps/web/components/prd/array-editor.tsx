"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

type Props = {
  title: string;
  value: string[];
  onChange: (items: string[]) => void;
};

export function ArrayEditor({ title, value, onChange }: Props) {
  function update(index: number, text: string) {
    const copy = [...value];
    copy[index] = text;
    onChange(copy);
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function add() {
    onChange([...value, ""]);
  }

  return (
    <div className="space-y-5 rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">{title}</Label>

        <Button type="button" variant="outline" size="sm" onClick={add}>
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="space-y-3">
        {value.length === 0 && (
          <div className="rounded-md border border-dashed py-8 text-center text-sm text-muted-foreground">
            No items yet.
          </div>
        )}

        {value.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-3 h-2 w-2 rounded-full bg-primary" />

            <Input
              value={item}
              placeholder={`Item ${index + 1}`}
              onChange={(e) => update(index, e.target.value)}
            />

            <Button type="button" size="icon" variant="ghost" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
