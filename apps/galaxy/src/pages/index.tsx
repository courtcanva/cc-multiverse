import { Stack, Button } from "@cc/ui-chakra";
import { useRouter } from "next/router";
import NoFoundIcon from "@src/assets/icons/404.svg";

export default function Galaxy() {
  const router = useRouter();
  const onToGalaxy = () => {
    console.log("Welcome to galaxy");
  };
  const signOut = () => {
    localStorage.removeItem("accessToken");
    router.push("/sign-in");
  };

  return (
    <Stack minH="100vh" justifyContent="center" alignItems="center" spacing="1.6rem">
      <h1>Galaxy</h1>
      <NoFoundIcon />
      <Button onClick={onToGalaxy}>To Galaxy... and Beyong!!</Button>
      <Button onClick={signOut}>Sign Out</Button>
    </Stack>
  );
}
