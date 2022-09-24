import { Stack, Button } from "@cc/ui-chakra";

const NEVER_GONNA_GIVE_YOU_UP = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

export default function Galaxy() {
  const onTroll = () => {
    window.location.assign(NEVER_GONNA_GIVE_YOU_UP);
  };

  return (
    <Stack minH="100vh" justifyContent="center" alignItems="center" spacing="1.6rem">
      <h1>Galaxy</h1>
      <Button onClick={onTroll}>To Galaxy... and Beyong!!</Button>
    </Stack>
  );
}
