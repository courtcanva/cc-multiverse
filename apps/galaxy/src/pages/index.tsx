import { Input, Stack } from "@cc/ui-chakra";

import { SignUpForm } from "@src/modules";
import { useSignUpForm } from "@src/modules/auth/SignUpForm/useSignUpForm";

export default function Galaxy() {
  const onSubmit = (values: SignUpFormValues) => {
    // make api call
    console.debug(values);
  };

  return (
    <Stack minH="100vh" justifyContent="center" alignItems="center" spacing="1.6rem">
      <Stack alignItems="stretch" w="32rem">
        <h1>Sign Up Form</h1>
        <SignUpForm onSubmit={onSubmit} />
      </Stack>
    </Stack>
  );
}
