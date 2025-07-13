import {Modal} from "@/components/modal"
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

export default function InterceptedForm() {
  return (
    <Modal>
    <div className = "p-6 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add Intercepted</CardTitle>
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
      </div>
    </Modal>
  );
}


