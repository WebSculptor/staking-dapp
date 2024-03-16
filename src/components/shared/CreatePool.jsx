import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createPoolSchema } from "@/validators";
import { Vote } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreatePool } from "@/hooks/useCreatePool";

export default function CreatePool() {
  const [formData, setFormData] = useState({
    isLoading: false,
    rewardRate: "",
  });
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(createPoolSchema),
    defaultValues: {
      reward: "",
    },
  });

  const result = useCreatePool(formData.rewardRate);

  async function onSubmit(values) {
    setFormData(() => ({
      rewardRate: parseInt(values.reward),
      isLoading: true,
    }));

    try {
      result();
    } catch (error) {
      toast("Failed transaction");
      console.log(error);
    } finally {
      setFormData((prev) => ({ ...prev, isLoading: false }));
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Vote className="w-4 h-4 mr-2" />
          Create Pool
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a Pool</DialogTitle>
          <DialogDescription>
            Input of a reward rate for a new pool, which is then created on the
            contract instance.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="reward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reward Rate</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter reward rate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4"
              disabled={formData.isLoading}>
              {formData.isLoading ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
