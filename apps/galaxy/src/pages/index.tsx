import { Stack, Button } from "@cc/ui-chakra";
import NoFoundIcon from "../assets/icons/404.svg";

export default function Galaxy() {
  const onToGalaxy = () => {
    console.log("Welcome to galaxy");
  };

  return (
    <Stack minH="100vh" justifyContent="center" alignItems="center" spacing="1.6rem">
      <h1>Galaxy</h1>
      <NoFoundIcon />
      <Button onClick={onToGalaxy}>To Galaxy... and Beyong!!</Button>
    </Stack>
  );
}
