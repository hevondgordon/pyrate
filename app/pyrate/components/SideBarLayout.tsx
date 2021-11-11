import React, { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ROUTE as GET_SERVICES_ROUTE } from '../pages/api/services/index';
import { useRouter } from 'next/router'
import { ReactText } from 'react';
import useSWR from 'swr'
import { fetcher, toTitleCase } from '../data/utils'

interface LinkItemProps {
  name: string;
  icon: IconType;
}
export default function SideBarLayout({ children }: { children: ReactNode }) {
  const { data: services, error } = useSWR(GET_SERVICES_ROUTE, fetcher)
  const router = useRouter()
  const { id } = router.query


  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('whiteAlpha.100', 'whiteAlpha.900')}>
      <SidebarContent
        currentPage={id as string}
        services={services}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            services={services}
            currentPage={id as string} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4" style={{ color: 'black' }}>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  services: [];
  currentPage: string;
}

const SidebarContent = ({ onClose, services, currentPage, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'linkedin.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('linkedin.200', 'linkedin.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <NavItem key={'Home'} icon={FiCompass} currentPage={currentPage}>
        {'Home'}
      </NavItem>
      {services?.map((service) => (
        <NavItem key={service} icon={FiCompass} currentPage={currentPage}>
          {toTitleCase(service)}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  currentPage: string;
}
const NavItem = ({ icon, children, currentPage, ...rest }: NavItemProps) => {
  const label = children.toString().toLowerCase();
  const isActive = label === currentPage;
  let background = ['white', 'linkedin.900']
  if (isActive) {
    background = ['linkedin.200', 'linkedin.700']
  }
  return (
    <Link href={`/dashboard/${label}/`} style={{ textDecoration: 'none' }}>
      <Flex
        bg={background}
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: isActive ? ['linkedin.200', 'linkedin.700'] : 'linkedin.900',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];  