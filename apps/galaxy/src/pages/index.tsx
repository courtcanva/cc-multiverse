import { Stack, Button } from "@cc/ui-chakra";

export default function Galaxy() {
  const onToGalaxy = () => {
    console.debug("Welcome to galaxy");
  };

  return (
    <Stack minH="100vh" justifyContent="center" alignItems="center" spacing="1.6rem">
      <h1>Galaxy</h1>
      <Button onClick={onToGalaxy}>To Galaxy... and Beyong!!</Button>
    </Stack>
  );
}
