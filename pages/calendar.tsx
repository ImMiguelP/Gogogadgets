import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events: any = [];

function YourCalendar() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const addEvent = () => {
    setAllEvents([...allEvents, newEvent]);
    onClose();
  };

  const bg = "/calbg.png";
  return (
    <Box bgImage={bg} bgSize={"cover"} minH="100%" position={"relative"}>
      <Box
        bg={"rgba( 0, 0, 0, 0.55 )"}
        boxShadow={"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"}
        backdropFilter={"blur( 10.5px )"}
        color="White"
        minHeight="100vh"
      >
        <Navbar />
        <Box p={5} maxW={"7xl"} mx={"auto"}>
          <Text
            fontSize={"2xl"}
            color={"#f67f1a"}
            fontWeight={"bold"}
            pb={5}
            textAlign={"center"}
          >
            Your Calendar
          </Text>
          <VStack align={"end"} p={5}>
            <Button onClick={onOpen} color={"black"} bg={"#f67f1a"}>
              Add A New Event
            </Button>
          </VStack>
          {/* Modal */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={"#333333"}>
              <ModalHeader color={"white"}>
                Add A New Event To The Calendar
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  type={"text"}
                  placeholder={"Event Name"}
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
                <HStack pt={"5"}>
                  <DatePicker
                    placeholderText="Start Date"
                    selected={newEvent.start}
                    onChange={(start) => setNewEvent({ ...newEvent, start })}
                  />
                  <DatePicker
                    placeholderText="End Date"
                    selected={newEvent.end}
                    onChange={(end) => setNewEvent({ ...newEvent, end })}
                  />
                </HStack>
              </ModalBody>
              <ModalFooter>
                <Button onClick={addEvent} bg={"#f67f1a"}>
                  Add Event
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Calendar */}
          <Calendar
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            style={{
              height: 600,
              color: "#f67f1a",
              background: "white",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default YourCalendar;