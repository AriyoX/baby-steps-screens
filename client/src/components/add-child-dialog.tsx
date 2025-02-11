import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const addChildSchema = insertUserSchema.pick({
  username: true,
  password: true,
  displayName: true
}).extend({
  username: insertUserSchema.shape.username,
  password: insertUserSchema.shape.password,
  displayName: insertUserSchema.shape.displayName
});

type AddChildFormData = typeof addChildSchema._type;

export function AddChildDialog() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<AddChildFormData>({
    resolver: zodResolver(addChildSchema),
    defaultValues: {
      username: "",
      password: "",
      displayName: "",
    },
  });

  const addChildMutation = useMutation({
    mutationFn: async (data: AddChildFormData) => {
      const res = await apiRequest("POST", "/api/register", {
        ...data,
        isParent: false,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/children"] });
      toast({
        title: "Success",
        description: "Child account created successfully",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Child Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Child Account</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => addChildMutation.mutate(data))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={addChildMutation.isPending}
            >
              {addChildMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Account
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
