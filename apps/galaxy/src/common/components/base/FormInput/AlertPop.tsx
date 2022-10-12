import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

export default function AlertPop(props: { title: string }) {
  return (
    <Alert size={"sm"} status="error">
      <AlertIcon />
      <AlertDescription mr={"auto"}>{props.title}</AlertDescription>
    </Alert>
  );
}
