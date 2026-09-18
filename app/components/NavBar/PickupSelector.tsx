"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import clsx from "clsx";

const dates = Array.from({ length: 7 }, (_, index) => {
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + index);

  const date = currentDate.getDate();

  const month = currentDate.toLocaleString("en-US", {
    month: "short",
  });

  const weekday = currentDate.toLocaleString("en-US", {
    weekday: "long",
  });

  let suffix = "th";

  if (date % 10 === 1 && date !== 11) suffix = "st";
  else if (date % 10 === 2 && date !== 12) suffix = "nd";
  else if (date % 10 === 3 && date !== 13) suffix = "rd";

  return {
    date: `${date}${suffix} ${month}`,
    day: index === 0 ? "Today" : index === 1 ? "Tomorrow" : weekday,
  };
});

const times = [
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
];

export default function PickupSelector() {
  const [expanded, setExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState("11:00");

  const timeRef = useRef<HTMLDivElement>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: -150,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: 150,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!timeRef.current) return;

    const selectedElement = timeRef.current.querySelector(
      `[data-time="${selectedTime}"]`,
    );

    if (selectedElement) {
      (selectedElement as HTMLElement).scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [expanded, selectedTime]);

  return (
    <div
      className={clsx(
        `
    relative
    w-107.5
    rounded-[26px]
    border
    border-[#dddddd]
    shadow-sm
    overflow-visible
    `,
      )}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-1 flex items-center justify-between"
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full bg-[#edf5ea] flex items-center justify-center">
            <span className="text-lg">🛵</span>
          </div>

          {/* Address */}
          <div className="text-left">
            <p className="text-[12px] font-semibold text-[#4b4b4b]">
              Pickup From:
            </p>

            <p
              className={clsx(
                "font-semibold text-[#222] leading-tight",
                "text-[13px] max-w-35.5 truncate",
              )}
            >
              PJPB - 360° Business Park, Electronics City BLR
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="w-px h-9 bg-[#d9d9d9]" />

          <div className="flex items-center gap-2">
            <Clock3 size={16} className="text-[#5d5d5d]" />

            <div className="text-left leading-tight">
              {expanded ? (
                <>
                  <p className="text-[12px] font-medium text-[#6b6b6b]">
                    Today
                  </p>

                  <p className="text-[18px] font-bold text-[#222]">13:45</p>
                </>
              ) : (
                <>
                  <p className="text-[13px] font-semibold text-[#222]">
                    {dates[selectedDate].date}
                  </p>

                  <p className="text-[13px] font-semibold text-[#222]">
                    {selectedTime}
                  </p>
                </>
              )}
            </div>

            <ChevronDown
              size={18}
              className={clsx(
                "transition-transform duration-300 text-[#444]",
                expanded && "rotate-180",
              )}
            />
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      <div
        className={clsx(
          `
    absolute
    top-full
    left-0
    mt-2
    w-full
    bg-white
    rounded-[26px]
    border
    border-[#dddddd]
    shadow-xl
    overflow-hidden
    transition-all
    duration-300
    z-50
    `,
          expanded
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2",
        )}
      >
        {/* Date Selector */}
        <div className="relative pt-2">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="
      absolute
      left-2
      top-7
      z-10
      w-7
      h-7
      rounded-full
      flex
      items-center
      justify-center
    "
          >
            <ChevronLeft size={18} className="text-[#777]" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="
      absolute
      right-2
      top-7
      z-10
      w-7
      h-7
      rounded-full
      items-center
      justify-center
    "
          >
            <ChevronRight size={18} className="text-[#777]" />
          </button>

          {/* Dates */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-none scroll-smooth"
            onWheel={(e) => {
              e.currentTarget.scrollLeft += e.deltaY;
            }}
          >
            <div className="flex gap-5 min-w-max px-8 pb-3">
              {dates.map((item, index) => (
                <button
                  key={item.date}
                  onClick={() => setSelectedDate(index)}
                  className="flex flex-col items-center min-w-fit"
                >
                  <span
                    className={clsx(
                      "text-[15px] font-bold whitespace-nowrap transition-colors",
                      selectedDate === index ? "text-black" : "text-[#575757]",
                    )}
                  >
                    {item.date}
                  </span>

                  <span
                    className={clsx(
                      "text-[12px] mt-0.5 transition-colors",
                      selectedDate === index
                        ? "text-black font-medium"
                        : "text-[#9a9a9a]",
                    )}
                  >
                    {item.day}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#dddddd] mx-8" />
        </div>

        {/* Time Picker */}
        <div className="h-45 flex items-center justify-center">
          <div
            ref={timeRef}
            className="
              h-45
              overflow-y-auto
              snap-y
              snap-mandatory
              scrollbar-none
              flex
              flex-col
              items-center
              w-full
            "
          >
            <div className="h-13.75" />

            {times.map((time) => (
              <button
                key={time}
                data-time={time}
                onClick={() => setSelectedTime(time)}
                className={clsx(
                  `
                  snap-center
                  transition-all
                  duration-200
                  w-52.5
                  h-12
                  rounded-xl
                  text-[18px]
                  font-bold
                  mb-2
                `,
                  selectedTime === time
                    ? "bg-[#ededed] text-black scale-[1.02]"
                    : "text-[#b6b6b6]",
                )}
              >
                {time}
              </button>
            ))}

            <div className="h-13.75" />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center gap-4 px-4 pb-5">
          <button
            className="
              flex-1
              h-11
              rounded-full
              border-2
              border-[#1d5f2b]
              text-[#1d5f2b]
              text-[15px]
              font-semibold
            "
          >
            Order Now
          </button>

          <button
            className="
              flex-1
              h-11
              rounded-full
              bg-[#1d5f2b]
              text-white
              text-[15px]
              font-semibold
            "
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
