import { Stack } from "@cc/ui-chakra";

import { SignUpForm } from "@src/modules";

export default function Galaxy() {
  return (
    <Stack minH="100vh" justifyContent="center" alignItems="center" spacing="1.6rem">
      <Stack alignItems="stretch" w="32rem">
        <h1>Sign Up Form</h1>
        <SignUpForm />
      </Stack>
    </Stack>
  );
}
