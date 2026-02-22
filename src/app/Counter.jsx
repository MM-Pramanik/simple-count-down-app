import React, { useState, useEffect } from "react";
import InputComponent from "../components/CounterComps/InputComponent";
import TemplateContainer from "../components/CounterComps/TemplateContainer";
import ActionBtn from "../components/CounterComps/ActionBtn";

const STORAGE_KEY = "countdown-state-v1";
const CUSTOM_TEMPLATES_KEY = "countdown-custom-templates-v1";

const parseMinutes = (value) => {
  if (value === "") return "";

  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) return null;

  return parsed;
};

const parseStoredPositiveNumber = (value, fallback) => {
  return typeof value === "number" && value > 0 ? value : fallback;
};

const parseStoredNonNegativeNumber = (value, fallback) => {
  return typeof value === "number" && value >= 0 ? value : fallback;
};

const parseStoredList = (value) => {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => typeof item === "number" && item > 0);
};

const readStoredCardValues = () => {
  if (typeof window === "undefined") return [];

  try {
    const customTemplatesRaw =
      window.localStorage.getItem(CUSTOM_TEMPLATES_KEY);
    if (customTemplatesRaw) {
      const customTemplates = JSON.parse(customTemplatesRaw);
      return parseStoredList(customTemplates);
    }

    const fullStateRaw = window.localStorage.getItem(STORAGE_KEY);
    if (!fullStateRaw) return [];

    const fullState = JSON.parse(fullStateRaw);
    return parseStoredList(fullState.cardValues);
  } catch (error) {
    console.error("Failed to restore custom templates:", error);
    return [];
  }
};

const Counter = () => {
  const [inputState, setInputState] = useState("");
  const [custom, setCustom] = useState("");
  const [cardValues, setCardValues] = useState(() => readStoredCardValues());
  const [isCustom, setIsCustom] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [mainState, setMainState] = useState(10);
  const [totalSecs, setTotalSecs] = useState(600);
  const [hasHydrated, setHasHydrated] = useState(false);

  const handleMainInputChange = (e) => {
    const parsed = parseMinutes(e.target.value);
    if (parsed === null) return;
    setInputState(parsed);
  };

  const handleCustomInputChange = (e) => {
    const parsed = parseMinutes(e.target.value);
    if (parsed === null) return;
    setCustom(parsed);
  };

  const handleAddCustom = () => {
    if (custom === "" || custom <= 0) {
      return;
    }

    setCardValues((prev) => {
      if (prev.includes(custom)) return prev;
      return [...prev, custom];
    });
    setCustom("");
  };

  const handleDeleteCustom = (valueToDelete) => {
    setCardValues((prev) => prev.filter((value) => value !== valueToDelete));
  };

  const handleCardSelect = (value) => {
    setMainState(value);
    setInputState("");
    setTotalSecs(value * 60);
    setIsRunning(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      setHasHydrated(true);
      return;
    }

    try {
      const rawState = window.localStorage.getItem(STORAGE_KEY);
      if (!rawState) {
        setHasHydrated(true);
        return;
      }

      const parsedState = JSON.parse(rawState);
      const storedMainState = parseStoredPositiveNumber(
        parsedState.mainState,
        10,
      );
      const storedInputState = parseStoredPositiveNumber(
        parsedState.inputState,
        "",
      );
      const storedCustom = parseStoredPositiveNumber(parsedState.custom, "");
      let storedTotalSecs = parseStoredNonNegativeNumber(
        parsedState.totalSecs,
        storedMainState * 60,
      );
      let storedIsRunning = parsedState.isRunning === true;

      if (storedIsRunning && typeof parsedState.endAt === "number") {
        const remainingSecs = Math.max(
          0,
          Math.ceil((parsedState.endAt - Date.now()) / 1000),
        );
        storedTotalSecs = remainingSecs;
        storedIsRunning = remainingSecs > 0;
      }

      setInputState(storedInputState);
      setCustom(storedCustom);
      const storedCardValues = parseStoredList(parsedState.cardValues);
      if (storedCardValues.length > 0) {
        setCardValues(storedCardValues);
      }
      setIsCustom(parsedState.isCustom === true);
      setIsRunning(storedIsRunning);
      setMainState(storedMainState);
      setTotalSecs(storedTotalSecs);
    } catch (error) {
      console.error("Failed to restore countdown state:", error);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    let timerId = null;
    if (isRunning && totalSecs > 0) {
      timerId = setInterval(() => {
        setTotalSecs((prev) => prev - 1);
      }, 1000);
    } else if (totalSecs === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timerId);
  }, [isRunning, totalSecs]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      CUSTOM_TEMPLATES_KEY,
      JSON.stringify(cardValues),
    );
  }, [cardValues]);

  useEffect(() => {
    if (!hasHydrated || typeof window === "undefined") return;

    const stateToPersist = {
      inputState,
      custom,
      cardValues,
      isCustom,
      isRunning,
      mainState,
      totalSecs,
      endAt: isRunning ? Date.now() + totalSecs * 1000 : null,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
  }, [
    cardValues,
    custom,
    hasHydrated,
    inputState,
    isCustom,
    isRunning,
    mainState,
    totalSecs,
  ]);

  const countFunc = () => {
    if (!isRunning && inputState !== "" && inputState > 0) {
      setMainState(inputState);
      setTotalSecs(inputState * 60);
      setInputState("");
      setIsRunning(true);
      return;
    }

    if (!isRunning && totalSecs === 0) {
      setTotalSecs(mainState * 60);
      setIsRunning(true);
      return;
    }

    setIsRunning((prev) => !prev);
  };

  const formatTime = () => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <section className="flex flex-col items-center gap-2.5 p-5">
      <div className="text-center mb-4">
        <p className="text-5xl font-mono font-bold text-[#355872]">
          {formatTime()}
        </p>
        <span
          className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${isRunning ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
        >
          {isRunning ? "Running" : "Paused"}
        </span>
      </div>

      <InputComponent value={inputState} onChange={handleMainInputChange} />
      <TemplateContainer
        isCustom={isCustom}
        setIsCustom={setIsCustom}
        customValue={custom}
        onCustomChange={handleCustomInputChange}
        onAddCustom={handleAddCustom}
        cardValues={cardValues}
        onSelectCard={handleCardSelect}
        onDeleteCard={handleDeleteCustom}
      />

      <div className="mt-6 flex gap-4">
        <ActionBtn
          onClick={countFunc}
          btnName={isRunning ? "Pause" : "Start"}
        />
        {!isRunning && totalSecs !== mainState * 60 && (
          <button
            onClick={() => setTotalSecs(mainState * 60)}
            className="text-sm font-semibold text-gray-400 hover:text-gray-600 underline"
          >
            Reset
          </button>
        )}
      </div>
    </section>
  );
};

export default Counter;
