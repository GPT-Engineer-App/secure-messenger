import React, { useState } from "react";
import { Box, VStack, HStack, Text, Input, Button, Image, IconButton, useColorModeValue, useColorMode, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Avatar, Menu, MenuButton, MenuList, MenuItem, Switch } from "@chakra-ui/react";
import { FaSearch, FaMoon, FaSun, FaEllipsisV, FaPaperclip, FaMicrophone, FaPaperPlane } from "react-icons/fa";

const conversations = [
  { id: 1, name: "John Doe", lastMessage: "Hey, how's it going?", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTI0NzY5NDh8MA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 2, name: "Jane Smith", lastMessage: "Did you see the new movie?", avatar: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTcxMjQ3Njk0OXww&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 3, name: "Group Chat", lastMessage: "Let's plan a get-together!", avatar: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxncm91cCUyMG9mJTIwcGVvcGxlfGVufDB8fHx8MTcxMjQ3Njk0OXww&ixlib=rb-4.0.3&q=80&w=1080" },
];

const messages = [
  { id: 1, content: "Hello!", sender: "John Doe", timestamp: "10:00 AM" },
  { id: 2, content: "Hi there!", sender: "Me", timestamp: "10:05 AM" },
  { id: 3, content: "How are you doing?", sender: "John Doe", timestamp: "10:10 AM" },
];

const Index = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [inputMessage, setInputMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      // Send the message
      setInputMessage("");
    }
  };

  const renderConversation = (conversation) => (
    <Box key={conversation.id} p={4} borderBottomWidth={1} borderColor="gray.200" cursor="pointer" onClick={() => setSelectedConversation(conversation)} bg={selectedConversation.id === conversation.id ? "green.50" : "white"}>
      <HStack>
        <Avatar size="md" name={conversation.name} src={conversation.avatar} />
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">{conversation.name}</Text>
          <Text fontSize="sm" color="gray.500" noOfLines={1}>
            {conversation.lastMessage}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );

  const renderMessage = (message) => (
    <Box key={message.id} p={4} borderRadius="md" bg={message.sender === "Me" ? "green.100" : "gray.100"} alignSelf={message.sender === "Me" ? "flex-end" : "flex-start"} maxW="70%">
      <Text>{message.content}</Text>
      <Text fontSize="xs" color="gray.500" mt={1}>
        {message.timestamp}
      </Text>
    </Box>
  );

  return (
    <Box bg={useColorModeValue("gray.50", "gray.800")} minH="100vh">
      <Box maxW="1200px" mx="auto" display="flex" h="100vh">
        <Box w="300px" bg={useColorModeValue("white", "gray.700")} borderRightWidth={1} borderColor="gray.200">
          <VStack align="stretch" spacing={0}>
            <HStack p={4} borderBottomWidth={1} borderColor="gray.200">
              <Input placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} bg={useColorModeValue("gray.100", "gray.600")} borderRadius="full" />
              <IconButton icon={<FaSearch />} aria-label="Search" variant="ghost" onClick={onOpen} />
              <Menu>
                <MenuButton as={IconButton} icon={<FaEllipsisV />} aria-label="Options" variant="ghost" />
                <MenuList>
                  <MenuItem icon={colorMode === "light" ? <FaMoon /> : <FaSun />} onClick={toggleColorMode}>
                    {colorMode === "light" ? "Dark" : "Light"} Mode
                  </MenuItem>
                  <MenuItem>
                    <HStack>
                      <Text>Encryption</Text>
                      <Switch isChecked={isEncrypted} onChange={() => setIsEncrypted(!isEncrypted)} />
                    </HStack>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
            <Box overflowY="auto">{conversations.filter((conversation) => conversation.name.toLowerCase().includes(searchQuery.toLowerCase())).map(renderConversation)}</Box>
          </VStack>
        </Box>
        <VStack flex={1} align="stretch" spacing={0}>
          <HStack p={4} borderBottomWidth={1} borderColor="gray.200">
            <Avatar size="md" name={selectedConversation.name} src={selectedConversation.avatar} />
            <Text fontWeight="bold">{selectedConversation.name}</Text>
          </HStack>
          <Box p={4} overflowY="auto" flex={1}>
            <VStack align="stretch" spacing={4}>
              {messages.map(renderMessage)}
            </VStack>
          </Box>
          <HStack p={4} borderTopWidth={1} borderColor="gray.200">
            <IconButton icon={<FaPaperclip />} aria-label="Attach" variant="ghost" />
            <Input
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <IconButton icon={<FaMicrophone />} aria-label="Voice Message" variant="ghost" />
            <IconButton icon={<FaPaperPlane />} aria-label="Send" onClick={sendMessage} colorScheme="green" />
          </HStack>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Messages</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Search messages..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            {/* Render search results */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
