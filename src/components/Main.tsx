import { Button, Flex } from '@chakra-ui/react'
import { UseDisclosureReturn } from '@chakra-ui/hooks'

interface MainProps {
  disclosure: UseDisclosureReturn
}

export const Main: React.FC<MainProps> = ({ disclosure }) => {
  const { onOpen } = disclosure

  return (
    <Flex as="main" minHeight="calc(100vh - 4rem)" justifyContent="center" alignItems="center">
      <Button colorScheme="teal" size="lg" onClick={onOpen}>
        Find Shortest Path
      </Button>
    </Flex>
  )
}
