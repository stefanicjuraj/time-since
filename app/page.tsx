"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Countdown() {
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [countdown, setCountdown] = useState({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    microseconds: 0,
    nanoseconds: 0,
    picoseconds: 0,
  });

  useEffect(() => {
    const dateFromUrl = searchParams?.get("date");
    if (dateFromUrl) {
      setSelectedDate(dateFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const calculateCountdown = () => {
      if (!selectedDate) return;

      const startDate = new Date(selectedDate);
      const now = new Date();

      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();

      if (days < 0) {
        months--;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      const milisecondsInDay = 24 * 60 * 60 * 1000;
      const totalMilliseconds = now.getTime() - startDate.getTime();
      const totalDays = Math.floor(totalMilliseconds / milisecondsInDay);
      const weeks = Math.floor(totalDays / 7);

      const totalSeconds = Math.floor(totalMilliseconds / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);

      const totalMicroseconds = totalMilliseconds * 1000;
      const totalNanoseconds = totalMicroseconds * 1000;
      const totalPicoseconds = totalNanoseconds * 1000;

      setCountdown({
        years,
        months,
        days,
        weeks,
        hours: totalHours,
        minutes: totalMinutes,
        seconds: totalSeconds,
        milliseconds: totalMilliseconds,
        microseconds: totalMicroseconds,
        nanoseconds: totalNanoseconds,
        picoseconds: totalPicoseconds,
      });
    };

    const interval = setInterval(calculateCountdown, 1);
    calculateCountdown();

    return () => clearInterval(interval);
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);

    const url = new URL(window.location.href);
    if (newDate) {
      url.searchParams.set("date", newDate);
    } else {
      url.searchParams.delete("date");
    }
    window.history.pushState({}, "", url);
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    navigator.clipboard.writeText(url.toString());
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const formatNumber = (num: number) => num.toLocaleString("en-US");
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-screen-md mx-auto mt-20 text-center">
      <h1 className="text-5xl font-bold">Time Since</h1>
      <div className="mt-8">
        <label htmlFor="date-picker" className="block text-lg mb-2">
          Select a start date:
        </label>
        <div className="flex justify-center gap-4">
          <input
            id="date-picker"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            max={today}
            className="border rounded p-3 text-lg border-r-4 border-b-4 cursor-pointer"
          />
          {selectedDate && (
            <button
              onClick={handleShare}
              className="bg-white border-r-4 border border-b-4 text-black px-4 py-2 rounded hover:border-green-500 transition-colors cursor-pointer"
            >
              Share
            </button>
          )}
        </div>
      </div>
      {selectedDate && (
        <div className="text-left mx-auto my-8 max-w-sm p-4">
          <p className="sm:text-lg text-md font-mono mt-4">
            <span className="font-bold">{formatNumber(countdown.years)}</span>{" "}
            <span className="text-sm">years</span>{" "}
            <span className="font-bold">{formatNumber(countdown.months)}</span>{" "}
            <span className="text-sm">months</span>{" "}
            <span className="font-bold">{formatNumber(countdown.days)}</span>{" "}
            <span className="text-sm">days</span>
          </p>
          <p className="sm:text-lg text-md font-mono mt-4">
            <span className="font-bold">{formatNumber(countdown.weeks)}</span>{" "}
            <br />
            <span className="text-sm">weeks</span>
          </p>
          <p className="sm:text-lg text-md font-mono mt-4">
            <span className="font-bold">{formatNumber(countdown.hours)}</span>{" "}
            <br />
            <span className="text-sm">hours</span>
          </p>
          <p className="sm:text-lg text-md font-mono mt-4">
            <span className="font-bold">{formatNumber(countdown.minutes)}</span>{" "}
            <br />
            <span className="text-sm">minutes</span>
          </p>
          <p className="sm:text-lg text-md font-mono mt-4">
            <span className="font-bold">{formatNumber(countdown.seconds)}</span>{" "}
            <br />
            <span className="text-sm">seconds</span>
          </p>
          <p className="sm:text-lg text-md font-mono mt-4">
            <span className="font-bold">
              {formatNumber(countdown.milliseconds)}
            </span>{" "}
            <br />
            <span className="text-sm">milliseconds</span>
          </p>
          <p className="sm:text-lg text-md font-mono mt-4">
            <span className="font-bold">
              {formatNumber(countdown.microseconds)}
            </span>{" "}
            <br />
            <span className="text-sm">microseconds</span>
          </p>
          <p className="sm:text-lg text-md font-mono mt-4">
            <span className="font-bold">
              {formatNumber(countdown.nanoseconds)}
            </span>{" "}
            <br />
            <span className="text-sm">nanoseconds</span>
          </p>
          <p className="sm:text-lg text-md font-mono mt-4">
            <span className="font-bold">
              {formatNumber(countdown.picoseconds)}
            </span>{" "}
            <br />
            <span className="text-sm">picoseconds</span>
          </p>
        </div>
      )}

      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 ${
          showNotification ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        Copied! Share the link with others.
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<></>}>
      <Countdown />
    </Suspense>
  );
}
