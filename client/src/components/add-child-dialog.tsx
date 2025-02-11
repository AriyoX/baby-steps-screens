import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { Plus, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";

type Step = {
  title: string;
  description: string;
  fields: Array<keyof typeof insertUserSchema._type>;
};

const STEPS: Step[] = [
  {
    title: "Basic Information",
    description: "Let's start with your child's account details",
    fields: ["username", "password", "displayName"],
  },
  {
    title: "Age & Interests",
    description: "Help us personalize the learning experience",
    fields: ["age", "interests", "favoriteTopic"],
  },
  {
    title: "Learning Preferences",
    description: "How does your child learn best?",
    fields: ["learningStyle", "dailyGoalMinutes"],
  },
];

const learningStyles = [
  { label: "Visual - Learns best with pictures and videos", value: "visual" },
  { label: "Auditory - Learns best by listening", value: "auditory" },
  { label: "Kinesthetic - Learns best by doing", value: "kinesthetic" },
];

export function AddChildDialog() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);

  const form = useForm<typeof insertUserSchema._type>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
      displayName: "",
      isParent: false,
      age: undefined,
      interests: [],
      learningStyle: undefined,
      favoriteTopic: "",
      dailyGoalMinutes: 30,
    },
  });

  const addChildMutation = useMutation({
    mutationFn: async (data: typeof insertUserSchema._type) => {
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
      setStep(0);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const currentStep = STEPS[step];
  const isLastStep = step === STEPS.length - 1;

  const onNext = async () => {
    const fields = currentStep.fields;
    const valid = await form.trigger(fields as any);
    if (valid) {
      if (isLastStep) {
        addChildMutation.mutate(form.getValues());
      } else {
        setStep(s => s + 1);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Child Account
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{currentStep.title}</DialogTitle>
          <DialogDescription>{currentStep.description}</DialogDescription>
        </DialogHeader>

        <div className="flex mb-4">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`flex-1 h-2 mx-1 rounded ${
                i <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <Form {...form}>
          <form className="space-y-4">
            {currentStep.fields.includes("username") && (
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
            )}

            {currentStep.fields.includes("password") && (
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
            )}

            {currentStep.fields.includes("displayName") && (
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
            )}

            {currentStep.fields.includes("age") && (
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {currentStep.fields.includes("favoriteTopic") && (
              <FormField
                control={form.control}
                name="favoriteTopic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favorite Learning Topic</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Science, History, Art" />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {currentStep.fields.includes("learningStyle") && (
              <FormField
                control={form.control}
                name="learningStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Learning Style</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="space-y-2"
                      >
                        {learningStyles.map(style => (
                          <div
                            key={style.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={style.value} id={style.value} />
                            <FormLabel htmlFor={style.value} className="font-normal">
                              {style.label}
                            </FormLabel>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {currentStep.fields.includes("dailyGoalMinutes") && (
              <FormField
                control={form.control}
                name="dailyGoalMinutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Learning Goal (minutes)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Recommended: 30-60 minutes per day
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(s => s - 1)}
                disabled={step === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                type="button"
                onClick={onNext}
                disabled={addChildMutation.isPending}
              >
                {addChildMutation.isPending && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {isLastStep ? "Create Account" : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}