import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Link,
  useColorModeValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  BoxProps
} from '@chakra-ui/react'
import { useRef } from 'react'
import logo from '../assets/naheeda-icon.png'

interface HeaderContentProps {
  dropdownBg: string;
}

const features = [
  { href: "#", name: "Map" },
  { href: "#", name: "Feature 2" },
  { href: "#", name: "Feature 3" },
];

const HeaderContent: React.FC<HeaderContentProps> = ({ dropdownBg }) => (
  <>
    <Link href="#">Home</Link>
    <Menu>
      <MenuButton as={Link} href="#">
        Features
      </MenuButton>
      <MenuList bg={dropdownBg}>
        {features.map((feature) => (
          <MenuItem bg={dropdownBg} key={feature.name}>
            <Link href={feature.href}>{feature.name}</Link>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
    <Button colorScheme="whiteAlpha" onClick={() => {}}>
      Create Account
    </Button>
  </>
)

export const Header = () => {
  const bg = useColorModeValue('teal.500', 'teal.300')
  const color = useColorModeValue('white', 'gray.800')
  const dropdownBg = useColorModeValue('teal.400', 'teal.200')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  return (
    <Box as="header" bg={bg} py={4} boxShadow="md">
      <Flex align="center" justify="space-between" px={4} w="100%">
        <Box>
          <Image src={logo} alt="Logo" width="64px" height="64px" />
        </Box>

        <HStack
          display={{ base: 'none', md: 'flex' }}
          spacing={8}
          color={color}
          fontSize="20px"
          fontWeight="bold"
          fontFamily="sans-serif">
          <HeaderContent dropdownBg={dropdownBg}/>
        </HStack>
      </Flex>

      <HStack
        as="nav"
        bg={bg}
        position="absolute"
        top="100%"
        left="0"
        right="0"
        display={{ base: isOpen ? 'flex' : 'none', md: 'none' }}
        flexDir="column"
        spacing={2}
        p={4}
        zIndex={10}
        color={color}
        fontWeight="bold"
        fontFamily="sans-serif">
        <HeaderContent />
      </HStack>
    </Box>
  )
}
