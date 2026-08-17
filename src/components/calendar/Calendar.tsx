"use client";
import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  EventInput,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { Button } from "@ueb-development/ui/components/button";
import { Input } from "@ueb-development/ui/components/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@ueb-development/ui/components/radio-group";

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
  };
}

const initialEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Event Conf.",
    start: new Date().toISOString().split("T")[0],
    extendedProps: { calendar: "Peligro" },
  },
  {
    id: "2",
    title: "Meeting",
    start: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    extendedProps: { calendar: "Éxito" },
  },
  {
    id: "3",
    title: "Workshop",
    start: new Date(Date.now() + 172800000).toISOString().split("T")[0],
    end: new Date(Date.now() + 259200000).toISOString().split("T")[0],
    extendedProps: { calendar: "Principal" },
  },
];

const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const calendarsEvents = {
    Peligro: "danger",
    Éxito: "success",
    Principal: "primary",
    Advertencia: "warning",
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(selectInfo.endStr || selectInfo.startStr);
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    setEventTitle(event.title);
    setEventStartDate(event.start?.toISOString().split("T")[0] || "");
    setEventEndDate(event.end?.toISOString().split("T")[0] || "");
    setEventLevel(event.extendedProps.calendar);
    openModal();
  };

  const handleAddOrUpdateEvent = () => {
    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: eventTitle,
                start: eventStartDate,
                end: eventEndDate,
                extendedProps: { calendar: eventLevel },
              }
            : event
        )
      );
    } else {
      // Add new event
      const newEvent: CalendarEvent = {
        id: crypto.randomUUID(),
        title: eventTitle,
        start: eventStartDate,
        end: eventEndDate,
        allDay: true,
        extendedProps: { calendar: eventLevel },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    closeModal();
    resetModalFields();
  };

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLevel("");
    setSelectedEvent(null);
  };

  return (
    <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="custom-calendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next addEventButton",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          customButtons={{
            addEventButton: {
              text: "+ Añadir Evento",
              click: openModal,
            },
          }}
        />
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-xl dark:text-white/90 lg:text-2xl">
              {selectedEvent ? "Editar Evento" : "Añadir Evento"}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Programa o edita un evento para mantenerte al día
            </p>
          </div>
          <div className="mt-8">
            <div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Título del Evento
                </label>
                <Input
                  id="event-title"
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="h-11 rounded-lg"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                Color del Evento
              </label>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                <RadioGroup
                  value={eventLevel}
                  onValueChange={setEventLevel}
                  className="flex flex-wrap items-center gap-4 sm:gap-5"
                >
                  {Object.keys(calendarsEvents).map((key) => (
                    <label
                      key={key}
                      htmlFor={`modal${key}`}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400"
                    >
                      <RadioGroupItem
                        id={`modal${key}`}
                        value={key}
                        className="border-gray-300 data-checked:bg-white data-checked:border-primary"
                      />
                      {key}
                    </label>
                  ))}
                </RadioGroup>
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Fecha de Inicio
              </label>
              <div className="relative">
                <Input
                  id="event-start-date"
                  type="date"
                  value={eventStartDate}
                  onChange={(e) => setEventStartDate(e.target.value)}
                  className="h-11 rounded-lg"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Fecha de Fin
              </label>
              <div className="relative">
                <Input
                  id="event-end-date"
                  type="date"
                  value={eventEndDate}
                  onChange={(e) => setEventEndDate(e.target.value)}
                  className="h-11 rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <Button
              onClick={closeModal}
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Cerrar
            </Button>
            <Button
              onClick={handleAddOrUpdateEvent}
              type="button"
              className="btn btn-success btn-update-event w-full sm:w-auto"
            >
              {selectedEvent ? "Actualizar Cambios" : "Añadir Evento"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
  return (
    <div
      className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
    >
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default Calendar;
