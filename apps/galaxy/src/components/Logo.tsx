import { Stack, Image, Text } from "@cc/ui-chakra";

type LogoProps = {
  showText?: boolean;
};

const Logo = ({ showText = true }: LogoProps) => {
  return (
    <Stack align="center">
      <Image
        marginBottom="24px"
        boxSize="104px"
        alt="dashboard-logo-192x192"
        src="/assets/dashboard-logo-192x192.png"
      />
      {showText && <Text fontSize="1.5rem">CourtCanva</Text>}
    </Stack>
  );
};

export default Logo;
