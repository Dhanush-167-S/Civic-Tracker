import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { complaintSchema } from "../schema/schema";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateComplaint } from "../hooks/useCreateComplaint";
import { toast } from "sonner";

const CreateComplaint = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(complaintSchema) });
  const { mutate, isPending } = useCreateComplaint();
  const onSubmit = (data) => {
    try {
      const image = data.image[0];
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("file", image);
      mutate(formData);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <div className=" flex items-center justify-center px-4 mt-7">
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-4 ">
          <CardHeader className="text-center pt-4">
            <CardTitle className="text-3xl font-bold tracking-tight leading-[1.1]">
              Report the issue
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Contribute to the betterment of the society
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                {...register("title")}
                type="text"
                placeholder="Enter the title"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Enter the description"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                {...register("location")}
                type="text"
                placeholder="Enter the location"
              />
              {errors.location && (
                <p className="text-red-500">{errors.location.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <Input {...register("image")} accept="image/*" type="file" />
            </div>
          </CardContent>
          <CardFooter className={" flex flex-col space-y-2"}>
            <Button type="submit" className={"w-full flex items-center"}>
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-3" /> Please
                  wait...
                </>
              ) : (
                "Create"
              )}
            </Button>
            <p></p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
export default CreateComplaint;
