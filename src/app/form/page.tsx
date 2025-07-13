import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Form() {
  return (
    <>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
          <CardDescription> Card Description</CardDescription>
          <CardAction>
            <Button>X</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>CardContent</p>
        </CardContent>
        <CardFooter>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </>
  );
}
